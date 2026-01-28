<script lang="ts" setup>
const { width } = useWindowSize()
const computedWidth = computed(() => width.value || 0)

interface AccommodationItem {
  image: string
  name: string
  location: string
  rating?: number
  reviewCount?: number
  description?: string
  facilities?: string[]
  images?: string[]
  basic: boolean
}

interface Props {
  accommodationList: AccommodationItem[]
  loading?: boolean
  error?: any
}

const props = withDefaults(defineProps<Props>(), {
  accommodationList: () => [],
  loading: false,
  error: null
})

const accommodationList = computed(() => props.accommodationList || [])

const carouselAccommodation = ref<any>(null)
const emblaApi = computed(() => carouselAccommodation.value?.emblaApi)

const showDrawer = ref(false)
const selectedAccommodation = ref<AccommodationItem | null>(null)

const handleViewDetails = (accommodation: AccommodationItem) => {
  selectedAccommodation.value = accommodation
  showDrawer.value = true
}

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
    <UCarousel
      ref="carouselAccommodation"
      v-slot="{ item }"
      :items="accommodationList"
      class="w-full"
      :skip-snaps="true"
      :ui="{
        item: 'basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/5 px-2',
        container: 'px-0'
      }"
    >
      <CardAccommodation
        :image="item.image"
        :name="item.name"
        :location="item.location"
        :rating="item.rating"
        :review-count="item.reviewCount"
        :description="item.description"
        :facilities="item.facilities"
        :images="item.images"
        :basic="item.basic"
        @view-details="handleViewDetails"
      />
    </UCarousel>

    <div
      v-if="accommodationList.length > 1"
      class="transform flex gap-2 justify-end mt-4"
    >
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

    <UModal
      v-if="computedWidth > 720"
      v-model:open="showDrawer"
    >
      <template #content>
        <div class="p-4">
          <CardAccommodationContent
            v-if="selectedAccommodation"
            :accommodation="selectedAccommodation"
          />
        </div>
      </template>
    </UModal>

    <UtilDrawer
      v-else
      v-model="showDrawer"
      :title="selectedAccommodation?.name"
      :subtitle="selectedAccommodation?.location"
      side="bottom"
      size="lg"
    >
      <CardAccommodationContent
        v-if="selectedAccommodation"
        :accommodation="selectedAccommodation"
      />
    </UtilDrawer>
  </div>
</template>

<style scoped>
.w-full {
  max-width: 100vw;
}
</style>
