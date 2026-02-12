<template>
  <div>
    <UCarousel
      v-if="images && images.length > 0"
      arrows
      :items="images"
      :prev="{ icon: 'i-heroicons-chevron-left-20-solid', size: 'lg', color: 'neutral', class: 'hover:opacity-100 opacity-70' }"
      :next="{ icon: 'i-heroicons-chevron-right-20-solid', size: 'lg', color: 'neutral', class: 'hover:opacity-100 opacity-70' }"
      :ui="{
        item: 'basis-full',
        container: 'rounded-lg',
        prev: 'absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/80 hover:bg-white shadow-lg',
        next: 'absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/80 hover:bg-white shadow-lg'
      }"
      class="rounded-lg overflow-hidden"
    >
      <template #default="{ item: imageName }">
        <NuxtImg
          provider="peponi"
          :src="`/accommodation/${imageName}.jpeg`"
          :alt="imageName"
          class="w-full h-64 md:h-80 object-cover"
          loading="lazy"
        />
      </template>
    </UCarousel>
    <div v-else class="w-full h-64 md:h-80 bg-gray-200 rounded-lg flex items-center justify-center">
      <span class="text-gray-500">No images available</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  images?: string[]
}

withDefaults(defineProps<Props>(), {
  images: () => []
})
</script>

<style scoped></style>
