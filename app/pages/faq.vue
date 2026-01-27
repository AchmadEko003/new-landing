<script lang="ts" setup>
import type { IResponseList } from '~~/shared/interface/IResponse'
import type { IFaq } from '~~/shared/interface/IFaq'

const baseUrl = useRuntimeConfig().public.apiBase

const { data, pending, error, refresh } = await useLazyFetch<IResponseList<IFaq>>(`${baseUrl}/Faq`, {
  method: 'GET',
  key: 'faq-data'
})

useHead({
  title: 'FAQ - Peponi',
  meta: [
    { name: 'description', content: 'Pertanyaan yang sering diajukan tentang layanan perjalanan Peponi. Temukan jawaban untuk berbagai pertanyaan seputar reservasi, pembayaran, dan layanan kami.' }
  ]
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section
      class="relative h-[50vh] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style="background-image: url('http://103.189.234.243/img-asset/assets/71f458e0-9c50-412e-98f7-50a10cbb30c7.jpeg')"
    >
      <div class="absolute inset-0 bg-linear-to-t from-black/50 via-black/1 to-transparent" />
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl md:text-6xl font-bold mb-4">
          FAQ
        </h1>
        <p class="text-xl md:text-2xl max-w-2xl mx-auto">
          Temukan jawaban untuk pertanyaan umum tentang layanan perjalanan kami
        </p>
      </div>
    </section>

    <!-- FAQ Content -->
    <section class="bg-gray-50 py-16 px-4 md:px-8">
      <div
        v-if="pending"
        class="max-w-4xl mx-auto"
      >
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4 text-gray-800">
            Pertanyaan Sering Diajukan
          </h2>
          <p class="text-xl text-gray-600">
            Memuat pertanyaan dan jawaban...
          </p>
        </div>

        <div class="space-y-4">
          <div
            v-for="n in 5"
            :key="n"
            class="bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse"
          >
            <div class="p-6">
              <div class="flex items-center justify-between">
                <div class="h-6 bg-gray-200 rounded w-3/4" />
                <div class="w-6 h-6 bg-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else-if="error"
        class="flex justify-center items-center py-20"
      >
        <div class="text-center">
          <UIcon
            name="heroicons:exclamation-triangle"
            class="text-4xl text-red-600 mb-4"
          />
          <p class="text-red-600 mb-2">
            Gagal memuat data FAQ
          </p>
          <p class="text-gray-600 text-sm">
            {{ error.message }}
          </p>
          <UButton
            class="mt-4"
            @click="refresh()"
          >
            <UIcon
              name="heroicons:arrow-path"
              class="mr-2"
            />
            Coba Lagi
          </UButton>
        </div>
      </div>

      <ClientOnly v-else>
        <UtilFaqAccordion
          :faq-data="data?.data || []"
          title="Pertanyaan Sering Diajukan"
          subtitle="Temukan jawaban untuk pertanyaan umum tentang layanan perjalanan kami"
        />
        <template #fallback>
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="text-4xl font-bold mb-4 text-gray-800">
                Pertanyaan Sering Diajukan
              </h2>
              <p class="text-xl text-gray-600">
                Memuat pertanyaan dan jawaban...
              </p>
            </div>

            <div class="space-y-4">
              <div
                v-for="n in 5"
                :key="n"
                class="bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse"
              >
                <div class="p-6">
                  <div class="flex items-center justify-between">
                    <div class="h-6 bg-gray-200 rounded w-3/4" />
                    <div class="w-6 h-6 bg-gray-200 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ClientOnly>
    </section>

    <!-- Contact CTA -->
    <section class="py-16 px-4 md:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h3 class="text-3xl font-bold text-gray-800 mb-4">
            Masih Ada Pertanyaan?
          </h3>
          <p class="text-lg text-gray-600">
            Tim customer service kami siap membantu menjawab pertanyaan Anda
          </p>
        </div>

        <!-- Contact Options Grid -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary transition-colors">
            <div class="flex items-center mb-4">
              <div class="rounded-lg p-3 mr-4">
                <ImageIcon
                  name="mail"
                  folder="assets/icon"
                />
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">
                  Email Support
                </h4>
                <p class="text-sm text-gray-600">
                  Kirim pertanyaan via email
                </p>
              </div>
            </div>
            <UButton
              to="/contact-us"
              variant="outline"
              size="sm"
              block
            >
              Hubungi Kami
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
                <h4 class="font-semibold text-gray-800">
                  Jelajahi Trip
                </h4>
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
        </div>
      </div>
    </section>
  </div>
</template>
