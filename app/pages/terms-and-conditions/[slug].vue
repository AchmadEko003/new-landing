<script lang="ts" setup>
import type { IResponse } from '~~/shared/interface/IResponse'
import type { ITermsAndConditions } from '~~/shared/interface/ITermsAndConditions'

const baseUrl = useRuntimeConfig().public.apiBase

const route = useRoute()
const slug = route.params.slug as string

// Set page meta
useHead({
  title: `${slug} - Syarat & Ketentuan - Peponi`,
  meta: [
    { name: 'description', content: 'Detail syarat dan ketentuan penggunaan layanan Peponi Travel.' }
  ]
})

useSeoMeta({
  title: () => data.value?.data?.header ? `${data.value.data.header} - Syarat & Ketentuan - Peponi` : `${slug} - Syarat & Ketentuan - Peponi`,
  description: 'Detail syarat dan ketentuan penggunaan layanan Peponi Travel.',
  ogTitle: () => data.value?.data?.header ? `${data.value.data.header} - Syarat & Ketentuan - Peponi` : `${slug} - Syarat & Ketentuan - Peponi`,
  ogDescription: 'Detail syarat dan ketentuan penggunaan layanan Peponi Travel.',
  ogImage: () => backgroundImageUrl.value,
  ogImageAlt: () => data.value?.data?.header || slug,
  twitterCard: 'summary_large_image',
  twitterTitle: () => data.value?.data?.header ? `${data.value.data.header} - Syarat & Ketentuan - Peponi` : `${slug} - Syarat & Ketentuan - Peponi`,
  twitterDescription: 'Detail syarat dan ketentuan penggunaan layanan Peponi Travel.'
})

// Background image mapping based on slug
const backgroundImageUrl = computed(() => {
  const imageMap: Record<string, string> = {
    'legalitas': 'http://103.189.234.243/img-asset/assets/cd0a31d6-cfa8-42ab-ab97-b504ad0b2a78.jpeg',
    'privacy-policy': 'http://103.189.234.243/img-asset/assets/933d687d-e81b-4339-a30d-c6bd44bc4fb3.jpeg',
    'booking-conditions': 'http://103.189.234.243/img-asset/assets/6d7f50b3-8fb9-44c7-9db3-22560bec200e.jpeg'
  }

  // Return specific image for slug, or default image if not found
  return imageMap[slug] || 'http://103.189.234.243/img-asset/assets/933d687d-e81b-4339-a30d-c6bd44bc4fb3.jpeg'
})

// Fetch data
const { data, pending, error } = await useLazyFetch<IResponse<ITermsAndConditions>>(`${baseUrl}/termsCondition/${slug}`, {
  method: 'GET',
  key: `terms-${slug}`
})

// Utility function
// const formatDate = (date: Date) => {
//   return new Intl.DateTimeFormat('id-ID', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   }).format(date)
// }
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div
      v-if="pending"
      class="animate-pulse"
    >
      <!-- Hero Skeleton -->
      <div class="h-64 bg-gray-300" />
      <!-- Content Skeleton -->
      <div class="max-w-4xl mx-auto px-4 py-16">
        <div class="space-y-6">
          <div class="h-8 bg-gray-300 rounded w-3/4" />
          <div class="h-4 bg-gray-300 rounded w-full" />
          <div class="h-4 bg-gray-300 rounded w-5/6" />
          <div class="h-4 bg-gray-300 rounded w-4/5" />
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error || !data?.meta?.status"
      class="min-h-screen flex items-center justify-center"
    >
      <div class="text-center">
        <UIcon
          name="heroicons:exclamation-triangle"
          class="text-6xl text-red-500 mb-4"
        />
        <h1 class="text-2xl font-bold text-gray-800 mb-2">
          Halaman Tidak Ditemukan
        </h1>
        <p class="text-gray-600 mb-6">
          {{ error?.message || data?.meta?.message || 'Halaman yang Anda cari tidak tersedia' }}
        </p>
        <UButton
          to="/terms-and-conditions"
          variant="outline"
        >
          <UIcon
            name="heroicons:arrow-left"
            class="mr-2"
          />
          Kembali ke Syarat & Ketentuan
        </UButton>
      </div>
    </div>

    <!-- Success State -->
    <div v-else-if="data?.data">
      <!-- Hero Section -->
      <section
        class="relative overflow-hidden bg-cover bg-center bg-no-repeat"
        :style="`background-image: url('${backgroundImageUrl}')`"
      >
        <!-- Background with gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/[1%] to-transparent" />

        <!-- Content -->
        <div class="relative z-10 py-20 px-4 md:px-8">
          <div class="max-w-4xl mx-auto text-center text-white">
            <div class="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <UIcon
                name="heroicons:document-text"
                class="mr-2"
              />
              <span class="text-sm font-medium">Syarat & Ketentuan</span>
            </div>
            <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {{ data.data.header }}
            </h1>
          </div>
        </div>
      </section>

      <!-- Content Section -->
      <section class="py-16 px-4 md:px-8">
        <div class="max-w-4xl mx-auto">
          <!-- Content Card -->
          <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <!-- Content Body -->
            <div class="p-8 md:p-12">
              <!-- Rich Content -->
              <div class="prose prose-lg max-w-none">
                <div
                  v-if="data.data.content"
                  class="rich-content"
                  v-html="data.data.content"
                />
                <div
                  v-else-if="data.data.section"
                  class="rich-content"
                >
                  <p class="text-gray-700 leading-relaxed">
                    {{ data.data.section }}
                  </p>
                </div>
                <div
                  v-else
                  class="text-center py-12"
                >
                  <UIcon
                    name="heroicons:document"
                    class="text-6xl text-gray-400 mb-4"
                  />
                  <p class="text-gray-500 text-lg">
                    Konten sedang dalam proses pembaruan
                  </p>
                </div>
              </div>
            </div>

            <!-- Action Footer -->
            <div class="bg-gray-50 px-8 md:px-12 py-3 border-t border-gray-300">
              <div class="flex flex-col sm:flex-row gap-4 justify-end items-center">
                <UButton
                  to="/terms-and-conditions"
                  variant="outline"
                >
                  <UIcon
                    name="heroicons:list-bullet"
                    class="mr-1"
                  />
                  Lihat Semua Syarat & Ketentuan
                </UButton>
                <UButton to="/">
                  <UIcon
                    name="heroicons:home"
                    class="mr-1"
                  />
                  Kembali ke Halaman Utama
                </UButton>
              </div>
            </div>
          </div>

          <!-- Related Actions -->
          <div class="mt-12 grid md:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary transition-colors">
              <div class="flex items-center mb-4">
                <div class="rounded-lg p-3 mr-4">
                  <ImageIcon
                    name="phone-call"
                    folder="assets/icon"
                  />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-800">
                    Hubungi Kami
                  </h3>
                  <p class="text-sm text-gray-600">
                    Butuh informasi lebih lanjut?
                  </p>
                </div>
              </div>
              <UButton
                to="/contact-us"
                variant="outline"
                size="sm"
                block
              >
                Kontak
              </UButton>
            </div>

            <div class="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary transition-colors">
              <div class="flex items-center mb-4">
                <div class="rounded-lg p-3 mr-4">
                  <ImageIcon
                    name="destinasi"
                    folder="assets/icon"
                  />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-800">
                    Jelajahi Trip
                  </h3>
                  <p class="text-sm text-gray-600">
                    Temukan destinasi impian
                  </p>
                </div>
              </div>
              <UButton
                to="/trip"
                variant="outline"
                size="sm"
                block
              >
                Lihat Trip
              </UButton>
            </div>

            <div class="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary transition-colors">
              <div class="flex items-center mb-4">
                <div class="rounded-lg p-3 mr-4">
                  <ImageIcon
                    name="giraffe"
                    folder="assets/icon"
                    size="xl"
                  />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-800">
                    Tentang Kami
                  </h3>
                  <p class="text-sm text-gray-600">
                    Pelajari lebih lanjut
                  </p>
                </div>
              </div>
              <UButton
                to="/info/about-us"
                variant="outline"
                size="sm"
                block
              >
                About Us
              </UButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Rich content styling */
.rich-content :deep(h1) {
  font-size: 1.875rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1.5rem;
  margin-top: 2rem;
}

.rich-content :deep(h1:first-child) {
  margin-top: 0;
}

.rich-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
}

.rich-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
  margin-top: 1.25rem;
}

.rich-content :deep(p) {
  color: #374151;
  line-height: 1.625;
  margin-bottom: 1rem;
}

.rich-content :deep(strong) {
  font-weight: 600;
  color: #111827;
}

.rich-content :deep(em) {
  font-style: italic;
  color: #1f2937;
}

.rich-content :deep(img) {
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin: 1.5rem 0;
  max-width: 100%;
  height: auto;
}

.rich-content :deep(ul) {
  list-style-type: disc;
  list-style-position: inside;
  margin-bottom: 1rem;
}

.rich-content :deep(ul li) {
  margin-bottom: 0.5rem;
}

.rich-content :deep(ol) {
  list-style-type: decimal;
  list-style-position: inside;
  margin-bottom: 1rem;
}

.rich-content :deep(ol li) {
  margin-bottom: 0.5rem;
}

.rich-content :deep(li) {
  color: #374151;
}

.rich-content :deep(blockquote) {
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
  font-style: italic;
  color: #4b5563;
  margin: 1rem 0;
}

.rich-content :deep(a) {
  color: #2563eb;
  text-decoration: underline;
}

.rich-content :deep(a:hover) {
  color: #1d4ed8;
}
</style>
