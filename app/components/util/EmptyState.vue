<script lang="ts" setup>
withDefaults(defineProps<{
  title?: string
  description?: string
  icon?: string
  url: string
  buttonText: string
}>(), {
  title: 'Belum Ada Destinasi',
  description: 'Destinasi yang kamu cari belum tersedia saat ini. Jelajahi halaman lain atau coba lagi nanti.',
  icon: 'i-heroicons-map',
  url: '/',
  buttonText: 'Kembali ke Beranda'
})
</script>

<template>
  <div class="flex flex-col items-center justify-center py-20 px-6 text-center">
    <!-- Decorative circle background -->
    <div class="relative mb-8">
      <div class="absolute inset-0 rounded-full bg-primary/10 blur-2xl scale-150" />
      <div class="relative w-32 h-32 rounded-full bg-primary/5 border-2 border-dashed border-primary/20 flex items-center justify-center">
        <UIcon
          :name="icon"
          class="size-14 text-primary/40"
        />
      </div>
    </div>

    <!-- Text content -->
    <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-2">
      {{ title }}
    </h3>
    <p class="text-sm md:text-base text-gray-400 max-w-md leading-relaxed">
      {{ description }}
    </p>

    <!-- Decorative travel icons row -->
    <div class="flex items-center gap-6 mt-8 text-gray-300">
      <UIcon
        name="i-heroicons-globe-americas"
        class="size-6"
      />
      <span class="w-1 h-1 rounded-full bg-gray-300" />
      <UIcon
        name="i-heroicons-paper-airplane"
        class="size-6"
      />
      <span class="w-1 h-1 rounded-full bg-gray-300" />
      <UIcon
        name="i-heroicons-camera"
        class="size-6"
      />
      <span class="w-1 h-1 rounded-full bg-gray-300" />
      <UIcon
        name="i-heroicons-sun"
        class="size-6"
      />
    </div>

    <div>
      <UButton
        class="mt-8 cursor-pointer"
        variant="outline"
        size="md"
        :ui="{
          base: 'text-primary ring-primary hover:bg-primary/10 active:bg-primary/20'
        }"
        @click="$router.replace(url)"
      >
        {{ buttonText }}
      </UButton>
    </div>
  </div>
</template>
