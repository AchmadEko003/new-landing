<script lang="ts" setup>
import type { IResponseList } from '~~/shared/interface/IResponse'
import type { IFavoriteLocation } from '~~/shared/interface/IFavoriteLocation'
import type { ICountry } from '~~/shared/interface/ICountry'
import type { IImage } from '~~/shared/interface/IImage'

const baseUrl = useRuntimeConfig().public.apiBase
const { width } = useWindowSize()

useSeoMeta({
  title: 'Tempat Favorit - Peponi',
  description: 'Temukan tempat favorit dan destinasi wisata populer bersama Peponi Travel. Eksplorasi lokasi wisata terbaik dengan pengalaman lokal yang autentik.',
  ogTitle: 'Tempat Favorit - Peponi',
  ogDescription: 'Temukan tempat favorit dan destinasi wisata populer bersama Peponi Travel. Eksplorasi lokasi wisata terbaik dengan pengalaman lokal yang autentik.',
  ogImage: '/assets/peponi-og-image.png',
  ogImageAlt: 'Tempat Favorit - Peponi Travel',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Tempat Favorit - Peponi',
  twitterDescription: 'Temukan tempat favorit dan destinasi wisata populer bersama Peponi Travel. Eksplorasi lokasi wisata terbaik dengan pengalaman lokal yang autentik.'
})

const selectedCountryUid = ref<string | null>(null)
const offset = ref(1)
const limit = 10
const allLocations = ref<IFavoriteLocation[]>([])
const pending = ref(false)
const error = ref<Error | null>(null)
const totalItem = ref(0)

const { data: countriesData } = await useLazyAsyncData(
  'tempat-favorite-countries',
  () => $fetch<IResponseList<ICountry>>(`${baseUrl}/Country/country.list`)
)

async function fetchLocations(currentOffset: number) {
  pending.value = true
  error.value = null
  try {
    const result = await $fetch<IResponseList<IFavoriteLocation>>(`${baseUrl}/FavouriteLocation`, {
      query: {
        ...(selectedCountryUid.value ? { countryUid: selectedCountryUid.value } : {}),
        offset: currentOffset,
        limit
      }
    })
    totalItem.value = result.meta?.totalItem ?? 0
    allLocations.value = [...allLocations.value, ...(result.data ?? [])]
  } catch (e) {
    error.value = e as Error
  } finally {
    pending.value = false
  }
}

await fetchLocations(1)

watch(selectedCountryUid, () => {
  offset.value = 1
  allLocations.value = []
  fetchLocations(1)
})

const hasMore = computed(() => allLocations.value.length < totalItem.value)

async function loadMore() {
  offset.value++
  await fetchLocations(offset.value)
}

const countryImages = computed<IImage[]>(() => {
  const list = countriesData.value?.data ?? []
  return list.map((c: ICountry) => ({
    uid: c.uid,
    src: `/country/512_${c.imageName}.webp`,
    alt: c.imageName,
    caption: c.name,
    name: c.name
  }))
})

const reformattedFavoriteLocations = computed(() => {
  return allLocations.value.map((location: IFavoriteLocation) => ({
    uid: location.uid || '',
    src: location.banner?.[0]
      ? `/favorite-location/${location.banner[0]}.jpeg`
      : '',
    alt: location.name,
    caption: location.name,
    url: `/tempat-favorite/${encodeURIComponent(location.name.trim().replace(/\s+/g, '-').toLowerCase())}_${location.uid}`,
    name: location.name
  }))
})
</script>

<template>
  <div class="py-10 flex flex-col gap-8">
    <section>
      <NavigationSectionHeader title="Destinasi Populer" />
      <CarouselSliderImageFilter
        :images="countryImages"
        :model-value="selectedCountryUid"
        @update:model-value="selectedCountryUid = $event"
      />
    </section>

    <section>
      <NavigationSectionHeader title="Tempat Favorit" />

      <!-- Skeleton loader matching GridBento layout -->
      <div
        v-if="pending"
        class="w-[95%] md:w-[70%] mx-auto grid grid-cols-12 gap-3"
      >
        <div
          class="col-span-12 lg:col-span-4 h-40 md:h-80 rounded-2xl skeleton-shimmer"
        />
        <div
          class="col-span-6 lg:col-span-8 h-40 md:h-80 rounded-2xl skeleton-shimmer"
        />
        <div
          class="col-span-6 lg:col-span-4 h-40 md:h-80 rounded-2xl skeleton-shimmer"
        />
        <div
          class="col-span-12 lg:col-span-4 h-40 md:h-80 rounded-2xl skeleton-shimmer"
        />
        <div
          class="col-span-6 lg:col-span-4 h-40 md:h-80 rounded-2xl skeleton-shimmer"
        />
        <div
          class="col-span-6 lg:col-span-8 h-40 md:h-80 rounded-2xl skeleton-shimmer"
        />
        <div
          class="col-span-12 lg:col-span-4 h-40 md:h-80 rounded-2xl skeleton-shimmer"
        />
      </div>

      <div
        v-else-if="error"
        class="text-red-500 text-center py-10"
      >
        {{ error.message || error }}
      </div>
      <GridBento
        v-else
        class="w-[95%] md:w-[70%] mx-auto"
        :items="reformattedFavoriteLocations"
        :size="width > 768 ? 'medium' : 'small'"
      />

      <div
        v-if="hasMore"
        class="flex justify-center mt-8"
      >
        <button
          :disabled="pending"
          class="px-8 py-3 cursor-pointer rounded-full border border-green-500 text-green-600 font-medium hover:bg-green-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          @click="loadMore"
        >
          <span v-if="pending">Memuat...</span>
          <span v-else>Muat Lebih Banyak</span>
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton-shimmer {
  background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
</style>
