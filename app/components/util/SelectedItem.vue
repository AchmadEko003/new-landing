<template>
  <button
    :class="[
      'px-4 py-2 rounded-lg font-medium transition-all duration-200',
      disabled
        ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-2 border-transparent'
        : selected
          ? 'bg-white border-2 border-black text-black shadow-sm cursor-pointer'
          : 'bg-transparent border-2 border-transparent text-gray-700 hover:text-primary hover:bg-gray-100 cursor-pointer',
      !disabled && 'focus:outline-none focus:ring-2 focus:ring-primary/20'
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  selected?: boolean
  disabled?: boolean
}

defineProps<Props>()
defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

