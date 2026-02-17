<script setup lang="ts">
const props = defineProps({
  imgUrl: { type: String, required: true },
  title: { type: String, required: false },
  url: { type: String, required: false },
  aspectAuto: { type: Boolean, required: false }
})

const router = useRouter()
const imgSrc = computed(() => props.imgUrl)

const handleClick = () => {
  if (props.url) {
    router.push(props.url)
  }
}
</script>

<template>
  <div
    :class="['relative rounded-2xl overflow-hidden shadow-lg transition-transform',
             'duration-200 group bg-black/5 hover:scale-99',
             !aspectAuto ? 'aspect-square' : '',
             url ? 'cursor-pointer' : '']"
    @click="handleClick()"
  >
    <NuxtImg
      provider="peponi"
      :src="imgSrc"
      :alt="title"
      loading="lazy"
      decoding="async"
      quality="65"
      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
      placeholder="/assets/image-crashed.png"
      @contextmenu.prevent
    />

    <div
      v-if="title"
      class="absolute inset-0 flex items-end"
      style="background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 10%, transparent 30%)"
    >
      <h2 class="text-white text-xl lg:text-2xl font-bold drop-shadow-lg p-4">
        {{ title }}
      </h2>
    </div>
  </div>
</template>
