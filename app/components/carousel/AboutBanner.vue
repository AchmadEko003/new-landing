<script lang="ts" setup>
import type { IBanner } from '~~/shared/interface/IBanner'
import type { IResponse } from '~~/shared/interface/IResponse'

const baseUrl = useRuntimeConfig().public.apiBase
const { width } = useWindowSize()
const computedWidth = computed(() => width.value || 0)
const isMobile = computed(() => computedWidth.value < 768)

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

const { data: aboutBannersData } = useLazyFetch<IResponse<IBanner[]>>(
  `${baseUrl}/Banner/sub`,
  {
    key: 'sub-banners'
  }
)

const bannerItems = computed(() => (aboutBannersData.value?.data as IBanner[]) || [])
</script>

<template>
  <div class="relative">
    <UCarousel
      v-if="aboutBannersData?.meta.totalItem"
      ref="carousel"
      v-slot="{ item }"
      :items="bannerItems"
      class="w-full p-0"
      :autoplay="!isMobile"
      :loop="true"
      :dots="false"
      :ui="{
        item: '!p-0',
        container: 'h-[70svh] md:h-[70dvh]' // Use stable viewport height on mobile
      }"
    >
      <div class="relative">
        <h5 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-white text-center text-5xl md:text-6xl font-extrabold">
          {{ item.title }}
        </h5>

        <!-- Shadow for opacity -->
        <div
          class="w-full h-full bg-black/10 absolute z-10 top-0 bottom-0 right-0 left-0"
        />
        <NuxtImg
          provider="peponi"
          :src="`/banner/${item.imageUrl}.jpeg`"
          :alt="item.title"
          class="object-cover w-full h-[70svh] md:h-[70dvh]"
          sizes="100vw md:100vw"
          format="jpeg"
          quality="65"
          loading="lazy"
          decoding="async"
          @contextmenu.prevent
        />

        <!-- Bottom content wrapper with aligned text and arrows -->
        <div
          class="absolute bottom-0 w-full flex flex-row-reverse items-end justify-between px-4 md:px-6 lg:px-10 py-3 md:py-4 lg:py-6"
        >
          <!-- Arrow buttons -->
          <div class="flex gap-2 md:gap-3 z-20">
            <UButton
              class="rounded-full hover:cursor-pointer hover:scale-95 transition-transform hover:bg-white/20"
              variant="ghost"
              @click="prev()"
            >
              <UIcon
                name="heroicons:arrow-left"
                :size="computedWidth > 768 ? '2.5em' : '2em'"
                class="text-white"
              />
            </UButton>
            <UButton
              class="rounded-full hover:cursor-pointer hover:scale-95 transition-transform hover:bg-white/20"
              variant="ghost"
              @click="next()"
            >
              <UIcon
                name="heroicons:arrow-right"
                :size="computedWidth > 768 ? '2.5em' : '2em'"
                class="text-white"
              />
            </UButton>
          </div>
        </div>
      </div>
    </UCarousel>
    <div
      v-else
      class="flex items-center justify-center w-full h-[32dvh]"
    >
      <span>Loading banners...</span>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
