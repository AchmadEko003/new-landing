<script setup lang="ts">
import type { BookingData, Guest, IPaymentMethod, IPaymentResponse } from '~~/shared/interface/IDetailBook'
import type { IResponse } from '~~/shared/interface/IResponse'
import type { IVaListResponse } from '~~/shared/interface/IVaList'
import { formatCurrency } from '~~/shared/script/currency'
import RingkasanPaketTambahan from '~/components/book/RingkasanPaketTambahan.vue'
import PackageDetailModal from '~/components/book/PackageDetailModal.vue'
import PaymentMethodSection from '~/components/book/PaymentMethodSection.vue'

const route = useRoute()
const toast = useToast()
const baseUrl = useRuntimeConfig().public.apiBase

// Responsive
const { width } = useWindowSize()
const computedWidth = computed(() => width.value || 0)
const showSuccessDialog = ref(false)

// State
const bookingCode = ref('')
const isSearching = ref(false)
const searchAttempted = ref(false)
const failedSearchCode = ref('')
const bookingData = ref<BookingData | null>(null)

const additionalItems = ref<any[]>([])

// Modal state for package details
const showDetailModal = ref(false)
const selectedPackage = ref<any>(null)
const packageDetails = ref<any>(null)
const loadingDetails = ref(false)
const selectedBannerIndex = ref(0)

const packageGuestSelections = ref<Map<string, Set<number>>>(new Map())
const lockedSelections = ref<Map<string, Set<number>>>(new Map())

const paymentResponse = ref<IPaymentResponse | null>(null)

// Payment loading modal state
const showPaymentLoadingModal = ref(false)
const paymentModalInvoiceId = ref<string>('')
const paymentModalRedirectUrl = ref<string>('')

const openDetailModal = async (pkg: any) => {
  selectedPackage.value = pkg
  showDetailModal.value = true
  selectedBannerIndex.value = 0

  // Fetch package details if referenceType and referenceId exist
  if (pkg.referenceType && pkg.referenceId) {
    loadingDetails.value = true
    try {
      let endpoint = ''
      if (pkg.referenceType === 'visa') {
        endpoint = `${baseUrl}/Visa/${pkg.referenceId}`
      } else if (pkg.referenceType === 'experience') {
        endpoint = `${baseUrl}/UniqueExperience/${pkg.referenceId}`
      }

      if (endpoint) {
        const response = await $fetch<any>(endpoint)
        packageDetails.value = response?.data || response
      }
    } catch (error) {
      console.error('Failed to fetch package details:', error)
      packageDetails.value = null
    } finally {
      loadingDetails.value = false
    }
  }
}

// Open package detail from additional packages section
const openPackageDetail = async (pkg: any) => {
  selectedPackage.value = pkg
  showDetailModal.value = true
  selectedBannerIndex.value = 0

  if (pkg.referenceType && pkg.referenceId) {
    loadingDetails.value = true
    try {
      let endpoint = ''
      if (pkg.referenceType === 'visa') {
        endpoint = `/Visa/${pkg.referenceId}`
      } else if (pkg.referenceType === 'experience') {
        endpoint = `/UniqueExperience/${pkg.referenceId}`
      }

      if (endpoint) {
        const response = await $fetch<any>(baseUrl + endpoint)
        packageDetails.value = response?.data || response
      }
    } catch (error) {
      console.error('Failed to fetch package details:', error)
      packageDetails.value = null
    } finally {
      loadingDetails.value = false
    }
  }
}

const selectBanner = (index: number) => {
  selectedBannerIndex.value = index
}

onMounted(() => {
  const query = route.fullPath.split('?')[1]

  if (query && query.trim() !== '') {
    bookingCode.value = query.trim()
    setTimeout(() => {
      searchBooking()
    }, 300)
  }
})

// --- SEARCH BOOKING ---
const searchBooking = async () => {
  if (!bookingCode.value.trim()) return

  isSearching.value = true
  searchAttempted.value = true

  try {
    const response = await $fetch<IResponse<BookingData>>(`${baseUrl}/Booking/additional-book-detail/${bookingCode.value}`, {
      method: 'GET'
      // query: { id: bookingCode.value }
    })

    if (!response?.data) {
      bookingData.value = null
      failedSearchCode.value = bookingCode.value
      return
    }

    // Assign booking data
    bookingData.value = response.data
    failedSearchCode.value = ''
    packageGuestSelections.value = new Map()
    lockedSelections.value = new Map()

    // Prepare additional packages
    additionalItems.value = (response.data.additionalPackages || []).map((pkg: any) => ({
      uid: pkg.uid,
      name: pkg.name,
      caption: pkg.caption,
      price: `${pkg.price.toLocaleString('id-ID')}`,
      priceValue: pkg.price,
      quantity: 0,
      referenceType: pkg.referenceType,
      referenceId: pkg.referenceId
    }))

    // Sync default selections from guest.extra_package
    response.data.guest?.forEach((guest: any, guestIndex) => {
      if (Array.isArray(guest.extra_package)) {
        guest.extra_package.forEach((uid: any) => {
          addSelection(uid, guestIndex, true)
          console.log(`Default active: Guest ${guestIndex + 1} → ${uid}`)
        })
      }
    })
  } catch (err) {
    console.error('Error fetching booking:', err)
    bookingData.value = null
    failedSearchCode.value = bookingCode.value
  } finally {
    isSearching.value = false
  }
}

interface PaymentMethodWithCode extends Omit<IPaymentMethod, 'type'> {
  code: string
  type: 'bank' | 'credit_card'
  fee: number
}

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

// --- HELPERS ---
const addSelection = (uid: string, guestIndex: number, locked = false) => {
  const map = new Map(packageGuestSelections.value)
  if (!map.has(uid)) map.set(uid, new Set())
  map.get(uid)!.add(guestIndex)
  packageGuestSelections.value = map

  if (locked) {
    const lockMap = new Map(lockedSelections.value)
    if (!lockMap.has(uid)) lockMap.set(uid, new Set())
    lockMap.get(uid)!.add(guestIndex)
    lockedSelections.value = lockMap
  }
}

const removeSelection = (uid: string, guestIndex: number) => {
  // Tidak boleh hapus kalau locked
  if (lockedSelections.value.get(uid)?.has(guestIndex)) return

  const map = new Map(packageGuestSelections.value)
  const guestSet = map.get(uid)
  if (guestSet) {
    guestSet.delete(guestIndex)
    if (guestSet.size === 0) map.delete(uid)
  }
  packageGuestSelections.value = map
}

// --- TOGGLE ACTIONS ---
const toggleGuestForPackage = (packageUid: string, guestIndex: number) => {
  const selected = isGuestSelectedForPackage(packageUid, guestIndex)

  if (selected) {
    removeSelection(packageUid, guestIndex)
  } else {
    addSelection(packageUid, guestIndex)
  }
}

const toggleAllGuestsForPackage = (packageUid: string) => {
  if (!bookingData.value?.guest) return
  const totalGuests = bookingData.value.guest.length
  const lockedGuests = lockedSelections.value.get(packageUid) || new Set()

  const allGuests = Array.from({ length: totalGuests }, (_, i) => i)
  const selectableGuests = allGuests.filter(i => !lockedGuests.has(i))

  const map = new Map(packageGuestSelections.value)
  const current = map.get(packageUid)
  const lockedCount = lockedGuests.size

  if (current && current.size === totalGuests) {
    // batalkan semua yang tidak locked
    selectableGuests.forEach(i => removeSelection(packageUid, i))
  } else {
    // aktifkan semua (termasuk yang locked tetap aktif)
    selectableGuests.forEach(i => addSelection(packageUid, i))
  }
}

// --- COMPUTED ---
const isGuestSelectedForPackage = (uid: string, guestIndex: number) => {
  return packageGuestSelections.value.get(uid)?.has(guestIndex) || false
}

const isLockedGuestSelection = (uid: string, guestIndex: number) => {
  return lockedSelections.value.get(uid)?.has(guestIndex) || false
}

const isGuestLockedForPackage = (uid: string, guestIndex: number) => {
  return lockedSelections.value.get(uid)?.has(guestIndex) || false
}

const getSelectAllButtonText = (uid: string) => {
  if (!bookingData.value?.guest) return 'Select All'
  const lockedGuests = lockedSelections.value.get(uid) || new Set()
  const selectableGuests = bookingData.value.guest.filter((_, idx) => !lockedGuests.has(idx))
  const selectedCount = packageGuestSelections.value.get(uid)?.size || 0

  if (selectedCount === selectableGuests.length && selectableGuests.length > 0) {
    return 'Deselect All'
  }
  return 'Select All'
}

// Check if all available guests are selected for a package
const getAllGuestsSelected = (uid: string) => {
  const lockedGuests = lockedSelections.value.get(uid) || new Set()
  const selectableGuests = Array.from({ length: bookingData.value?.guest?.length || 0 }, (_, i) => i).filter(i => !lockedGuests.has(i))
  const selectedGuests = packageGuestSelections.value.get(uid) || new Set()

  // All available (non-locked) guests must be selected
  return selectableGuests.length > 0 && selectableGuests.every(idx => selectedGuests.has(idx))
}

// Get guests yang belum punya package ini
const getAvailableGuestsForPackage = (uid: string) => {
  if (!bookingData.value?.guest) return []
  const lockedGuests = lockedSelections.value.get(uid) || new Set()

  return bookingData.value.guest.filter((_, index) => !lockedGuests.has(index))
}

// Get NEW selections (excluding locked ones)
const getNewSelectionsForPackage = (uid: string) => {
  const locked = lockedSelections.value.get(uid) || new Set()
  const selected = packageGuestSelections.value.get(uid) || new Set()
  // Only count selections that are NOT locked
  return [...selected].filter(idx => !locked.has(idx)).length
}

// Get guests yang sudah punya package ini
const getLockedGuestsForPackage = (uid: string) => {
  if (!bookingData.value?.guest) return []
  const lockedGuests = lockedSelections.value.get(uid) || new Set()

  return bookingData.value.guest.filter((_, index) => lockedGuests.has(index))
}

// Packages yang sudah ditambahkan (ada di extra_package guest)
const packagesAlreadyAdded = computed(() => {
  if (!bookingData.value?.guest) return []

  const packageMap = new Map<string, any[]>()

  // Collect all packages from guest.extra_package
  bookingData.value.guest.forEach((guest: any) => {
    if (Array.isArray(guest.extra_package)) {
      guest.extra_package.forEach((pkgUid: string) => {
        if (!packageMap.has(pkgUid)) {
          packageMap.set(pkgUid, [])
        }
        packageMap.get(pkgUid)!.push(guest)
      })
    }
  })

  // Map to include package details
  return Array.from(packageMap.entries()).map(([uid, guests]) => {
    const pkg = additionalItems.value.find(p => p.uid === uid)
    return {
      pkg,
      guests
    }
  }).filter(item => item.pkg)
})

// Packages yang bisa ditambahkan (minimal ada 1 guest yang belum punya)
const availablePackages = computed(() => {
  if (!bookingData.value?.guest) return []
  const totalGuests = bookingData.value.guest.length

  return additionalItems.value.filter((pkg) => {
    const lockedGuests = lockedSelections.value.get(pkg.uid) || new Set()
    // Hanya tampilkan jika ada minimal 1 guest yang belum punya package ini
    return lockedGuests.size < totalGuests
  })
})

// New selections summary (for payment detail section)
const newPackageSelections = computed(() => {
  const selections: Array<{
    pkg: any
    guests: Array<{ name: string, index: number }>
    subtotal: number
  }> = []

  packageGuestSelections.value.forEach((guestSet, uid) => {
    const lockedSet = lockedSelections.value.get(uid) || new Set()
    const nonLockedGuests = [...guestSet].filter(i => !lockedSet.has(i))

    if (nonLockedGuests.length > 0 && bookingData.value?.guest) {
      const pkg = additionalItems.value.find(p => p.uid === uid)
      if (pkg) {
        const guestList = nonLockedGuests.map(idx => ({
          name: bookingData.value?.guest?.[idx]?.name || '',
          index: idx
        }))

        selections.push({
          pkg,
          guests: guestList,
          subtotal: pkg.priceValue * nonLockedGuests.length
        })
      }
    }
  })

  return selections
})

// Total price from new selections
const newPackageSelectionsTotal = computed(() => {
  return newPackageSelections.value.reduce((sum, item) => sum + item.subtotal, 0)
})

const formattedDepartureDate = computed(() => {
  if (!bookingData.value?.jadwalKeberangkatan) return ''

  try {
    const [start, end] = bookingData.value.jadwalKeberangkatan.split(' - ')
    if (!start || !end) return bookingData.value.jadwalKeberangkatan

    const startDate = parseDate(start)
    const endDate = parseDate(end)

    if (!startDate || !endDate) return bookingData.value.jadwalKeberangkatan

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }

    return `${startDate.toLocaleDateString('id-ID', options)} - ${endDate.toLocaleDateString('id-ID', options)}`
  } catch {
    return bookingData.value?.jadwalKeberangkatan || ''
  }
})

const tripDuration = computed(() => {
  if (!bookingData.value?.jadwalKeberangkatan) return 'N/A'

  try {
    const [start, end] = bookingData.value.jadwalKeberangkatan.split(' - ')
    if (!start || !end) return 'N/A'

    const startDate = parseDate(start)
    const endDate = parseDate(end)

    if (!startDate || !endDate) return 'N/A'

    const diffMs = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

    return `${diffDays + 1} Hari ${diffDays} Malam`
  } catch {
    return 'N/A'
  }
})

const parseDate = (dateStr: string): Date | null => {
  try {
    const parts = dateStr.trim().split('/')
    if (parts.length !== 3) return null

    const month = parseInt(parts[0] || '0')
    const day = parseInt(parts[1] || '0')
    const year = parseInt(parts[2] || '0')

    if (isNaN(month) || isNaN(day) || isNaN(year)) return null

    const date = new Date(year, month - 1, day)
    return isNaN(date.getTime()) ? null : date
  } catch {
    return null
  }
}

// const { copyFeedback, showCopyFeedback, copyVirtualAccount: copyVA } = useCopyVirtualAccount()

// const copyVirtualAccount = async () => {
//   if (!paymentResponse.value?.data.va.va) return
//   await copyVA(paymentResponse.value.data.va.va)
// }

// Handle payment success from PaymentMethodSection component
const handlePaymentSuccess = (response: any) => {
  paymentResponse.value = response
  showSuccessDialog.value = true

  toast.add({
    title: 'Success',
    description: 'Pembayaran berhasil diproses',
    color: 'success'
  })
}

// Handle payment error from PaymentMethodSection component
const handlePaymentError = (error: string) => {
  toast.add({
    title: 'Payment Error',
    description: error,
    color: 'error'
  })
}

const formatGuestId = (whatsappNumber: string, name: string): string => {
  const last4Digits = whatsappNumber.slice(-4)
  const first3Letters = name.substring(0, 3).toUpperCase()
  return `${last4Digits}${first3Letters}`
}

const formData = computed(() => {
  const extraPackage: Array<{
    uid: string
    quantity: number
    guest: string[]
  }> = []

  packageGuestSelections.value?.forEach((guestSet, uid) => {
    const lockedSet = lockedSelections.value.get(uid) || new Set()
    const nonLockedGuests = [...guestSet].filter(i => !lockedSet.has(i))

    if (nonLockedGuests.length > 0) {
      const guestIds = nonLockedGuests.map((i) => {
        const guest = bookingData.value?.guest[i]
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

  return {
    customers: bookingData.value?.guest.map((guest: Guest) => ({
      name: guest.name,
      whatsappNumber: guest.whatsapp_number || guest.whatsappNumber || '',
      gender: guest.gender
    })) || [],
    extraPackage: extraPackage,
    bookNumber: bookingData.value?.noPesanan || ''
  }
})
</script>

<template>
  <div>
    <div class="min-h-screen bg-gray-50 py-8">
      <!-- Desktop View -->
      <!-- v-if="computedWidth > 720" -->
      <div
        class="container mx-auto px-4 max-w-4xl"
      >
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Cek Trip Saya
          </h1>
          <p class="text-gray-600">
            Masukkan kode booking untuk melihat detail perjalanan
          </p>
        </div>

        <!-- Search Section -->
        <UCard class="mb-8">
          <div class="max-w-md mx-auto">
            <UFormGroup
              label="Kode Booking"
              name="bookingCode"
              required
            >
              <div class="flex gap-3">
                <UInput
                  v-model="bookingCode"
                  placeholder="No. Pesanan (cth: 000000)"
                  size="lg"
                  class="flex-1"
                  @keyup.enter="searchBooking"
                />
                <UButton
                  size="lg"
                  :disabled="!bookingCode.trim()"
                  :loading="isSearching"
                  @click="searchBooking"
                >
                  Cari
                </UButton>
              </div>
            </UFormGroup>
          </div>
        </UCard>

        <!-- Error Message (booking not found) -->
        <UCard
          v-if="searchAttempted && !isSearching && failedSearchCode && !bookingData"
          class="border-red-200 bg-red-50"
        >
          <div class="flex gap-3 items-start">
            <UIcon
              name="i-heroicons-x-circle"
              class="w-6 h-6 text-red-600 shrink-0 mt-0.5"
            />
            <div>
              <h3 class="font-semibold text-red-900">
                Booking Tidak Ditemukan
              </h3>
              <p class="text-sm text-red-700">
                Kode booking "{{ failedSearchCode }}" tidak terdaftar dalam
                sistem. Silakan periksa kembali kode booking Anda.
              </p>
            </div>
          </div>
        </UCard>

        <!-- Booking Details (shown after successful search) -->
        <div
          v-if="bookingData"
          class="space-y-6"
        >
          <!-- Detail Section -->
          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                Detail Booking
              </h2>
            </template>

            <div class="grid grid-cols-2 gap-6">
              <div>
                <h3 class="font-semibold mb-3">
                  Informasi Booking
                </h3>
                <dl class="space-y-2">
                  <div class="flex justify-between">
                    <dt class="text-gray-600">
                      Kode Booking:
                    </dt>
                    <dd class="font-medium">
                      {{ bookingData.noPesanan }}
                    </dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-gray-600">
                      Nama Trip:
                    </dt>
                    <dd class="font-medium">
                      {{ bookingData.tripName }}
                    </dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-gray-600">
                      Tanggal Berangkat:
                    </dt>
                    <dd class="font-medium">
                      {{ formattedDepartureDate }}
                    </dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-gray-600">
                      Durasi:
                    </dt>
                    <dd class="font-medium">
                      {{ tripDuration }}
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 class="font-semibold mb-3">
                  Informasi Pelanggan
                </h3>
                <dl class="space-y-2">
                  <div
                    v-if="bookingData.guest?.[0]"
                    class="flex justify-between"
                  >
                    <dt class="text-gray-600">
                      Nama:
                    </dt>
                    <dd class="font-medium">
                      {{ bookingData.guest[0].gender }} {{
                        bookingData.guest[0].name }}
                    </dd>
                  </div>
                  <div
                    v-if="bookingData.guest?.[0]?.email"
                    class="flex justify-between"
                  >
                    <dt class="text-gray-600">
                      Email:
                    </dt>
                    <dd class="font-medium">
                      {{ bookingData.guest[0].email }}
                    </dd>
                  </div>
                  <div
                    v-if="bookingData.guest?.[0]?.whatsappNumber"
                    class="flex justify-between"
                  >
                    <dt class="text-gray-600">
                      WhatsApp:
                    </dt>
                    <dd class="font-medium">
                      {{ bookingData.guest[0].whatsappNumber }}
                    </dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-gray-600">
                      Jumlah Peserta:
                    </dt>
                    <dd class="font-medium">
                      {{ bookingData.guest?.length || 0 }} orang
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <UDivider class="my-4" />

            <div>
              <h3 class="font-semibold mb-3">
                Informasi Pembayaran
              </h3>
              <dl class="space-y-2">
                <div class="flex justify-between">
                  <dt class="text-gray-600">
                    Total Pembayaran:
                  </dt>
                  <dd class="font-semibold text-lg">
                    Rp {{
                      bookingData.fixTotalPrice?.toLocaleString('id-ID') || 0 }}
                  </dd>
                </div>
                <div
                  v-if="bookingData.useDiscount"
                  class="flex justify-between"
                >
                  <dt class="text-gray-600">
                    Diskon:
                  </dt>
                  <dd>
                    <UBadge variant="solid">
                      Aktif
                    </UBadge>
                  </dd>
                </div>
              </dl>
            </div>
          </UCard>

          <!-- Section 1: Paket Tambahan yang Sudah Ditambahkan -->
          <BookPackageAlreadyAdded
            v-if="bookingData"
            :packages-already-added="packagesAlreadyAdded"
            :total-guests="bookingData.guest.length"
            @open-detail="openPackageDetail"
          />

          <!-- Section 2: Paket Tambahan yang Bisa Ditambahkan -->
          <BookAvailablePackages
            v-if="bookingData"
            :available-packages="availablePackages"
            :guests="bookingData.guest"
            :is-guest-selected-for-package="isGuestSelectedForPackage"
            :is-guest-locked-for-package="isGuestLockedForPackage"
            :get-available-guests-for-package="getAvailableGuestsForPackage"
            :get-new-selections-for-package="getNewSelectionsForPackage"
            :get-all-guests-selected="getAllGuestsSelected"
            :get-select-all-button-text="getSelectAllButtonText"
            @toggle-guest="({ packageUid, guestIndex }) => toggleGuestForPackage(packageUid, guestIndex)"
            @toggle-all="toggleAllGuestsForPackage"
            @open-detail="openPackageDetail"
          />

          <!-- Section 3: Payment Summary -->
          <RingkasanPaketTambahan
            v-if="bookingData"
            :new-package-selections="newPackageSelections"
            :new-package-selections-total="newPackageSelectionsTotal"
          />

          <!-- Section 4: Payment Method Selection -->
          <PaymentMethodSection
            v-if="bookingData"
            :new-package-selections-total="newPackageSelectionsTotal"
            :new-package-selections="newPackageSelections"
            :booking-data="bookingData"
            :package-guest-selections="packageGuestSelections"
            :locked-selections="lockedSelections"
            @payment-success="handlePaymentSuccess"
            @payment-error="handlePaymentError"
          />

          <CardPayment :form-data="formData" type-payment="additional" />
        </div>
      </div>

      <!-- Mobile View -->
      <!-- v-else -->
      <!-- <div
        class="px-4"
      >

        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-1">
            Cek Trip Saya
          </h1>
          <p class="text-sm text-gray-600">
            Masukkan kode booking Anda
          </p>
        </div>

        <UCard class="mb-6">
          <UFormGroup
            label="Kode Booking"
            name="bookingCode"
            required
            class="w-full"
          >
            <UInput
              v-model="bookingCode"
              placeholder="No. Pesanan (cth: 000000)"
              size="md"
              class="mb-3 w-full"
              @keyup.enter="searchBooking"
            />
            <UButton
              block
              :disabled="!bookingCode.trim()"
              :loading="isSearching"
              @click="searchBooking"
            >
              Cari Booking
            </UButton>
          </UFormGroup>
        </UCard>

        <div
          v-if="bookingData"
          class="space-y-4"
        >
          <UCard>
            <template #header>
              <h3 class="font-semibold">
                Detail Booking
              </h3>
            </template>

            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-semibold text-gray-700 mb-2">
                  Info Booking
                </h4>
                <dl class="space-y-1 text-sm">
                  <div class="flex justify-between">
                    <dt class="text-gray-600">
                      Kode:
                    </dt>
                    <dd class="font-medium">
                      {{ bookingData.noPesanan }}
                    </dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-gray-600">
                      Trip:
                    </dt>
                    <dd class="font-medium text-xs">
                      {{ bookingData.tripName }}
                    </dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-gray-600">
                      Berangkat:
                    </dt>
                    <dd class="font-medium text-xs">
                      {{ formattedDepartureDate }}
                    </dd>
                  </div>
                </dl>
              </div>

              <UDivider />

              <div>
                <h4 class="text-sm font-semibold text-gray-700 mb-2">
                  Info Pelanggan
                </h4>
                <dl class="space-y-1 text-sm">
                  <div
                    v-if="bookingData.guest?.[0]"
                    class="flex justify-between"
                  >
                    <dt class="text-gray-600">
                      Nama:
                    </dt>
                    <dd class="font-medium">
                      {{ bookingData.guest[0].gender }} {{
                        bookingData.guest[0].name }}
                    </dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-gray-600">
                      Peserta:
                    </dt>
                    <dd class="font-medium">
                      {{ bookingData.guest?.length || 0 }} orang
                    </dd>
                  </div>
                </dl>
              </div>

              <UDivider />

              <div>
                <h4 class="text-sm font-semibold text-gray-700 mb-2">
                  Pembayaran
                </h4>
                <dl class="space-y-1 text-sm">
                  <div class="flex justify-between">
                    <dt class="text-gray-600">
                      Total:
                    </dt>
                    <dd class="font-semibold">
                      Rp {{
                        bookingData.fixTotalPrice?.toLocaleString('id-ID')
                          || 0 }}
                    </dd>
                  </div>
                  <div
                    v-if="bookingData.useDiscount"
                    class="flex justify-between"
                  >
                    <dt class="text-gray-600">
                      Diskon:
                    </dt>
                    <dd>
                      <UBadge
                        size="xs"
                        variant="solid"
                      >
                        Aktif
                      </UBadge>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div> -->
    </div>

    <UtilDialog
      v-model="showSuccessDialog"
      title="🎉 Booking Berhasil!"
      description="Pembayaran Anda telah berhasil dibuat. Silakan selesaikan pembayaran sesuai instruksi."
      size="lg"
      :closable="true"
      :show-footer="true"
    >
      <template #footer="{ close }">
        <div class="flex justify-center">
          <UButton
            :to="`/`"
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
            Bersiaplah untuk petualangan yang menakjubkan! Detail pembayaran telah dikirim ke email Anda.
          </p>
        </div>

        <!-- Copy Feedback Notification -->
        <div
          v-if="showCopyFeedback"
          class="bg-green-100 border border-green-200 rounded-lg p-3 text-center transition-all duration-300"
          :class="showCopyFeedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
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
            <span class="text-sm font-medium">{{ copyFeedback }}</span>
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
                <span class="font-semibold">{{ paymentResponse.data.va.bankCode }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Virtual Account</span>
                <div class="flex items-center gap-2">
                  <span class="font-mono font-semibold">{{ paymentResponse.data.va.va }}</span>
                  <button
                    class="text-gray-500 hover:text-primary transition-colors p-1 rounded"
                    title="Copy Virtual Account"
                    @click="copyVirtualAccount"
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
                <span class="font-semibold">{{ paymentResponse.data.va.custName }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Jumlah Transfer</span>
                <span class="font-bold text-lg">{{ formatCurrency(paymentResponse.data.va.amount)
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Berlaku Hingga</span>
                <span class="font-semibold">
                  {{ new Date(paymentResponse.data.va.expired).toLocaleString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Important Notes -->
          <PaymentNextSteps />
        </div>
      </div>
    </UtilDialog>

    <!-- Detail Modal for Extra Packages -->
    <PackageDetailModal
      v-model="showDetailModal"
      :selected-package="selectedPackage"
      :package-details="packageDetails"
      :loading-details="loadingDetails"
      :selected-banner-index="selectedBannerIndex"
      @select-banner="selectBanner"
    />

    <!-- Payment Loading Modal (CC) -->
    <PaymentLoadingModal
      :is-open="showPaymentLoadingModal"
      :invoice-id="paymentModalInvoiceId"
      :redirect-url="paymentModalRedirectUrl"
    />
  </div>
</template>
