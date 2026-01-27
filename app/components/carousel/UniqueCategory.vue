<script lang="ts" setup>
import type { IResponse, IResponseList } from '~~/shared/interface/IResponse'
import type { IUniqueExperienceCategory } from '~~/shared/interface/IUniqueExperience'

const baseUrl = useRuntimeConfig().public.apiBase
const emit = defineEmits(['change'])

const carousel = ref<any>(null)
const emblaApi = computed(() => carousel.value?.emblaApi)

const selectCategory = ref(0)

const { data: pengalamanUnikCategoryData, pending: pengalamanUnikCategoryPending }
  = useLazyFetch<IResponseList<IUniqueExperienceCategory>>(`${baseUrl}/UniqueExperience/category`, {
    method: 'get',
    key: 'unique-experience-category'
  })

const handleClick = (index: number) => {
  selectCategory.value = index

  if (index !== 0) {
    emblaApi.value.scrollTo(index)
  } else {
    emblaApi.value.scrollTo(0)
  }
}

const listImages = computed(() => {
  const temp: IUniqueExperienceCategory[] = pengalamanUnikCategoryData?.value?.data || []

  if (temp.length === 0) {
    return []
  }

  temp.unshift({
    uid: '',
    bannerName: '',
    name: 'All'
  })

  temp.push({
    uid: '',
    bannerName: '',
    name: ''
  })

  return temp
})
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <div class="w-full h-20 flex items-center justify-center sticky top-[62px] bg-white z-50">
        <span class="text-gray-500">Loading categories...</span>
      </div>
    </template>
    <UCarousel
      ref="carousel"
      v-slot="{ item, index }"
      :items="listImages"
      wheel-gestures
      drag-free
      :skip-snaps="true"
      class="w-full sticky top-[62px] bg-white z-50"
      :ui="{ item: 'basis-1/4 lg:basis-1/7 xl:basis-1/11', container: 'px-2 md:px-32' }"
    >
      <div
        v-if="index < ((listImages?.length || 0) - 1)"
        class="w-[4.5em] md:w-[5em] flex flex-col cursor-pointer justify-center items-center md:pb-3"
      >
        <UButton
          :color="undefined"
          variant="ghost"
          class="rounded-2xl cursor-pointer"
          @click="handleClick(index), emit('change', item.uid)"
        >
          <NuxtImg
            v-if="item.name.toLowerCase() !== 'all'"
            provider="peponi"
            :src="`/unique-experience/512_${item.bannerName}.webp`"
            :alt="item.name"
            @contextmenu.prevent
          />
          <NuxtImg
            v-else
            src="/assets/all-icon.png"
            :alt="item.name"
            @contextmenu.prevent
          />
        </UButton>

        <h3 class="text-sm md:text-base font-bold text-center wrap-break-word md:max-w-[8em] xl:w-[8em]">
          {{ item.name }}
        </h3>

        <div
          v-if="selectCategory === index"
          class="mx-auto mt-1 rounded-full h-1 w-1/2 bg-emerald-600 transition-all duration-300 ease-in-out"
        />
      </div>
      <div
        v-else
        class="w-10 h-5"
      />
    </UCarousel>
  </ClientOnly>
</template>

<style scoped>
.w-full {
  max-width: 100vw;
}
</style>
