<template>
  <div class="flex flex-col gap-3">
    <!-- Responsive grid -->
    <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      <div
        v-for="(certificate, index) in certificates"
        :key="certificate.name"
        :class="[
          'rounded-lg overflow-hidden min-h-62.5 flex items-center',
          getGridSpan(index)
        ]"
      >
        <NuxtImg
          provider="peponi"
          :src="`/certificate/${certificate.name}.jpeg`"
          :alt="certificate.name"
          loading="lazy"
          class="w-full object-center"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ICertificate } from '~~/shared/interface/ICertificate'
// import ImageResponsive from "~/components/image/responsive.vue";

defineProps<{ certificates: ICertificate[] }>()

const getGridSpan = (index: number) => {
  // Pola berulang setiap 6 item
  const mod = index % 6

  if (mod === 0 || mod === 3) {
    // Index 0 dan 3: Baris Penuh
    return 'lg:col-span-3 md:col-span-2 col-span-1'
  } else if (mod === 1) {
    // Index 1: Span 2
    return 'lg:col-span-2 md:col-span-1 col-span-1'
  } else if (mod === 2) {
    // Index 2: Span 1
    return 'lg:col-span-1 md:col-span-1 col-span-1'
  } else if (mod === 4) {
    // Index 4: Span 1
    return 'lg:col-span-1 md:col-span-1 col-span-1'
  } else if (mod === 5) {
    // Index 5: Span 2
    return 'lg:col-span-2 md:col-span-1 col-span-1'
  }
}
</script>
