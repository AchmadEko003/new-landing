<script lang="ts" setup>
import type { IImage } from "~~/shared/interface/IImage";

const props = defineProps<{
  images?: IImage[];
  modelValue?: string | null;
}>();

const emit = defineEmits<{
  "update:modelValue": [uid: string | null];
}>();

const ALL_UID = "__all__";

const listImages = computed(() => {
  if (!props.images) return [];
  return [
    { uid: ALL_UID, src: "", alt: "Semua", caption: "Semua", name: "Semua" },
    ...props.images,
    { src: "", alt: "", caption: "", uid: "" },
  ];
});

const carouselRef = ref(null);
const emblaApi = computed(() => carouselRef.value?.emblaApi);

const next = () => emblaApi.value?.scrollNext();
const prev = () => emblaApi.value?.scrollPrev();

const handleSelect = (uid: string) => {
  if (uid === ALL_UID) {
    emit("update:modelValue", null);
  } else {
    emit("update:modelValue", props.modelValue === uid ? null : uid);
  }
};

const isSelected = (uid: string) => {
  if (uid === ALL_UID) return props.modelValue === null;
  return uid === props.modelValue;
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
        ref="carouselRef"
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
        <div
          v-if="index < (listImages?.length || 0) - 1"
          :class="[
            'rounded-2xl m-1 transition-all duration-200 cursor-pointer',
            isSelected(item.uid) ? 'ring-2 ring-green-500' : '',
          ]"
          @click="handleSelect(item.uid)"
        >
          <div
            v-if="item.uid === ALL_UID"
            :class="[
              'aspect-square rounded-2xl flex items-center justify-center bg-gray-100',
              isSelected(item.uid) ? 'bg-green-50' : '',
            ]"
          >
            <span
              :class="[
                'font-semibold text-lg',
                isSelected(item.uid) ? 'text-green-600' : 'text-gray-600',
              ]"
            >
              All
            </span>
          </div>
          <ImageThumbnail
            v-else
            :img-url="item.src"
            :title="item.caption"
            size="small"
          />
        </div>
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
