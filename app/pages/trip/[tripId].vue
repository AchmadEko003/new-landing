<script lang="ts" setup>
import type { IResponse } from '~~/shared/interface/IResponse'
import type { ITripAccomodation, ITripDetail, ITripRating } from '~~/shared/interface/ITrip'
// import type { IAdditionalInfo } from '~~/shared/interface/IAdditionalInfo'

const route = useRoute()
const router = useRouter()
const tripId = computed(() => route.params.tripId as string)
const { width } = useWindowSize()

const { sanitizeHtml } = useSanitize()

const sections = [
  { id: 'summary-trip-section', title: 'Ringkasan' },
  { id: 'suitability-section', title: 'Apakah sesuai untukmu?' },
  { id: 'itinerary-section', title: 'Itinerary' },
  { id: 'included-section', title: 'Termasuk & Tidak Termasuk' },
  { id: 'accommodation-section', title: 'Akomodasi' },
  { id: 'reviews-section', title: 'Ulasan' },
  { id: 'faqs-section', title: 'FAQs' },
  { id: 'schedule-section', title: 'Jadwal Trip' }
]

// Detail trip
const {
  data: tripDetailData,
  pending: tripPending,
  error: tripError
} = useFetch<IResponse<ITripDetail>>(`/api/trips/${tripId.value}`)

const {
  data: tripRatingData,
  pending: ratingPending,
  error: ratingError
} = useLazyFetch<IResponse<ITripRating[]>>(`/api/trips/review/${tripId.value}`)

// const {
//   data: additionalInfoData,
//   pending: additionalInfoPending,
//   error: additionalInfoError
// } = useLazyFetch<IResponse<IAdditionalInfo[]>>(
//   `/api/additional-info/${tripId.value}`
// )

const trip = computed(() => tripDetailData.value?.data)
const ratings = computed(() =>
  Array.isArray(tripRatingData.value?.data) ? tripRatingData.value?.data : []
)
// const additionalInfoList = computed(() =>
//   Array.isArray(additionalInfoData.value?.data)
//     ? additionalInfoData.value?.data
//     : []
// )

const accommodationList = computed(() => {
  if (!trip.value?.accomodation) return []

  // Handle case where accomodation is an array
  console.log('asd', trip.value.accomodation)
  if (Array.isArray(trip.value.accomodation)) {
    return trip.value.accomodation.map((item: any) => {
      // Get first thumbnail if available, fallback to image, then placeholder
      const image = item.thumbnail?.[0]
        ? `/accommodation/${item.thumbnail[0]}.jpeg`
        : item.image || '/placeholder-accommodation.jpg'

      return {
        image,
        name: item.name || 'Unnamed Accommodation',
        location: item.location || '',
        rating: item.rating || 0,
        reviewCount: item.reviewCount || 0,
        description: item.content || '',
        images: Array.isArray(item.thumbnail) ? item.thumbnail : [],
        basic: item.basic
      }
    })
  }

  // Handle case where accomodation is a single object
  if (typeof trip.value.accomodation === 'object') {
    const accommodation = trip.value.accomodation as ITripAccomodation

    // Get first thumbnail if available, fallback to image, then placeholder
    const image = accommodation.thumbnail?.[0]
      ? `/accommodation/${accommodation.thumbnail[0]}.jpeg`
      : accommodation.image || '/placeholder-accommodation.jpg'

    return [
      {
        image,
        name: accommodation.name || 'Unnamed Accommodation',
        location: accommodation.location || '',
        rating: accommodation.rating || 0,
        reviewCount: accommodation.reviewCount || 0,
        description: accommodation.content || '',
        facilities: Array.isArray(accommodation.facilities)
          ? accommodation.facilities
          : [],
        images: Array.isArray(accommodation.thumbnail)
          ? accommodation.thumbnail
          : [],
        basic: accommodation.basic
      }
    ]
  }

  return []
})

const suitAbility = computed(() => sanitizeHtml(trip.value?.suitability || ''))

// For sticky mobile info
const tripScheduleRef = ref()
const firstAvailablePrice = ref(0)
const showStickyMobileInfo = ref(true)

// Fetch the minimum price from trip data
watchEffect(() => {
  if (trip.value?.price) {
    firstAvailablePrice.value = trip.value.price
  }
})

// Hide sticky mobile info when user is in schedule section
onMounted(() => {
  const scheduleSection = document.getElementById('schedule-section')
  if (scheduleSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          showStickyMobileInfo.value = !entry.isIntersecting
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(scheduleSection)
  }
})

const scrollToSchedule = () => {
  const scheduleSection = document.getElementById('schedule-section')
  if (scheduleSection) {
    scheduleSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Navigate to experience detail page
const navigateToExperience = async (experience: any) => {
  const slug = experience.name.toLowerCase().replace(/\s+/g, '-')
  await router.push(`/pengalaman-unik/${slug}_${experience.uid}`)
}
</script>

<template>
  <div
    v-if="tripPending"
    class="flex items-center justify-center h-[50dvh] md:h-[75dvh]"
  >
    <span class="text-gray-500">Loading trip details...</span>
  </div>
  <div
    v-else-if="tripError"
    class="flex items-center justify-center h-[50dvh] md:h-[75dvh]"
  >
    <span class="text-red-500">{{ tripError.message || tripError }}</span>
  </div>
  <div
    v-else-if="!trip"
    class="flex items-center justify-center h-[50dvh] md:h-[75dvh]"
  >
    <span class="text-gray-500">Trip not found.</span>
  </div>
  <div v-else>
    <CarouselTripBanner
      :images="trip.bannerImages"
      :trip-name="trip.name"
    />

    <NavigationAnchorNav :sections="sections" />

    <div class="py-8 px-3 md:px-28 flex flex-col gap-8">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold">
          {{ trip.name }}
        </h1>
        <div class="text-xl text-primary font-semibold">
          Destinasi
          <span class="text-gray-800">{{ trip.country }}</span>
        </div>
        <p class="text-lg font-medium">
          {{ trip.headline }}
        </p>
        <p class="text-lg font-medium">
          {{ trip.summary }}
        </p>
      </div>

      <section id="summary-trip-section">
        <h1 class="text-3xl font-bold mb-6">
          Ringkasan Trip
        </h1>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          <div
            v-if="width <= 768"
            class="flex flex-col"
          >
            <table>
              <tbody>
                <tr>
                  <td class="font-semibold w-36">
                    Durasi
                  </td>
                  <td>{{ trip.days }} hari</td>
                </tr>
                <tr>
                  <td class="font-semibold w-36">
                    Destinasi
                  </td>
                  <td>{{ trip.destination }}</td>
                </tr>
                <tr>
                  <td class="font-semibold w-36">
                    Transportasi
                  </td>
                  <td>{{ trip.transportation }}</td>
                </tr>
                <tr>
                  <td class="font-semibold w-36">
                    Meeting Point
                  </td>
                  <td>{{ trip.meetingPoint }}</td>
                </tr>
                <tr>
                  <td class="font-semibold w-36">
                    Ukuran Group
                  </td>
                  <td>{{ trip.groupSize }} orang</td>
                </tr>
                <tr>
                  <td class="font-semibold w-36">
                    Tim
                  </td>
                  <td>{{ trip.team }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Trip Details Cards -->
          <div
            v-else
            class="space-y-4"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Duration Card -->
              <CardTripSummary
                label="Durasi"
                :value="`${trip.days} hari`"
                icon="calendar"
              />

              <!-- Destination Card -->
              <CardTripSummary
                label="Destinasi"
                :value="trip.destination"
                icon="destinasi"
              />

              <!-- Transportation Card -->
              <CardTripSummary
                label="Transportasi"
                :value="trip.transportation"
                icon="transportation"
              />

              <!-- Meeting Point Card -->
              <CardTripSummary
                label="Meeting Point"
                :value="trip.meetingPoint"
                icon="meeting-point"
              />

              <!-- Group Size Card -->
              <CardTripSummary
                label="Ukuran Group"
                :value="`${trip.groupSize} orang`"
                icon="group"
              />

              <!-- Team Card -->
              <CardTripSummary
                label="Tim"
                :value="trip.team"
                icon="team"
              />
            </div>

            <!-- Documentation Card (Full Width) -->
            <CardTripSummary
              label="Dokumentasi"
              :value="trip.documentation"
              icon="dokumentasi"
            />
          </div>

          <!-- Map Image -->
          <div class="flex items-center justify-center">
            <ImageResponsive
              :img-url="`/trip/${trip.mapImage}.jpeg`"
              alt="Trip Map"
              class="rounded-xl w-full h-auto max-h-96 object-cover"
            />
          </div>
        </div>
      </section>

      <section>
        <div class="mb-6">
          <h2 class="text-2xl font-semibold mb-2">
            Pengalaman utama
          </h2>
          <div class="grid grid-cols-3 gap-5">
            <div
              v-for="(item, i) in trip.uniqueExperience.slice(0, 9)"
              :key="i"
              class="cursor-pointer"
              @click="navigateToExperience(item)"
            >
              <ImageThumbnail
                v-bind="item"
                :title="item.name"
                aspect-auto
                :img-url="`/unique-experience/512_${item.uid}.webp`"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="suitability-section">
        <div class="mb-6 md:grid md:grid-cols-2">
          <h2 class="text-2xl font-semibold mb-2">
            Apakah trip ini sesuai untukmu?
          </h2>
          <!-- <div class="prose" v-html="suitAbility" /> -->
          <UtilHtmlRender :content="suitAbility" />
        </div>
      </section>

      <section id="itinerary-section">
        <div class="mb-6">
          <h2 class="text-2xl font-semibold mb-2">
            Itinerary
          </h2>
          <UAccordion
            v-if="trip.itineraries && trip.itineraries.length"
            :items="trip.itineraries.map((item: any, i: number) => ({
              label: `Day ${i + 1} ${item.title}`,
              content: sanitizeHtml(item.content || ''),
              banners: item.banners || []
            }))
            "
            :ui="{
              trigger: 'cursor-pointer',
              label: 'text-xl font-bold',
              trailingIcon: 'text-primary h-8 w-8'
            }"
          >
            <!-- content: sanitizeHtml(item.content || '')  -->
            <template #content="{ item }">
              <div
                v-if="item.banners && item.banners.length > 0"
                class="mb-4"
              >
                <UCarousel
                  arrows
                  :items="item.banners"
                  :prev="{ icon: 'i-heroicons-chevron-left-20-solid', size: 'lg', color: 'neutral', class: 'hover:opacity-100 opacity-70' }"
                  :next="{ icon: 'i-heroicons-chevron-right-20-solid', size: 'lg', color: 'neutral', class: 'hover:opacity-100 opacity-70' }"
                  :ui="{
                    item: 'basis-full md:basis-1/2',
                    container: 'rounded-lg',
                    prev: 'absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/80 hover:bg-white shadow-lg',
                    next: 'absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/80 hover:bg-white shadow-lg'
                  }"
                  class="rounded-lg overflow-hidden"
                >
                  <template #default="{ item: banner }">
                    <img
                      :src="`http://103.189.234.243/img-asset/trip/${banner}.jpeg`"
                      :alt="`Banner for Day ${item.label}`"
                      class="w-full h-96 object-cover"
                      draggable="false"
                    >
                  </template>
                </UCarousel>
              </div>
              <div
                class="prose prose-sm max-w-none text-gray-700"
                v-html="sanitizeHtml(item.content || '')"
              />
            </template>
          </UAccordion>
          <div v-else>
            Tidak ada itinerary.
          </div>
        </div>
      </section>

      <section
        id="included-section"
        class="mb-6"
      >
        <h2 class="text-2xl font-semibold mb-6">
          Termasuk & Tidak Termasuk
        </h2>
        <div v-if="trip.included && trip.included.length">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="item in trip.included"
              :key="item.order"
              class="flex items-start gap-3"
            >
              <UIcon
                :name="item.isIncluded
                  ? 'i-heroicons-check-circle'
                  : 'i-heroicons-x-circle'
                "
                :class="item.isIncluded
                  ? 'text-green-500'
                  : 'text-red-500'
                "
                class="text-lg mt-0.5"
              />
              <div>
                <h4 class="font-semibold text-gray-900">
                  {{ item.title }}
                </h4>
                <p class="text-gray-600 text-sm">
                  {{ item.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="text-gray-500"
        >
          Tidak ada informasi termasuk/tidak termasuk.
        </div>
      </section>

      <section
        id="accommodation-section"
        class="mb-6"
      >
        <h2 class="text-2xl font-semibold mb-6">
          Akomodasi
        </h2>
        <div v-if="accommodationList.length">
          <CarouselAccommodation :accommodation-list="accommodationList" />
        </div>
        <div
          v-else
          class="text-gray-500"
        >
          Tidak ada informasi akomodasi.
        </div>
      </section>

      <!-- <section id="additional-info-section" class="mb-6">
                <h2 class="text-2xl font-semibold mb-6">Informasi Tambahan</h2>
                <div v-if="additionalInfoPending" class="text-gray-500">
                    Memuat informasi tambahan...
                </div>
                <div v-else-if="additionalInfoError" class="text-red-500">
                    {{ additionalInfoError.message || additionalInfoError }}
                </div>
                <div
                    v-else-if="!additionalInfoList.length"
                    class="text-gray-500"
                >
                    Tidak ada informasi tambahan.
                </div>
                <CarouselAdditionalInfo
                    v-else
                    :additional-info-list="additionalInfoList"
                    :loading="additionalInfoPending"
                    :error="additionalInfoError"
                />
            </section> -->

      <section
        id="reviews-section"
        class="mb-6"
      >
        <h2 class="text-2xl font-semibold mb-6">
          Ulasan Trip
        </h2>
        <GridRating
          :ratings="ratings"
          :loading="ratingPending"
          :error="ratingError"
        />
      </section>

      <section
        id="faqs-section"
        class="mb-6"
      >
        <h2 class="text-2xl font-semibold mb-6">
          FAQs
        </h2>
        <UAccordion
          v-if="trip.faq && trip.faq.length"
          :items="trip.faq.map((faq: any, i: number) => ({
            label: faq.title || `FAQ ${i + 1}`,
            content: sanitizeHtml(faq.content || '')
          }))
          "
          :ui="{
            trigger: 'cursor-pointer',
            label: 'text-xl font-bold',
            trailingIcon: 'text-primary h-8 w-8'
          }"
        >
          <!-- content: sanitizeHtml(faq.content || '')  -->
          <template #content="{ item }">
            <div
              class="prose prose-sm max-w-none text-gray-700"
              v-html="sanitizeHtml(item.content || '')"
            />
          </template>
        </UAccordion>
        <div v-else>
          Tidak ada FAQ.
        </div>
      </section>

      <section id="schedule-section">
        <div class="mb-6">
          <h2 class="text-2xl font-semibold mb-2">
            Jadwal Ketersediaan
          </h2>
          <TripSchedule
            ref="tripScheduleRef"
            :trip-uid="tripId"
          />
        </div>
      </section>

      <section id="more-info-section">
        <div class="mb-6 md:max-w-5xl">
          <h2 class="text-2xl font-semibold mb-2">
            Informasi Tambahan
          </h2>
          <UtilHtmlRender :content="trip.moreInformation || ''" />
        </div>
      </section>
    </div>

    <!-- Sticky Mobile Info -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-y-full"
      enter-to-class="translate-y-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-y-0"
      leave-to-class="translate-y-full"
    >
      <UtilStickyMobileInfo
        v-show="showStickyMobileInfo"
        :price="firstAvailablePrice"
        @button-click="scrollToSchedule"
      />
    </Transition>
  </div>
</template>

<style scoped>
.prose {
    max-width: 100%;
}
</style>
