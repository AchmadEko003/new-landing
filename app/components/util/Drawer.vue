<template>
  <ClientOnly>
    <Teleport to="body">
      <!-- Overlay -->
      <Transition
        name="overlay"
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="modelValue"
          class="fixed inset-0 bg-black/50 z-40"
          @click="closeDrawer"
        />
      </Transition>

      <!-- Drawer -->
      <Transition
        :name="transitionName"
        :enter-active-class="enterActiveClass"
        :enter-from-class="enterFromClass"
        :enter-to-class="enterToClass"
        :leave-active-class="leaveActiveClass"
        :leave-from-class="leaveFromClass"
        :leave-to-class="leaveToClass"
      >
        <div
          v-if="modelValue"
          :class="drawerClasses"
          class="fixed z-50 bg-white shadow-xl"
        >
          <!-- Header -->
          <div
            v-if="title || $slots.header"
            class="flex items-center justify-between p-4 border-b border-gray-200"
          >
            <slot name="header">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ title }}
                </h3>
                <h5 class="text-sm font-medium text-gray-500">
                  {{ subtitle }}
                </h5>
              </div>
            </slot>
            <button
              class="p-1 rounded-full hover:bg-gray-100 transition-colors"
              @click="closeDrawer"
            >
              <svg
                class="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div :class="contentClasses">
            <slot />
          </div>

          <!-- Footer -->
          <div
            v-if="$slots.footer"
            class="p-4 border-t border-gray-200"
          >
            <slot name="footer" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: boolean
  title?: string
  subtitle?: string
  side?: 'left' | 'right' | 'top' | 'bottom'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  overlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  side: 'bottom',
  size: 'md',
  overlay: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const closeDrawer = () => {
  emit('update:modelValue', false)
}

// Handle escape key
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.modelValue) {
    closeDrawer()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

// Prevent body scroll when drawer is open
watch(() => props.modelValue, (isOpen) => {
  if (import.meta.client) {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: {
      bottom: 'max-h-[50vh]',
      top: 'max-h-[50vh]',
      left: 'w-80',
      right: 'w-80'
    },
    md: {
      bottom: 'max-h-[70vh]',
      top: 'max-h-[70vh]',
      left: 'w-96',
      right: 'w-96'
    },
    lg: {
      bottom: 'max-h-[80vh]',
      top: 'max-h-[80vh]',
      left: 'w-[32rem]',
      right: 'w-[32rem]'
    },
    xl: {
      bottom: 'max-h-[90vh]',
      top: 'max-h-[90vh]',
      left: 'w-[40rem]',
      right: 'w-[40rem]'
    },
    full: {
      bottom: 'h-screen',
      top: 'h-screen',
      left: 'w-screen',
      right: 'w-screen'
    }
  }

  return sizes[props.size][props.side]
})

const drawerClasses = computed(() => {
  const baseClasses = 'flex flex-col'
  const positionClasses = {
    bottom: 'bottom-0 left-0 right-0 rounded-t-lg',
    top: 'top-0 left-0 right-0 rounded-b-lg',
    left: 'top-0 left-0 bottom-0 rounded-r-lg',
    right: 'top-0 right-0 bottom-0 rounded-l-lg'
  }

  return `${baseClasses} ${positionClasses[props.side]} ${sizeClasses.value}`
})

const contentClasses = computed(() => {
  return 'flex-1 overflow-y-auto p-4'
})

const transitionName = computed(() => `drawer-${props.side}`)

const enterActiveClass = computed(() => 'transition-transform duration-300 ease-out')
const leaveActiveClass = computed(() => 'transition-transform duration-200 ease-in')

const enterFromClass = computed(() => {
  const transforms = {
    bottom: 'transform translate-y-full',
    top: 'transform -translate-y-full',
    left: 'transform -translate-x-full',
    right: 'transform translate-x-full'
  }
  return transforms[props.side]
})

const enterToClass = computed(() => 'transform translate-x-0 translate-y-0')

const leaveFromClass = computed(() => 'transform translate-x-0 translate-y-0')

const leaveToClass = computed(() => {
  const transforms = {
    bottom: 'transform translate-y-full',
    top: 'transform -translate-y-full',
    left: 'transform -translate-x-full',
    right: 'transform translate-x-full'
  }
  return transforms[props.side]
})
</script>

<style scoped>
/* Additional styling if needed */
</style>
