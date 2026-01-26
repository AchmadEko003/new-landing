<script lang="ts" setup>
import type { IResponse } from '~~/shared/interface/IResponse'
import type { IFavoriteLocation } from '~~/shared/interface/IFavoriteLocation'
import type { IImage } from '~~/shared/interface/IImage'

const baseUrl = useRuntimeConfig().public.apiBase
const { width } = useWindowSize()

const { data: favoriteLocationsData, pending, error } = useFetch<IResponse<IFavoriteLocation[]>>(`${baseUrl}/FavouriteLocation`, { key: 'tempat-favorite' })

const reformattedFavoriteLocations = computed(() => {
  const result: IImage[] = []
  const locations = Array.isArray(favoriteLocationsData.value?.data) ? favoriteLocationsData.value.data : []
  locations.forEach((location: IFavoriteLocation) => {
    result.push({
      uid: location.uid || '',
      src: location.banner?.[0] ? `/favorite-location/${location.banner[0]}.jpeg` : '',
      alt: location.name,
      caption: location.name,
      url: `/tempat-favorite/${encodeURIComponent(location.name.trim().replace(/\s+/g, '-').toLowerCase())}_${location.uid}`,
      name: location.name
    })
  })
  return result
})
</script>

<template>
  <div class="py-10">
    <NavigationSectionHeader title="Tempat Favorit" />
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
      :items="reformattedFavoriteLocations"
      :size="width > 768 ? 'medium' : 'small'"
    />
  </div>
</template>
