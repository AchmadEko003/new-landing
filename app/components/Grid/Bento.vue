<template>
  <div class="flex flex-col gap-3">
    <div
      v-for="(chunk, chunkIdx) in chunkedItems"
      :key="chunkIdx"
      class="grid grid-cols-12 gap-3"
    >
      <NuxtLink
        v-for="(item, i) in chunk"
        :key="i"
        :to="item.url"
        :class="getGridClass(i)"
      >
        <ImageResponsive
          :img-url="item.src"
          :title="item.caption"
          :size="props.size"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IImage } from '~~/shared/interface/IImage'

const props = defineProps({
  items: {
    type: Array as () => IImage[],
    required: true,
    default: () => []
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium', // 'small', 'medium', 'large'
    validator: (value: string) => ['small', 'medium', 'large'].includes(value)
  }
})

// Only use window size on client
const width = ref(1024) // Default for SSR
if (import.meta.client) {
  const { width: windowWidth } = useWindowSize()
  watch(
    windowWidth,
    (val) => {
      width.value = val
    },
    { immediate: true }
  )
}
const isMounted = ref(false)

const gridColsLarge = ref([
  'col-span-4',
  'col-span-8',
  'col-span-4',
  'col-span-4',
  'col-span-4',
  'col-span-8',
  'col-span-4'
])

const gridColsMedium = ref([
  'col-span-12',
  'col-span-6',
  'col-span-6',
  'col-span-12',
  'col-span-6',
  'col-span-6',
  'col-span-12'
])

const getGridClass = (index: number) => {
  if (!isMounted.value) {
    // During SSR, always use medium layout to prevent hydration mismatch
    return gridColsMedium.value[index] || 'col-span-12'
  }
  return width.value > 1024
    ? gridColsLarge.value[index]
    : gridColsMedium.value[index]
}

onMounted(() => {
  isMounted.value = true
})

const chunkedItems = computed(() => {
  const chunkSize = 7
  const result = []
  for (let i = 0; i < props.items.length; i += chunkSize) {
    result.push(props.items.slice(i, i + chunkSize))
  }
  return result
})
</script>
