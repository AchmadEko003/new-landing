<script lang="ts" setup>
const route = useRoute()
const router = useRouter()

// Get status from query parameter
const status = computed(() => route.query.status as string || 'success')
const invoiceNumber = computed(() => route.query.invoice as string || '')
const tripName = computed(() => route.query.trip as string || 'Perjalanan Anda')

// Status configurations
const statusConfig = computed(() => {
  switch (status.value.toLowerCase()) {
    case 'success':
    case 'paid':
      return {
        icon: 'i-heroicons-check-circle',
        iconColor: 'text-green-500',
        iconBg: 'bg-green-100',
        title: 'Pembayaran Berhasil!',
        subtitle: 'Terima kasih! Pembayaran Anda telah kami terima.',
        message: 'Selamat! Petualangan Anda akan segera dimulai. Kami akan mengirimkan konfirmasi dan detail perjalanan ke email Anda.',
        bgGradient: 'from-green-50 to-emerald-50',
        illustration: '✈️'
      }
    case 'pending':
      return {
        icon: 'i-heroicons-clock',
        iconColor: 'text-yellow-500',
        iconBg: 'bg-yellow-100',
        title: 'Menunggu Pembayaran',
        subtitle: 'Pembayaran Anda sedang diproses.',
        message: 'Kami sedang memverifikasi pembayaran Anda. Mohon tunggu beberapa saat, proses ini biasanya memakan waktu 5-10 menit.',
        bgGradient: 'from-yellow-50 to-orange-50',
        illustration: '⏳'
      }
    case 'failed':
    case 'expired':
      return {
        icon: 'i-heroicons-x-circle',
        iconColor: 'text-red-500',
        iconBg: 'bg-red-100',
        title: 'Pembayaran Gagal',
        subtitle: 'Maaf, pembayaran Anda tidak dapat diproses.',
        message: 'Pembayaran Anda gagal atau telah melewati batas waktu. Silakan coba lagi atau hubungi customer service kami untuk bantuan.',
        bgGradient: 'from-red-50 to-pink-50',
        illustration: '❌'
      }
    default:
      return {
        icon: 'i-heroicons-question-mark-circle',
        iconColor: 'text-gray-500',
        iconBg: 'bg-gray-100',
        title: 'Status Tidak Diketahui',
        subtitle: 'Status pembayaran tidak dapat ditentukan.',
        message: 'Silakan hubungi customer service kami untuk informasi lebih lanjut.',
        bgGradient: 'from-gray-50 to-slate-50',
        illustration: '❓'
      }
  }
})

// Auto redirect to home after 10 seconds for success status
const countdown = ref(10)
let redirectTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (status.value.toLowerCase() === 'success' || status.value.toLowerCase() === 'paid') {
    redirectTimer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(redirectTimer!)
        router.push('/')
      }
    }, 1000)
  }
})

onUnmounted(() => {
  if (redirectTimer) {
    clearInterval(redirectTimer)
  }
})

// SEO
useHead({
  title: `${statusConfig.value.title} - Peponi`,
  meta: [
    { name: 'description', content: 'Status pembayaran Anda di Peponi Travel.' }
  ]
})

useSeoMeta({
  title: () => `${statusConfig.value.title} - Peponi`,
  description: 'Status pembayaran Anda di Peponi Travel.',
  ogTitle: () => `${statusConfig.value.title} - Peponi`,
  ogDescription: 'Status pembayaran Anda di Peponi Travel.',
  twitterCard: 'summary',
  twitterTitle: () => `${statusConfig.value.title} - Peponi`,
  twitterDescription: 'Status pembayaran Anda di Peponi Travel.'
})
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
    <!-- Hero Pattern Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      <div class="absolute top-1/2 left-0 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
    </div>

    <!-- Content -->
    <div class="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
      <div class="max-w-3xl w-full">
        <!-- Main Card -->
        <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <!-- Status Header with Gradient -->
          <div :class="['relative py-12 px-6 md:px-12 bg-linear-to-br', statusConfig.bgGradient]">
            <!-- Decorative Elements -->
            <div class="absolute top-0 right-0 w-32 h-32 opacity-20">
              <div class="text-8xl">
                {{ statusConfig.illustration }}
              </div>
            </div>

            <div class="relative flex flex-col items-center text-center">
              <!-- Icon -->
              <div
                :class="[
                  'w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg animate-in zoom-in duration-500',
                  statusConfig.iconBg
                ]"
              >
                <UIcon
                  :name="statusConfig.icon"
                  :class="['w-14 h-14', statusConfig.iconColor]"
                />
              </div>

              <!-- Title -->
              <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {{ statusConfig.title }}
              </h1>

              <!-- Subtitle -->
              <p class="text-lg md:text-xl text-gray-600 mb-2">
                {{ statusConfig.subtitle }}
              </p>

              <!-- Invoice Number -->
              <div
                v-if="invoiceNumber"
                class="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 mt-2"
              >
                <UIcon
                  name="i-heroicons-document-text"
                  class="w-4 h-4"
                />
                <span>Invoice: {{ invoiceNumber }}</span>
              </div>
            </div>
          </div>

          <!-- Content Body -->
          <div class="p-6 md:p-12 space-y-8">
            <!-- Message -->
            <div class="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <p class="text-gray-700 leading-relaxed text-center">
                {{ statusConfig.message }}
              </p>
            </div>

            <!-- Trip Info (if success) -->
            <div
              v-if="(status === 'success' || status === 'paid') && tripName"
              class="bg-linear-to-br from-primary/5 to-purple-50 rounded-2xl p-6 border border-primary/10"
            >
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <UIcon
                    name="i-heroicons-map-pin"
                    class="w-8 h-8 text-primary"
                  />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-600 mb-1">
                    Destinasi Anda
                  </p>
                  <h3 class="text-xl font-bold text-gray-900">
                    {{ tripName }}
                  </h3>
                  <p class="text-sm text-primary mt-1">
                    Petualangan menanti! 🌍✨
                  </p>
                </div>
              </div>
            </div>

            <!-- Travel Themed Decoration -->
            <div
              v-if="status === 'success' || status === 'paid'"
              class="grid grid-cols-3 gap-4"
            >
              <div class="text-center p-4 bg-blue-50 rounded-xl">
                <div class="text-3xl mb-2">
                  🎒
                </div>
                <p class="text-xs text-gray-600 font-medium">
                  Siapkan Tas
                </p>
              </div>
              <div class="text-center p-4 bg-green-50 rounded-xl">
                <div class="text-3xl mb-2">
                  📸
                </div>
                <p class="text-xs text-gray-600 font-medium">
                  Abadikan Momen
                </p>
              </div>
              <div class="text-center p-4 bg-purple-50 rounded-xl">
                <div class="text-3xl mb-2">
                  🗺️
                </div>
                <p class="text-xs text-gray-600 font-medium">
                  Jelajahi Dunia
                </p>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <UButton
                v-if="status === 'success' || status === 'paid'"
                to="/"
                size="lg"
                block
                class="bg-primary hover:bg-primary/90"
              >
                <UIcon
                  name="i-heroicons-home"
                  class="w-5 h-5 mr-2"
                />
                Kembali ke Beranda
              </UButton>

              <UButton
                v-if="status === 'failed' || status === 'expired'"
                to="/trip"
                size="lg"
                block
                class="bg-primary hover:bg-primary/90"
              >
                <UIcon
                  name="i-heroicons-arrow-path"
                  class="w-5 h-5 mr-2"
                />
                Coba Lagi
              </UButton>

              <UButton
                v-if="status === 'pending'"
                to="/"
                size="lg"
                block
                variant="outline"
              >
                <UIcon
                  name="i-heroicons-home"
                  class="w-5 h-5 mr-2"
                />
                Kembali ke Beranda
              </UButton>

              <UButton
                to="/contact-us"
                size="lg"
                block
                variant="outline"
              >
                <UIcon
                  name="i-heroicons-chat-bubble-left-right"
                  class="w-5 h-5 mr-2"
                />
                Hubungi Kami
              </UButton>
            </div>

            <!-- Auto redirect notice for success -->
            <div
              v-if="status === 'success' || status === 'paid'"
              class="text-center pt-4 border-t border-gray-100"
            >
              <p class="text-sm text-gray-500">
                <UIcon
                  name="i-heroicons-clock"
                  class="w-4 h-4 inline mr-1"
                />
                Anda akan dialihkan ke beranda dalam {{ countdown }} detik...
              </p>
            </div>
          </div>
        </div>

        <!-- Additional Info Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <!-- Customer Support -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <UIcon
                name="i-heroicons-phone"
                class="w-6 h-6 text-blue-600"
              />
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">
              Customer Support
            </h4>
            <p class="text-xs text-gray-600">
              Tersedia 24/7 untuk membantu Anda
            </p>
          </div>

          <!-- Secure Payment -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <UIcon
                name="i-heroicons-shield-check"
                class="w-6 h-6 text-green-600"
              />
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">
              Pembayaran Aman
            </h4>
            <p class="text-xs text-gray-600">
              Transaksi terenkripsi & terpercaya
            </p>
          </div>

          <!-- Guaranteed -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <UIcon
                name="i-heroicons-star"
                class="w-6 h-6 text-purple-600"
              />
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">
              Terjamin Kualitas
            </h4>
            <p class="text-xs text-gray-600">
              Pengalaman terbaik untuk Anda
            </p>
          </div>
        </div>

        <!-- Travel Quote -->
        <div
          v-if="status === 'success' || status === 'paid'"
          class="mt-8 text-center"
        >
          <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <p class="text-lg md:text-xl italic text-gray-700 mb-2">
              "Perjalanan seribu mil dimulai dengan satu langkah"
            </p>
            <p class="text-sm text-gray-500">
              - Lao Tzu
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes zoom-in {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-in {
  animation: zoom-in 0.5s ease-out;
}
</style>
