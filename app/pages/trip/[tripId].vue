<script lang="ts" setup>
import { setImageBaseUrlForSeo } from '~~/shared/script/set-baseUrl-image-seo'

const {
  // Data
  trip,
  tripPending,
  tripError,
  ratings,
  ratingPending,
  ratingError,
  // Computed
  sections,
  bentoSize,
  width,
  reformattedUniqueExperiences,
  accommodationList,
  suitAbility,
  // Actions/State
  firstAvailablePrice,
  showStickyMobileInfo,
  scrollToSchedule,
  sanitizeHtml
} = useTripDetail()

useSeoMeta({
  title: () => trip.value ? `${trip.value.name} - Peponi` : 'Trip Detail - Peponi',
  description: () => trip.value ? trip.value.headline : 'Detail trip di Peponi Travel. Temukan petualangan tak terlupakan yang sesuai dengan minat dan keinginan Anda.',
  ogTitle: () => trip.value ? `${trip.value.name} - Peponi` : 'Trip Detail - Peponi',
  ogDescription: () => trip.value ? trip.value.headline : 'Detail trip di Peponi Travel. Temukan petualangan tak terlupakan yang sesuai dengan minat dan keinginan Anda.',
  ogImage: () => trip.value && trip.value.bannerImages && trip.value.bannerImages.length > 0
    ? setImageBaseUrlForSeo(`/trip/${trip.value.bannerImages[0]}.jpeg`)
    : undefined,
  ogType: () => 'website',
  ogUrl: () => trip.value ? `http://localhost:3000/trip/${trip.value.uid}` : undefined,
  twitterCard: () => 'summary_large_image',
  twitterTitle: () => trip.value ? `${trip.value.name} - Peponi` : 'Trip Detail - Peponi',
  twitterDescription: () => trip.value ? trip.value.headline : 'Detail trip di Peponi Travel. Temukan petualangan tak terlupakan yang sesuai dengan minat dan keinginan Anda.',
  twitterImage: () => trip.value && trip.value.bannerImages && trip.value.bannerImages.length > 0
    ? setImageBaseUrlForSeo(`/trip/${trip.value.bannerImages[0]}.jpeg`)
    : undefined
})
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
  <div v-else-if="trip">
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
        <p class="text-lg font-bold">
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
            <ImageZoomed
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
          <GridBento
            class=""
            :items="reformattedUniqueExperiences"
            :size="bentoSize"
          />
        </div>
      </section>

      <section id="suitability-section">
        <div class="mb-6 md:grid md:grid-cols-2">
          <h2 class="text-2xl font-semibold mb-2">
            Apakah trip ini sesuai untukmu?
          </h2>
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
            :items="
              trip.itineraries.map((item: any, i: number) => ({
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
                    <ImageResponsive
                      :img-url="`/trip/${banner}.jpeg`"
                      :alt="`Banner for Day ${item.label}`"
                      size="large"
                      class="w-full h-96 object-cover"
                    />
                  </template>
                </UCarousel>
              </div>
              <!-- <div
                class="prose prose-sm max-w-none text-gray-700"
                v-html="sanitizeHtml(item.content || '')"
              /> -->
              <UtilHtmlRender
                :content="item.content || ''"
                class="max-w-none text-gray-700"
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
              <div class="border border-gray-300 hover:border-primary hover:transition-all hover:duration-300 p-4 rounded-lg w-full">
                <h4 class="font-semibold text-gray-900">
                  {{ item.title }}
                </h4>
                <UtilHtmlRender :content="item.content" />
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
          <CarouselAccommodation
            :accommodation-list="accommodationList"
          />
        </div>
        <div
          v-else
          class="text-gray-500"
        >
          Tidak ada informasi akomodasi.
        </div>
      </section>

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
          :items="
            trip.faq.map((faq: any, i: number) => ({
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
            :trip-uid="trip?.uid || ''"
          />
        </div>
      </section>

      <section id="more-info-section">
        <div class="mb-6 md:max-w-5xl">
          <h2 class="text-2xl font-semibold mb-2">
            Informasi Tambahan
          </h2>
          <UtilHtmlRender
            :content="trip.moreInformation || ''"
          />
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
  <div
    v-else
    class="flex items-center justify-center h-[50dvh] md:h-[75dvh]"
  >
    <span class="text-gray-500">Trip not found.</span>
  </div>
</template>

<style scoped>
.prose {
    max-width: 100%;
}
</style>
