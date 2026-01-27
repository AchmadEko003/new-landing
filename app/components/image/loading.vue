<template>
  <div class="flex items-center justify-center h-[85dvh] w-dvw">
    <DotLottieVue
      src="/assets/json/Loading.json"
      class="w-30 h-30 mx-auto"
      autoplay
      loop
    />
  </div>
</template>

<script lang="ts" setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
</script>
