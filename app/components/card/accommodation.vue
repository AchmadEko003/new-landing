<script lang="ts" setup>
interface Props {
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

const props = withDefaults(defineProps<Props>(), {
  rating: 0,
  reviewCount: 0,
  description: '',
  facilities: () => [],
  images: () => []
})

const emit = defineEmits<{
  'view-details': [accommodation: Props]
}>()

const viewDetails = () => {
  emit('view-details', props)
}
</script>

<template>
  <div
    class="group w-full cursor-pointer overflow-hidden rounded-xl bg-white"
    @click="viewDetails"
  >
    <!-- Image Section -->
    <div class="overflow-hidden">
      <NuxtImg
        provider="peponi"
        :src="image"
        :alt="name"
        placeholder="/assets/image-crashed.png"
        class="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        @contextmenu.prevent
      />
    </div>

    <!-- Content Section -->
    <div class="p-4">
      <h3 class="text-xl font-bold text-gray-900">
        {{ name }}
      </h3>
      <p class="mt-1 text-gray-500">
        {{ location }}
      </p>
      <button
        class="cursor-pointer mt-1 text-primary font-medium transition-all duration-200 hover:underline"
        @click.stop="viewDetails"
      >
        Lihat Rincian
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
