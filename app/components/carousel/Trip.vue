<script lang="ts" setup>
import type { ITripCard } from '~~/shared/interface/ITrip'

const props = defineProps<{
  items: ITripCard[] | undefined
}>()

const hasTrips = computed(() => (props.items?.length || 0) > 0)

const listImages = computed(() => {
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

const carouselSliderTrip = ref<{ emblaApi?: { scrollNext: () => void, scrollPrev: () => void } } | null>(null)
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
        <div class="flex flex-col items-center justify-center gap-3 h-125 bg-linear-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
          <div class="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span class="text-gray-500 font-medium">Loading trips...</span>
        </div>
      </template>
      <template v-if="hasTrips">
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
      </template>

      <div
        v-else
        class="h-55 md:h-70 mx-4 md:mx-24 rounded-2xl border border-dashed border-primary/30 bg-linear-to-br from-primary/5 via-white to-primary/10 p-6 md:p-8 flex items-center justify-center"
      >
        <div class="text-center max-w-md">
          <div class="w-14 h-14 mx-auto mb-3 rounded-full bg-white shadow-sm border border-primary/20 flex items-center justify-center">
            <UIcon
              name="heroicons:map-pin"
              class="w-7 h-7 text-primary"
            />
          </div>
          <p class="text-gray-800 font-semibold text-base md:text-lg">
            Belum ada trip tersedia
          </p>
          <p class="text-gray-500 text-sm mt-1 mb-4">
            Yuk cek halaman trip untuk melihat pilihan destinasi terbaru.
          </p>
          <UButton
            to="/trip"
            color="primary"
            variant="solid"
            class="rounded-full px-5"
          >
            Lihat Semua Trip
          </UButton>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.w-full {
  max-width: 100vw;
}
</style>
