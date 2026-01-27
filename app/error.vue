<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const is404 = computed(() => props.error.status === 404)
const is500 = computed(() => props.error.status >= 500)

const errorTitle = computed(() => {
  if (is404.value) return 'Destination Not Found'
  if (is500.value) return 'Journey Interrupted'
  return 'Something Went Wrong'
})

const errorDescription = computed(() => {
  if (is404.value) return 'Oops! Looks like this destination doesn\'t exist on our map.'
  if (is500.value) return 'Our travel system encountered a technical issue. Please try again later.'
  return 'An unexpected error occurred during your journey.'
})

const errorIcon = computed(() => {
  if (is404.value) return 'i-heroicons-map-pin-20-solid'
  if (is500.value) return 'i-heroicons-exclamation-triangle-20-solid'
  return 'i-heroicons-exclamation-circle-20-solid'
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <UApp>
    <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl w-full text-center">
        <!-- Decorative Elements -->
        <div class="relative mb-8">
          <!-- Main Icon -->
          <div class="flex justify-center mb-6">
            <div class="relative">
              <div class="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
              <UIcon
                :name="errorIcon"
                class="relative w-24 h-24 sm:w-32 sm:h-32 text-primary"
              />
            </div>
          </div>

          <!-- Error Code Badge -->
          <div class="flex justify-center">
            <UBadge
              :label="`Error ${error.status}`"
              color="gray"
              variant="subtle"
              size="lg"
              class="font-mono text-lg px-4 py-2"
            />
          </div>
        </div>

        <!-- Error Content -->
        <div class="space-y-4 mb-10">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            {{ errorTitle }}
          </h1>
          <p class="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto">
            {{ errorDescription }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <UButton
            label="Back to Home"
            icon="i-heroicons-home-20-solid"
            size="lg"
            color="primary"
            @click="handleError"
          />
          <UButton
            label="Go Back"
            icon="i-heroicons-arrow-left-20-solid"
            size="lg"
            color="gray"
            variant="outline"
            @click="$router.back()"
          />
        </div>

        <!-- Additional Help Text -->
        <div class="mt-12 pt-8 border-t border-gray-200">
          <p class="text-sm text-gray-500">
            Need assistance?
            <NuxtLink
              to="/"
              class="text-primary hover:text-primary-600 font-medium transition-colors"
            >
              Contact our support team
            </NuxtLink>
          </p>
        </div>

        <!-- Travel-themed Decorative Icons -->
        <div class="mt-8 flex justify-center gap-4 text-gray-300">
          <UIcon
            name="i-heroicons-paper-airplane-20-solid"
            class="w-6 h-6 transform rotate-45"
          />
          <UIcon
            name="i-heroicons-globe-alt-20-solid"
            class="w-6 h-6"
          />
          <UIcon
            name="i-heroicons-map-20-solid"
            class="w-6 h-6"
          />
        </div>
      </div>
    </div>
  </UApp>
</template>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
