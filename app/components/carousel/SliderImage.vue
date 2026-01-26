<script lang="ts" setup>
import type { IImage } from "~~/shared/interface/IImage";

const props = defineProps<{
  images?: IImage[];
}>();

const listImages = computed(() => {
  if (!props.images) return [];

  return [
    ...props.images,
    {
      src: "",
      alt: "",
      caption: "",
      uid: "",
    },
  ];
});

const carouselSliderImage = ref<any>(null);
const emblaApi = computed(() => carouselSliderImage.value?.emblaApi);

const next = () => {
  if (emblaApi.value) {
    emblaApi.value.scrollNext();
  }
};

const prev = () => {
  if (emblaApi.value) {
    emblaApi.value.scrollPrev();
  }
};
</script>

<template>
  <div>
    <ClientOnly>
      <template #fallback>
        <div class="flex items-center justify-center h-40">
          <span class="text-gray-500">Loading images...</span>
        </div>
      </template>
      <UCarousel
        ref="carouselSliderImage"
        v-slot="{ item, index }"
        :items="listImages"
        wheel-gestures
        :skip-snaps="true"
        class="w-full"
        :ui="{
          item: 'basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6 2xl:basis-1/7',
          container: 'px-2 md:px-25',
        }"
      >
        <ImageThumbnail
          v-if="index < (listImages?.length || 0) - 1"
          :img-url="item.src"
          :title="item.caption"
          :url="item.url || ''"
          size="small"
        />
        <div v-else class="w-10 h-5" />
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
