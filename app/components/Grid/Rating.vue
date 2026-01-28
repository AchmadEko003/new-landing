<script lang="ts" setup>
import type { ITripRating } from '~~/shared/interface/ITrip'

interface Props {
  ratings: ITripRating[]
  loading?: boolean
  error?: any
}

const props = withDefaults(defineProps<Props>(), {
  ratings: () => [],
  loading: false,
  error: null
})

const ratings = computed(() => props.ratings || [])
</script>

<template>
  <div class="w-full">
    <div
      v-if="loading"
      class="flex justify-center items-center py-12"
    >
      <div class="text-gray-500">
        Memuat ulasan...
      </div>
    </div>

    <div
      v-else-if="error"
      class="text-red-500 text-center py-8"
    >
      {{ error.message || 'Terjadi kesalahan saat memuat ulasan' }}
    </div>

    <div
      v-else-if="!ratings.length"
      class="text-gray-500 text-center py-8"
    >
      Belum ada ulasan untuk trip ini.
    </div>

    <div
      v-else
      :class="[
        'grid gap-6',
        'grid-cols-12'
      ]"
    >
      <div
        v-for="(rating, index) in ratings"
        :key="index"
        :class="[
          'col-span-12',
          'md:col-span-4'
        ]"
      >
        <CardRating v-bind="rating" />
      </div>
    </div>
  </div>
</template>
