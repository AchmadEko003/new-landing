<script lang="ts" setup>
import type { IResponse } from '~~/shared/interface/IResponse'
import type {
  IDetailBook,
  IBookingPackage,
  IGuestForm,
  IPaymentMethod,
  IBookingStep
} from '~~/shared/interface/IDetailBook'
import type { IVoucher, IVoucherResponse } from '~~/shared/interface/IVoucher'
import type { IVaListResponse } from '~~/shared/interface/IVaList'
import type { IBookingConfirmation } from '~~/shared/interface/IBooking'
import type { IPaymentResponse } from '~~/shared/interface/IPayment'
import { formatCurrency } from '~~/shared/script/currency'
import {
  formatCardNumber,
  formatExpiryDate,
  generateGuestId
} from '~~/shared/script/booking-utils'
import type { GuestSummary } from '~~/shared/script/booking-utils'

const route = useRoute()
const router = useRouter()
const bookingId = computed(() => route.params.id as string)
const baseUrl = useRuntimeConfig().public.apiBase

const summaryState = ref(false)

// VueUse for responsive design
const { width } = useWindowSize()
const isDesktop = computed(() => width.value >= 1024) // lg breakpoint

// Fetch booking detail
const {
  data: bookingData,
  pending,
  error
} = await useFetch<IResponse<IDetailBook>>(
  `${baseUrl}/Booking/package/${bookingId.value}`
)

const booking = computed(() => bookingData.value?.data)

// Extended booking step to allow custom payment method type and multiple package selection
interface ExtendedBookingStep extends Omit<
  IBookingStep,
  'selectedPaymentMethod' | 'selectedPackage'
> {
  selectedPaymentMethod?: PaymentMethodWithCode
  selectedPackages: IPackageSelection[]
}

// Interface for package selection with quantity
interface IPackageSelection {
  packageUid: string
  quantity: number
}

// Booking step state
const bookingStep = ref<ExtendedBookingStep>({
  currentStep: 1,
  selectedPackages: [],
  selectedExtraPackages: [],
  totalAmount: 0
})

// Payment mode state
const fullPayment = ref(false)

// Voucher state
const voucherCode = ref('')
const appliedVoucher = ref<IVoucher | null>(null)
const voucherLoading = ref(false)
const voucherError = ref('')

// Payment success dialog state
const showSuccessDialog = ref(false)
const showPaymentLoadingModal = ref(false)
const paymentResponse = ref<IPaymentResponse | null>(null)
const bookingLoading = ref(false)
const paymentModalInvoiceId = ref<string>('')
const paymentModalRedirectUrl = ref<string>('')

// Copy feedback state
const { copyFeedback, showCopyFeedback, copyVirtualAccount }
  = useCopyVirtualAccount()

// Guest details toggle state
const showGuestDetails = ref(false)

// Credit card form state (UI only - no logic)
const creditCardForm = ref({
  cardName: '',
  cardNumber: '',
  expiryDate: '',
  cvv: ''
})

// Watch for credit card input changes to format them
watch(
  () => creditCardForm.value.cardNumber,
  (newValue) => {
    creditCardForm.value.cardNumber = formatCardNumber(newValue)
  }
)

watch(
  () => creditCardForm.value.expiryDate,
  (newValue) => {
    creditCardForm.value.expiryDate = formatExpiryDate(newValue)
  }
)

// Payment method type state
const selectedPaymentType = ref<'credit_card' | 'virtual_account' | null>(null)

// Ref untuk StepPayment component
const stepPaymentRef = ref()

// Guest form state
const guestForm = ref<IGuestForm>({
  guests: [
    {
      fullNameAsPerPassport: '',
      gender: 'Mr',
      email: '',
      whatsappNumber: ''
    }
  ]
})

// Gender options
const genderOptions = ['Mr', 'Mrs', 'Ms']

// Fetch payment methods from VA-list API
const { data: vaListData, pending: vaListPending }
  = await useFetch<IVaListResponse>(`${baseUrl}/Booking/payment-list`)

// Custom payment method type with bank code
interface PaymentMethodWithCode extends Omit<IPaymentMethod, 'type'> {
  code: string
  type: 'bank' | 'credit_card'
  fee: number
}

const paymentMethods = computed((): PaymentMethodWithCode[] => {
  const methods: PaymentMethodWithCode[] = []

  // Add credit card option
  // methods.push({
  //   id: 'credit_card',
  //   name: 'Credit Card',
  //   type: 'credit_card' as const,
  //   code: 'CREDIT_CARD',
  //   fee: 0,
  //   icon: '/assets/bank/credit_card.png'
  // })

  // Add virtual account methods
  if (vaListData.value?.data) {
    const vaMethodsWithTitle = vaListData.value.data
      .filter(item => item.is_Activated)
      .map(item => ({
        id: item.code.toLowerCase(),
        name: item.name,
        type: 'bank' as const,
        code: item.code,
        fee: item.fee,
        icon: `/assets/bank/${item.code}.png`
      }))
    methods.push(...vaMethodsWithTitle)
  }

  return methods
})

// Step titles
const stepTitles = ['Package', 'Guest Information', 'Extra Package', 'Payment']

// Computed values
const formattedStartDate = computed(() => {
  if (!booking.value?.startDate) return ''
  return new Date(booking.value.startDate).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})

const formattedEndDate = computed(() => {
  if (!booking.value?.endDate) return ''
  return new Date(booking.value.endDate).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})

// Helper functions for package selection
const getPackageSelection = (packageUid: string) => {
  return bookingStep.value.selectedPackages.find(
    p => p.packageUid === packageUid
  )
}

const getPackageQuantity = (packageUid: string) => {
  return getPackageSelection(packageUid)?.quantity || 0
}

const canRemovePackage = (packageUid: string) => {
  const pkg = booking.value?.package?.find(p => p.uid === packageUid)
  if (!pkg) return false
  const currentQuantity = getPackageQuantity(packageUid)
  return currentQuantity > 0
}

// Computed for minimum quantity based on selected package
const getMinimumQuantity = (pkg: IBookingPackage) => {
  return pkg.minimumBook || 1
}

// Computed for total guest count across all packages
const totalGuestCount = computed(() => {
  // return Math.max(1, bookingStep.value.selectedPackages.reduce((sum, selection) => sum + selection.quantity, 0))
  if (!booking.value?.package) return 1

  const total = bookingStep.value.selectedPackages.reduce(
    (sum, selection) => {
      const pkg = booking.value?.package.find(
        p => p.uid === selection.packageUid
      )
      if (pkg && !pkg.additionalFee) {
        return sum + selection.quantity
      }
      return sum
    },
    0
  )

  return Math.max(1, total)
})

// Computed for total amount after voucher discount (for sidebar display)
const totalAmountAfterDiscount = computed(() => {
  let amount = bookingStep.value.totalAmount

  // Apply voucher discount if voucher is applied - multiply by total guest count
  if (appliedVoucher.value?.isApplied) {
    const totalVoucherDiscount
      = appliedVoucher.value.discount * totalGuestCount.value
    amount = Math.max(0, amount - totalVoucherDiscount)
  }

  return amount
})

// Computed for final payment amount based on payment mode
const finalPaymentAmount = computed(() => {
  let amount = 0
  if (fullPayment.value) {
    amount = totalAmountAfterDiscount.value
  } else {
    // Down Payment: multiply by total guest count, WITHOUT discount
    amount = (booking.value?.downPayment || 0) * totalGuestCount.value
  }

  // Add payment method fee if selected
  if (bookingStep.value.selectedPaymentMethod?.fee) {
    amount += bookingStep.value.selectedPaymentMethod.fee
  }

  return amount
})

const calculateTotal = () => {
  let total = 0

  // Calculate total from selected packages
  bookingStep.value.selectedPackages.forEach((selection) => {
    const pkg = booking.value?.package?.find(
      p => p.uid === selection.packageUid
    )
    if (pkg) {
      total += pkg.price * selection.quantity
    }
  })

  // Calculate total from extra packages
  bookingStep.value.selectedExtraPackages.forEach((selection) => {
    const pkg = booking.value?.extraPackage?.find(
      p => p.uid === selection.packageUid
    )
    if (pkg) {
      total += pkg.price * selection.selectedGuestIndexes.length
    }
  })

  bookingStep.value.totalAmount = total
}

// Step navigation
const nextStep = () => {
  if (bookingStep.value.currentStep < 4) {
    bookingStep.value.currentStep++
    nextTick(() => {
      window.scrollTo({ top: 0, behavior: 'auto' })
    })
  }
}

const prevStep = () => {
  if (bookingStep.value.currentStep > 1) {
    bookingStep.value.currentStep--
    nextTick(() => {
      window.scrollTo({ top: 0, behavior: 'auto' })
    })
  }
}

const goToStep = (step: number) => {
  // Allow navigation to any step that has been completed or is the next step
  if (step >= 1 && step <= 4) {
    // Can go to any previous step or current step
    if (step <= bookingStep.value.currentStep) {
      bookingStep.value.currentStep = step
      nextTick(() => {
        window.scrollTo({ top: 0, behavior: 'auto' })
      })
    } else if (
      step === bookingStep.value.currentStep + 1
      && isStepValid(bookingStep.value.currentStep)
    ) {
      bookingStep.value.currentStep = step
      nextTick(() => {
        window.scrollTo({ top: 0, behavior: 'auto' })
      })
    }
  }
}

const addPackage = (pkg: IBookingPackage) => {
  const existingSelection = getPackageSelection(pkg.uid)
  if (!existingSelection) {
    const minQuantity = getMinimumQuantity(pkg)
    bookingStep.value.selectedPackages.push({
      packageUid: pkg.uid,
      quantity: minQuantity
    })
    calculateTotal()
  }
}

const removePackage = (packageUid: string) => {
  const index = bookingStep.value.selectedPackages.findIndex(
    p => p.packageUid === packageUid
  )

  if (index !== -1) {
    bookingStep.value.selectedPackages.splice(index, 1)
  }

  if (bookingStep.value.selectedPackages.length === 0) {
    bookingStep.value.selectedExtraPackages = []
  }

  calculateTotal()
}

const updatePackageQuantity = (packageUid: string, newQuantity: number) => {
  const selection = getPackageSelection(packageUid)
  const pkg = booking.value?.package?.find(p => p.uid === packageUid)

  if (selection && pkg) {
    const minQuantity = getMinimumQuantity(pkg)
    // If new quantity is less than minimum, remove the package entirely
    if (newQuantity < minQuantity) {
      removePackage(packageUid)
    } else {
      selection.quantity = newQuantity
      calculateTotal()
    }
  }
}

const incrementPackageQuantity = (packageUid: string) => {
  const pkg = booking.value?.package?.find(p => p.uid === packageUid)
  if (pkg) {
    const currentQuantity = getPackageQuantity(packageUid)
    if (currentQuantity === 0) {
      // First time selecting this package, add minimum quantity
      addPackage(pkg)
    } else {
      const minQuantity = getMinimumQuantity(pkg)
      // Increment by minimum quantity amount
      updatePackageQuantity(packageUid, currentQuantity + minQuantity)
    }
  }
}

const decrementPackageQuantity = (packageUid: string) => {
  const pkg = booking.value?.package?.find(p => p.uid === packageUid)
  if (pkg) {
    const currentQuantity = getPackageQuantity(packageUid)
    const minQuantity = getMinimumQuantity(pkg)
    const newQuantity = currentQuantity - minQuantity

    if (newQuantity <= 0) {
      // Remove package when quantity reaches 0
      removePackage(packageUid)
    } else {
      // Decrement by minimum quantity amount
      updatePackageQuantity(packageUid, newQuantity)
    }
  }
}

watch(
  () => bookingStep.value.selectedPackages.map(p => ({ ...p })), // reactive tracking
  () => {
    // pastikan data booking sudah siap
    if (!booking.value?.package) return

    // hitung total qty dari paket utama (non additionalFee)
    const totalMainQty = bookingStep.value.selectedPackages.reduce(
      (sum, sel) => {
        const pkg = booking.value?.package.find(
          p => p.uid === sel.packageUid
        )
        if (pkg && !pkg.additionalFee) {
          return sum + sel.quantity
        }
        return sum
      },
      0
    )

    // update semua paket tambahan (additionalFee = true)
    booking.value.package
      .filter(pkg => pkg.additionalFee)
      .forEach((pkg) => {
        const existing = bookingStep.value.selectedPackages.find(
          p => p.packageUid === pkg.uid
        )
        if (totalMainQty > 0) {
          if (existing) {
            existing.quantity = totalMainQty
          } else {
            // kalau belum ada di selectedPackages, tambahkan otomatis
            bookingStep.value.selectedPackages.push({
              packageUid: pkg.uid,
              quantity: totalMainQty
            })
          }
        } else if (existing) {
          // Remove additionalFee package if no main packages selected
          const idx = bookingStep.value.selectedPackages.findIndex(
            p => p.packageUid === pkg.uid
          )
          if (idx !== -1) {
            bookingStep.value.selectedPackages.splice(idx, 1)
          }
        }
      })

    // hitung ulang total harga
    calculateTotal()
  },
  { deep: true }
)

const getSortedSelectedPackages = computed(() => {
  if (!booking.value?.package) return []

  return bookingStep.value.selectedPackages
    .map((selection) => {
      const pkg = booking.value?.package.find(
        p => p.uid === selection.packageUid
      )
      if (!pkg) return null
      return {
        ...selection,
        name: pkg.name,
        price: pkg.price,
        additionalFee: pkg.additionalFee
      }
    })
    .filter(Boolean) // hilangkan null
    .sort((a, b) => Number(a?.additionalFee) - Number(b?.additionalFee))
})

const toggleGuestForExtraPackage = (packageUid: string, guestIndex: number) => {
  let selection = bookingStep.value.selectedExtraPackages.find(
    p => p.packageUid === packageUid
  )

  if (!selection) {
    // Create new selection for this package
    selection = {
      packageUid,
      selectedGuestIndexes: [guestIndex]
    }
    bookingStep.value.selectedExtraPackages.push(selection)
  } else {
    // Toggle guest selection
    const guestIdx = selection.selectedGuestIndexes.indexOf(guestIndex)
    if (guestIdx > -1) {
      selection.selectedGuestIndexes.splice(guestIdx, 1)
      // Remove package selection if no guests selected
      if (selection.selectedGuestIndexes.length === 0) {
        const pkgIdx
          = bookingStep.value.selectedExtraPackages.findIndex(
            p => p.packageUid === packageUid
          )
        bookingStep.value.selectedExtraPackages.splice(pkgIdx, 1)
      }
    } else {
      selection.selectedGuestIndexes.push(guestIndex)
    }
  }
  calculateTotal()
}

const isGuestSelectedForPackage = (packageUid: string, guestIndex: number) => {
  const selection = bookingStep.value.selectedExtraPackages.find(
    p => p.packageUid === packageUid
  )
  return selection?.selectedGuestIndexes.includes(guestIndex) || false
}

const getSelectedGuestCount = (packageUid: string) => {
  const selection = bookingStep.value.selectedExtraPackages.find(
    p => p.packageUid === packageUid
  )
  return selection?.selectedGuestIndexes.length || 0
}

const selectPaymentMethod = (method: PaymentMethodWithCode) => {
  bookingStep.value.selectedPaymentMethod = method
}

const claimVoucher = async () => {
  if (!voucherCode.value.trim()) {
    voucherError.value = 'Please enter a voucher code'
    return
  }

  voucherLoading.value = true
  voucherError.value = ''

  try {
    const response = await $fetch<IVoucherResponse>(
      `${baseUrl}/Trip/trip.claim-voucher?code=${voucherCode.value}&trip=${bookingId.value}`
    )

    if (response.data.isValid) {
      appliedVoucher.value = {
        code: voucherCode.value,
        isValid: true,
        discount: response.data.discount,
        isApplied: true
      }
      voucherError.value = ''
    } else {
      // voucherError.value = 'Invalid voucher code'
      voucherError.value = response.meta.message || 'Invalid voucher code'
      appliedVoucher.value = null
    }
  } catch (error) {
    voucherError.value = 'Failed to validate voucher'
    appliedVoucher.value = null
    console.info(error)
  } finally {
    voucherLoading.value = false
  }
}

const removeVoucher = () => {
  appliedVoucher.value = null
  voucherCode.value = ''
  voucherError.value = ''
}

// Copy Virtual Account number to clipboard
const copyVirtualAccountHandler = async () => {
  if (!paymentResponse.value?.data.va.va) return
  await copyVirtualAccount(paymentResponse.value.data.va.va)
}

// Toggle guest details visibility
const toggleGuestDetails = () => {
  showGuestDetails.value = !showGuestDetails.value
}

// Confirm booking with proper parameter structure
const confirmBooking = async () => {
  // For credit card payment
  if (selectedPaymentType.value === 'credit_card') {
    // Process payment using the component's method
    if (!stepPaymentRef.value) {
      console.error('StepPayment component not found')
      return
    }

    // Validate that all required data is present
    if (!bookingId.value) {
      console.error('Trip schedule UID is empty')
      return
    }

    if (bookingStep.value.selectedPackages.length === 0) {
      console.error('No packages selected')
      return
    }

    if (guestForm.value.guests.length === 0) {
      console.error('No guests added')
      return
    }

    bookingLoading.value = true

    try {
      // Build payment data
      const paymentData = {
        tripScheduleUid: bookingId.value,
        package: bookingStep.value.selectedPackages.map(
          selection => ({
            uid: selection.packageUid,
            quantity: selection.quantity
          })
        ),
        extraPackage: bookingStep.value.selectedExtraPackages.map(
          selection => ({
            uid: selection.packageUid,
            quantity: selection.selectedGuestIndexes.length,
            guest: selection.selectedGuestIndexes.map(
              (guestIndex) => {
                const guest
                  = guestForm.value.guests[guestIndex]
                if (!guest) return ''
                const summary: GuestSummary = {
                  fullNameAsPerPassport:
                    guest.fullNameAsPerPassport,
                  whatsappNumber: guest.whatsappNumber
                }
                return generateGuestId(summary)
              }
            )
          })
        ),
        voucherCode: appliedVoucher.value?.code,
        customers: guestForm.value.guests.map((guest, index) => ({
          gender: guest.gender || 'Mr',
          name: guest.fullNameAsPerPassport,
          whatsappNumber: guest.whatsappNumber || '',
          nik: 0,
          email: guest.email || '',
          primaryGuest: index === 0
        }))
      }

      console.log('CC Payment Data:', paymentData)

      // Process the payment through the component, passing payment data
      const response
        = await stepPaymentRef.value.processPayment(paymentData)

      if (response && response.meta.status && response.data.redirect) {
        // Show loading modal with redirect
        paymentModalInvoiceId.value = response.data.invoice
        paymentModalRedirectUrl.value = response.data.redirect
        showPaymentLoadingModal.value = true
        paymentResponse.value = response

        console.log('Response:', response.data.redirect)
      } else {
        console.error('CC Payment failed:', response?.meta.message)
        alert(
          'Gagal memproses pembayaran. '
          + (response?.meta.message || 'Silakan coba lagi.')
        )
      }
    } catch (error) {
      console.error('CC Payment error:', error)
    } finally {
      bookingLoading.value = false
    }
    return
  }

  // For virtual account, proceed with existing logic
  if (
    bookingStep.value.selectedPackages.length === 0
    || !bookingStep.value.selectedPaymentMethod
  ) {
    console.error(
      'Validation failed - Packages:',
      bookingStep.value.selectedPackages.length > 0,
      'Payment Method:',
      !!bookingStep.value.selectedPaymentMethod
    )
    return
  }

  bookingLoading.value = true

  try {
    const bookingData: IBookingConfirmation = {
      tripScheduleUid: bookingId.value,
      package: bookingStep.value.selectedPackages.map(selection => ({
        uid: selection.packageUid,
        quantity: selection.quantity
      })),
      extraPackage: bookingStep.value.selectedExtraPackages.map(
        selection => ({
          uid: selection.packageUid,
          quantity: selection.selectedGuestIndexes.length,
          guest: selection.selectedGuestIndexes.reduce<string[]>(
            (acc, guestIndex) => {
              const guest = guestForm.value.guests[guestIndex]
              if (!guest) return acc

              const summary: GuestSummary = {
                fullNameAsPerPassport:
                  guest.fullNameAsPerPassport,
                whatsappNumber: guest.whatsappNumber
              }

              acc.push(generateGuestId(summary))

              return acc
            },
            []
          )
        })
      ),
      voucherCode: appliedVoucher.value?.code,
      customers: guestForm.value.guests.map((guest, index) => ({
        gender: guest.gender,
        name: guest.fullNameAsPerPassport,
        whatsappNumber: guest.whatsappNumber,
        nik: 0, // Default value as per requirement
        email: guest.email || '', // Email only for primary guest
        primaryGuest: index === 0
      })),
      paidOff: fullPayment.value,
      bankCode: bookingStep.value.selectedPaymentMethod.code
    }

    console.log('VA Payment Data:', bookingData)

    // Send request to create-payment API
    const response = await $fetch<IPaymentResponse>(
      `${baseUrl}/Booking/create-payment.va`,
      {
        method: 'POST',
        body: bookingData
      }
    )

    // Store payment response and show success dialog
    paymentResponse.value = response
    showSuccessDialog.value = true
  } catch (error) {
    // TODO: Handle booking error (show error message to user)
    console.error('Booking confirmation failed:', error)
  } finally {
    bookingLoading.value = false
  }
}

// Guest management functions are now handled automatically by watchEffect based on package quantity

// Email validator
const isValidEmail = (value: string) => {
  if (!value) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

// Name validator (minimum 3 characters)
const isValidName = (value: string) => !!value && value.trim().length >= 3

// Phone number validator (digits only, minimum 9 digits, maximum 15)
const isValidPhoneNumberFunc = (value: string) =>
  !!value && /^\d{9,15}$/.test(value)

const isStepValid = (step: number) => {
  switch (step) {
    case 1:
      return bookingStep.value.selectedPackages.length > 0
    case 2: {
      // Primary guest (first guest) must have all fields filled with valid format
      const primaryGuest = guestForm.value.guests[0]
      const primaryGuestValid = !!(
        primaryGuest
        && isValidName(primaryGuest.fullNameAsPerPassport)
        && isValidEmail(primaryGuest.email)
        && isValidPhoneNumberFunc(primaryGuest.whatsappNumber)
      )

      // All other guests must have at least basic info filled if they exist
      const otherGuestsValid = guestForm.value.guests
        .slice(1)
        .every(
          guest =>
            !!(
              isValidName(guest.fullNameAsPerPassport)
              && isValidPhoneNumberFunc(guest.whatsappNumber)
            )
        )

      return primaryGuestValid && otherGuestsValid
    }
    case 3:
      return true // Extra packages are optional
    case 4:
      // For credit card, component handles its own validation
      if (selectedPaymentType.value === 'credit_card') {
        return true // Payment method component will validate before token generation
      }
      // For virtual account, check if a payment method is selected
      return !!bookingStep.value.selectedPaymentMethod
    default:
      return false
  }
}

const canProceed = computed(() => isStepValid(bookingStep.value.currentStep))

// Initialize with all packages at their minimum quantities
// watchEffect(() => {
//   if (booking.value?.package && bookingStep.value.selectedPackages.length === 0) {
//     booking.value.package.forEach(pkg => {
//       addPackage(pkg)
//     })
//   }
// })

watchEffect(() => {
  // Sync guest forms with total guest count from all selected packages
  const currentGuestCount = guestForm.value.guests.length
  const requiredGuestCount = totalGuestCount.value

  if (currentGuestCount < requiredGuestCount) {
    // Add missing guest forms
    for (let i = currentGuestCount; i < requiredGuestCount; i++) {
      guestForm.value.guests.push({
        fullNameAsPerPassport: '',
        gender: 'Mr',
        email: '',
        whatsappNumber: ''
      })
    }
  } else if (currentGuestCount > requiredGuestCount) {
    // Remove extra guest forms (but keep at least 1)
    guestForm.value.guests = guestForm.value.guests.slice(
      0,
      Math.max(1, requiredGuestCount)
    )
  }

  calculateTotal()
})

// Reset scroll on page mount
onMounted(() => {
  window.scrollTo(0, 0)
})

useHead({
  title: `Book ${booking.value?.name || 'Trip'} - Peponi`,
  meta: [
    {
      name: 'description',
      content: `Book your adventure: ${booking.value?.name || 'Amazing trip'}`
    }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div
      v-if="pending"
      class="flex items-center justify-center h-[50vh]"
    >
      <span class="text-gray-500">Loading booking details...</span>
    </div>

    <div
      v-else-if="error"
      class="flex items-center justify-center h-[50vh]"
    >
      <span class="text-red-500">Error loading booking details</span>
    </div>

    <div
      v-else-if="!booking"
      class="flex items-center justify-center h-[50vh]"
    >
      <span class="text-gray-500">Booking not found</span>
    </div>

    <div
      v-else
      :class="['container mx-auto px-4 py-8', !isDesktop ? 'pb-32' : '']"
    >
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-primary mb-4">
          Secure Your Adventure
        </h1>

        <!-- Step Indicator -->
        <BookStepIndicator
          :current-step="bookingStep.currentStep"
          :step-titles="stepTitles"
          :can-proceed-from-current="isStepValid(bookingStep.currentStep)
          "
          @step-click="goToStep"
        />
      </div>

      <div :class="isDesktop ? 'grid lg:grid-cols-3 gap-8' : 'block'">
        <!-- Main Content -->
        <div :class="isDesktop ? 'lg:col-span-2' : 'w-full'">
          <div class="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 class="text-2xl font-bold mb-6">
              {{ stepTitles[bookingStep.currentStep - 1] }}
            </h2>

            <!-- Step 1: Package Selection -->
            <BookStepPackageSelection
              v-if="bookingStep.currentStep === 1"
              v-model:voucher-code="voucherCode"
              :data="booking!"
              :formatted-start-date="formattedStartDate"
              :formatted-end-date="formattedEndDate"
              :applied-voucher="appliedVoucher"
              :voucher-loading="voucherLoading"
              :voucher-error="voucherError"
              :can-remove-package="canRemovePackage"
              :get-package-quantity="getPackageQuantity"
              :increment-package-quantity="incrementPackageQuantity
              "
              :decrement-package-quantity="decrementPackageQuantity
              "
              :claim-voucher="claimVoucher"
              :remove-voucher="removeVoucher"
              :format-currency="formatCurrency"
            />

            <!-- Step 2: Guest Information -->
            <div
              v-if="bookingStep.currentStep === 2"
              class="space-y-8"
            >
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">
                  Guest Information
                </h3>
                <div class="text-sm text-gray-600">
                  {{ guestForm.guests.length }} of
                  {{ totalGuestCount }} guests
                </div>
              </div>
              <BookGuestFormList
                v-model:guests="guestForm.guests"
                :gender-options="genderOptions"
              />
            </div>

            <!-- Step 3: Extra Packages -->
            <div
              v-if="bookingStep.currentStep === 3"
              class="space-y-6"
            >
              <BookExtraPackageSelector
                :extra-packages="booking.extraPackage"
                :guests="guestForm.guests"
                :is-guest-selected-for-package="isGuestSelectedForPackage
                "
                :get-selected-guest-count="getSelectedGuestCount
                "
                :format-currency="formatCurrency"
                variant="default"
                :show-caption="true"
                @toggle="toggleGuestForExtraPackage"
              />
            </div>

            <!-- Payment Step -->
            <template v-if="bookingStep.currentStep === 4">
              <BookStepPayment
                ref="stepPaymentRef"
                v-model:full-payment="fullPayment"
                v-model:selected-payment-type="selectedPaymentType
                "
                :booking="booking!"
                :formatted-start-date="formattedStartDate"
                :formatted-end-date="formattedEndDate"
                :total-guest-count="totalGuestCount"
                :guests="guestForm.guests"
                :show-guest-details="showGuestDetails"
                :booking-step="bookingStep"
                :applied-voucher="appliedVoucher"
                :format-currency="formatCurrency"
                :final-payment-amount="finalPaymentAmount"
                :total-amount-after-discount="totalAmountAfterDiscount
                "
                :down-payment="booking.downPayment || 0"
                :payment-methods="paymentMethods"
                :va-list-pending="vaListPending"
                :select-payment-method="selectPaymentMethod"
                :toggle-guest-details="toggleGuestDetails"
                :guest-email="guestForm.guests[0]?.email || ''"
                :guest-phone-number="guestForm.guests[0]?.whatsappNumber || ''
                "
              />
            </template>
          </div>
        </div>

        <!-- Booking Summary Sidebar - Desktop Only -->
        <div
          v-if="isDesktop"
          class="lg:col-span-1"
        >
          <div class="bg-white rounded-2xl border border-gray-200 p-6 sticky top-20">
            <h3 class="text-xl font-bold mb-4">
              {{ booking.name }}
            </h3>

            <!-- Trip Images -->
            <!-- <div v-if="booking.bannerList?.length" class="mb-4">
              <div class="aspect-video rounded-lg overflow-hidden bg-gray-200">
                <img
                  :src="`/trip-banners/${booking.bannerList[0]}.jpg`"
                  :alt="booking.name"
                  class="w-full h-full object-cover"
                  @error="if ($event.target) $event.target.src = '/placeholder-trip.jpg'"
                />
              </div>
            </div> -->

            <div class="space-y-4">
              <div class="border-b pb-4">
                <h4 class="font-semibold mb-2">
                  Rincian Biaya
                </h4>

                <!-- Selected Packages -->
                <div
                  v-if="bookingStep.selectedPackages.length"
                  class="space-y-2"
                >
                  <h5 class="text-lg font-bold">
                    Paket
                    <span v-if="bookingStep.currentStep === 4">({{
                      fullPayment
                        ? "Full Payment"
                        : "Down Payment"
                    }})</span>
                  </h5>
                  <div
                    v-for="selection in getSortedSelectedPackages"
                    :key="selection?.packageUid"
                    class="space-y-1"
                  >
                    <div class="flex justify-between">
                      <span>{{ selection?.name }}</span>
                    </div>
                    <div class="flex justify-between text-sm text-gray-600">
                      <span>{{ selection?.quantity }} x
                        Orang</span>
                      <span>{{
                        formatCurrency(
                          selection?.price
                            || selection?.quantity
                            ? selection?.price
                              * selection?.quantity
                            : 0
                        )
                      }}</span>
                    </div>
                  </div>
                </div>

                <!-- Extra Packages -->
                <div
                  v-if="
                    bookingStep.selectedExtraPackages.length
                  "
                  class="mt-2 space-y-2"
                >
                  <h5 class="text-lg font-bold">
                    Layanan Extra
                  </h5>
                  <div
                    v-for="selection in bookingStep.selectedExtraPackages"
                    :key="selection.packageUid"
                    class="flex justify-between text-sm"
                  >
                    <span>
                      {{
                        booking.extraPackage?.find(
                          (p) =>
                            p.uid
                            === selection.packageUid
                        )?.name
                      }}
                      ({{
                        selection.selectedGuestIndexes
                          .length
                      }}x)
                    </span>
                    <span>
                      {{
                        formatCurrency(
                          (booking.extraPackage?.find(
                            (p) =>
                              p.uid
                              === selection.packageUid
                          )?.price || 0)
                            * selection
                              .selectedGuestIndexes
                              .length
                        )
                      }}
                    </span>
                  </div>
                </div>

                <!-- Voucher Discount in Sidebar -->
                <div
                  v-if="appliedVoucher?.isApplied"
                  class="mt-2"
                >
                  <h5 class="text-lg font-bold">
                    Diskon
                  </h5>
                  <div class="flex justify-between text-sm text-green-600">
                    <span>Voucher ({{
                      appliedVoucher.code
                    }})</span>
                    <span>-{{
                      formatCurrency(
                        appliedVoucher.discount
                          * totalGuestCount
                      )
                    }}</span>
                  </div>
                </div>

                <!-- Payment method fee in Sidebar -->
                <div
                  v-if="
                    bookingStep.selectedPaymentMethod?.fee
                  "
                  class="mt-2"
                >
                  <h5 class="text-lg font-bold">
                    Service Fee
                  </h5>
                  <div class="flex justify-between text-sm">
                    <span>{{
                      bookingStep.selectedPaymentMethod
                        .name
                    }}</span>
                    <span>{{
                      formatCurrency(
                        bookingStep
                          .selectedPaymentMethod.fee
                      )
                    }}</span>
                  </div>
                </div>
              </div>

              <div class="flex justify-between font-bold text-lg">
                <span>Total Biaya</span>
                <span>{{
                  formatCurrency(
                    bookingStep.currentStep === 4
                      ? finalPaymentAmount
                      : totalAmountAfterDiscount
                  )
                }}</span>
              </div>

              <div
                v-if="booking.downPayment"
                class="text-sm text-gray-600"
              >
                <span>Down Payment:
                  {{
                    formatCurrency(booking.downPayment)
                  }}</span>
              </div>

              <!-- Guest Details Section -->
              <div
                v-if="guestForm.guests.length > 0"
                class="border-t pt-4"
              >
                <button
                  class="w-full flex items-center justify-between text-left hover:text-primary transition-colors cursor-pointer"
                  @click="toggleGuestDetails"
                >
                  <h4 class="font-semibold">
                    Rincian peserta
                  </h4>
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-600">Detail peserta</span>
                    <svg
                      :class="[
                        'w-4 h-4 transition-transform duration-200',
                        showGuestDetails
                          ? 'rotate-180'
                          : ''
                      ]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                <div
                  v-if="showGuestDetails"
                  class="mt-3 space-y-3 overflow-hidden transition-all duration-300"
                >
                  <div
                    v-for="(
                      guest, index
                    ) in guestForm.guests"
                    :key="index"
                    class="bg-gray-50 rounded-lg p-3"
                  >
                    <div class="space-y-2">
                      <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Nama & Gender</span>
                        <span class="text-sm font-medium">{{
                          guest.fullNameAsPerPassport
                        }}
                          ({{ guest.gender }})</span>
                      </div>
                      <div
                        v-if="guest.email"
                        class="flex justify-between"
                      >
                        <span class="text-sm text-gray-600">Email</span>
                        <span class="text-sm font-medium">{{ guest.email }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Navigation Buttons -->
              <div class="mt-6 space-y-3">
                <UButton
                  v-if="bookingStep.currentStep < 4"
                  size="lg"
                  block
                  :disabled="!canProceed"
                  :ui="{
                    base: !canProceed
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer'
                  }"
                  @click="nextStep"
                >
                  Lanjutkan
                </UButton>
                <UButton
                  v-else
                  size="lg"
                  block
                  :disabled="!canProceed || bookingLoading"
                  :loading="bookingLoading"
                  :ui="{
                    base:
                      !canProceed || bookingLoading
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                  }"
                  @click="confirmBooking"
                >
                  {{
                    bookingLoading
                      ? "Processing..."
                      : "Selesaikan Booking"
                  }}
                </UButton>

                <UButton
                  v-if="bookingStep.currentStep > 1"
                  variant="outline"
                  size="lg"
                  block
                  class="cursor-pointer"
                  @click="prevStep"
                >
                  Sebelumnya
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BookMobileSummaryDrawer
      v-if="!isDesktop"
      v-model:open="summaryState"
      :booking="booking!"
      :booking-step="bookingStep"
      :applied-voucher="appliedVoucher"
      :format-currency="formatCurrency"
      :total-amount-after-discount="totalAmountAfterDiscount"
      :final-payment-amount="finalPaymentAmount"
      :full-payment="fullPayment"
      :can-proceed="canProceed"
      :booking-loading="bookingLoading"
      :next-step="nextStep"
      :confirm-booking="confirmBooking"
    />

    <!-- Payment Loading Modal (CC) -->
    <PaymentLoadingModal
      :is-open="showPaymentLoadingModal"
      :invoice-id="paymentModalInvoiceId"
      :redirect-url="paymentModalRedirectUrl"
    />

    <!-- Payment Success Dialog -->
    <UtilDialog
      v-model="showSuccessDialog"
      title="🎉 Booking Berhasil!"
      description="Pembayaran Anda telah berhasil dibuat. Silakan selesaikan pembayaran sesuai instruksi."
      size="lg"
      :closable="true"
      :show-footer="true"
      @close="router.push('/')"
    >
      <template #footer="{ close }">
        <div class="flex justify-center">
          <UButton
            to="/"
            size="lg"
            class="px-8"
            @click="close"
          >
            Tutup
          </UButton>
        </div>
      </template>

      <div
        v-if="paymentResponse"
        class="space-y-6"
      >
        <!-- Success Icon and Message -->
        <div class="text-center">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              class="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p class="text-gray-600 leading-relaxed">
            Bersiaplah untuk petualangan yang menakjubkan! Detail
            pembayaran telah dikirim ke email Anda.
          </p>
        </div>

        <!-- Copy Feedback Notification -->
        <div
          v-if="showCopyFeedback"
          class="bg-green-100 border border-green-200 rounded-lg p-3 text-center transition-all duration-300"
          :class="showCopyFeedback
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95'
          "
        >
          <div class="flex items-center justify-center text-green-700">
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span class="text-sm font-medium">{{
              copyFeedback
            }}</span>
          </div>
        </div>

        <!-- Invoice and Payment Details -->
        <div class="space-y-4">
          <!-- Invoice Number -->
          <div class="bg-green-50 rounded-xl p-4 border border-green-200">
            <h4 class="text-sm font-semibold text-green-800 mb-2">
              Invoice Number
            </h4>
            <p class="text-xl font-mono font-bold text-green-700">
              {{ paymentResponse.data.invoice }}
            </p>
          </div>

          <!-- Bank Transfer Details -->
          <div class="bg-gray-50 rounded-xl p-4">
            <h4 class="text-sm font-semibold text-gray-700 mb-3">
              Detail Transfer Bank
            </h4>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">Bank</span>
                <span class="font-semibold">{{
                  paymentResponse.data.va.bankCode
                }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Virtual Account</span>
                <div class="flex items-center gap-2">
                  <span class="font-mono font-semibold">{{
                    paymentResponse.data.va.va
                  }}</span>
                  <button
                    class="text-gray-500 hover:text-primary transition-colors p-1 rounded"
                    title="Copy Virtual Account"
                    @click="copyVirtualAccountHandler"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Nama Penerima</span>
                <span class="font-semibold">{{
                  paymentResponse.data.va.custName
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Jumlah Transfer</span>
                <span class="font-bold text-lg">{{
                  formatCurrency(
                    paymentResponse.data.va.amount
                  )
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Berlaku Hingga</span>
                <span class="font-semibold">
                  {{
                    new Date(
                      paymentResponse.data.va.expired
                    ).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })
                  }}
                </span>
              </div>
            </div>
          </div>

          <!-- Important Notes -->
          <PaymentNextSteps />
        </div>
      </div>
    </UtilDialog>
  </div>
</template>
