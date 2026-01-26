<script lang="ts" setup>
import type { IBanner } from '~~/shared/interface/IBanner'
import type { IResponseList } from '~~/shared/interface/IResponse'

const baseUrl = useRuntimeConfig().public.apiBase
// Only use window size on client
const width = ref(1024) // Default for SSR
if (import.meta.client) {
  const { width: windowWidth } = useWindowSize()
  watch(windowWidth, (val) => { width.value = val }, { immediate: true })
}

// SSR-safe icon size - default to larger size during SSR
const iconSize = computed(() => {
  return width.value > 768 ? '3.5em' : '3em'
})

const carousel = ref<any>(null)
const emblaApi = computed(() => carousel.value?.emblaApi)

const next = () => {
  if (emblaApi.value) {
    emblaApi.value.scrollNext()
  }
}

const prev = () => {
  if (emblaApi.value) {
    emblaApi.value.scrollPrev()
  }
}

const { data: bannersData, pending } = useLazyFetch<IResponseList<IBanner>>(`${baseUrl}Banner`)
</script>

<template>
  <div class="relative">
    <ClientOnly>
      <template #fallback>
        <div class="flex items-center justify-center w-full h-[75dvh] bg-gray-100">
          <span class="text-gray-500">Loading banners...</span>
        </div>
      </template>
      <UCarousel ref="carousel" v-if="bannersData?.meta.totalItem" v-slot="{ item }"
        :items="(bannersData?.data as IBanner[]) || []" class="w-full p-0" :autoplay="true" :loop="true" :dots="false"
        :ui="{
          item: '!p-0',
          container: 'h-[50dvh] md:h-[75dvh]'
        }">
        <div class="relative">
          <NuxtImg provider="peponi" :src="`/banner/${item.imageUrl}.jpeg`" :alt="item.title"
            class="object-cover w-full !h-[50dvh] md:!h-[75dvh]" style="height: 100%; width: 100%" @contextmenu.prevent />
        </div>
      </UCarousel>
      <div v-if="!bannersData?.meta.totalItem" class="flex items-center justify-center w-full h-[75dvh]">
        <span>Loading banners...</span>
      </div>
      <div class="absolute bottom-5 md:bottom-10 right-5 md:right-10 transform">
        <UButton @click="prev()" variant="ghost" :color="undefined" class="rounded-full hover:cursor-pointer hover:scale-95 transition-transform">
          <UIcon name="heroicons:arrow-left" :size="iconSize" class="text-white" />
        </UButton>
        <UButton @click="next()" variant="ghost" :color="undefined" class="rounded-full hover:cursor-pointer hover:scale-95 transition-transform">
          <UIcon name="heroicons:arrow-right" :size="iconSize" class="text-white" />
        </UButton>
      </div>
    </ClientOnly>
  </div>
</template>
