<script lang="ts" setup>
import type { IResponseList } from '~~/shared/interface/IResponse'
import type { IAboutUs } from '~~/shared/interface/IAboutUs'

const baseUrl = useRuntimeConfig().public.apiBase

// Set page meta
useHead({
  title: 'Informasi - Peponi',
  meta: [
    { name: 'description', content: 'Informasi lengkap tentang Peponi Travel dan layanan perjalanan kami' }
  ]
})

useSeoMeta({
  title: 'Informasi - Peponi',
  description: 'Informasi lengkap tentang Peponi Travel dan layanan perjalanan kami.',
  ogTitle: 'Informasi - Peponi',
  ogDescription: 'Informasi lengkap tentang Peponi Travel dan layanan perjalanan kami.',
  ogImage: '/assets/peponi-og-image.png',
  ogImageAlt: 'Peponi Travel',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Informasi - Peponi',
  twitterDescription: 'Informasi lengkap tentang Peponi Travel dan layanan perjalanan kami.'
})

const router = useRouter()

// Fetch data
const { data, pending, error } = await useLazyFetch<IResponseList<IAboutUs>>(`${baseUrl}/AboutUs`, {
  key: 'info'
})

// Navigation function
const navigateToItem = (section: string) => {
  // Route to about-us if section is about-us, otherwise use the section value
  const slug = section === 'about-us' ? 'about-us' : section
  router.push(`/info/${slug}`)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
      class="relative py-20 px-4 md:px-8 bg-cover bg-center bg-no-repeat"
      style="background-image: url('http://103.189.234.243/img-asset/assets/7e2b465e-54d9-418c-a88d-62352fee79c8.jpeg')"
    >
      <div class="absolute inset-0 bg-linear-to-t from-black/50 via-black/1 to-transparent" />
      <div class="relative max-w-4xl mx-auto text-center text-white">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          Informasi Peponi
        </h1>
        <p class="text-xl md:text-2xl opacity-90">
          Pelajari lebih lanjut tentang perjalanan dan layanan kami
        </p>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-16 px-4 md:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Loading State -->
        <div
          v-if="pending"
          class="space-y-4"
        >
          <div
            v-for="i in 3"
            :key="i"
            class="bg-white rounded-xl p-6 shadow-sm"
          >
            <div class="animate-pulse">
              <div class="h-6 bg-gray-200 rounded w-3/4 mb-3" />
              <div class="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div
          v-else-if="error || !data?.meta?.status"
          class="text-center py-12"
        >
          <UIcon
            name="heroicons:exclamation-triangle"
            class="text-6xl text-red-500 mb-4"
          />
          <h3 class="text-xl font-semibold text-gray-800 mb-2">
            Terjadi Kesalahan
          </h3>
          <p class="text-gray-600">
            {{ error?.message || data?.meta?.message || 'Gagal memuat data' }}
          </p>
        </div>

        <!-- Success State -->
        <div
          v-else-if="data?.data && data.data.length > 0"
          class="space-y-4"
        >
          <h2 class="text-3xl font-bold text-gray-800 mb-8">
            Daftar Informasi
          </h2>

          <div
            v-for="item in data.data"
            :key="item.section"
            class="bg-white rounded-xl p-5 border border-gray-300 group hover:border-primary duration-200 cursor-pointer"
            @click="navigateToItem(item.section)"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-semibold">
                {{ item.header }}
              </h3>
              <UIcon
                name="heroicons:chevron-right"
                class="text-2xl text-gray-400 font-semibold group-hover:text-primary"
              />
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else
          class="text-center py-12"
        >
          <UIcon
            name="heroicons:document-text"
            class="text-6xl text-gray-400 mb-4"
          />
          <h3 class="text-xl font-semibold text-gray-600 mb-2">
            Belum Ada Informasi
          </h3>
          <p class="text-gray-500">
            Informasi akan segera tersedia
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
