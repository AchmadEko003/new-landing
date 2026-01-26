<script setup lang="ts">
import type { ICountry } from '~~/shared/interface/ICountry'
import type { IResponseList } from '~~/shared/interface/IResponse'
import type { IFavoriteLocation } from '~~/shared/interface/IFavoriteLocation'
import type { IImage } from '~~/shared/interface/IImage'
import type { IUniqueExperience } from '~~/shared/interface/IUniqueExperience'

  const runtimeConfig = useRuntimeConfig()
  const baseUrl = runtimeConfig.public.apiBase

  const store = useCountryStore()

  const { data } = await useAsyncData('home',
  async () => {
  const [countryRes, favLocationRes] = await Promise.allSettled([
      $fetch<IResponseList<ICountry>>(`${baseUrl}/Country/country.list`),
      $fetch<IResponseList<IFavoriteLocation>>(`${baseUrl}/FavouriteLocation`),
      $fetch<IResponseList<IUniqueExperience>>(`${baseUrl}/UniqueExperience`)
    ])

    const countryTemp: ICountry[] | undefined = countryRes.status === 'fulfilled' ? countryRes.value.data : []
    const favLocationTemp: IFavoriteLocation[] | undefined = favLocationRes.status === 'fulfilled' ? favLocationRes.value.data : []

    store.countryList = countryTemp

    let country: IImage[] = []
    if (countryTemp && countryTemp.length > 0) {
      country = countryTemp.map((country: ICountry) => ({
      uid: country.uid || '',
      src: `/country/512_${country.imageName}.webp`,
      alt: country.imageName,
      url: `/destinasi-populer/${encodeURIComponent(country.name.trim().replace(/\s+/g, '-').toLowerCase())}_${country.uid}`,
      caption: country.name,
      name: country.name,
      }))
    }

    let favLocation: IImage[] = []
    if (favLocationTemp && favLocationTemp.length > 0) {
      favLocation = favLocationTemp.map((item: IFavoriteLocation) => ({
      uid: item.uid || "",
      src: item.banner?.[0]
        ? `/favorite-location/512_${item.banner[0]}.webp`
        : "",
      alt: item.banner?.[0] || "",
      caption: item.name,
      name: item.name,
      url: `/tempat-favorite/${encodeURIComponent(item.name.trim().replace(/\s+/g, "-").toLowerCase())}_${item.uid}`,
      }))
    }

    return { country: country as IImage[], favLocation }
  })
</script>

<template>
  <div class="flex flex-col gap-12">
    <CarouselBanner />

    <section>
    <NavigationSectionHeader title="Destinasi Populer" url="/destinasi-populer" />
      <CarouselSliderImage :images="data?.country" />
    </section>

    <section>
    <NavigationSectionHeader title="Tempat Favorit" url="/tempat-favorite" />
      <CarouselSliderImage :images="data?.favLocation" />
    </section>

    <NavigationSectionHeader title="Pengalaman Unik" url="/pengalaman-unik" />
  </div>
</template>
