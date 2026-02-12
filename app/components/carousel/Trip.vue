<script lang="ts" setup>
import type { ITripCard } from '~~/shared/interface/ITrip'

const props = defineProps<{
  items: ITripCard[] | undefined
}>()

const listImages = computed(() => {
  console.log('trip nih')
  if (!props.items) return []

  // Create a new array to avoid mutating props
  return [
    ...props.items,
    {
      imageSrc: '',
      title: '',
      days: '0',
      summary: '',
      startPrice: 0
    },
    {
      imageSrc: '',
      title: '',
      days: '0',
      summary: '',
      startPrice: 0
    }
  ]
})

const carouselSliderTrip = ref<any>(null)
const emblaApi = computed(() => carouselSliderTrip.value?.emblaApi)

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

<template>
  <div>
    <ClientOnly>
      <template #fallback>
        <div class="flex items-center justify-center h-[500px]">
          <span class="text-gray-500">Loading trips...</span>
        </div>
      </template>
      <UCarousel
        ref="carouselSliderTrip"
        v-slot="{ item, index }"
        :items="listImages"
        wheel-gestures
        :skip-snaps="true"
        class="w-full h-full"
        :ui="{
          item: 'basis-1/2.5 xl:basis-1/3.5 pt-3',
          container: 'px-2 md:px-25'
        }"
      >
        <CardTrip
          v-if="index < (props.items?.length || 0)"
          :image-src="item.imageSrc"
          :title="item.title"
          :days="item.days"
          :summary="item.summary"
          :start-price="item.startPrice"
          size="small"
          :url="item.url"
        />
        <div
          v-else-if="
            index === (listImages?.length || 0) - 2 && listImages.length > 6
          "
          :class="[
            'border border-gray-200 cursor-pointer hover:border-primary transition-colors min-h-122 md:min-h-152',
            'w-[15em] md:w-[20em] p-3 flex justify-center items-center rounded-2xl font-bold'
          ]"
          @click="$router.push('/trip')"
        >
          <p class="text-center items-center">
            Lihat semua Trip
          </p>
          <Icon
            name="heroicons:chevron-right"
            class="font-bold ml-1"
          />
        </div>
        <!-- <div v-else /> -->
      </UCarousel>

      <div class="transform flex gap-2 justify-end mt-3 mr-3 md:mr-24">
        <UButton
          icon="heroicons:arrow-left"
          color="neutral"
          size="xl"
          variant="outline"
          class="rounded-full hover:cursor-pointer hover:scale-95 transition-transform"
          @click="prev()"
        />
        <UButton
          icon="heroicons:arrow-right"
          color="neutral"
          size="xl"
          variant="outline"
          class="rounded-full hover:cursor-pointer hover:scale-95 transition-transform"
          @click="next()"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.w-full {
  max-width: 100vw;
}
</style>
