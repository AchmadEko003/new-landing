<template>
  <div class="bg-white border border-gray-200 rounded-2xl p-4 hover:border-primary transition-colors duration-300">
    <div class="flex items-center gap-3">
      <div class="bg-primary/10 rounded-full flex justify-center items-center p-2 w-10 h-10">
        <!-- <UIcon :name="icon" class="text-primary text-xl" /> -->
        <ImageIcon
          :name="icon"
          folder="assets/icon"
          class="text-white"
        />
      </div>
      <div>
        <p class="text-sm text-gray-600">
          {{ label }}
        </p>
        <p class="text-lg font-semibold text-gray-900">
          {{ value }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  value: string
  icon: string
}

defineProps<Props>()
</script>
