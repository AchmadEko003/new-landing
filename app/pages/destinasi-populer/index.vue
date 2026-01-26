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

const reformattedData = computed(() => {
  if (data.value === null && data.value === undefined) {
    return []
  }

  const result = convertToImage(data.value?.data)

  console.log(result)

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
