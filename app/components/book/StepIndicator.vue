<script lang="ts" setup>
const props = defineProps<{
  currentStep: number
  totalSteps?: number
  stepTitles: string[]
  canProceedFromCurrent: boolean
}>()

const emit = defineEmits<{
  (e: 'step-click', step: number): void
}>()

const total = computed(() => props.totalSteps ?? 4)
</script>

<template>
  <div class="flex justify-center items-center mb-8 px-2">
    <div class="flex items-center justify-center w-full max-w-3xl">
      <div class="flex items-center">
        <div
          v-for="step in total"
          :key="step"
          class="flex items-center"
        >
          <div class="flex flex-col items-center">
            <div
              :class="[
                'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm transition-all duration-500 ease-in-out transform',
                step <= props.currentStep
                  ? 'bg-primary scale-110 shadow-lg shadow-primary/30'
                  : 'bg-gray-300 scale-100 shadow-none',
                step === props.currentStep
                  ? 'ring-4 ring-primary/20 animate-pulse'
                  : '',
                step <= props.currentStep || (step === props.currentStep + 1 && props.canProceedFromCurrent)
                  ? 'cursor-pointer hover:scale-125 active:scale-105'
                  : 'cursor-not-allowed opacity-60'
              ]"
              :title="step <= props.currentStep ? `Go to ${props.stepTitles[step - 1]}`
                : step === props.currentStep + 1 && props.canProceedFromCurrent ? `Continue to ${props.stepTitles[step - 1]}`
                  : `Complete current step to access ${props.stepTitles[step - 1]}`"
              @click="emit('step-click', step)"
            >
              <Transition
                name="step-number"
                mode="out-in"
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 scale-50 rotate-180"
                enter-to-class="opacity-100 scale-100 rotate-0"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100 scale-100 rotate-0"
                leave-to-class="opacity-0 scale-50 -rotate-180"
              >
                <span
                  v-if="step < props.currentStep"
                  :key="step"
                  class="text-white"
                >
                  <svg
                    class="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <span
                  v-else
                  :key="`number-${step}`"
                  class="text-white"
                >
                  {{ step }}
                </span>
              </Transition>
            </div>
          </div>
          <div
            v-if="step < total"
            class="w-6 sm:w-12 h-0.5 mx-2"
            :class="step < props.currentStep ? 'bg-primary' : 'bg-gray-300'"
          />
        </div>
      </div>
    </div>
  </div>
</template>
