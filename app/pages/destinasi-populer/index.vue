<script setup lang="ts">
import { convertToImage } from '~/composables/country/formatToImage'
import type { ICountry } from '~~/shared/interface/ICountry'
import type { IResponseList } from '~~/shared/interface/IResponse'

const { width } = useWindowSize()
const runtimeConfig = useRuntimeConfig()
const baseUrl = runtimeConfig.public.apiBase

const { data: homeData } = useNuxtData('home')

const { data, error, pending } = await useLazyFetch<IResponseList<ICountry>>(
  `${baseUrl}/Country/country.list`,
  {
    method: 'GET',
    key: 'countryList',
    getCachedData() {
      if (homeData.value?.country) {
        return {
          data: homeData.value?.country || [], // Data diambil dari cache
          meta: {
            status: true,
            message: 'success',
            totalItem: homeData.value?.country?.length || 0
          }
        } as IResponseList<ICountry>
      }
    }
  }
)

useSeoMeta({
  title: 'Destinasi Populer - Peponi',
  description: 'Jelajahi destinasi populer dunia bersama Peponi Travel. Temukan petualangan unik di berbagai negara dengan pengalaman lokal yang autentik.',
  ogTitle: 'Destinasi Populer - Peponi',
  ogDescription: 'Jelajahi destinasi populer dunia bersama Peponi Travel. Temukan petualangan unik di berbagai negara dengan pengalaman lokal yang autentik.',
  ogImage: '/assets/peponi-og-image.png',
  ogImageAlt: 'Destinasi Populer - Peponi Travel',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Destinasi Populer - Peponi',
  twitterDescription: 'Jelajahi destinasi populer dunia bersama Peponi Travel. Temukan petualangan unik di berbagai negara dengan pengalaman lokal yang autentik.'
})

const reformattedData = computed(() => {
  if (data.value === null && data.value === undefined) {
    return []
  }

  const result = homeData.value?.country ? data.value?.data : convertToImage(data.value?.data)

  return result
})
</script>

<template>
  <div class="py-10">
    <NavigationSectionHeader title="Destinasi Populer" />
    <div v-if="pending">
      Loading...
    </div>
    <div
      v-else-if="error"
      class="text-red-500"
    >
      {{ error.message || error }}
    </div>
    <GridBento
      v-else
      class="w-[95%] md:w-[70%] mx-auto"
      :items="reformattedData"
      :size="width > 768 ? 'medium' : 'small'"
    />
  </div>
</template>
