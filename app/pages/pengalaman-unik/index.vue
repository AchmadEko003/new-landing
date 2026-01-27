<script lang="ts" setup>
import type { IImage } from '~~/shared/interface/IImage'
import type { IResponse } from '~~/shared/interface/IResponse'
import type { IUniqueExperience } from '~~/shared/interface/IUniqueExperience'

const baseUrl = useRuntimeConfig().public.apiBase

const query = ref<string | undefined>(undefined)
const categoryUid = computed(() => query.value)

const { y } = useWindowScroll({
  behavior: 'smooth'
})

const { data: pengalamanUnikData } = await useLazyFetch<
  IResponse<IUniqueExperience[]>
>(() => `${baseUrl}UniqueExperience`, {
  key: `unique-experience${categoryUid.value ? '-' + categoryUid.value : ''}`,
  query: {
    categoryUid
  }
})

const reformattedUniqueExperiences = computed(() => {
  const result: IImage[] = [];

  ((pengalamanUnikData?.value?.data ?? []) as IUniqueExperience[]).forEach(
    (experience: IUniqueExperience) => {
      result.push({
        uid: experience.uid || '',
        src: experience.bannerList?.[0]
          ? `/unique-experience/${experience.bannerList[0]}.jpeg`
          : '',
        alt: experience.name,
        url: `/pengalaman-unik/${encodeURIComponent(experience.name.trim().replace(/\s+/g, '-').toLowerCase())}_${experience.uid}`,
        caption: experience.name,
        name: experience.name
      })
    }
  )

  return result
})

const doFilter = (event: string) => {
  if (y.value > 100) {
    y.value = 0

    setTimeout(() => {
      query.value = event || undefined
    }, 700)
  } else {
    query.value = event || undefined
  }
}
</script>

<template>
  <div class="py-10">
    <NavigationSectionHeader title="Pilih pengalaman unikmu" />
    <CarouselUniqueCategory
      class="mb-10"
      @change="doFilter"
    />

    <ClientOnly>
      <template #fallback>
        <div class="flex flex-col gap-10">
          <NavigationSectionHeader title="Pengalaman Unik" />
          <div
            class="w-[95%] md:w-[70%] mx-auto h-96 flex items-center justify-center"
          >
            <span class="text-gray-500">Loading experiences...</span>
          </div>
        </div>
      </template>
      <div class="flex flex-col gap-10">
        <NavigationSectionHeader title="Pengalaman Unik" />
        <!-- Use CSS classes instead of reactive width -->
        <GridBento
          class="w-[95%] md:w-[70%] mx-auto"
          :items="reformattedUniqueExperiences"
          :size="'medium'"
        />
      </div>
    </ClientOnly>
  </div>
</template>
