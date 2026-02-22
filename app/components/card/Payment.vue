<script lang="ts" setup>
import type { PropType } from 'vue'
import type { IResponse, IResponseList } from '~~/shared/interface/IResponse'

interface ICreditCardForm {
  cardHolderName: string
  cardNumber: string
  cardMonth: string
  cardYear: string
  cardCvn: number | null
}

interface IVaList {
  code: string
  name: string
  fee: number
  is_Activated: boolean
  icon: string
  country: string
}

interface IPaymentResponse {
  va?: {
    va: string
    bankCode: string
    custName: string
    amount: number
    expired: string
  }
  redirectUrl?: string
  invoiceNumber: string
}

interface IPaymentStatus {
  status: 'UNPAID' | 'PAID' | 'EXPIRED'
}

const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  typePayment: {
    type: String as PropType<'booking' | 'additional' | 'payment'>,
    required: false,
    default: () => 'booking'
  }
})

const propData = computed(() => props.formData)

const baseUrl = useRuntimeConfig().public.apiBase
const router = useRouter()
const selectedPaymentType = ref<'virtual_account' | 'credit_card' | null>(null)
const selectedBank = ref<{ code: string, name: string, icon: string } | null>(null)
const expiryDate = ref<string>('')
const loading = ref<boolean>(false)
const successModal = ref<boolean>(false)
const paymentResult = ref<IPaymentResponse | null>(null)
const checkStatusTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const loadingCheckStatus = ref<boolean>(false)
const canSubmit = computed(() => {
  if (selectedPaymentType.value === 'virtual_account') {
    return !!selectedBank.value
  } else if (selectedPaymentType.value === 'credit_card') {
    return (
      creditCardForm.value.cardHolderName.trim() !== ''
      && creditCardForm.value.cardNumber.trim().length > 12
      && creditCardForm.value.cardMonth.trim().length === 2
      && creditCardForm.value.cardYear.trim().length === 4
      && creditCardForm.value.cardCvn !== null
    )
  }
  return false
})

defineExpose({
  submitPayment,
  canSubmit,
  loading
})

const copyVaNumber = async () => {
  if (paymentResult.value?.va?.va) {
    await navigator.clipboard.writeText(paymentResult.value.va.va)
  }
}

const { data: vaList, pending: vaListPending } = await useLazyFetch<IResponseList<IVaList>>(
  `${baseUrl}/Booking/payment-list`,
  {
    method: 'GET',
    key: 'va-list'
  }
)

const urlPayment = computed(() => {
  switch (props.typePayment) {
    case 'additional':
      return `${baseUrl}/Booking/create-additional-${selectedPaymentType.value === 'virtual_account' ? 'va' : 'cc'}`
    case 'payment':
      return `${baseUrl}/Payment/invoice.${selectedPaymentType.value === 'virtual_account' ? 'va' : 'cc'}`
    default:
      return `${baseUrl}/Booking/create-payment.${selectedPaymentType.value === 'virtual_account' ? 'va' : 'cc'}`
  }
})

const switchPaymentType = (type: 'virtual_account' | 'credit_card') => {
  selectedPaymentType.value = type
  if (type === 'virtual_account') {
    creditCardForm.value = { cardHolderName: '', cardNumber: '', cardMonth: '', cardYear: '', cardCvn: null }
    expiryDate.value = ''
  } else {
    selectedBank.value = null
  }
}

const creditCardForm = ref<ICreditCardForm>({
  cardHolderName: '',
  cardNumber: '',
  cardMonth: '',
  cardYear: '',
  cardCvn: null
})

const formatExpiryDate = (raw: string): string => {
  const digits = raw.replace(/\D/g, '').slice(0, 6)
  const month = digits.slice(0, 2)
  const year = digits.slice(2, 6)
  return digits.length > 1 ? `${month}/${year}` : digits
}

const onExpiryInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  const formatted = formatExpiryDate(input.value)
  expiryDate.value = formatted
  // Force the DOM to reflect the formatted value
  nextTick(() => {
    input.value = formatted
  })
  const digits = formatted.replace(/\D/g, '')
  creditCardForm.value.cardMonth = digits.slice(0, 2)
  creditCardForm.value.cardYear = digits.slice(2, 6)
}

const selectBank = (bank: { code: string, name: string, icon: string }) => {
  selectedBank.value = bank
}

const doCheckPaymentStatus = async (invoiceNumber: string) => {
  try {
    const result = await $fetch<IResponse<IPaymentStatus>>(`${baseUrl}/Payment/check-status/${invoiceNumber}`, {
      method: 'GET'
    })

    if (result.data?.status === 'PAID') {
      clearInterval(checkStatusTimeout.value!)
      // navigateTo(`/payment/status/${invoiceNumber}`)
      router.replace(`/payment?invoice=${invoiceNumber}&status=success`)
    }

    loadingCheckStatus.value = false
  } catch (error) {
    console.error('Failed to check payment status:', error)
  }
}

async function submitPayment() {
  loading.value = true

  try {
    if (selectedPaymentType.value === 'virtual_account') {
      if (!selectedBank.value) {
        loading.value = false
        return
      }

      const data = {
        ...propData.value,
        bankCode: selectedBank.value.code
      }

      const result = await $fetch<IResponse<IPaymentResponse>>(urlPayment.value, {
        method: 'POST',
        body: data
      })

      paymentResult.value = result.data ?? null
      successModal.value = true
    } else if (selectedPaymentType.value === 'credit_card') {
      const data = {
        ...propData.value,
        ...creditCardForm.value
      }

      const result = await $fetch<IResponse<IPaymentResponse>>(urlPayment.value, {
        method: 'POST',
        body: data
      })

      paymentResult.value = result.data ?? null

      if (paymentResult.value?.redirectUrl) {
        window.open(`https://${paymentResult.value.redirectUrl}`, '_blank')
      }

      successModal.value = true
    }

    if (paymentResult.value) {
      checkStatusTimeout.value = setInterval(async () => {
        await doCheckPaymentStatus(paymentResult.value!.invoiceNumber)
      }, 10000)
    }
  } catch (error) {
    console.error('Payment failed:', error)
  } finally {
    loading.value = false
  }
}

onUnmounted(() => {
  if (checkStatusTimeout.value) {
    clearInterval(checkStatusTimeout.value)
  }
})
</script>

<template>
  <div>
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">
          Pilih Metode Pembayaran
        </h2>
      </template>

      <div class="space-y-6">
        <!-- Payment Method Selection Buttons -->
        <div class="grid grid-cols-2 gap-3 md:gap-4">
          <!-- Virtual Account Button -->
          <button
            :class="[
              'group relative p-4 md:p-8 rounded-xl md:rounded-2xl border-2 transition-all duration-300 flex flex-row md:flex-col items-center md:justify-center gap-3 md:gap-4 md:min-h-40 overflow-hidden cursor-pointer',
              selectedPaymentType === 'virtual_account'
                ? 'border-primary bg-linear-to-br from-primary/10 via-primary/5 to-transparent shadow-lg shadow-primary/20 scale-[1.02]'
                : 'border-gray-200 bg-white hover:border-primary/40 hover:shadow-md hover:scale-[1.01]'
            ]"
            @click="switchPaymentType('virtual_account')"
          >
            <!-- Background Pattern -->
            <div
              :class="[
                'absolute inset-0 opacity-5 transition-opacity duration-300',
                selectedPaymentType === 'virtual_account'
                  ? 'opacity-10'
                  : 'group-hover:opacity-10'
              ]"
            >
              <div class="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-3xl" />
              <div class="absolute bottom-0 left-0 w-24 h-24 bg-primary rounded-full blur-2xl" />
            </div>

            <!-- Selected Badge -->
            <div
              v-if="selectedPaymentType === 'virtual_account'"
              class="absolute top-2 right-2 md:top-3 md:right-3 w-5 h-5 md:w-7 md:h-7 bg-primary rounded-full flex items-center justify-center shadow-lg animate-in fade-in zoom-in duration-300"
            >
              <UIcon
                name="i-heroicons-check"
                class="w-3 h-3 md:w-4 md:h-4 text-white"
              />
            </div>

            <div class="relative z-10 flex flex-row md:flex-col items-center gap-2.5 md:gap-4">
              <!-- Icon Container -->
              <div
                :class="[
                  'w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300',
                  selectedPaymentType === 'virtual_account'
                    ? 'bg-primary shadow-lg shadow-primary/30'
                    : 'bg-gray-100 group-hover:bg-primary/10'
                ]"
              >
                <UIcon
                  name="i-heroicons-building-library"
                  :class="[
                    'w-5 h-5 md:w-8 md:h-8 transition-all duration-300',
                    selectedPaymentType === 'virtual_account'
                      ? 'text-white'
                      : 'text-gray-500 group-hover:text-primary'
                  ]"
                />
              </div>

              <!-- Text -->
              <div class="text-left md:text-center">
                <div
                  :class="[
                    'font-bold text-sm md:text-lg mb-0 md:mb-1 transition-colors duration-300',
                    selectedPaymentType === 'virtual_account'
                      ? 'text-primary'
                      : 'text-gray-700 group-hover:text-primary'
                  ]"
                >
                  Virtual Account
                </div>
                <p
                  :class="[
                    'text-[10px] md:text-xs transition-colors duration-300 hidden md:block',
                    selectedPaymentType === 'virtual_account'
                      ? 'text-primary/70'
                      : 'text-gray-500'
                  ]"
                >
                  Transfer melalui bank
                </p>
              </div>
            </div>
          </button>

          <!-- Credit Card Button -->
          <button
            :class="[
              'group relative p-4 md:p-8 rounded-xl md:rounded-2xl border-2 transition-all duration-300 flex flex-row md:flex-col items-center md:justify-center gap-3 md:gap-4 md:min-h-40 overflow-hidden cursor-pointer',
              selectedPaymentType === 'credit_card'
                ? 'border-primary bg-linear-to-br from-primary/10 via-primary/5 to-transparent shadow-lg shadow-primary/20 scale-[1.02]'
                : 'border-gray-200 bg-white hover:border-primary/40 hover:shadow-md hover:scale-[1.01]'
            ]"
            @click="switchPaymentType('credit_card')"
          >
            <!-- Background Pattern -->
            <div
              :class="[
                'absolute inset-0 opacity-5 transition-opacity duration-300',
                selectedPaymentType === 'credit_card'
                  ? 'opacity-10'
                  : 'group-hover:opacity-10'
              ]"
            >
              <div class="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full blur-3xl" />
              <div class="absolute bottom-0 right-0 w-24 h-24 bg-primary rounded-full blur-2xl" />
            </div>

            <!-- Selected Badge -->
            <div
              v-if="selectedPaymentType === 'credit_card'"
              class="absolute top-2 right-2 md:top-3 md:right-3 w-5 h-5 md:w-7 md:h-7 bg-primary rounded-full flex items-center justify-center shadow-lg animate-in fade-in zoom-in duration-300"
            >
              <UIcon
                name="i-heroicons-check"
                class="w-3 h-3 md:w-4 md:h-4 text-white"
              />
            </div>

            <div class="relative z-10 flex flex-row md:flex-col items-center gap-2.5 md:gap-4">
              <!-- Icon Container -->
              <div
                :class="[
                  'w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300',
                  selectedPaymentType === 'credit_card'
                    ? 'bg-primary shadow-lg shadow-primary/30'
                    : 'bg-gray-100 group-hover:bg-primary/10'
                ]"
              >
                <UIcon
                  name="i-heroicons-credit-card"
                  :class="[
                    'w-5 h-5 md:w-8 md:h-8 transition-all duration-300',
                    selectedPaymentType === 'credit_card'
                      ? 'text-white'
                      : 'text-gray-500 group-hover:text-primary'
                  ]"
                />
              </div>

              <!-- Text -->
              <div class="text-left md:text-center">
                <div
                  :class="[
                    'font-bold text-sm md:text-lg mb-0 md:mb-1 transition-colors duration-300',
                    selectedPaymentType === 'credit_card'
                      ? 'text-primary'
                      : 'text-gray-700 group-hover:text-primary'
                  ]"
                >
                  Kartu Kredit
                </div>
                <p
                  :class="[
                    'text-[10px] md:text-xs transition-colors duration-300 hidden md:block',
                    selectedPaymentType === 'credit_card'
                      ? 'text-primary/70'
                      : 'text-gray-500'
                  ]"
                >
                  Pembayaran langsung
                </p>
              </div>
            </div>
          </button>
        </div>

        <!-- Virtual Account Section -->
        <div
          v-if="selectedPaymentType === 'virtual_account'"
          class="space-y-5 pt-2"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <UIcon
                name="i-heroicons-building-library"
                class="w-5 h-5 text-blue-600"
              />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">
                Pilih Bank
              </h3>
              <p class="text-sm text-gray-600">
                Transfer melalui Virtual Account
              </p>
            </div>
          </div>

          <div
            v-if="vaListPending"
            class="flex justify-center py-8"
          >
            <div class="text-center">
              <div
                class="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"
              />
              <p class="text-sm text-gray-500">
                Memuat daftar bank...
              </p>
            </div>
          </div>

          <div
            v-else
            class="grid grid-cols-2 md:grid-cols-3 gap-3"
          >
            <button
              v-for="bank in vaList?.data?.filter(item => item.is_Activated)"
              :key="bank.code"
              :class="[
                'group relative p-5 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-3 hover:shadow-md cursor-pointer',
                selectedBank?.code === bank.code
                  ? 'border-primary bg-primary/5 shadow-md scale-[1.02]'
                  : 'border-gray-200 bg-white hover:border-primary/50'
              ]"
              @click="selectBank(bank)"
            >
              <div
                v-if="selectedBank?.code === bank.code"
                class="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg"
              >
                <UIcon
                  name="i-heroicons-check"
                  class="w-4 h-4 text-white"
                />
              </div>

              <div class="w-full h-12 flex items-center justify-center">
                <img
                  :src="`/assets/bank/${bank.code}.png`"
                  :alt="bank.name"
                  class="max-h-10 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                  @error="
                    ($event.target as HTMLImageElement).src
                      = '/placeholder-bank.png'
                  "
                >
              </div>
              <span class="text-sm font-semibold text-center text-gray-700">{{
                bank.name
              }}</span>
            </button>
          </div>

          <div
            v-if="selectedBank"
            class="bg-green-50 border border-green-200 rounded-lg p-4"
          >
            <div class="flex items-start gap-3">
              <UIcon
                name="i-heroicons-check-circle"
                class="w-5 h-5 text-green-600 mt-0.5 shrink-0"
              />
              <div class="flex-1">
                <p class="text-sm font-medium text-green-800 mb-1">
                  Bank Terpilih: {{ selectedBank.name }}
                </p>
                <p class="text-xs text-green-700">
                  Nomor Virtual Account akan dikirimkan setelah Anda melanjutkan
                  pembayaran
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Credit Card Section -->
        <div
          v-if="selectedPaymentType === 'credit_card'"
          class="space-y-5 pt-2"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <UIcon
                name="i-heroicons-credit-card"
                class="w-5 h-5 text-purple-600"
              />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">
                Informasi Kartu Kredit
              </h3>
              <p class="text-sm text-gray-600">
                Pembayaran diproses secara aman
              </p>
            </div>
          </div>

          <!-- <div class="bg-linear-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 shadow-sm">
          <div class="flex items-start gap-3">
            <UIcon
              name="i-heroicons-shield-check"
              class="w-5 h-5 text-amber-600 mt-0.5 shrink-0"
            />
            <div>
              <p class="text-sm font-medium text-amber-900 mb-1">
                Transaksi Aman & Terenkripsi
              </p>
              <p class="text-xs text-amber-800">
                Data kartu Anda dilindungi dengan enkripsi SSL 256-bit melalui
                gateway pembayaran terpercaya.
              </p>
            </div>
          </div>
        </div> -->

          <div class="space-y-4">
            <!-- Cardholder Name -->
            <div>
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <UIcon
                  name="i-heroicons-user"
                  class="w-4 h-4 text-gray-500"
                />
                Nama Pemegang Kartu
              </label>
              <UInput
                v-model="creditCardForm.cardHolderName"
                placeholder="JOHN DOE"
                size="lg"
                class="w-full"
                :ui="{ base: 'uppercase' }"
                @blur="
                  creditCardForm.cardHolderName = creditCardForm.cardHolderName.toUpperCase()
                "
              />
              <p class="text-xs text-gray-500 mt-1.5 ml-1">
                Sesuai yang tertera pada kartu
              </p>
            </div>

            <!-- Card Number -->
            <div>
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <UIcon
                  name="i-heroicons-credit-card"
                  class="w-4 h-4 text-gray-500"
                />
                Nomor Kartu
              </label>
              <UInput
                v-model="creditCardForm.cardNumber"
                placeholder="1234 5678 9012 3456"
                maxlength="19"
                size="lg"
                class="w-full font-mono"
              />
              <p class="text-xs text-gray-500 mt-1.5 ml-1">
                16 digit nomor kartu kredit
              </p>
            </div>

            <!-- Expiry and CVV -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <UIcon
                    name="i-heroicons-calendar"
                    class="w-4 h-4 text-gray-500"
                  />
                  Berlaku Hingga
                </label>
                <UInput
                  :model-value="expiryDate"
                  placeholder="MM/YYYY"
                  maxlength="7"
                  size="lg"
                  class="w-full font-mono"
                  @input="onExpiryInput"
                />
                <p class="text-xs text-gray-500 mt-1.5 ml-1">
                  Format: MM/YYYY
                </p>
              </div>
              <div>
                <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <UIcon
                    name="i-heroicons-lock-closed"
                    class="w-4 h-4 text-gray-500"
                  />
                  CVV
                </label>
                <UInput
                  v-model="creditCardForm.cardCvn"
                  placeholder="123"
                  type="password"
                  maxlength="4"
                  size="lg"
                  class="w-full font-mono"
                />
                <p class="text-xs text-gray-500 mt-1.5 ml-1">
                  3-4 digit kode keamanan
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Proceed Button -->
        <div
          v-if="selectedPaymentType"
          :class="['pt-4', typePayment !== 'booking' ? 'border-t border-gray-300' : '']"
        >
          <!-- <UButton
          :loading="isSubmitting"
          :disabled="!canProceed"
          block
          size="lg"
          :class="[
            !canProceed
              ? 'bg-gray-300! text-white cursor-not-allowed opacity-70'
              : 'bg-primary hover:bg-primary/90'
          ]"
          @click="proceedToCheckout"
        >
          Bayar Sekarang
        </UButton> -->
          <UButton
            v-if="typePayment !== 'booking'"
            class="cursor-pointer"
            label="Bayar Sekarang"
            :loading="loading"
            :disabled="!canSubmit || loading"
            block
            @click="submitPayment"
          />
        </div>
      </div>
    </UCard>

    <!-- Success Payment Dialog -->
    <UModal
      v-model:open="successModal"
      scrollable
      :ui="{
        overlay: 'bg-black/20'
      }"
    >
      <template #content>
        <div class="p-6 sm:p-8">
          <!-- Success Animation Header -->
          <div class="text-center mb-6">
            <div class="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-in zoom-in duration-500">
              <div class="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-200">
                <UIcon
                  name="i-heroicons-check"
                  class="w-8 h-8 text-white"
                />
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-1">
              Pembayaran Berhasil Dibuat! 🎉
            </h3>
            <p class="text-sm text-gray-500">
              Silakan selesaikan pembayaran Anda sebelum batas waktu
            </p>
          </div>

          <!-- Invoice Number -->
          <div
            v-if="paymentResult?.invoiceNumber"
            class="bg-gray-50 rounded-xl p-4 mb-4 text-center"
          >
            <p class="text-xs text-gray-500 mb-1">
              Nomor Invoice
            </p>
            <p class="text-lg font-bold font-mono text-gray-900 tracking-wide">
              {{ paymentResult.invoiceNumber }}
            </p>
          </div>

          <!-- Virtual Account Details -->
          <div
            v-if="paymentResult?.va"
            class="space-y-3 mb-6"
          >
            <!-- Bank & VA Number -->
            <div class="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <UIcon
                      name="i-heroicons-building-library"
                      class="w-4 h-4 text-primary"
                    />
                  </div>
                  <span class="text-sm font-semibold text-gray-700">
                    {{ paymentResult.va.bankCode }}
                  </span>
                </div>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">
                  Nomor Virtual Account
                </p>
                <div class="flex items-center gap-2">
                  <p class="text-xl font-bold font-mono text-primary tracking-wider">
                    {{ paymentResult.va.va }}
                  </p>
                  <button
                    class="p-1.5 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
                    title="Salin nomor VA"
                    @click="copyVaNumber"
                  >
                    <UIcon
                      name="i-heroicons-clipboard-document"
                      class="w-5 h-5 text-primary"
                    />
                  </button>
                </div>
              </div>
            </div>

            <!-- Payment Info Grid -->
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs text-gray-500 mb-0.5">
                  Nama Pelanggan
                </p>
                <p class="text-sm font-semibold text-gray-800 truncate">
                  {{ paymentResult.va.custName }}
                </p>
              </div>
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs text-gray-500 mb-0.5">
                  Total Pembayaran
                </p>
                <p class="text-sm font-bold text-green-600">
                  {{ new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(paymentResult.va.amount) }}
                </p>
              </div>
            </div>

            <!-- Expiry -->
            <div
              v-if="paymentResult.va.expired"
              class="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3"
            >
              <div class="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                <UIcon
                  name="i-heroicons-clock"
                  class="w-4 h-4 text-amber-600"
                />
              </div>
              <div>
                <p class="text-xs text-amber-700">
                  Batas Waktu Pembayaran
                </p>
                <p class="text-sm font-semibold text-amber-900">
                  {{ new Date(paymentResult.va.expired).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' }) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Tips -->
          <div class="bg-gray-50 rounded-xl p-4 mb-6">
            <p class="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-1.5">
              <UIcon
                name="i-heroicons-light-bulb"
                class="w-4 h-4 text-amber-500"
              />
              Tips Pembayaran
            </p>
            <ul class="text-sm text-gray-500 space-y-1">
              <li>• Pastikan nominal transfer sesuai hingga digit terakhir</li>
              <li>• Pembayaran akan dikonfirmasi secara otomatis</li>
              <li>• Simpan bukti pembayaran sebagai referensi</li>
            </ul>
          </div>

          <!-- Redirect Info (Credit Card) -->
          <div
            v-if="selectedPaymentType === 'credit_card'"
            class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6"
          >
            <p class="text-sm font-semibold text-blue-600 mb-2 flex items-center gap-1.5">
              <UIcon
                name="i-heroicons-arrow-top-right-on-square"
                class="w-4 h-4 text-blue-500"
              />
              Info Pembayaran Kartu Kredit
            </p>
            <ul class="text-sm text-gray-500 space-y-1">
              <li>• Anda akan diarahkan ke halaman pembayaran kartu kredit.</li>
              <li>• Anda akan dikenakan service fee kartu kredit sesuai ketentuan yang berlaku</li>
            </ul>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col gap-2">
            <UButton
              v-if="selectedPaymentType === 'credit_card'"
              label="Lanjutkan Pembayaran"
              block
              variant="outline"
              size="lg"
              class="cursor-pointer"
              target="_blank"
              :to="`https://${paymentResult?.redirectUrl}`"
            />
            <UButton
              label="Cek Status Pembayaran"
              block
              size="lg"
              class="cursor-pointer"
              :loading="loadingCheckStatus"
              @click="doCheckPaymentStatus(paymentResult!.invoiceNumber), loadingCheckStatus = true"
            />
            <UButton
              label="Kembali ke Beranda"
              variant="ghost"
              color="neutral"
              block
              size="lg"
              class="cursor-pointer"
              @click="successModal = false; navigateTo('/')"
            />
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
