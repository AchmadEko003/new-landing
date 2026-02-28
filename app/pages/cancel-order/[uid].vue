<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-12">
    <!-- Loading State -->
    <Transition name="fade" mode="out-in">
      <div v-if="status === 'pending'" key="loading" class="text-center">
        <div class="relative">
          <div class="w-20 h-20 rounded-full border-4 border-primary-100 mx-auto" />
          <div
            class="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-primary-500 mx-auto animate-spin" />
        </div>
        <p class="mt-6 text-gray-600 font-medium">
          Memproses pembatalan pesanan...
        </p>
        <p class="mt-2 text-sm text-gray-400">
          Mohon tunggu sebentar
        </p>
      </div>

      <!-- Success State -->
      <div v-else-if="status === 'success' && data?.meta?.status" key="success" class="w-full max-w-md">
        <div class="bg-white rounded-3xl p-10 border border-gray-200 relative overflow-hidden">
          <!-- Decorative Background -->
          <div class="absolute -top-24 -right-24 w-48 h-48 bg-green-50 rounded-full opacity-50" />
          <div class="absolute -bottom-16 -left-16 w-32 h-32 bg-green-50 rounded-full opacity-30" />

          <div class="relative">
            <!-- Animated Success Icon -->
            <div class="relative mx-auto w-20 h-20 mb-8">
              <div class="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25" />
              <div
                class="relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <UIcon name="i-heroicons-check" class="w-10 h-10 text-white" />
              </div>
            </div>

            <h1 class="text-2xl font-bold text-gray-900 mb-3 text-center">
              Pembatalan Berhasil!
            </h1>
            <p class="text-gray-500 text-center leading-relaxed mb-8">
              Pesanan Anda telah berhasil dibatalkan. Terima kasih telah mengkonfirmasi pembatalan.
            </p>

            <!-- Info Box -->
            <div class="bg-green-50 rounded-2xl p-4 mb-8 border border-green-100">
              <div class="flex items-start gap-3">
                <UIcon name="i-heroicons-information-circle" class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p class="text-sm text-green-700">
                  Jika ada dana yang perlu dikembalikan, proses refund akan dilakukan dalam 3-7 hari kerja.
                </p>
              </div>
            </div>

            <UButton to="/" color="primary" size="xl" block class="rounded-xl transition-all duration-300">
              <UIcon name="i-heroicons-home" class="w-5 h-5 mr-2" />
              Kembali ke Beranda
            </UButton>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else key="error" class="w-full max-w-md">
        <div class="bg-white rounded-3xl p-10 border border-gray-200 relative overflow-hidden">
          <!-- Decorative Background -->
          <div class="absolute -top-24 -right-24 w-48 h-48 bg-red-50 rounded-full opacity-50" />
          <div class="absolute -bottom-16 -left-16 w-32 h-32 bg-red-50 rounded-full opacity-30" />

          <div class="relative">
            <!-- Error Icon -->
            <div class="relative mx-auto w-20 h-20 mb-8">
              <div class="absolute inset-0 bg-red-100 rounded-full opacity-50" />
              <div
                class="relative w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
                <UIcon name="i-heroicons-x-mark" class="w-10 h-10 text-white" />
              </div>
            </div>

            <h1 class="text-2xl font-bold text-gray-900 mb-3 text-center">
              Pembatalan Gagal
            </h1>
            <p class="text-gray-500 text-center leading-relaxed mb-8">
              {{ errorMessage || 'Terjadi kesalahan saat memproses pembatalan pesanan.' }}
            </p>

            <!-- Error Info Box -->
            <div class="bg-amber-50 rounded-2xl p-4 mb-8 border border-amber-100">
              <div class="flex items-start gap-3">
                <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <p class="text-sm text-amber-700">
                  Silakan coba lagi atau hubungi customer service kami untuk bantuan lebih lanjut.
                </p>
              </div>
            </div>

            <div class="flex flex-col gap-3">
              <UButton color="primary" size="xl" block :loading="status === 'pending'"
                class="rounded-xl transition-all duration-300" @click="execute()">
                <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 mr-2" />
                Coba Lagi
              </UButton>
              <UButton to="/" color="gray" variant="ghost" size="xl" block
                class="rounded-xl hover:bg-gray-100 transition-all duration-300">
                <UIcon name="i-heroicons-home" class="w-5 h-5 mr-2" />
                Kembali ke Beranda
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import type { IResponse } from '~~/shared/interface/IResponse'

const route = useRoute()
const config = useRuntimeConfig().public.apiBase
const uid = computed(() => route.params.uid as string)

useSeoMeta({
  title: 'Pembatalan Pesanan - Peponi',
  description: 'Konfirmasi pembatalan pesanan trip Anda bersama Peponi Travel.',
  ogTitle: 'Pembatalan Pesanan - Peponi',
  ogDescription: 'Konfirmasi pembatalan pesanan trip Anda bersama Peponi Travel.',
  twitterCard: 'summary',
  twitterTitle: 'Pembatalan Pesanan - Peponi',
  twitterDescription: 'Konfirmasi pembatalan pesanan trip Anda bersama Peponi Travel.'
})

const apiUrl = `${config}/Booking/cancel.order.confirm`

const { data, status, error, execute } = useFetch<IResponse<null>>(apiUrl, {
  method: 'POST',
  body: { uid: uid.value }
})

const errorMessage = computed(() => {
  if (error.value) {
    return 'Terjadi kesalahan jaringan. Silakan coba lagi.'
  }
  if (data.value && !data.value.meta?.status) {
    return data.value.meta?.message
  }
  return null
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
