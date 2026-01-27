<script lang="ts" setup>
import type { IResponseList } from '~~/shared/interface/IResponse'
import type { ITermsAndConditions } from '~~/shared/interface/ITermsAndConditions'

const baseUrl = useRuntimeConfig().public.apiBase

// Fetch terms and conditions data
const { data, pending, error, refresh } = await useLazyFetch<IResponseList<ITermsAndConditions>>(`${baseUrl}/TermsCondition`, {
  key: 'terms-and-conditions'
})

// Set page meta
useHead({
  title: 'Syarat & Ketentuan - Peponi',
  meta: [
    { name: 'description', content: 'Syarat dan ketentuan penggunaan layanan Peponi Travel. Baca peraturan dan kebijakan kami sebelum melakukan pemesanan trip.' }
  ]
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section
      class="relative h-[60vh] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style="background-image: url('http://103.189.234.243/img-asset/country/tojsiyw7.jpeg')"
    >
      <div class="absolute inset-0 bg-linear-to-t from-black/50 via-black/1 to-transparent" />
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl md:text-7xl font-bold mb-4">
          Syarat & Ketentuan
        </h1>
        <p class="text-xl md:text-2xl max-w-2xl mx-auto">
          Peraturan dan kebijakan untuk penggunaan layanan Peponi Travel
        </p>
      </div>
    </section>

    <!-- Main Content Section -->
    <section class="py-16 px-4 md:px-8 max-w-6xl mx-auto">
      <div class="prose prose-lg max-w-none">
        <div
          v-if="pending"
          class="flex justify-center items-center min-h-100"
        >
          <div class="text-center">
            <UIcon
              name="heroicons:arrow-path"
              class="text-4xl text-blue-500 animate-spin mb-4"
            />
            <p class="text-gray-600">
              Memuat syarat dan ketentuan...
            </p>
          </div>
        </div>

        <div
          v-else-if="error"
          class="text-center py-16"
        >
          <UIcon
            name="heroicons:exclamation-triangle"
            class="text-4xl text-red-500 mb-4"
          />
          <p class="text-red-600 mb-4">
            Gagal memuat syarat dan ketentuan
          </p>
          <UButton
            variant="outline"
            @click="refresh()"
          >
            Coba Lagi
          </UButton>
        </div>

        <div
          v-else-if="data"
          class="space-y-8"
        >
          <div class="bg-primary border-l-4 border-primary-800 p-6 rounded-r-lg">
            <h2 class="text-2xl font-bold mb-4 text-white">
              Informasi Penting
            </h2>
            <p class="text-white">
              Dengan menggunakan layanan Peponi Travel, Anda setuju untuk terikat dengan syarat dan ketentuan berikut.
              Harap baca dengan seksama sebelum melakukan pemesanan.
            </p>
          </div>

          <div class="grid gap-4">
            <NuxtLink
              v-for="(section, index) in data.data"
              :key="index"
              :to="`/terms-and-conditions/${section.section}`"
              class="flex items-center justify-center bg-white border border-gray-200 rounded-lg p-6 hover:border-primary transition-all group"
            >
              <h3 class="text-xl font-bold text-gray-800 flex items-center group-hover:text-primary transition-colors">
                <span
                  class="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3"
                >
                  {{ index + 1 }}
                </span>
                {{ section.header }}
              </h3>
              <UIcon
                name="heroicons:arrow-right"
                class="ml-auto text-gray-400 text-xl"
              />
            </NuxtLink>
          </div>

          <div class="bg-gray-50 rounded-lg p-6 mt-8">
            <p class="text-sm text-gray-600 leading-relaxed">
              <strong>Terakhir diperbarui:</strong> {{ new Date().toLocaleDateString('id-ID') }}
            </p>
            <p class="text-sm text-gray-600 mt-2">
              Syarat dan ketentuan ini dapat berubah sewaktu-waktu. Perubahan akan dinotifikasi melalui website resmi
              kami.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="bg-gray-50 py-16 px-4 md:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-6 text-gray-800">
          Ada Pertanyaan?
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          Jika Anda memiliki pertanyaan mengenai syarat dan ketentuan ini, jangan ragu untuk menghubungi kami
        </p>
        <div class="flex flex-row gap-4 justify-center">
          <UButton
            to="/contact-us"
            size="xl"
            class="px-8 py-4"
          >
            Hubungi Kami
          </UButton>
          <UButton
            to="mailto:info@peponi.travel"
            size="xl"
            variant="outline"
            class="px-8 py-4"
          >
            Email Kami
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
