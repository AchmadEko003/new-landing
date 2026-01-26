<script lang="ts" setup>
const props = defineProps<{
  bannersData?: string[];
}>();

const items = computed(() => props.bannersData || []);

const { width } = useWindowSize();

const computedWidth = computed(() => width.value || 0);

const carousel = ref<any>(null);
const emblaApi = computed(() => carousel.value?.emblaApi);

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
  <div class="relative">
    <UCarousel
      ref="carousel"
      v-slot="{ item, index }"
      :items="items"
      class="w-full p-0"
      :autoplay="true"
      :loop="true"
      :dots="false"
      :ui="{
        item: '!p-0',
        container: 'h-[55dvh] md:h-[75dvh]',
      }"
    >
      <div class="relative">
        <NuxtImg
          provider="peponi"
          :src="item"
          :alt="`Banner ${index + 1}`"
          class="object-cover w-full !h-[55dvh] md:!h-[75dvh]"
          style="height: 100%; width: 100%"
          @contextmenu.prevent
        />
      </div>
    </UCarousel>
    <div class="absolute bottom-5 md:bottom-10 right-5 md:right-10 transform">
      <UButton
        variant="ghost"
        :color="undefined"
        class="rounded-full hover:cursor-pointer hover:scale-95 transition-transform"
        @click="prev()"
      >
        <UIcon
          name="heroicons:arrow-left"
          :size="computedWidth > 768 ? '3.5em' : '3em'"
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
          :size="computedWidth > 768 ? '3.5em' : '3em'"
          class="text-white"
        />
      </UButton>
    </div>
  </div>
</template>
