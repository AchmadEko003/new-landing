<template>
  <div class="relative">
    <UCarousel
      v-if="images && images.length > 0"
      ref="carousel"
      v-slot="{ item }"
      :items="images"
      class="w-full p-0"
      :autoplay="true"
      :loop="true"
      :dots="false"
      :ui="{
        item: '!p-0',
        container: 'h-[55dvh] md:h-[75dvh]'
      }"
    >
      <div class="relative h-full">
        <NuxtImg
          provider="peponi"
          :src="`/trip/${item}.jpeg`"
          :alt="`${tripName} - Image ${images.indexOf(item) + 1}`"
          class="object-cover w-full h-[55dvh]! md:h-[75dvh]!"
          loading="lazy"
          @contextmenu.prevent
        />
      </div>
    </UCarousel>

    <div
      v-else
      class="flex items-center justify-center w-full h-[75dvh] bg-gray-100"
    >
      <span class="text-gray-500">No images available</span>
    </div>

    <div
      v-if="images && images.length > 1"
      class="absolute bottom-5 md:bottom-10 right-5 md:right-10 transform"
    >
      <UButton
        variant="ghost"
        :color="undefined"
        class="rounded-full hover:cursor-pointer hover:scale-95 transition-transform"
        @click="prev()"
      >
        <UIcon
          name="heroicons:arrow-left"
          :size="computedWidth > 768 ? '3.5em' : '3em'"
          class="text-white drop-shadow-lg"
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
          :size="computedWidth > 768 ? '3.5em' : '3em'"
          class="text-white drop-shadow-lg"
        />
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  images?: string[]
  tripName?: string
}

const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  tripName: 'Trip'
})

const { width } = useWindowSize()
const computedWidth = computed(() => width.value || 0)

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
</script>

<style scoped></style>
