<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
    <div class="flex items-center justify-between">
      <!-- Price Info -->
      <div>
        <p class="text-xs text-gray-500">
          {{ priceLabel }}
        </p>
        <p class="text-lg font-bold text-gray-900">
          {{ formattedPrice }}
        </p>
      </div>

      <!-- Action Button -->
      <UButton
        color="primary"
        size="lg"
        class="px-6 font-semibold rounded-xl cursor-pointer"
        @click="$emit('buttonClick')"
      >
        {{ buttonText }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  price?: number | string
  priceLabel?: string
  buttonText?: string
  buttonColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  priceLabel: 'mulai dari',
  buttonText: 'Lihat Jadwal',
  buttonColor: 'primary'
})

defineEmits<{
  buttonClick: []
}>()

const formattedPrice = computed(() => {
  if (!props.price) return 'Rp 0'

  const numericPrice = typeof props.price === 'string' ? parseFloat(props.price) : props.price
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericPrice)
})
</script>
