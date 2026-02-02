<script lang="ts" setup>
import type { IResponse } from '~~/shared/interface/IResponse'
import type { IVaListResponse } from '~~/shared/interface/IVaList'
import { formatCurrency } from '~~/shared/script/currency'
import { formatCardNumber, formatExpiryDate } from '~~/shared/script/booking-utils'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const baseUrl = useRuntimeConfig().public.apiBase

// Get uid from route
const uid = computed(() => route.params.uid as string)

// Indonesian month names
const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']
const monthsFull = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

// Format date range for schedule (05/04/2026 - 05/15/2026 -> 5 Apr 2026 - 15 Mei 2026)
const formatScheduleDate = (dateStr: string): string => {
  if (!dateStr) return ''
  const parts = dateStr.split(' - ')
  if (parts.length !== 2) return dateStr

  const formatSingleDate = (d: string) => {
    const [month, day, year] = d.trim().split('/')
    const monthIndex = parseInt(month) - 1
    return `${parseInt(day)} ${monthsShort[monthIndex]} ${year}`
  }

  return `${formatSingleDate(parts[0])} - ${formatSingleDate(parts[1])}`
}

// Format due date (05/04/2026 -> 5 April 2026, 23:59)
const formatDueDate = (dateStr: string): string => {
  if (!dateStr) return ''
  const [month, day, year] = dateStr.split('/')
  const monthIndex = parseInt(month) - 1
  // Add default time 23:59 for due date
  return `${parseInt(day)} ${monthsFull[monthIndex]} ${year}, 23:59`
}

// Payment detail interface
interface IPaymentDetail {
  uid: string
  noPesanan: string
  jadwalKeberangkatan: string
  tripName: string
  days: number
  jumlahPeserta: number
  invoiceNumber: string
  netTotalPrice: number
  dueDate: string
}

// VA response interface
interface IVaResponse {
  va: {
    va: string
    bankCode: string
    custName: string
    amount: number
    expired: string
  }
  invoiceNumber: string
}

// CC response interface
interface ICcResponse {
  redirectUrl: string
  invoiceNumber: string
}

// Payment status interface
interface IPaymentStatus {
  status: string
}

// Fetch payment details
const { data: paymentData, pending: paymentPending, error: paymentError } = await useLazyFetch<IResponse<IPaymentDetail>>(
  `${baseUrl}/Payment/detail/${uid.value}`,
  {
    key: `payment-detail-${uid.value}`
  }
)

// Payment type state
const selectedPaymentType = ref<'virtual_account' | 'credit_card' | null>(null)

// VA state
const selectedBank = ref<{ code: string, name: string, icon: string } | null>(null)

// CC form state
const creditCardForm = ref({
  cardName: '',
  cardNumber: '',
  expiryDate: '',
  cvv: ''
})

// Loading states
const isSubmitting = ref(false)

// Dialog states
const showSuccessDialog = ref(false)
const vaResponse = ref<IVaResponse | null>(null)
const ccResponse = ref<ICcResponse | null>(null)
const paymentStatus = ref<string>('UNPAID')
const statusCheckInterval = ref<ReturnType<typeof setInterval> | null>(null)

// Fetch VA list
const { data: vaListData, pending: vaListPending } = await useLazyFetch<IVaListResponse>(
  `${baseUrl}/Booking/payment-list`,
  {
    key: 'va-list'
  }
)

// Computed bank list
const bankList = computed(() => {
  if (!vaListData.value?.data) return []
  return vaListData.value.data
    .filter(item => item.is_Activated)
    .map(item => ({
      code: item.code,
      name: item.name,
      icon: `/assets/bank/${item.code}.png`
    }))
})

// Watch for credit card input changes to format them
watch(() => creditCardForm.value.cardNumber, (newValue) => {
  creditCardForm.value.cardNumber = formatCardNumber(newValue)
})

watch(() => creditCardForm.value.expiryDate, (newValue) => {
  creditCardForm.value.expiryDate = formatExpiryDate(newValue)
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

// Switch payment type
const switchPaymentType = (type: 'virtual_account' | 'credit_card') => {
  selectedPaymentType.value = type
  if (type === 'virtual_account') {
    creditCardForm.value = { cardName: '', cardNumber: '', expiryDate: '', cvv: '' }
  } else {
    selectedBank.value = null
  }
}

// Select bank
const selectBank = (bank: { code: string, name: string, icon: string }) => {
  selectedBank.value = bank
}

// Submit VA payment
const submitVaPayment = async () => {
  if (!selectedBank.value) {
    toast.add({ title: 'Error', description: 'Silakan pilih bank terlebih dahulu', color: 'error' })
    return
  }

  isSubmitting.value = true
  try {
    const response = await $fetch<IResponse<IVaResponse>>(`${baseUrl}/Payment/invoice.va`, {
      method: 'POST',
      body: {
        uid: uid.value,
        bankCode: selectedBank.value.code
      }
    })

    if (response.meta.status && response.data) {
      vaResponse.value = response.data
      showSuccessDialog.value = true
      startStatusCheck(response.data.invoiceNumber)
      toast.add({ title: 'Berhasil', description: 'Virtual Account berhasil dibuat', color: 'success' })
    } else {
      toast.add({ title: 'Error', description: response.meta.message || 'Gagal membuat Virtual Account', color: 'error' })
    }
  } catch (error) {
    console.error('VA Payment Error:', error)
    toast.add({ title: 'Error', description: 'Gagal membuat Virtual Account', color: 'error' })
  } finally {
    isSubmitting.value = false
  }
}

// Submit CC payment
const submitCcPayment = async () => {
  if (!isCreditCardFormValid.value) {
    toast.add({ title: 'Error', description: 'Silakan lengkapi data kartu kredit', color: 'error' })
    return
  }

  isSubmitting.value = true
  try {
    const [month, year] = creditCardForm.value.expiryDate.split('/')
    const cardNumberDigits = creditCardForm.value.cardNumber.replace(/\s/g, '')

    // Convert 2-digit year to 4-digit year (30 -> 2030)
    const fullYear = parseInt(year || '0')
    const cardYear = fullYear < 100 ? 2000 + fullYear : fullYear

    const response = await $fetch<IResponse<ICcResponse>>(`${baseUrl}/Payment/invoice.cc`, {
      method: 'POST',
      body: {
        uid: uid.value,
        cardHolderName: creditCardForm.value.cardName,
        cardNumber: cardNumberDigits,
        cardMonth: parseInt(month || '0'),
        cardYear: cardYear,
        cardCvn: parseInt(creditCardForm.value.cvv)
      }
    })

    if (response.meta.status && response.data) {
      ccResponse.value = response.data
      showSuccessDialog.value = true
      startStatusCheck(response.data.invoiceNumber)
      toast.add({ title: 'Berhasil', description: 'Pembayaran kartu kredit berhasil diproses', color: 'success' })
    } else {
      toast.add({ title: 'Error', description: response.meta.message || 'Gagal memproses pembayaran', color: 'error' })
    }
  } catch (error) {
    console.error('CC Payment Error:', error)
    toast.add({ title: 'Error', description: 'Gagal memproses pembayaran kartu kredit', color: 'error' })
  } finally {
    isSubmitting.value = false
  }
}

// Start checking payment status
const startStatusCheck = (invoiceNumber: string) => {
  if (statusCheckInterval.value) {
    clearInterval(statusCheckInterval.value)
  }

  statusCheckInterval.value = setInterval(async () => {
    try {
      const response = await $fetch<IResponse<IPaymentStatus>>(`${baseUrl}/Payment/check-status/${invoiceNumber}`)
      if (response.data?.status === 'PAID') {
        paymentStatus.value = 'PAID'
        if (statusCheckInterval.value) {
          clearInterval(statusCheckInterval.value)
        }
        toast.add({ title: 'Pembayaran Berhasil', description: 'Terima kasih! Pembayaran Anda telah diterima.', color: 'success' })
        setTimeout(() => {
          router.push('/')
        }, 3000)
      }
    } catch (error) {
      console.error('Status check error:', error)
    }
  }, 5000)
}

// Open redirect URL in new tab
const openRedirectUrl = () => {
  if (ccResponse.value?.redirectUrl) {
    let url = ccResponse.value.redirectUrl
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url
    }
    window.open(url, '_blank')
  }
}

// Proceed to checkout
const proceedToCheckout = () => {
  if (selectedPaymentType.value === 'virtual_account') {
    submitVaPayment()
  } else if (selectedPaymentType.value === 'credit_card') {
    submitCcPayment()
  }
}

// Check if can proceed
const canProceed = computed(() => {
  if (selectedPaymentType.value === 'virtual_account') {
    return !!selectedBank.value
  } else if (selectedPaymentType.value === 'credit_card') {
    return isCreditCardFormValid.value
  }
  return false
})

const broadcast = new BroadcastChannel('payment_status')

onMounted(() => {
  broadcast.onmessage = (event: BroadcastChannelEventMap) => {
    console.log(event)
    if (event.message.isTrusted) {
      router.push({ to: '/payment/status', query: {
        status: event.message.data.status,
        invoice: paymentData.value?.data?.invoiceNumber || undefined,
        trip: paymentData.value?.data?.tripName || undefined
      } })
    }
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (statusCheckInterval.value) {
    clearInterval(statusCheckInterval.value)
  }
})

// SEO
useHead({
  title: 'Pembayaran - Peponi',
  meta: [
    { name: 'description', content: 'Halaman pembayaran untuk menyelesaikan transaksi Anda di Peponi Travel.' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <section class="bg-primary py-8 px-4 md:px-8">
      <div class="max-w-4xl mx-auto text-center text-white">
        <h1 class="text-3xl md:text-4xl font-bold mb-2">
          Pembayaran
        </h1>
        <p class="text-lg opacity-90">
          Selesaikan pembayaran untuk melanjutkan pemesanan Anda
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="py-8 px-4 md:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Loading State -->
        <div
          v-if="paymentPending"
          class="flex items-center justify-center py-20"
        >
          <div class="text-center">
            <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p class="text-gray-600">
              Memuat detail pembayaran...
            </p>
          </div>
        </div>

        <!-- Error State -->
        <div
          v-else-if="paymentError"
          class="flex items-center justify-center py-20"
        >
          <div class="text-center">
            <UIcon
              name="heroicons:exclamation-triangle"
              class="text-5xl text-red-500 mb-4"
            />
            <p class="text-red-600 mb-2 text-lg font-semibold">
              Gagal memuat data pembayaran
            </p>
            <p class="text-gray-600 text-sm">
              {{ paymentError.message }}
            </p>
          </div>
        </div>

        <!-- Payment Content -->
        <div
          v-else-if="paymentData?.data"
          class="space-y-6"
        >
          <!-- Invoice Details Card -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <UIcon
                    name="i-heroicons-document-text"
                    class="w-6 h-6 text-primary"
                  />
                </div>
                <h2 class="text-xl font-semibold">
                  Detail Pembayaran
                </h2>
              </div>
            </template>

            <div class="space-y-6">
              <!-- Trip Info -->
              <div class="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-5 border border-primary/20">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
                    <UIcon
                      name="i-heroicons-map-pin"
                      class="w-6 h-6 text-primary"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-lg text-gray-900 mb-1">
                      {{ paymentData.data.tripName }}
                    </h3>
                    <div class="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                      <div class="flex items-center gap-1.5">
                        <UIcon
                          name="i-heroicons-calendar"
                          class="w-4 h-4"
                        />
                        <span>{{ formatScheduleDate(paymentData.data.jadwalKeberangkatan) }}</span>
                      </div>
                      <div class="flex items-center gap-1.5">
                        <UIcon
                          name="i-heroicons-users"
                          class="w-4 h-4"
                        />
                        <span>{{ paymentData.data.jumlahPeserta }} orang</span>
                      </div>
                      <div class="flex items-center gap-1.5">
                        <UIcon
                          name="i-heroicons-clock"
                          class="w-4 h-4"
                        />
                        <span>{{ paymentData.data.days }} hari</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Order & Invoice Info -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div class="flex items-center gap-2 text-gray-600 text-sm mb-2">
                    <UIcon
                      name="i-heroicons-ticket"
                      class="w-4 h-4"
                    />
                    <span class="font-medium">Informasi Pesanan</span>
                  </div>
                  <div class="space-y-2">
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-600">No. Pesanan</span>
                      <span class="font-semibold text-gray-900">{{ paymentData.data.noPesanan }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-600">No. Invoice</span>
                      <span class="font-semibold text-gray-900">{{ paymentData.data.invoiceNumber }}</span>
                    </div>
                  </div>
                </div>

                <div class="bg-red-50 rounded-lg p-4 space-y-3 border border-red-200">
                  <div class="flex items-center gap-2 text-red-700 text-sm mb-2">
                    <UIcon
                      name="i-heroicons-exclamation-triangle"
                      class="w-4 h-4"
                    />
                    <span class="font-medium">Batas Waktu Pembayaran</span>
                  </div>
                  <div class="space-y-1">
                    <div class="text-xl font-bold text-red-600">
                      {{ formatDueDate(paymentData.data.dueDate) }}
                    </div>
                    <p class="text-xs text-red-600/80">
                      Mohon selesaikan pembayaran sebelum batas waktu
                    </p>
                  </div>
                </div>
              </div>

              <!-- Total Amount -->
              <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="text-gray-400 text-sm mb-1">
                      Total Pembayaran
                    </p>
                    <p class="text-3xl font-bold text-white">
                      {{ formatCurrency(paymentData.data.netTotalPrice) }}
                    </p>
                  </div>
                  <div class="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <UIcon
                      name="i-heroicons-banknotes"
                      class="w-8 h-8 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Payment Method Selection Card -->
          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                Pilih Metode Pembayaran
              </h2>
            </template>

            <div class="space-y-6">
              <!-- Payment Method Selection Buttons -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Virtual Account Button -->
                <button
                  :class="[
                    'group relative p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-4 min-h-[160px] overflow-hidden',
                    selectedPaymentType === 'virtual_account'
                      ? 'border-primary bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-lg shadow-primary/20 scale-[1.02]'
                      : 'border-gray-200 bg-white hover:border-primary/40 hover:shadow-md hover:scale-[1.01]'
                  ]"
                  @click="switchPaymentType('virtual_account')"
                >
                  <!-- Background Pattern -->
                  <div
                    :class="[
                      'absolute inset-0 opacity-5 transition-opacity duration-300',
                      selectedPaymentType === 'virtual_account' ? 'opacity-10' : 'group-hover:opacity-10'
                    ]"
                  >
                    <div class="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-3xl" />
                    <div class="absolute bottom-0 left-0 w-24 h-24 bg-primary rounded-full blur-2xl" />
                  </div>

                  <!-- Selected Badge -->
                  <div
                    v-if="selectedPaymentType === 'virtual_account'"
                    class="absolute top-3 right-3 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-lg animate-in fade-in zoom-in duration-300"
                  >
                    <UIcon
                      name="i-heroicons-check"
                      class="w-4 h-4 text-white"
                    />
                  </div>

                  <div class="relative z-10 flex flex-col items-center gap-4">
                    <!-- Icon Container -->
                    <div
                      :class="[
                        'w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300',
                        selectedPaymentType === 'virtual_account'
                          ? 'bg-primary shadow-lg shadow-primary/30'
                          : 'bg-gray-100 group-hover:bg-primary/10'
                      ]"
                    >
                      <UIcon
                        name="i-heroicons-building-library"
                        :class="[
                          'w-8 h-8 transition-all duration-300',
                          selectedPaymentType === 'virtual_account'
                            ? 'text-white'
                            : 'text-gray-500 group-hover:text-primary'
                        ]"
                      />
                    </div>

                    <!-- Text -->
                    <div class="text-center">
                      <div
                        :class="[
                          'font-bold text-lg mb-1 transition-colors duration-300',
                          selectedPaymentType === 'virtual_account'
                            ? 'text-primary'
                            : 'text-gray-700 group-hover:text-primary'
                        ]"
                      >
                        Virtual Account
                      </div>
                      <p
                        :class="[
                          'text-xs transition-colors duration-300',
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
                    'group relative p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-4 min-h-[160px] overflow-hidden',
                    selectedPaymentType === 'credit_card'
                      ? 'border-primary bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-lg shadow-primary/20 scale-[1.02]'
                      : 'border-gray-200 bg-white hover:border-primary/40 hover:shadow-md hover:scale-[1.01]'
                  ]"
                  @click="switchPaymentType('credit_card')"
                >
                  <!-- Background Pattern -->
                  <div
                    :class="[
                      'absolute inset-0 opacity-5 transition-opacity duration-300',
                      selectedPaymentType === 'credit_card' ? 'opacity-10' : 'group-hover:opacity-10'
                    ]"
                  >
                    <div class="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full blur-3xl" />
                    <div class="absolute bottom-0 right-0 w-24 h-24 bg-primary rounded-full blur-2xl" />
                  </div>

                  <!-- Selected Badge -->
                  <div
                    v-if="selectedPaymentType === 'credit_card'"
                    class="absolute top-3 right-3 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-lg animate-in fade-in zoom-in duration-300"
                  >
                    <UIcon
                      name="i-heroicons-check"
                      class="w-4 h-4 text-white"
                    />
                  </div>

                  <div class="relative z-10 flex flex-col items-center gap-4">
                    <!-- Icon Container -->
                    <div
                      :class="[
                        'w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300',
                        selectedPaymentType === 'credit_card'
                          ? 'bg-primary shadow-lg shadow-primary/30'
                          : 'bg-gray-100 group-hover:bg-primary/10'
                      ]"
                    >
                      <UIcon
                        name="i-heroicons-credit-card"
                        :class="[
                          'w-8 h-8 transition-all duration-300',
                          selectedPaymentType === 'credit_card'
                            ? 'text-white'
                            : 'text-gray-500 group-hover:text-primary'
                        ]"
                      />
                    </div>

                    <!-- Text -->
                    <div class="text-center">
                      <div
                        :class="[
                          'font-bold text-lg mb-1 transition-colors duration-300',
                          selectedPaymentType === 'credit_card'
                            ? 'text-primary'
                            : 'text-gray-700 group-hover:text-primary'
                        ]"
                      >
                        Kartu Kredit
                      </div>
                      <p
                        :class="[
                          'text-xs transition-colors duration-300',
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
                    <div class="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
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
                    v-for="bank in bankList"
                    :key="bank.code"
                    :class="[
                      'group relative p-5 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-3 hover:shadow-md',
                      selectedBank?.code === bank.code
                        ? 'border-primary bg-primary/5 shadow-md scale-[1.02]'
                        : 'border-gray-200 bg-white hover:border-primary/50'
                    ]"
                    @click="selectBank(bank)"
                  >
                    <!-- Selected Badge -->
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
                        :src="bank.icon"
                        :alt="bank.name"
                        class="max-h-10 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                        @error="($event.target as HTMLImageElement).src = '/placeholder-bank.png'"
                      >
                    </div>
                    <span class="text-sm font-semibold text-center text-gray-700">{{ bank.name }}</span>
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
                        Nomor Virtual Account akan dikirimkan setelah Anda melanjutkan pembayaran
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

                <div class="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 shadow-sm">
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
                        Data kartu Anda dilindungi dengan enkripsi SSL 256-bit melalui gateway pembayaran terpercaya.
                      </p>
                    </div>
                  </div>
                </div>

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
                      v-model="creditCardForm.cardName"
                      placeholder="JOHN DOE"
                      size="lg"
                      class="w-full"
                      :ui="{ base: 'uppercase' }"
                      @blur="creditCardForm.cardName = creditCardForm.cardName.toUpperCase()"
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
                        v-model="creditCardForm.expiryDate"
                        placeholder="MM/YY"
                        maxlength="5"
                        size="lg"
                        class="w-full font-mono"
                      />
                      <p class="text-xs text-gray-500 mt-1.5 ml-1">
                        Format: MM/YY
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
                        v-model="creditCardForm.cvv"
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
                class="pt-4 border-t"
              >
                <UButton
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
                </UButton>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Success Dialog -->
    <UtilDialog
      v-model="showSuccessDialog"
      :title="paymentStatus === 'PAID' ? 'Pembayaran Berhasil!' : 'Pembayaran Dibuat'"
      size="md"
      :closable="paymentStatus === 'PAID'"
      :overlay-close="false"
    >
      <div class="text-center space-y-4">
        <!-- Success Icon -->
        <div
          :class="[
            'w-16 h-16 rounded-full flex items-center justify-center mx-auto',
            paymentStatus === 'PAID' ? 'bg-green-100' : 'bg-blue-100'
          ]"
        >
          <UIcon
            :name="paymentStatus === 'PAID' ? 'i-heroicons-check-circle' : 'i-heroicons-clock'"
            :class="[
              'w-10 h-10',
              paymentStatus === 'PAID' ? 'text-green-600' : 'text-blue-600'
            ]"
          />
        </div>

        <!-- VA Response -->
        <div
          v-if="vaResponse && paymentStatus !== 'PAID'"
          class="space-y-3"
        >
          <p class="text-gray-600">
            Silakan transfer ke Virtual Account berikut:
          </p>
          <div class="bg-gray-50 rounded-lg p-4 space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Bank</span>
              <span class="font-semibold">{{ vaResponse.va.bankCode }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">No. Virtual Account</span>
              <span class="font-semibold font-mono">{{ vaResponse.va.va }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Nama</span>
              <span class="font-semibold">{{ vaResponse.va.custName }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Jumlah</span>
              <span class="font-semibold text-primary">{{ formatCurrency(vaResponse.va.amount) }}</span>
            </div>
          </div>
          <p class="text-sm text-gray-500">
            Menunggu pembayaran... Status dicek setiap 5 detik
          </p>
          <div class="flex justify-center">
            <div class="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>

        <!-- CC Response -->
        <div
          v-if="ccResponse && paymentStatus !== 'PAID'"
          class="space-y-3"
        >
          <p class="text-gray-600">
            Pembayaran kartu kredit Anda sedang diproses.
          </p>
          <p class="text-sm text-gray-500">
            Klik tombol di bawah untuk melanjutkan pembayaran:
          </p>
          <UButton
            block
            size="lg"
            @click="openRedirectUrl"
          >
            <UIcon
              name="i-heroicons-arrow-top-right-on-square"
              class="w-5 h-5 mr-2"
            />
            Lanjutkan Pembayaran
          </UButton>
          <p class="text-sm text-gray-500 mt-4">
            Menunggu konfirmasi pembayaran... Status dicek setiap 5 detik
          </p>
          <div class="flex justify-center">
            <div class="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>

        <!-- Payment Success -->
        <div
          v-if="paymentStatus === 'PAID'"
          class="space-y-3"
        >
          <p class="text-lg font-semibold text-green-600">
            Pembayaran Anda telah berhasil!
          </p>
          <p class="text-gray-600">
            Terima kasih telah melakukan pembayaran. Anda akan dialihkan ke halaman utama dalam beberapa detik.
          </p>
        </div>
      </div>
    </UtilDialog>
  </div>
</template>
