<template>
  <div>
    <div
      :class="['relative rounded-2xl overflow-hidden shadow-lg transition-transform',
               'duration-200 group bg-black/5 hover:scale-99 cursor-pointer',
               sizeImage]"
      @click="openZoom"
    >
      <NuxtImg
        provider="peponi"
        :src="imgSrc"
        :alt="title"
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
        placeholder="/assets/image-crashed.png"
        @contextmenu.prevent
      />

      <div
        v-if="title"
        class="absolute bottom-0 left-0 w-full pt-10 pb-5 px-4 flex items-end"
        style="background: linear-gradient(to top, rgba(0,0,0,0.3) 10%, transparent 70%)"
      >
        <h2 class="text-white text-xl lg:text-2xl font-bold drop-shadow-lg line-clamp-1 md:line-clamp-2">
          {{ title }}
        </h2>
      </div>
    </div>

    <!-- Zoom Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isZoomed"
          class="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/50"
          @click="closeZoom"
        >
          <div class="relative w-full h-full flex items-center justify-center">
            <!-- Close button -->
            <button
              class="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
              @click.stop="closeZoom"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <!-- Zoomed Image -->
            <NuxtImg
              provider="peponi"
              :src="imgSrc"
              :alt="title"
              class="w-[85dvh] max-h-full object-contain rounded-lg"
              placeholder="/assets/image-crashed.png"
              @click.stop
              @contextmenu.prevent
            />

            <!-- Title overlay on zoomed image -->
            <div
              v-if="title"
              class="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg"
            >
              <h2 class="text-xl lg:text-2xl font-bold">
                {{ title }}
              </h2>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  imgUrl: { type: String, required: true },
  title: { type: String, required: false },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium',
    validator: (value: string) => ['small', 'medium', 'large'].includes(value)
  }
})

const imgSrc = computed(() => props.imgUrl)
const isZoomed = ref(false)

const sizeImage = computed(() => {
  switch (props.size) {
    case 'small':
      return 'h-40 md:h-56'
    case 'medium':
      return 'h-56 md:h-80'
    case 'large':
      return 'h-80 md:h-96'
    default:
      return 'h-56 md:h-80'
  }
})

const openZoom = () => {
  isZoomed.value = true
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden'
}

const closeZoom = () => {
  isZoomed.value = false
  // Restore body scroll
  document.body.style.overflow = ''
}

// Clean up on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
