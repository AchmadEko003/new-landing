<template>
  <UCard>
    <template #header>
      <h2 class="text-xl font-semibold">
        Pilih Metode Pembayaran
      </h2>
    </template>

    <div class="space-y-6">
      <!-- Payment Method Selection Buttons -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Virtual Account Button -->
        <button
          :disabled="newPackageSelectionsTotal === 0"
          :class="[
            'p-6 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center gap-3 min-h-[140px]',
            newPackageSelectionsTotal === 0
              ? 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
              : selectedPaymentType === 'virtual_account'
                ? 'border-primary bg-primary/5 cursor-pointer'
                : 'border-gray-200 bg-white hover:border-gray-300 cursor-pointer'
          ]"
          @click="switchPaymentType('virtual_account')"
        >
          <UIcon
            name="i-heroicons-check-circle"
            :class="[
              'w-8 h-8 transition-colors',
              newPackageSelectionsTotal === 0
                ? 'text-gray-300'
                : selectedPaymentType === 'virtual_account'
                  ? 'text-primary'
                  : 'text-gray-400'
            ]"
          />
          <span
            :class="[
              'font-medium text-center',
              newPackageSelectionsTotal === 0
                ? 'text-gray-400'
                : selectedPaymentType === 'virtual_account'
                  ? 'text-primary'
                  : 'text-gray-600'
            ]"
          >
            Virtual Account
          </span>
        </button>

        <!-- Credit Card Button -->
        <button
          :disabled="newPackageSelectionsTotal === 0"
          :class="[
            'p-6 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center gap-3 min-h-[140px]',
            newPackageSelectionsTotal === 0
              ? 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
              : selectedPaymentType === 'credit_card'
                ? 'border-primary bg-primary/5 cursor-pointer'
                : 'border-gray-200 bg-white hover:border-gray-300 cursor-pointer'
          ]"
          @click="switchPaymentType('credit_card')"
        >
          <UIcon
            name="i-heroicons-credit-card"
            :class="[
              'w-8 h-8 transition-colors',
              newPackageSelectionsTotal === 0
                ? 'text-gray-300'
                : selectedPaymentType === 'credit_card'
                  ? 'text-primary'
                  : 'text-gray-400'
            ]"
          />
          <span
            :class="[
              'font-medium text-center',
              newPackageSelectionsTotal === 0
                ? 'text-gray-400'
                : selectedPaymentType === 'credit_card'
                  ? 'text-primary'
                  : 'text-gray-600'
            ]"
          >
            Kartu Kredit
          </span>
        </button>
      </div>

      <!-- Virtual Account Section -->
      <div
        v-if="selectedPaymentType === 'virtual_account'"
        class="space-y-4 pt-2"
      >
        <p class="text-sm text-gray-600 font-medium">
          Pilih bank untuk transfer virtual account:
        </p>

        <div
          v-if="vaListPending"
          class="flex justify-center py-4"
        >
          <svg
            class="w-6 h-6 text-primary animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>

        <div
          v-else
          class="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          <button
            v-for="method in paymentMethods"
            :key="method.id"
            :class="[
              'p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2',
              selectedPaymentMethod?.id === method.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-primary'
            ]"
            @click="selectPaymentMethod(method)"
          >
            <img
              :src="method.icon"
              :alt="method.name"
              class="h-8 object-contain"
              @error="($event.target as HTMLImageElement).src = '/placeholder-bank.png'"
            >
            <span class="text-sm font-medium text-center">{{ method.name }}</span>
          </button>
        </div>
      </div>

      <!-- Credit Card Section -->
      <div
        v-if="selectedPaymentType === 'credit_card'"
        class="space-y-4 pt-2"
      >
        <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div class="flex items-start gap-2">
            <UIcon
              name="i-heroicons-information-circle"
              class="w-5 h-5 text-amber-600 mt-0.5 shrink-0"
            />
            <p class="text-sm text-amber-800">
              Pembayaran kartu kredit Anda akan diproses secara aman melalui gateway pembayaran terpercaya.
            </p>
          </div>
        </div>

        <div class="space-y-4">
          <!-- Cardholder Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Pemegang Kartu</label>
            <UInput
              v-model="creditCardForm.cardName"
              placeholder="John Doe"
              class="w-full"
              @blur="creditCardForm.cardName = creditCardForm.cardName.toUpperCase()"
            />
          </div>

          <!-- Card Number -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nomor Kartu</label>
            <UInput
              v-model="creditCardForm.cardNumber"
              placeholder="1234 5678 9012 3456"
              maxlength="19"
              class="w-full"
            />
            <p class="text-xs text-gray-500 mt-1">
              Masukkan 16 digit nomor kartu
            </p>
          </div>

          <!-- Expiry and CVV -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Berlaku Hingga</label>
              <UInput
                v-model="creditCardForm.expiryDate"
                placeholder="MM/YY"
                maxlength="5"
                class="w-full"
              />
              <p class="text-xs text-gray-500 mt-1">
                Format: MM/YY
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">CVV</label>
              <UInput
                v-model="creditCardForm.cvv"
                placeholder="123"
                type="password"
                maxlength="4"
                class="w-full"
              />
              <p class="text-xs text-gray-500 mt-1">
                3-4 digit belakang kartu
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Proceed Button -->
      <div
        v-if="selectedPaymentType"
        class="pt-4 border-t"
      >
        <UButton
          :loading="isLoadingCheckout"
          :disabled="newPackageSelectionsTotal === 0 || (!selectedPaymentMethod && selectedPaymentType === 'virtual_account') || (selectedPaymentType === 'credit_card' && !isCreditCardFormValid)"
          block
          size="lg"
          :class="[
            newPackageSelectionsTotal === 0 || (!selectedPaymentMethod && selectedPaymentType === 'virtual_account') || (selectedPaymentType === 'credit_card' && !isCreditCardFormValid)
              ? 'bg-gray-300! text-white cursor-not-allowed opacity-70'
              : 'bg-primary hover:bg-primary/90'
          ]"
          @click="proceedToCheckout"
        >
          Lanjut Pembayaran
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { IPaymentMethod } from '~~/shared/interface/IDetailBook'
import type { IVaListResponse } from '~~/shared/interface/IVaList'
import { formatCardNumber, formatExpiryDate } from '~~/shared/script/booking-utils'

const toast = useToast()
const baseUrl = useRuntimeConfig().public.apiBase

interface PaymentMethodWithCode extends Omit<IPaymentMethod, 'type'> {
  code: string
  type: 'bank' | 'credit_card'
  fee: number
}

const props = defineProps<{
  newPackageSelectionsTotal: number
  newPackageSelections: any[]
  bookingData: any
  packageGuestSelections: Map<string, Set<number>>
  lockedSelections: Map<string, Set<number>>
}>()

const emit = defineEmits<{
  'payment-success': [response: any]
  'payment-error': [error: string]
}>()

// Payment state
const selectedPaymentType = ref<'credit_card' | 'virtual_account' | null>(null)
const selectedPaymentMethod = ref<PaymentMethodWithCode | null>(null)
const isLoadingCheckout = ref(false)

// Credit card form state
const creditCardForm = ref({
  cardName: '',
  cardNumber: '',
  expiryDate: '',
  cvv: ''
})

// Watch for credit card input changes to format them
watch(() => creditCardForm.value.cardNumber, (newValue) => {
  creditCardForm.value.cardNumber = formatCardNumber(newValue)
})

watch(() => creditCardForm.value.expiryDate, (newValue) => {
  creditCardForm.value.expiryDate = formatExpiryDate(newValue)
})

// Fetch VA list
const { data: vaListData, pending: vaListPending } = await useFetch<IVaListResponse>(`${baseUrl}/Booking/payment-list`)

const paymentMethods = computed((): PaymentMethodWithCode[] => {
  const methods: PaymentMethodWithCode[] = []

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

// Validate credit card form
const isCreditCardFormValid = computed(() => {
  const form = creditCardForm.value

  if (!form.cardName.trim()) return false
  if (!form.cardNumber.trim()) return false
  if (!form.expiryDate.trim()) return false
  if (!form.cvv.trim()) return false

  if (form.cardNumber.replace(/\s/g, '').length !== 16) return false
  if (form.expiryDate.length !== 5) return false
  if (form.cvv.length < 3 || form.cvv.length > 4) return false

  return true
})

const switchPaymentType = (type: 'credit_card' | 'virtual_account') => {
  selectedPaymentType.value = type

  // Reset payment data when switching payment types
  if (type === 'virtual_account') {
    // Switching to VA: reset credit card form
    creditCardForm.value = {
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }
  } else if (type === 'credit_card') {
    // Switching to CC: reset VA selection
    selectedPaymentMethod.value = null
  }
}

const selectPaymentMethod = (method: PaymentMethodWithCode) => {
  selectedPaymentMethod.value = method
}

// Helper function to format guest data: last 4 digits of whatsapp + first 3 letters of name (uppercase)
const formatGuestId = (whatsappNumber: string, name: string): string => {
  const last4Digits = whatsappNumber.slice(-4)
  const first3Letters = name.substring(0, 3).toUpperCase()
  return `${last4Digits}${first3Letters}`
}

const proceedToCheckout = async () => {
  if (!props.bookingData) {
    toast.add({
      title: 'Error',
      description: 'Booking data tidak ditemukan',
      color: 'error'
    })
    return
  }

  // Validate payment method selection
  if (selectedPaymentType.value === 'virtual_account') {
    if (!selectedPaymentMethod.value) {
      toast.add({
        title: 'Error',
        description: 'Silakan pilih bank terlebih dahulu',
        color: 'error'
      })
      return
    }

    // Proceed with VA payment
    await proceedWithVirtualAccount()
  } else if (selectedPaymentType.value === 'credit_card') {
    if (!isCreditCardFormValid.value) {
      toast.add({
        title: 'Error',
        description: 'Silakan lengkapi data kartu kredit',
        color: 'error'
      })
      return
    }

    // Proceed with credit card payment
    await proceedWithCreditCard()
  }
}

const proceedWithCreditCard = async () => {
  isLoadingCheckout.value = true

  try {
    if (!props.bookingData) {
      throw new Error('Missing booking data')
    }

    // Parse card details
    const cardNumberDigits = creditCardForm.value.cardNumber.replace(/\s/g, '')
    const [month, year] = creditCardForm.value.expiryDate.split('/')

    // Prepare customers data
    const customers = props.bookingData.guest.map((guest: any) => ({
      gender: guest.gender || '',
      name: guest.name || '',
      whatsappNumber: guest.whatsapp_number || guest.whatsappNumber || ''
    }))

    // Prepare extra package data with formatted guest IDs
    const extraPackage: Array<{
      uid: string
      quantity: number
      guest: string[]
    }> = []

    props.packageGuestSelections.forEach((guestSet, uid) => {
      const lockedSet = props.lockedSelections.get(uid) || new Set()
      const nonLockedGuests = [...guestSet].filter(i => !lockedSet.has(i))

      if (nonLockedGuests.length > 0) {
        const guestIds = nonLockedGuests.map((i) => {
          const guest = props.bookingData.guest[i]
          return formatGuestId(
            guest?.whatsapp_number || guest?.whatsappNumber || '',
            guest?.name || ''
          )
        })

        extraPackage.push({
          uid,
          quantity: guestIds.length,
          guest: guestIds
        })
      }
    })

    // Prepare final payload for CC
    const payload = {
      bookNumber: props.bookingData.noPesanan,
      extraPackage,
      customers,
      cardHolderName: creditCardForm.value.cardName,
      cardNumber: cardNumberDigits,
      cardMonth: parseInt(month || '0'),
      cardYear: parseInt(year || '0'),
      cardCvn: parseInt(creditCardForm.value.cvv),
      email: props.bookingData.guest[0]?.email || '',
      phoneNumber: props.bookingData.guest[0]?.whatsapp_number || props.bookingData.guest[0]?.whatsappNumber || ''
    }

    console.log('CC Payment Payload:', payload)

    // Hit the CC payment API
    const response = await $fetch('http://103.189.234.243/api-be/Booking/create-additional-cc', {
      method: 'POST',
      body: payload
    })

    console.log('CC Payment Response:', response)

    if (response) {
      toast.add({
        title: 'Success',
        description: 'Pembayaran berhasil diproses',
        color: 'success'
      })
      emit('payment-success', response)
    }
  } catch (error) {
    console.error('CC Payment Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Gagal memproses pembayaran'

    toast.add({
      title: 'Payment Error',
      description: errorMessage,
      color: 'error'
    })

    emit('payment-error', errorMessage)
  } finally {
    isLoadingCheckout.value = false
  }
}

const proceedWithVirtualAccount = async () => {
  isLoadingCheckout.value = true

  try {
    if (!props.bookingData || !selectedPaymentMethod.value) {
      throw new Error('Missing required data')
    }

    // Prepare customers data
    const customers = props.bookingData.guest.map((guest: any) => ({
      gender: guest.gender || '',
      name: guest.name || '',
      whatsappNumber: guest.whatsapp_number || guest.whatsappNumber || ''
    }))

    // Prepare extra package data with formatted guest IDs
    const extraPackage: Array<{
      uid: string
      quantity: number
      guest: string[]
    }> = []

    props.packageGuestSelections.forEach((guestSet, uid) => {
      const lockedSet = props.lockedSelections.get(uid) || new Set()
      const nonLockedGuests = [...guestSet].filter(i => !lockedSet.has(i))

      if (nonLockedGuests.length > 0) {
        const guestIds = nonLockedGuests.map((i) => {
          const guest = props.bookingData.guest[i]
          return formatGuestId(
            guest?.whatsapp_number || guest?.whatsappNumber || '',
            guest?.name || ''
          )
        })

        extraPackage.push({
          uid,
          quantity: guestIds.length,
          guest: guestIds
        })
      }
    })

    // Prepare final payload
    const payload = {
      bookNumber: props.bookingData.noPesanan,
      extraPackage,
      customers,
      bankCode: selectedPaymentMethod.value.code
    }

    console.log('VA Payment Payload:', payload)

    // Hit the API
    const response = await $fetch('http://103.189.234.243/api-be/Booking/create-additional-va', {
      method: 'POST',
      body: payload
    })

    console.log('VA Payment Response:', response)

    if (response) {
      toast.add({
        title: 'Success',
        description: 'Pembayaran berhasil diproses',
        color: 'success'
      })
      emit('payment-success', response)
    }
  } catch (error) {
    console.error('VA Payment Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Gagal memproses pembayaran'

    toast.add({
      title: 'Payment Error',
      description: errorMessage,
      color: 'error'
    })

    emit('payment-error', errorMessage)
  } finally {
    isLoadingCheckout.value = false
  }
}
</script>
