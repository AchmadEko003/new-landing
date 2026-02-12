<script lang="ts" setup>
import { reformattedCountryDetail } from '~/composables/country/formatToImage'
import type {
  ICountryDetail
} from '~~/shared/interface/ICountry'
import type { IResponse } from '~~/shared/interface/IResponse'

const baseUrl = useRuntimeConfig().public.apiBase
const route = useRoute()

const uid = computed(() => (route.params.uid as string).split('_')[1] || '')

const { data: countryDetail } = useNuxtData(`country-${uid.value}`)

const { data: detailData, pending } = useFetch<IResponse<ICountryDetail>>(
  () => `${baseUrl}/Country/country.detail/${uid.value}`,
  {
    key: `country-${uid.value}`,
    getCachedData() {
      if (countryDetail.value) {
        return countryDetail.value as IResponse<ICountryDetail>
      }
    }
  }
)

const reformatedDetail = computed(() => {
  if (detailData.value?.data) {
    return reformattedCountryDetail(detailData.value?.data)
  } else {
    return null
  }
})

const sections = [
  { id: 'trip-section', title: 'Trip' },
  { id: 'favorite-section', title: 'Tempat Favorit' },
  { id: 'experience-section', title: 'Pengalaman Unik' }
]
</script>

<template>
  <image-loading v-if="pending" />
  <UtilEmptyState
    v-else-if="!detailData?.data"
    url="/destinasi-populer"
    button-text="Kembali ke daftar Destinasi"
    title="Destinasi Tidak Ditemukan"
    description="Destinasi yang kamu cari tidak tersedia. Coba jelajahi destinasi populer lainnya."
  />
  <div
    v-else
    class="flex flex-col gap-7"
  >
    <div class="relative flex items-center justify-center">
      <NuxtImg
        provider="peponi"
        :src="`/country/${detailData?.data?.bannerName}.jpeg`"
        :alt="detailData?.data?.name"
        class="object-cover w-full h-[75dvh]!"
        @contextmenu.prevent
      />

      <h1 class="absolute text-4xl text-white font-bold">
        {{ detailData?.data?.name }}
      </h1>
    </div>

    <NavigationAnchorNav :sections="sections" />

    <p class="mx-4 md:mx-24 md:text-xl font-semibold">
      {{ detailData?.data?.summary }}
    </p>

    <section id="trip-section">
      <NavigationSectionHeader title="Trip" />
      <CarouselTrip :items="reformatedDetail!.trip" />
    </section>

    <section id="favorite-section">
      <NavigationSectionHeader
        title="Tempat Favorit"
        url="/tempat-favorite"
      />
      <CarouselSliderImage :images="reformatedDetail?.favoriteLocation" />
    </section>

    <section id="experience-section">
      <NavigationSectionHeader
        title="Pengalaman Unik"
        url="/pengalaman-unik"
      />
      <GridBento
        class="w-[95%] md:w-[70%] mx-auto"
        :items="reformatedDetail?.uniqueExperience"
        size="medium"
      />
    </section>
  </div>
</template>
