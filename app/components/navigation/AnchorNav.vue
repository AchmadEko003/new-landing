<script lang="ts" setup>
interface SectionDef { id: string, title: string }
const props = defineProps<{ sections: SectionDef[] }>()

const activeId = ref<string>('')
const navRef = ref<HTMLElement>()
const ulRef = ref<HTMLElement>()
const borderRef = ref<HTMLElement>()
const buttonRefs = ref<HTMLButtonElement[]>([])

let observer: IntersectionObserver | null = null

// Computed style for the animated border
const borderStyle = computed(() => {
  const activeButton = buttonRefs.value?.find(btn => btn?.dataset.sectionId === activeId.value)
  if (!activeButton || !ulRef.value) {
    return { width: '0px', left: '0px', opacity: '0' }
  }

  const ulRect = ulRef.value.getBoundingClientRect()
  const buttonRect = activeButton.getBoundingClientRect()
  const relativeLeft = buttonRect.left - ulRect.left + ulRef.value.scrollLeft

  return {
    width: `${buttonRect.width}px`,
    left: `${relativeLeft}px`,
    opacity: '1'
  }
})

// Auto-scroll the active item to center
const scrollActiveToCenter = () => {
  if (!navRef.value || !activeId.value) return

  const activeButton = buttonRefs.value?.find(btn => btn?.dataset.sectionId === activeId.value)
  if (!activeButton) return

  const navRect = navRef.value.getBoundingClientRect()
  const buttonRect = activeButton.getBoundingClientRect()

  // Calculate if the button is outside the visible area
  const navLeft = navRect.left
  const navRight = navRect.right
  const buttonLeft = buttonRect.left
  const buttonRight = buttonRect.right

  // Check if button is outside viewport
  if (buttonLeft < navLeft || buttonRight > navRight) {
    const scrollContainer = navRef.value
    const buttonOffsetLeft = activeButton.offsetLeft
    const containerWidth = scrollContainer.clientWidth
    const buttonWidth = activeButton.offsetWidth

    // Calculate scroll position to center the button
    const scrollTo = buttonOffsetLeft - (containerWidth / 2) + (buttonWidth / 2)

    scrollContainer.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    })
  }
}

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' })
  }
}

// Watch for active ID changes to trigger auto-scroll
watch(activeId, () => {
  nextTick(() => {
    scrollActiveToCenter()
  })
})

onMounted(() => {
  // Set initial active section based on current scroll position
  const setInitialActiveSection = () => {
    const scrollPosition = window.scrollY + 200 // Offset for sticky nav
    let currentSection = props.sections[0]?.id || ''

    for (const section of props.sections) {
      const element = document.getElementById(section.id)
      if (element && element.offsetTop <= scrollPosition) {
        currentSection = section.id
      }
    }
    activeId.value = currentSection
  }

  // Initialize active section
  nextTick(() => {
    setInitialActiveSection()
    // Initial scroll to center after component is mounted
    setTimeout(() => scrollActiveToCenter(), 100)
  })

  observer = new IntersectionObserver((entries) => {
    // Find the section that's most visible
    let maxRatio = 0
    let mostVisibleSection = ''

    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
        maxRatio = entry.intersectionRatio
        mostVisibleSection = entry.target.id
      }
    })

    if (mostVisibleSection) {
      activeId.value = mostVisibleSection
    }
  }, {
    rootMargin: '-20% 0px -20% 0px',
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
  })

  props.sections.forEach((s) => {
    const el = document.getElementById(s.id)
    if (el) observer?.observe(el)
  })

  // Add scroll event listener for better tracking
  const handleScroll = () => {
    const scrollPosition = window.scrollY + 200 // Offset for sticky nav
    let currentSection = props.sections[0]?.id || ''

    for (const section of props.sections) {
      const element = document.getElementById(section.id)
      if (element && element.offsetTop <= scrollPosition) {
        currentSection = section.id
      }
    }

    if (currentSection !== activeId.value) {
      activeId.value = currentSection
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  // Add resize event listener to recalculate positions
  const handleResize = () => {
    nextTick(() => scrollActiveToCenter())
  }

  window.addEventListener('resize', handleResize, { passive: true })

  // Cleanup scroll and resize listeners
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <nav
    ref="navRef"
    class="w-full overflow-x-auto no-scrollbar py-2 px-4 md:px-24 sticky top-[62px] bg-white z-50"
  >
    <ul
      ref="ulRef"
      class="flex gap-6 md:gap-8 px-2 pr-8 md:pr-16 relative"
    >
      <!-- Animated border -->
      <div
        ref="borderRef"
        class="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-out"
        :style="borderStyle"
      />

      <li
        v-for="(section, index) in sections"
        :key="section.id"
      >
        <button
          ref="buttonRefs"
          type="button"
          :class="['whitespace-nowrap pb-1 transition-colors text-sm md:text-lg font-bold cursor-pointer relative',
                   activeId === section.id ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary',
                   sections.length - 1 === index ? 'mr-8' : '']"
          :data-section-id="section.id"
          @click="scrollTo(section.id)"
        >
          {{ section.title }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.no-scrollbar {
  scrollbar-width: none;
  scroll-behavior: smooth;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Add padding to the right side to prevent items from sticking to edge */
nav {
  padding-right: 2rem;
}

@media (min-width: 768px) {
  nav {
    padding-right: 6rem;
  }
}

/* Ensure smooth transitions for all elements */
button {
  transition: all 0.2s ease-out;
}

/* Hover effect */
button:hover {
  transform: translateY(-1px);
}

/* Active state enhancement */
button.active {
  text-shadow: 0 0 8px rgba(var(--color-primary), 0.3);
}
</style>
