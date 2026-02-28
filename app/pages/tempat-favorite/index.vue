<script lang="ts" setup>
import type { IResponse, IResponseList } from "~~/shared/interface/IResponse";
import type { IFavoriteLocation } from "~~/shared/interface/IFavoriteLocation";
import type { ICountry } from "~~/shared/interface/ICountry";
import type { IImage } from "~~/shared/interface/IImage";

const baseUrl = useRuntimeConfig().public.apiBase;
const { width } = useWindowSize();

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

const selectedCountryUid = ref<string | null>(null);

const { data: countriesData } = await useLazyAsyncData(
  "tempat-favorite-countries",
  () => $fetch<IResponseList<ICountry>>(`${baseUrl}/Country/country.list`),
);

const favQuery = computed(() =>
  selectedCountryUid.value ? { countryUid: selectedCountryUid.value } : {},
);

const {
  data: favoriteLocationsData,
  pending,
  error,
} = useFetch<IResponse<IFavoriteLocation[]>>(`${baseUrl}/FavouriteLocation`, {
  key: computed(() => `tempat-favorite-${selectedCountryUid.value ?? "all"}`),
  query: favQuery,
  watch: [selectedCountryUid],
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] ?? nuxtApp.static.data[key];
  },
});

const countryImages = computed<IImage[]>(() => {
  const list = countriesData.value?.data ?? [];
  return list.map((c: ICountry) => ({
    uid: c.uid,
    src: `/country/512_${c.imageName}.webp`,
    alt: c.imageName,
    caption: c.name,
    name: c.name,
  }));
});

const reformattedFavoriteLocations = computed(() => {
  const result: IImage[] = [];
  const locations = Array.isArray(favoriteLocationsData.value?.data)
    ? favoriteLocationsData.value.data
    : [];
  locations.forEach((location: IFavoriteLocation) => {
    result.push({
      uid: location.uid || "",
      src: location.banner?.[0]
        ? `/favorite-location/${location.banner[0]}.jpeg`
        : "",
      alt: location.name,
      caption: location.name,
      url: `/tempat-favorite/${encodeURIComponent(location.name.trim().replace(/\s+/g, "-").toLowerCase())}_${location.uid}`,
      name: location.name,
    });
  });
  return result;
});
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

      <div v-else-if="error" class="text-red-500 text-center py-10">
        {{ error.message || error }}
      </div>
      <GridBento
        v-else
        class="w-[95%] md:w-[70%] mx-auto"
        :items="reformattedFavoriteLocations"
        :size="width > 768 ? 'medium' : 'small'"
      />
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
