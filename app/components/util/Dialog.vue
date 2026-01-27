<script lang="ts" setup>
interface DialogProps {
  /** Whether the dialog is open */
  modelValue: boolean
  /** Dialog title */
  title?: string
  /** Dialog description */
  description?: string
  /** Dialog size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'
  /** Whether to show close button */
  closable?: boolean
  /** Whether clicking overlay closes dialog */
  overlayClose?: boolean
  /** Custom dialog classes */
  dialogClass?: string
  /** Whether to show header */
  showHeader?: boolean
  /** Whether to show footer */
  showFooter?: boolean
  /** Loading state */
  loading?: boolean
  /** Prevent scroll when open */
  preventScroll?: boolean
}

const props = withDefaults(defineProps<DialogProps>(), {
  title: '',
  description: '',
  size: 'md',
  closable: true,
  overlayClose: true,
  dialogClass: '',
  showHeader: true,
  showFooter: false,
  loading: false,
  preventScroll: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
  'open': []
}>()

// Dialog size classes
const sizeClasses = {
  'sm': 'max-w-sm',
  'md': 'max-w-md',
  'lg': 'max-w-lg',
  'xl': 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  'full': 'max-w-full mx-4'
}

// Close dialog
const closeDialog = () => {
  emit('update:modelValue', false)
  emit('close')
}

// Handle overlay click
const handleOverlayClick = (event: MouseEvent) => {
  if (props.overlayClose && event.target === event.currentTarget) {
    closeDialog()
  }
}

// Handle escape key
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closable) {
    closeDialog()
  }
}

// Watch for dialog open/close to handle body scroll
watch(() => props.modelValue, (newValue) => {
  if (import.meta.client && props.preventScroll) {
    if (newValue) {
      document.body.style.overflow = 'hidden'
      emit('open')
    } else {
      document.body.style.overflow = ''
    }
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (import.meta.client && props.preventScroll) {
    document.body.style.overflow = ''
  }
})

// Add/remove event listener for escape key
onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <!-- Dialog Overlay -->
  <ClientOnly>
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="modelValue"
          class="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50 backdrop-blur-sm"
          @click="handleOverlayClick"
        >
          <!-- Dialog Container -->
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 transform scale-95 translate-y-4"
            enter-to-class="opacity-100 transform scale-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 transform scale-100 translate-y-0"
            leave-to-class="opacity-0 transform scale-95 translate-y-4"
          >
            <div
              v-if="modelValue"
              :class="[
                'relative bg-white rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-hidden',
                sizeClasses[size],
                dialogClass
              ]"
              role="dialog"
              aria-modal="true"
              :aria-labelledby="title ? 'dialog-title' : undefined"
              :aria-describedby="description ? 'dialog-description' : undefined"
            >
              <!-- Loading Overlay -->
              <div
                v-if="loading"
                class="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center"
              >
                <div class="flex items-center space-x-2">
                  <div
                    class="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"
                  />
                  <span class="text-gray-600">Loading...</span>
                </div>
              </div>

              <!-- Header -->
              <div
                v-if="showHeader && (title || description || $slots.header || closable)"
                class="relative px-6 py-4 border-b border-gray-200"
              >
                <!-- Custom Header Slot -->
                <div v-if="$slots.header">
                  <slot
                    name="header"
                    :close="closeDialog"
                  />
                </div>

                <!-- Default Header -->
                <div
                  v-else
                  class="flex items-start justify-between"
                >
                  <div>
                    <h3
                      v-if="title"
                      id="dialog-title"
                      class="text-lg font-semibold text-gray-900 leading-6"
                    >
                      {{ title }}
                    </h3>
                    <p
                      v-if="description"
                      id="dialog-description"
                      class="mt-1 text-sm text-gray-600"
                    >
                      {{ description }}
                    </p>
                  </div>

                  <!-- Close Button -->
                  <button
                    v-if="closable"
                    type="button"
                    class="ml-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1"
                    aria-label="Close dialog"
                    @click="closeDialog"
                  >
                    <svg
                      class="w-5 h-5"
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
              </div>

              <!-- Body -->
              <div class="px-6 py-4 overflow-y-auto max-h-[60vh]">
                <slot :close="closeDialog" />
              </div>

              <!-- Footer -->
              <div
                v-if="showFooter || $slots.footer"
                class="px-6 py-4 border-t border-gray-200 bg-gray-50"
              >
                <!-- Custom Footer Slot -->
                <div v-if="$slots.footer">
                  <slot
                    name="footer"
                    :close="closeDialog"
                  />
                </div>

                <!-- Default Footer -->
                <div
                  v-else
                  class="flex justify-end space-x-3"
                >
                  <UButton
                    variant="outline"
                    @click="closeDialog"
                  >
                    Cancel
                  </UButton>
                  <UButton @click="closeDialog">
                    OK
                  </UButton>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<style scoped>
/* Additional styles for smooth animations */
.backdrop-blur-sm {
    backdrop-filter: blur(4px);
}
</style>
