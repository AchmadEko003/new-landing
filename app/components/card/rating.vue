<script lang="ts" setup>
import type { ITripRating } from '~~/shared/interface/ITripRating'

const props = defineProps<ITripRating>()

const custName = computed(() => props.custName || '')
const review = computed(() => props.review || '')
const rating = computed(() => props.rating || 0)
const postTime = computed(() => props.postTime || '')

const formattedDate = computed(() => {
  if (!postTime.value) return ''
  const date = new Date(postTime.value)
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }
  return date.toLocaleDateString('id-ID', options)
})

const { sanitizeHtml } = useSanitize()
const sanitizedReview = computed(() => sanitizeHtml(review.value))

const stars = computed(() => {
  const fullStars = Math.floor(rating.value)
  const hasHalfStar = rating.value % 1 !== 0
  const emptyStars = 5 - Math.ceil(rating.value)

  return {
    full: fullStars,
    half: hasHalfStar,
    empty: emptyStars
  }
})

const badgeColor = computed(() => {
  return rating.value < 5 ? 'error' : 'success'
})
</script>

<template>
  <div
    :class="[
      'w-full h-full min-h-[200px] p-6',
      'bg-white rounded-2xl',
      'border border-gray-200',
      'hover:border-primary transition-colors duration-300',
      'flex flex-col gap-3 select-none'
    ]"
  >
    <div class="flex flex-col gap-1">
      <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">
        {{ custName }}
      </h3>
      <p class="text-sm text-gray-500">
        {{ formattedDate }}
      </p>
    </div>

    <div class="flex items-center gap-1">
      <UIcon
        v-for="i in stars.full"
        :key="`full-${i}`"
        name="i-heroicons-star-solid"
        class="w-5 h-5 text-yellow-400"
      />
      <UIcon
        v-if="stars.half"
        name="i-heroicons-star-solid"
        class="w-5 h-5 text-yellow-400 opacity-50"
      />
      <UIcon
        v-for="i in stars.empty"
        :key="`empty-${i}`"
        name="i-heroicons-star"
        class="w-5 h-5 text-gray-300"
      />
      <UBadge
        :color="badgeColor"
        variant="soft"
        size="sm"
        class="ml-2"
      >
        {{ rating.toFixed(1) }}
      </UBadge>
    </div>

    <div
      class="text-gray-700 text-sm line-clamp-4 flex-grow prose prose-sm max-w-none"
      v-html="sanitizedReview"
    />
  </div>
</template>

<style scoped>
.prose {
  max-width: 100%;
}
.prose p {
  margin: 0;
}
</style>
