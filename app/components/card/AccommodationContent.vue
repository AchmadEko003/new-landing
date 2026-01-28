<template>
  <div class="space-y-6">
    <!-- Images Carousel -->
    <div v-if="accommodation.images && accommodation.images.length > 0">
      <CarouselAccommodationImages :images="accommodation.images" />
    </div>
    <div
      v-else
      class="h-64 md:h-80 bg-gray-200 rounded-lg flex items-center justify-center"
    >
      <ImageResponsive
        :img-url="accommodation.image"
        :alt="accommodation.name"
        class="object-cover w-full h-full rounded-lg"
      />
    </div>

    <!-- Accommodation Info -->
    <div class="space-y-4">
      <!-- Name and Rating -->
      <div class="flex items-start justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">
            {{ accommodation.name }}
          </h2>
          <div class="flex items-center gap-2 mt-2">
            <svg
              class="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            <p class="text-gray-600">
              {{ accommodation.location }}
            </p>
          </div>
        </div>
        <div
          v-if="accommodation.rating && accommodation.rating > 0"
          class="flex items-center gap-2 bg-primary-50 px-3 py-2 rounded-lg"
        >
          <svg
            class="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="font-semibold text-gray-900">{{ accommodation.rating.toFixed(1) }}</span>
          <span
            v-if="accommodation.reviewCount && accommodation.reviewCount > 0"
            class="text-gray-600"
          >
            ({{ accommodation.reviewCount }} ulasan)
          </span>
        </div>
      </div>

      <!-- Description -->
      <div v-if="accommodation.description">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Deskripsi
        </h3>
        <p
          class="text-gray-600 leading-relaxed"
          v-html="accommodation.description"
        />
      </div>

      <!-- Facilities -->
      <div v-if="accommodation.facilities && accommodation.facilities.length">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">
          Fasilitas
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div
            v-for="(facility, index) in accommodation.facilities"
            :key="index"
            class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
          >
            <svg
              class="w-4 h-4 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-sm text-gray-700">{{ facility }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
  accommodation: AccommodationItem
}

defineProps<Props>()
</script>

<style scoped></style>
