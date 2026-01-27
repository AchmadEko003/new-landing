<template>
  <div
    :class="['relative rounded-2xl overflow-hidden shadow-lg transition-transform',
             'duration-200 group bg-black/5 hover:scale-99',
             url ? 'cursor-pointer' : '']"
    @click="handleClick()"
  >
    <NuxtImg
      provider="peponi"
      :src="imgSrc"
      :alt="title"
      loading="lazy"
      :class="['w-full object-cover group-hover:scale-110 transition-transform duration-200', sizeImage]"
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
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  imgUrl: { type: String, required: true },
  title: { type: String, required: false },
  url: { type: String, required: false },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium', // 'small', 'medium', 'large'
    validator: (value: string) => ['small', 'medium', 'large'].includes(value)
  }
})

const router = useRouter()
const imgSrc = computed(() => props.imgUrl)
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

const handleClick = () => {
  if (props.url) {
    router.push(props.url)
  }
}
</script>
