<template>
  <div class="flex justify-between mb-3 px-6 md:px-24">
    <h2 class="text-xl md:text-[26px] font-bold">
      {{ props.title }}
    </h2>

    <NuxtLink
      v-if="props.url"
      class="text-sm md:text-lg transition-all hover:underline hover:text-primary"
      :href="props.url"
    >Lihat Semua</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string
  url?: string
}>()
</script>
