<script lang="ts" setup>
import type { IDetailBook, IGuestForm, IPaymentMethod } from '~~/shared/interface/IDetailBook'
import type { IVoucher } from '~~/shared/interface/IVoucher'
import type { IXenditTokenRequest, ICCPaymentResponse } from '~~/shared/interface/IXenditPayment'

type PaymentMethodWithCode = Omit<IPaymentMethod, 'type'> & {
  code: string
  type: 'bank' | 'credit_card'
  fee: number
}

type SelectedPackage = {
  packageUid: string
  quantity: number
}

type SelectedExtraPackage = {
  packageUid: string
  selectedGuestIndexes: number[]
}

interface BookingStepSnapshot {
  totalAmount: number
  selectedPackages: SelectedPackage[]
  selectedExtraPackages: SelectedExtraPackage[]
  selectedPaymentMethod?: PaymentMethodWithCode
}

type CreditCardForm = {
  cardName: string
  cardNumber: string
  expiryDate: string
  cvv: string
}

const props = defineProps<{
  booking: IDetailBook
  formattedStartDate: string
  formattedEndDate: string
  totalGuestCount: number
  guests: IGuestForm['guests']
  showGuestDetails: boolean
  bookingStep: BookingStepSnapshot
  appliedVoucher: IVoucher | null
  formatCurrency: (value: number) => string
  finalPaymentAmount: number
  totalAmountAfterDiscount: number
  downPayment: number
  paymentMethods: PaymentMethodWithCode[]
  vaListPending: boolean
  selectPaymentMethod: (method: PaymentMethodWithCode) => void
  toggleGuestDetails: () => void
  guestEmail?: string
  guestPhoneNumber?: string
}>()

const emit = defineEmits<{
  tokenGenerated: [tokenId: string]
}>()

const baseUrl = useRuntimeConfig().public.apiBase
const fullPayment = defineModel<boolean>('fullPayment', { default: false })
const selectedPaymentType = defineModel<'credit_card' | 'virtual_account' | null>('selectedPaymentType', {
  default: null
})

// Credit card form state
const creditCardForm = ref<CreditCardForm>({
  cardName: '',
  cardNumber: '',
  expiryDate: '',
  cvv: ''
})

// Payment state
const isProcessing = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const ccTokenId = ref<string | null>(null)

// Xendit reference
declare global {
  interface Window {
    Xendit: any
  }
}

// Helper function to format credit card number (spaces every 4 digits)
const formatCardNumber = (value: string): string => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  const matches = v.match(/\d{4,16}/g)
  const match = (matches && matches[0]) || ''
  const parts = []

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }

  if (parts.length) {
    return parts.join(' ')
  } else {
    return value
  }
}

// Helper function to format expiry date (MM/YY)
const formatExpiryDate = (value: string): string => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  if (v.length >= 2) {
    return `${v.slice(0, 2)}/${v.slice(2, 4)}`
  }
  return v
}

// Watch for card number input changes
watch(() => creditCardForm.value.cardNumber, (newValue) => {
  creditCardForm.value.cardNumber = formatCardNumber(newValue)
})

// Watch for expiry date input changes
watch(() => creditCardForm.value.expiryDate, (newValue) => {
  creditCardForm.value.expiryDate = formatExpiryDate(newValue)
})

// Validate card details
const validateCardDetails = (): boolean => {
  if (!creditCardForm.value.cardName.trim()) {
    errorMessage.value = 'Nama pemegang kartu tidak boleh kosong'
    return false
  }

  const cardNumber = creditCardForm.value.cardNumber.replace(/\s/g, '')
  if (cardNumber.length < 13 || cardNumber.length > 19) {
    errorMessage.value = 'Nomor kartu tidak valid (13-19 digit)'
    return false
  }

  if (!creditCardForm.value.expiryDate || creditCardForm.value.expiryDate.length !== 5) {
    errorMessage.value = 'Format tanggal kedaluwarsa tidak valid (MM/YY)'
    return false
  }

  if (creditCardForm.value.cvv.length < 3 || creditCardForm.value.cvv.length > 4) {
    errorMessage.value = 'CVV tidak valid (3-4 digit)'
    return false
  }

  return true
}

// Generate Xendit token using client-side tokenization
const generateToken = async (): Promise<string | null> => {
  if (!validateCardDetails()) {
    return null
  }

  isProcessing.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    // Check if Xendit JS library is loaded
    if (typeof window !== 'undefined' && window.Xendit) {
      // Use client-side tokenization (more secure)
      const [month, year] = creditCardForm.value.expiryDate.split('/')
      if (!month || !year) {
        errorMessage.value = 'Format tanggal kedaluwarsa tidak valid'
        isProcessing.value = false
        return null
      }

      try {
        // Get public key from runtime config
        const config = useRuntimeConfig()
        const publicKey = config.public.xenditPublicKey

        // Tokenize using Xendit JS library (client-side)
        const nameParts = creditCardForm.value.cardName.trim().split(' ')
        const firstName = nameParts[0] || ''
        const lastName = nameParts.slice(1).join(' ') || firstName

        // Format phone number to E.164 format (for Xendit: +[country][number])
        const formatPhoneNumber = (phone: string): string => {
          if (!phone) return ''
          let formatted = phone.replace(/\D/g, '') // Remove non-digits
          if (formatted.startsWith('0')) {
            formatted = '62' + formatted.slice(1) // Convert 0 to 62 for Indonesia
          }
          if (!formatted.startsWith('+')) {
            formatted = '+' + formatted
          }
          return formatted
        }

        const tokenPayload: any = {
          amount: props.finalPaymentAmount,
          card_number: creditCardForm.value.cardNumber.replace(/\s/g, ''),
          card_exp_month: month,
          card_exp_year: '20' + year,
          card_cvn: creditCardForm.value.cvv,
          card_holder_first_name: firstName,
          card_holder_last_name: lastName,
          is_multiple_use: false
        }

        // Add email or phone if available
        if (props.guestEmail) {
          tokenPayload.card_holder_email = props.guestEmail
        }
        if (props.guestPhoneNumber) {
          const formattedPhone = formatPhoneNumber(props.guestPhoneNumber)
          if (formattedPhone) {
            tokenPayload.card_holder_phone_number = formattedPhone
          }
        }

        const tokenResponse = await new Promise<{ id: string }>((resolve, reject) => {
          window.Xendit.setPublishableKey(publicKey)
          window.Xendit.card.createToken(
            tokenPayload,
            (error: any, data: any) => {
              if (error) {
                reject(error)
              } else {
                resolve(data)
              }
            }
          )
        })

        if (tokenResponse.id) {
          successMessage.value = `✅ Token berhasil dibuat: ${tokenResponse.id}`
          console.log('✅ Token CC Generated:', tokenResponse.id)
          ccTokenId.value = tokenResponse.id
          emit('tokenGenerated', tokenResponse.id)
          isProcessing.value = false
          return tokenResponse.id
        } else {
          errorMessage.value = 'Gagal membuat token kartu'
          isProcessing.value = false
          return null
        }
      } catch (xenditError: any) {
        console.error('Xendit JS error:', xenditError)
        errorMessage.value = xenditError.message || 'Gagal membuat token kartu'
        isProcessing.value = false
        return null
      }
    } else {
      // Fallback: use server-side tokenization if JS library not loaded
      const [month, year] = creditCardForm.value.expiryDate.split('/')
      if (!month || !year) {
        errorMessage.value = 'Format tanggal kedaluwarsa tidak valid'
        isProcessing.value = false
        return null
      }

      const cardYear = parseInt('20' + year, 10)

      const tokenRequest: IXenditTokenRequest = {
        cardNumber: creditCardForm.value.cardNumber.replace(/\s/g, ''),
        cardHolderName: creditCardForm.value.cardName,
        expirationMonth: parseInt(month, 10),
        expirationYear: cardYear,
        cvv: creditCardForm.value.cvv
      }

      const response = await $fetch<ICCPaymentResponse>('/api/book/tokenize-cc', {
        method: 'POST',
        body: tokenRequest
      })

      if (response.meta.status && response.data.tokenId) {
        successMessage.value = `✅ Token berhasil dibuat: ${response.data.tokenId}`
        console.log('✅ Token CC Generated (Fallback):', response.data.tokenId)
        ccTokenId.value = response.data.tokenId
        emit('tokenGenerated', response.data.tokenId)
        isProcessing.value = false
        return response.data.tokenId
      } else {
        errorMessage.value = response.meta.message || 'Gagal membuat token'
        isProcessing.value = false
        return null
      }
    }
  } catch (error) {
    console.error('Token generation error:', error)
    errorMessage.value = 'Terjadi kesalahan saat membuat token kartu'
    isProcessing.value = false
    return null
  }
}

// Clear messages when user types
watch(
  () => creditCardForm.value,
  () => {
    if (errorMessage.value || successMessage.value) {
      errorMessage.value = ''
      successMessage.value = ''
    }
  },
  { deep: true }
)

// Expose method to parent component for processing
defineExpose({
  generateToken,
  validateCardDetails,
  processPayment: async (paymentData?: any) => {
    if (!validateCardDetails()) {
      return null
    }

    isProcessing.value = true
    errorMessage.value = ''
    successMessage.value = ''

    try {
      const [month, year] = creditCardForm.value.expiryDate.split('/')
      if (!month || !year) {
        errorMessage.value = 'Format tanggal kedaluwarsa tidak valid'
        isProcessing.value = false
        return null
      }

      const cardYear = parseInt('20' + year, 10)
      const cardMonth = parseInt(month, 10)

      // Build payment request payload with data from parent if provided
      const paymentRequest = {
        tripScheduleUid: paymentData?.tripScheduleUid || '',
        package: paymentData?.package || [],
        extraPackage: paymentData?.extraPackage || [],
        customers: paymentData?.customers || [],
        paidOff: false,
        cardHolderName: creditCardForm.value.cardName,
        cardNumber: creditCardForm.value.cardNumber.replace(/\s/g, ''),
        cardMonth: cardMonth,
        cardYear: cardYear,
        cardCvn: creditCardForm.value.cvv
      }

      console.log('Sending payment request:', paymentRequest)

      const response = await $fetch<any>(`${baseUrl}/Booking/create-payment.cc`, {
        method: 'POST',
        body: paymentRequest
      })

      if (response.meta.status && response.data.redirect) {
        successMessage.value = '✅ Pembayaran berhasil diproses. Silakan menyelesaikan verifikasi.'
        console.log('✅ Payment CC Processed:', response.data)
        isProcessing.value = false
        return response
      } else {
        errorMessage.value = response.meta.message || 'Gagal memproses pembayaran'
        isProcessing.value = false
        return null
      }
    } catch (error) {
      console.error('Payment processing error:', error)
      errorMessage.value = error instanceof Error ? error.message : 'Terjadi kesalahan saat memproses pembayaran'
      isProcessing.value = false
      return null
    }
  }
})
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-xl font-bold mb-6">
      Rincian Pemesanan
    </h3>

    <div class="space-y-4">
      <div class="bg-gray-50 rounded-lg p-4">
        <h4 class="font-semibold mb-2">
          Trip
        </h4>
        <p class="font-medium">
          {{ props.booking.name }}
        </p>
      </div>

      <div class="bg-gray-50 rounded-lg p-4">
        <h4 class="font-semibold mb-2">
          Jadwal Keberangkatan
        </h4>
        <p>{{ props.formattedStartDate }} - {{ props.formattedEndDate }}</p>
      </div>

      <div class="bg-gray-50 rounded-lg p-4">
        <h4 class="font-semibold mb-2">
          Rincian Peserta
        </h4>
        <p>{{ props.totalGuestCount }} Guest</p>
        <UButton
          variant="ghost"
          size="sm"
          :icon="props.showGuestDetails ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
          class="mt-2"
          @click="props.toggleGuestDetails()"
        >
          <span>{{ props.showGuestDetails ? 'Sembunyikan detail' : 'Detail peserta' }}</span>
        </UButton>

        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 max-h-0 overflow-hidden"
          enter-to-class="opacity-100 max-h-96"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 max-h-96"
          leave-to-class="opacity-0 max-h-0 overflow-hidden"
        >
          <div
            v-if="props.showGuestDetails"
            class="mt-4 space-y-3"
          >
            <div
              v-for="(guest, index) in props.guests"
              :key="index"
              class="bg-white rounded-lg p-3 border border-gray-200"
            >
              <div class="flex items-center justify-between mb-2">
                <h5 class="font-medium text-gray-900">
                  {{ index === 0 ? 'Primary Guest' : `Guest ${index + 1}` }}
                </h5>
                <span class="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {{ guest.gender }}
                </span>
              </div>

              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Nama:</span>
                  <span class="font-medium ml-1 wrap-anywhere">{{ guest.fullNameAsPerPassport || '-' }}</span>
                </div>

                <div
                  v-if="index === 0 && guest.email"
                  class="flex justify-between"
                >
                  <span class="text-gray-600">Email:</span>
                  <span class="font-medium ml-1 wrap-anywhere">{{ guest.email }}</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <USeparator />

    <h4 class="font-bold text-lg mb-3">
      Terms & Conditions
    </h4>
    <p class="text-gray-600 text-sm mb-4">
      Sebelum melakukan reservasi, mohon mempelajari dengan seksama syarat dan ketentuan reservasi
    </p>
    <NuxtLink
      to="/terms-and-conditions"
      target="_blank"
      class="text-primary hover:underline cursor-pointer transition-colors inline-block"
    >
      Pelajari di sini
    </NuxtLink>

    <USeparator />

    <h4 class="font-bold text-lg mb-4">
      Rincian Pembayaran
    </h4>

    <div class="space-y-3 mb-4">
      <div class="flex justify-between">
        <span>Total Biaya</span>
        <span class="font-bold">{{ props.formatCurrency(props.bookingStep.totalAmount) }}</span>
      </div>

      <div
        v-if="props.appliedVoucher?.isApplied"
        class="flex justify-between"
      >
        <span class="text-green-600">Voucher Discount ({{ props.appliedVoucher.code }})</span>
        <span class="font-bold text-green-600">-{{ props.formatCurrency(props.appliedVoucher.discount * props.totalGuestCount) }}</span>
      </div>

      <div class="text-sm text-gray-600">
        <p>
          Untuk mengamankan kursi, Anda cukup melengkapi pembayaran DP. Sisa pembayaran akan mengikuti program cicilan
          bertahap. Apabila Anda memilih Extra Service, maka pembayaran akan ditagihkan pada tagihan tahap kedua.
        </p>
      </div>
    </div>

    <div class="space-y-3">
      <div
        :class="[
          'flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors',
          fullPayment ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
        ]"
        @click="fullPayment = true"
      >
        <div>
          <span class="font-medium">Full Payment</span>
          <p class="text-sm text-gray-600">
            {{ props.formatCurrency(props.totalAmountAfterDiscount) }}
          </p>
        </div>
        <div
          :class="[
            'w-5 h-5 rounded-full border-2 flex items-center justify-center',
            fullPayment ? 'border-primary' : 'border-gray-300'
          ]"
        >
          <div
            v-if="fullPayment"
            class="w-3 h-3 rounded-full bg-primary"
          />
        </div>
      </div>

      <div
        :class="[
          'flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors',
          !fullPayment ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
        ]"
        @click="fullPayment = false"
      >
        <div>
          <span class="font-medium">Down Payment (DP)</span>
          <p class="text-sm text-gray-600">
            {{ props.formatCurrency(props.downPayment * props.totalGuestCount) }}
          </p>
        </div>
        <div
          :class="[
            'w-5 h-5 rounded-full border-2 flex items-center justify-center',
            !fullPayment ? 'border-primary' : 'border-gray-300'
          ]"
        >
          <div
            v-if="!fullPayment"
            class="w-3 h-3 rounded-full bg-primary"
          />
        </div>
      </div>

      <div class="flex items-center justify-between p-3">
        <span>Jumlah Guest</span>
        <span class="font-bold">{{ props.totalGuestCount }} orang</span>
      </div>

      <div
        v-if="props.bookingStep.selectedPaymentMethod?.fee"
        class="flex items-center justify-between p-3"
      >
        <span>Service Fee ({{ props.bookingStep.selectedPaymentMethod.name }})</span>
        <span class="font-bold">{{ props.formatCurrency(props.bookingStep.selectedPaymentMethod.fee) }}</span>
      </div>

      <div class="flex items-center justify-between p-3 border-t font-bold text-lg">
        <span>Total</span>
        <span>{{ props.formatCurrency(props.finalPaymentAmount) }}</span>
      </div>
    </div>

    <USeparator />

    <h4 class="font-bold text-lg mb-4">
      Pilih Metode Pembayaran
    </h4>

    <div
      v-if="props.vaListPending"
      class="flex justify-center py-8"
    >
      <span class="text-gray-500">Loading payment methods...</span>
    </div>

    <div
      v-else
      class="space-y-6"
    >
      <div class="grid grid-cols-2 gap-4">
        <div
          :class="[
            'border rounded-xl p-4 cursor-pointer transition-colors duration-200 text-center',
            selectedPaymentType === 'virtual_account'
              ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
              : 'border-gray-200 hover:border-primary'
          ]"
          @click="selectedPaymentType = selectedPaymentType === 'virtual_account' ? null : 'virtual_account'"
        >
          <div class="flex flex-col items-center gap-2">
            <div class="w-8 h-8 flex items-center justify-center">
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                />
              </svg>
            </div>
            <span class="font-medium">Virtual Account</span>
          </div>
        </div>

        <div
          :class="[
            'border rounded-xl p-4 cursor-pointer transition-colors duration-200 text-center',
            selectedPaymentType === 'credit_card'
              ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
              : 'border-gray-200 hover:border-primary'
          ]"
          @click="selectedPaymentType = selectedPaymentType === 'credit_card' ? null : 'credit_card'"
        >
          <div class="flex flex-col items-center gap-2">
            <div class="w-8 h-8 flex items-center justify-center">
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
              </svg>
            </div>
            <span class="font-medium">Kartu Kredit</span>
          </div>
        </div>
      </div>

      <div
        v-if="selectedPaymentType === 'credit_card'"
        class="bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-2xl p-8 space-y-6 border border-blue-100 shadow-lg"
      >
        <!-- Security Info Box -->
        <div class="bg-green-100/30 border border-green-300 rounded-xl p-4 backdrop-blur-sm">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 mt-0.5">
              <svg
                class="h-6 w-6 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p class="text-sm text-green-800 font-semibold">
                🔐 Pembayaran Aman & Terpercaya
              </p>
              <p class="text-xs text-green-700 mt-1">
                Data kartu Anda dienkripsi dan diproses melalui gateway pembayaran tersertifikasi internasional.
              </p>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="bg-red-50 border border-red-300 rounded-xl p-4"
        >
          <div class="flex items-start gap-3">
            <svg
              class="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
            <p class="text-sm text-red-800 font-medium">
              {{ errorMessage }}
            </p>
          </div>
        </div>

        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="bg-green-50 border border-green-300 rounded-xl p-4"
        >
          <div class="flex items-start gap-3">
            <svg
              class="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <p class="text-sm text-green-800 font-medium">
              {{ successMessage }}
            </p>
          </div>
        </div>

        <!-- Card Holder Name -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Nama Pemegang Kartu
          </label>
          <input
            v-model="creditCardForm.cardName"
            type="text"
            placeholder="NAMA PEMEGANG KARTU"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white/80 backdrop-blur-sm font-semibold text-gray-800"
            :disabled="isProcessing"
          >
          <p class="text-xs text-gray-500 mt-1.5">
            Sesuai dengan nama yang tertera di kartu kredit Anda
          </p>
        </div>

        <!-- Card Number -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Nomor Kartu Kredit
          </label>
          <div class="relative">
            <input
              v-model="creditCardForm.cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              maxlength="19"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition font-mono bg-white/80 backdrop-blur-sm text-lg tracking-widest"
              :disabled="isProcessing"
            >
            <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg
                class="w-8 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
              </svg>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-1.5">
            Minimal 13 digit, maksimal 19 digit
          </p>
        </div>

        <!-- Expiry Date and CVV -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Berlaku Hingga
            </label>
            <input
              v-model="creditCardForm.expiryDate"
              type="text"
              placeholder="MM/YY"
              maxlength="5"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition font-mono bg-white/80 backdrop-blur-sm text-lg tracking-wider"
              :disabled="isProcessing"
            >
            <p class="text-xs text-gray-500 mt-1.5">
              Contoh: 12/25
            </p>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              CVV / CVC
            </label>
            <input
              v-model="creditCardForm.cvv"
              type="password"
              placeholder="•••"
              maxlength="4"
              inputmode="numeric"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition font-mono bg-white/80 backdrop-blur-sm text-lg tracking-widest"
              :disabled="isProcessing"
            >
            <p class="text-xs text-gray-500 mt-1.5">
              3-4 digit di belakang
            </p>
          </div>
        </div>

        <!-- Info Box -->
        <div class="bg-blue-50 border border-blue-300 rounded-xl p-4 backdrop-blur-sm">
          <div class="flex items-start gap-3">
            <svg
              class="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0zM8 8a1 1 0 000 2h6a1 1 0 100-2H8z"
                clip-rule="evenodd"
              />
            </svg>
            <p class="text-xs text-blue-800">
              <strong>Catatan Penting:</strong> Data kartu Anda diproses melalui gateway pembayaran tersertifikasi PCI-DSS. Kami tidak pernah menyimpan detail kartu Anda di server kami.
            </p>
          </div>
        </div>
      </div>

      <div
        v-else-if="selectedPaymentType === 'virtual_account'"
        class="space-y-4"
      >
        <h5 class="font-semibold text-lg">
          Virtual Account
        </h5>
        <div class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-5 gap-4">
          <div
            v-for="method in props.paymentMethods"
            :key="method.id"
            :class="[
              'border rounded-2xl cursor-pointer transition-all duration-200 flex items-center justify-center overflow-hidden aspect-square hover:scale-105',
              props.bookingStep.selectedPaymentMethod?.id === method.id
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20 scale-105'
                : 'border-gray-200 hover:border-primary'
            ]"
            @click="props.selectPaymentMethod(method)"
          >
            <div class="w-full h-full p-2">
              <img
                :src="method.icon"
                :alt="method.name"
                class="w-full h-full object-contain"
                @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
