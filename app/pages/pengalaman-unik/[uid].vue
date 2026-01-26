<script lang="ts" setup>
import type { IResponse } from '~~/shared/interface/IResponse'
import type { IUniqueExperienceDetail } from '~~/shared/interface/IUniqueExperience'

const baseUrl = useRuntimeConfig().public.apiBase
const route = useRoute()

const uid = computed(() => (route.params.uid as string).split('_')[1] || '')
const title = computed(() => {
  const param = route.params.uid as string || '';
  const rawTitle = param.split('_')[0] || '';
  return rawTitle
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
})

const { data: detailData, pending } = useFetch<IResponse<IUniqueExperienceDetail>>(() => `${baseUrl}UniqueExperience/${uid.value}` )

const bannerList = computed(() => {
  return detailData?.value?.data?.bannerList?.map(item => `/unique-experience/${item}.jpeg`) || []
})
</script>

<template>
  <image-loading v-if="pending" />
  <div v-else class="flex flex-col gap-7">
    <ClientOnly>
      <CarouselBannerPage
        v-if="bannerList && bannerList.length > 0"
        :banners-data="bannerList"
      />
    </ClientOnly>
    <div class="mt-3">
      <navigation-section-header :title="title" class="md:mx-20 px-6 md:px-24" />
      <util-html-render :content="detailData?.data?.summary || ''" class="md:mx-20 px-6 md:px-24" />
    </div>
  </div>
</template>
