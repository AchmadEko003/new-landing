<template>
  <div
    :class="[
      'inline-flex items-center justify-center',
      sizeClasses,
      colorClasses,
      className
    ]"
    :style="customStyle"
  >
    <img
      :src="iconSrc"
      :alt="alt || name"
      :class="[
        'object-contain',
        isSvg ? 'w-full h-full' : 'max-w-full max-h-full'
      ]"
      @error="onImageError"
      @load="onImageLoad"
    >
  </div>
</template>

<script setup lang="ts">
export interface ImageIconProps {
  name: string
  size?: string | number
  color?: string
  variant?: 'solid' | 'outline' | 'mini'
  class?: string
  folder?: string
  fallback?: string
  alt?: string
}

const props = withDefaults(defineProps<ImageIconProps>(), {
  size: '1.25rem',
  color: 'currentColor',
  variant: 'solid',
  class: '',
  folder: '',
  fallback: '/assets/image-crashed.png',
  alt: ''
})

const emit = defineEmits<{
  error: [error: Event]
  load: [event: Event]
}>()

// Computed properties
const iconSrc = computed(() => {
  const basePath = props.folder ? `/${props.folder}/` : '/'
  const extension = props.name.includes('.') ? '' : '.png'
  return `${basePath}${props.name}${extension}`
})

const isSvg = computed(() => {
  return props.name.toLowerCase().includes('.svg') || props.folder === 'assets/icons'
})

const sizeValue = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`
  }

  // Handle predefined sizes
  const sizeMap: Record<string, string> = {
    'xs': '0.75rem',
    'sm': '1rem',
    'md': '1.25rem',
    'lg': '1.5rem',
    'xl': '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
    '4xl': '4rem',
    '5xl': '5rem'
  }

  return sizeMap[props.size] || props.size
})

const sizeClasses = computed(() => {
  return {
    'w-3 h-3': props.size === 'xs',
    'w-4 h-4': props.size === 'sm',
    'w-5 h-5': props.size === 'md',
    'w-6 h-6': props.size === 'lg',
    'w-8 h-8': props.size === 'xl',
    'w-10 h-10': props.size === '2xl',
    'w-12 h-12': props.size === '3xl',
    'w-16 h-16': props.size === '4xl',
    'w-20 h-20': props.size === '5xl'
  }
})

const colorClasses = computed(() => {
  // For SVGs, we can apply filter effects to change colors
  if (isSvg.value && props.color !== 'currentColor') {
    return ''
  }
  return ''
})

const customStyle = computed(() => {
  const style: Record<string, string> = {}

  // Apply custom size if not using predefined sizes
  if (!['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'].includes(props.size.toString())) {
    style.width = sizeValue.value
    style.height = sizeValue.value
  }

  // Apply color filter for SVGs
  if (isSvg.value && props.color !== 'currentColor') {
    // This is a basic implementation - you might want to use a color conversion library
    // for more accurate color mapping
    if (props.color.startsWith('#')) {
      // Convert hex to filter (this is a simplified approach)
      style.filter = `brightness(0) saturate(100%) ${hexToFilter(props.color)}`
    }
  }

  return style
})

const className = computed(() => props.class)

// Helper function to convert hex color to CSS filter (simplified)
function hexToFilter(hex: string): string {
  // This is a very basic implementation
  // For production, consider using a proper color conversion library
  const color = hex.replace('#', '')
  const r = parseInt(color.substr(0, 2), 16)
  const g = parseInt(color.substr(2, 2), 16)
  const b = parseInt(color.substr(4, 2), 16)

  // Convert to HSL and create filter
  const hue = Math.round(Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180 / Math.PI)
  return `hue-rotate(${hue}deg)`
}

// Event handlers
function onImageError(error: Event) {
  // Fallback to default image
  const target = error.target as HTMLImageElement
  if (target.src !== props.fallback) {
    target.src = props.fallback
  }
  emit('error', error)
}

function onImageLoad(event: Event) {
  emit('load', event)
}
</script>

<style scoped>
/* Additional styles for better icon rendering */
img {
  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>
