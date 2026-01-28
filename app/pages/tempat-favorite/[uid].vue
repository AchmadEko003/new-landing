<script lang="ts" setup>
import type { IResponse } from '~~/shared/interface/IResponse'
import type { IFavoriteLocationDetail } from '~~/shared/interface/IFavoriteLocation'
import { setImageBaseUrlForSeo } from '~~/shared/script/set-baseUrl-image-seo'

const baseUrl = useRuntimeConfig().public.apiBase
const route = useRoute()

const uid = computed(() => (route.params.uid as string).split('_')[1] || '')
const title = computed(() => {
  const param = (route.params.uid as string) || ''
  const rawTitle = param.split('_')[0] || ''
  return rawTitle
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
})

const { data: favoriteData } = useNuxtData(`favorite-location-${uid.value}`)
const { data: detailData, pending } = useLazyFetch<
  IResponse<IFavoriteLocationDetail>
>(() => `${baseUrl}/FavouriteLocation/${uid.value}`, {
  method: 'GET',
  key: `favorite-location-${uid.value}`,
  getCachedData() {
    if (favoriteData.value) {
      return favoriteData.value as IResponse<IFavoriteLocationDetail>
    }
  }
})

const bannerList = computed(() => {
  return (
    detailData?.value?.data?.banner?.map(
      item => `/favorite-location/${item}.jpeg`
    ) || []
  )
})

useSeoMeta({
  title: title.value + ' - Peponi',
  description: detailData?.value?.data?.summary || 'Jelajahi destinasi favorit bersama Peponi Travel. Temukan petualangan tak terlupakan yang sesuai dengan minat dan keinginan Anda.',
  ogTitle: title.value + ' - Peponi',
  ogDescription: detailData?.value?.data?.summary
    || 'Jelajahi destinasi favorit bersama Peponi Travel. Temukan petualangan tak terlupakan yang sesuai dengan minat dan keinginan Anda.',
  ogUrl: () => `https://localhost:3000/tempat-favorite/${route.params.uid}`,
  ogImage: () => bannerList.value.length > 0 ? setImageBaseUrlForSeo(bannerList.value[0]) : undefined,
  ogImageAlt: title.value,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: title.value + ' - Peponi',
  twitterDescription: detailData?.value?.data?.summary
    || 'Jelajahi destinasi favorit bersama Peponi Travel. Temukan petualangan tak terlupakan yang sesuai dengan minat dan keinginan Anda.',
  twitterImage: () => bannerList.value.length > 0 ? setImageBaseUrlForSeo(bannerList.value[0]) : undefined,
  twitterImageAlt: title.value
})
</script>

<template>
  <image-loading v-if="pending" />
  <div
    v-else
    class="flex flex-col gap-7"
  >
    <ClientOnly>
      <CarouselBannerPage
        v-if="bannerList && bannerList.length > 0"
        :banners-data="bannerList"
      />
    </ClientOnly>
    <div class="mt-3">
      <navigation-section-header
        :title="title"
        class="md:mx-20 px-6 md:px-24"
      />
      <util-html-render
        :content="detailData?.data?.summary || ''"
        class="md:mx-20 px-6 md:px-24"
      />
    </div>
  </div>
</template>
