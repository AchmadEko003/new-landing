<script lang="ts" setup>
import type { IResponseList } from '~~/shared/interface/IResponse'
import type { ITrip, ITripCard } from '~~/shared/interface/ITrip'

// Reactive variables for search and filtering
const baseUrl = useRuntimeConfig().public.apiBase

const searchQuery = ref('')
const selectedSort = ref('')
const selectedPriceRange = ref('')

// Fetch trip data from API
const { data: tripData, pending, error, refresh } = useLazyFetch<IResponseList<ITrip>>(`${baseUrl}/Trip/trip.list`, {
  key: 'trip-list'
})

// Transform ITrip data to ITripCard format
const tripCards = computed(() => {
  if (!tripData.value?.data) return []

  return tripData.value.data.map((trip: ITrip): ITripCard => ({
    imageSrc: trip.banner?.[0] || 'default',
    title: trip.name,
    days: String(trip.days),
    summary: `Trip ke ${trip.countryName}`,
    startPrice: parseInt(String(trip.price).replace(/[^\d]/g, '')) || 0,
    tripId: trip.uid,
    url: `/trip/${trip.uid}`
  }))
})

// Filtered and sorted trips
const filteredTrips = computed(() => {
  if (!tripCards.value) return []

  let filtered = [...tripCards.value]

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(trip =>
      trip.title.toLowerCase().includes(query)
      || (trip.summary || '').toLowerCase().includes(query)
    )
  }

  // Apply price range filter
  if (selectedPriceRange.value) {
    filtered = filtered.filter((trip: ITripCard) => {
      const price = trip.startPrice
      switch (selectedPriceRange.value) {
        case 'under-5m':
          return price < 5000000
        case '5m-10m':
          return price >= 5000000 && price < 10000000
        case '10m-20m':
          return price >= 10000000 && price < 20000000
        case 'over-20m':
          return price >= 20000000
        default:
          return true
      }
    })
  }

  // Apply sorting
  if (selectedSort.value) {
    filtered.sort((a, b) => {
      switch (selectedSort.value) {
        case 'price-asc':
          return a.startPrice - b.startPrice
        case 'price-desc':
          return b.startPrice - a.startPrice
        case 'name-asc':
          return a.title.localeCompare(b.title)
        case 'name-desc':
          return b.title.localeCompare(a.title)
        case 'duration-asc':
          return parseInt(a.days) - parseInt(b.days)
        case 'duration-desc':
          return parseInt(b.days) - parseInt(a.days)
        default:
          return 0
      }
    })
  }

  return filtered
})

// Clear all filters
const clearFilters = () => {
  searchQuery.value = ''
  selectedSort.value = ''
  selectedPriceRange.value = ''
}

// SEO
useHead({
  title: 'Trip - Peponi Travel',
  meta: [
    { name: 'description', content: 'Jelajahi berbagai pilihan trip menarik dari Peponi Travel. Temukan petualangan impianmu di destinasi terbaik dunia.' }
  ]
})

useSeoMeta({
  title: 'Trip - Peponi Travel',
  description: 'Jelajahi berbagai pilihan trip menarik dari Peponi Travel. Temukan petualangan impianmu di destinasi terbaik dunia.',
  ogTitle: 'Trip - Peponi Travel',
  ogDescription: 'Jelajahi berbagai pilihan trip menarik dari Peponi Travel. Temukan petualangan impianmu di destinasi terbaik dunia.',
  ogImage: '/assets/peponi-og-image.png',
  ogImageAlt: 'Trip - Peponi Travel',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Trip - Peponi Travel',
  twitterDescription: 'Jelajahi berbagai pilihan trip menarik dari Peponi Travel. Temukan petualangan impianmu di destinasi terbaik dunia.'
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
    <!-- Hero Section with Search -->
    <div
      class="relative py-16 md:py-24 bg-cover bg-center bg-no-repeat"
      style="background-image: url('http://103.189.234.243/img-asset/country/tojsiyw7.jpeg')"
    >
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/[1%] to-transparent" />
      <div class="relative container mx-auto px-4">
        <div class="text-center text-white">
          <h1
            class="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-t from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent"
          >
            Jelajahi Destinasi Impianmu
          </h1>
          <p class="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Temukan petualangan unik seperti lokal di destinasi terbaik dunia bersama Peponi
          </p>

          <!-- Search and Filter Bar -->
          <div class="max-w-4xl mx-auto bg-white backdrop-blur-sm rounded-full py-2 pl-6 pr-2 shadow-2xl">
            <div class="flex flex-row gap-4 items-center">
              <div class="flex-1">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="w-full text-black outline-0 text-lg"
                  placeholder="Cari destinasi impianmu"
                >
              </div>
              <button
                class="cursor-pointer bg-primary rounded-full w-11 h-11 flex items-center justify-center active:scale-95 transition-transform"
              >
                <UIcon
                  name="i-heroicons-magnifying-glass"
                  class="w-6 h-6 font-bold text-white"
                />
                <!-- <ImageIcon name="search.png" folder="assets/icon" size="lg" class="text-white" /> -->
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12">
      <!-- Results Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
            {{ filteredTrips.length > 0 ? `${filteredTrips.length} Trip Ditemukan` : 'Semua Trip' }}
          </h2>
          <p
            v-if="searchQuery || selectedPriceRange"
            class="text-gray-600 mt-1"
          >
            <span v-if="searchQuery">Pencarian: "{{ searchQuery }}"</span>
            <span v-if="searchQuery && selectedPriceRange"> • </span>
            <span v-if="selectedPriceRange">{{ selectedPriceRange }}</span>
          </p>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="pending"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <div
          v-for="n in 8"
          :key="n"
          class="animate-pulse"
        >
          <div class="bg-gray-200 rounded-3xl overflow-hidden">
            <div class="h-48 bg-gray-300" />
            <div class="p-6 space-y-3">
              <div class="h-4 bg-gray-300 rounded w-3/4" />
              <div class="h-3 bg-gray-300 rounded w-1/2" />
              <div class="h-3 bg-gray-300 rounded w-2/3" />
              <div class="h-8 bg-gray-300 rounded w-full mt-4" />
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="text-center py-20"
      >
        <div class="max-w-md mx-auto">
          <UIcon
            name="i-heroicons-exclamation-triangle"
            class="w-16 h-16 text-red-500 mx-auto mb-4"
          />
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            Oops! Terjadi Kesalahan
          </h3>
          <p class="text-gray-600 mb-6">
            Maaf, terjadi kesalahan saat memuat data trip. Silakan coba lagi.
          </p>
          <UButton
            size="lg"
            icon="i-heroicons-arrow-path"
            @click="refresh()"
          >
            >
            Coba Lagi
          </UButton>
        </div>
      </div>

      <!-- Trip Grid -->
      <div v-else-if="filteredTrips && filteredTrips.length > 0">
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 items-stretch">
          <CardTrip
            v-for="trip in filteredTrips"
            :key="trip.tripId"
            v-bind="trip"
          />
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="text-center py-20"
      >
        <div class="max-w-md mx-auto">
          <UIcon
            name="i-heroicons-map"
            class="w-16 h-16 text-gray-400 mx-auto mb-4"
          />
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            {{ searchQuery ? 'Tidak Ada Trip Ditemukan' : 'Belum Ada Trip Tersedia' }}
          </h3>
          <p class="text-gray-600 mb-6">
            {{ searchQuery
              ? `Coba ubah kata kunci pencarian atau filter yang dipilih.`
              : `Saat ini belum ada trip yang tersedia. Silakan kembali lagi nanti.`
            }}
          </p>
          <UButton
            v-if="searchQuery || selectedPriceRange"
            variant="outline"
            @click="clearFilters"
          >
            Reset Filter
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
