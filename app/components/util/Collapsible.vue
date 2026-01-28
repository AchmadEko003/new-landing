<template>
  <div class="border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden">
    <!-- Header - Always visible -->
    <button
      class="w-full px-4 py-4 hover:cursor-pointer md:px-6 md:py-5 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
      :aria-expanded="isExpanded"
      :aria-controls="`collapsible-content-${id}`"
      @click="toggle"
    >
      <!-- Left side content -->
      <div class="flex-1 text-left">
        <div class="font-bold text-gray-900 text-base md:text-lg">
          {{ title }}
        </div>
        <div
          v-if="subtitle"
          class="text-gray-600 text-sm md:text-base mt-1"
        >
          {{ subtitle }}
        </div>
      </div>

      <!-- Right side content -->
      <div class="flex items-center gap-3 md:gap-4">
        <!-- Price or custom content -->
        <div
          v-if="price"
          class="text-right"
        >
          <div
            v-if="badge"
            class="inline-flex items-center px-2 py-1 mb-1 rounded-lg text-xs font-medium"
            :class="badgeClass"
          >
            {{ badge }}
          </div>
          <div class="font-bold text-gray-900 text-base md:text-xl">
            {{ formatCurrency(price) }}
          </div>
        </div>

        <!-- Custom right content slot -->
        <div v-if="$slots.rightContent">
          <slot name="rightContent" />
        </div>

        <!-- Chevron icon -->
        <UIcon
          name="i-heroicons-chevron-down"
          class="w-4 h-4 md:w-5 md:h-5 text-black font-black transition-transform duration-200"
          :class="{ 'rotate-180': isExpanded }"
        />
      </div>
    </button>

    <!-- Expandable content -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-[1000px] opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="max-h-[1000px] opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div
        v-if="isExpanded"
        :id="`collapsible-content-${id}`"
        class="overflow-hidden border-t border-gray-100"
      >
        <div class="px-4 py-4 md:px-6 md:py-5">
          <slot name="content" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency } from '~~/shared/script/currency'

interface Props {
  title: string
  subtitle?: string
  price?: number
  badge?: string
  badgeVariant?: 'red' | 'green' | 'blue' | 'yellow' | 'gray'
  initialExpanded?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  badgeVariant: 'red',
  initialExpanded: false,
  id: () => Math.random().toString(36).substring(2, 9)
})

// Reactive state for expansion
const isExpanded = ref(props.initialExpanded)

// Toggle function
const toggle = () => {
  isExpanded.value = !isExpanded.value
}

// Badge styling
const badgeClass = computed(() => {
  const variants = {
    red: 'bg-red-600 text-white',
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    gray: 'bg-gray-100 text-gray-800'
  }
  return variants[props.badgeVariant] || variants.red
})

// Expose toggle function for parent components
defineExpose({
  toggle,
  isExpanded: readonly(isExpanded)
})
</script>
