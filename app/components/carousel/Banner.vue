<script lang="ts" setup>
import type { IBanner } from '~~/shared/interface/IBanner'
import type { IResponseList } from '~~/shared/interface/IResponse'

const baseUrl = useRuntimeConfig().public.apiBase
// Only use window size on client
const width = ref(1024) // Default for SSR
if (import.meta.client) {
  const { width: windowWidth } = useWindowSize()
  watch(windowWidth, (val) => {
    width.value = val
  }, { immediate: true })
}

// SSR-safe icon size - default to larger size during SSR
const iconSize = computed(() => {
  return width.value > 768 ? '3.5em' : '3em'
})
const isMobile = computed(() => width.value < 768)

const carousel = ref<{ emblaApi?: { scrollNext: () => void, scrollPrev: () => void } } | null>(null)
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

const { data: bannersData } = useLazyFetch<IResponseList<IBanner>>(`${baseUrl}/Banner`)
const bannerItems = computed(() => (bannersData.value?.data as IBanner[]) || [])
</script>

<template>
  <div class="relative">
    <ClientOnly>
      <template #fallback>
        <div class="flex items-center justify-center w-full h-[50svh] md:h-[75dvh] bg-gray-100">
          <span class="text-gray-500">Loading banners...</span>
        </div>
      </template>
      <UCarousel
        v-if="bannersData?.meta.totalItem"
        ref="carousel"
        v-slot="{ item }"
        :items="bannerItems"
        class="w-full p-0"
        :autoplay="!isMobile"
        :loop="true"
        :dots="false"
        :ui="{
          item: '!p-0',
          container: 'h-[50svh] md:h-[75dvh]'
        }"
      >
        <div class="relative">
          <NuxtImg
            provider="peponi"
            :src="`/banner/${item.imageUrl}.jpeg`"
            :alt="item.title"
            class="object-cover w-full h-[50svh] md:h-[75dvh]"
            sizes="100vw md:100vw"
            format="webp"
            quality="65"
            loading="lazy"
            decoding="async"
            @contextmenu.prevent
          />
        </div>
      </UCarousel>
      <div
        v-if="!bannersData?.meta.totalItem"
        class="flex items-center justify-center w-full h-[50svh] md:h-[75dvh]"
      >
        <span>Loading banners...</span>
      </div>
      <div class="absolute bottom-5 md:bottom-10 right-5 md:right-10 transform">
        <UButton
          variant="ghost"
          :color="undefined"
          class="rounded-full hover:cursor-pointer hover:scale-95 transition-transform"
          @click="prev()"
        >
          <UIcon
            name="heroicons:arrow-left"
            :size="iconSize"
            class="text-white"
          />
        </UButton>
        <UButton
          variant="ghost"
          :color="undefined"
          class="rounded-full hover:cursor-pointer hover:scale-95 transition-transform"
          @click="next()"
        >
          <UIcon
            name="heroicons:arrow-right"
            :size="iconSize"
            class="text-white"
          />
        </UButton>
      </div>
    </ClientOnly>
  </div>
</template>
