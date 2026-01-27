<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section
      class="relative h-[50vh] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style="background-image: url('http://103.189.234.243/img-asset/assets/152662dc-0ea1-4661-b00e-27e91e64c5f6.jpeg')"
    >
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/[1%] to-transparent" />
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl md:text-6xl font-bold mb-4">
          Hubungi Kami
        </h1>
        <p class="text-xl md:text-2xl max-w-2xl mx-auto">
          Siap memulai petualangan? Mari berbicara dan wujudkan perjalanan impian Anda
        </p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-12">
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <ClientOnly>
            <LeafletMap
              :latitude="-6.187549"
              :longitude="106.7359901"
              :zoom="16"
              marker-title="Peponi Travel"
              class="h-[400px]"
            >
              <template #fallback>
                <div class="bg-gradient-to-br from-gray-100 to-gray-200 h-[400px] flex items-center justify-center">
                  <div class="text-center">
                    <UIcon
                      name="heroicons:map"
                      class="text-6xl text-gray-400 mb-4"
                    />
                    <p class="text-gray-500">
                      Loading Map...
                    </p>
                    <p class="text-sm text-gray-400">
                      Jakarta, Indonesia
                    </p>
                  </div>
                </div>
              </template>
            </LeafletMap>
          </ClientOnly>
        </div>

        <!-- Contact Info & Map -->
        <div class="space-y-8">
          <!-- Contact Cards -->
          <div class="grid gap-6">
            <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div class="flex items-start space-x-4">
                <div class="flex justify-center items-center w-12 h-12 rounded-full">
                  <ImageIcon
                    name="destinasi"
                    folder="assets/icon"
                    size="lg"
                  />
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-800 mb-2">
                    Kantor Pusat
                  </h3>
                  <p class="text-gray-600">
                    Sentra Niaga Puri Indah blok T2-28,<br>
                    Kembangan, Kota Jakarta Barat,<br>
                    DKI Jakarta 11610
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div class="flex items-start space-x-4">
                <div class="flex justify-center items-center w-12 h-12 rounded-full">
                  <ImageIcon
                    name="phone-call"
                    folder="assets/icon"
                    size="lg"
                  />
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-800 mb-2">
                    Telepon
                  </h3>
                  <p class="text-gray-600">
                    0812-8931-5151 (WhatsApp)
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div class="flex items-start space-x-4">
                <div class="flex justify-center items-center w-12 h-12 rounded-full">
                  <ImageIcon
                    name="mail"
                    folder="assets/icon"
                    size="lg"
                  />
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-800 mb-2">
                    Email
                  </h3>
                  <p class="text-gray-600">
                    cs@peponitravel.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Map Placeholder -->
        </div>
      </div>
    </section>

    <!-- Social Media & CTA -->
    <section class="py-16 px-4 md:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-bold mb-6 text-gray-800">
          Tetap Terhubung
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          Ikuti media sosial kami untuk update terbaru dan inspirasi perjalanan
        </p>

        <div class="flex justify-center space-x-6 mb-8">
          <UButton
            icon="simple-icons:instagram"
            size="xl"
            variant="soft"
            color="neutral"
            to="https://www.instagram.com/peponitravel"
            target="_blank"
            external
          />
          <UButton
            icon="simple-icons:linkedin"
            size="xl"
            variant="soft"
            color="neutral"
            to="https://www.linkedin.com/company/peponi-travel/"
            target="_blank"
            external
          />
          <UButton
            icon="simple-icons:tiktok"
            size="xl"
            variant="soft"
            color="neutral"
            to="https://www.tiktok.com/@wearepeponi?_t=ZS-8zFDR5ICBts&_r=1"
            target="_blank"
            external
          />
        </div>

        <div class="bg-primary rounded-2xl p-8 text-white">
          <h3 class="text-2xl font-bold mb-4">
            Siap Memulai Petualangan?
          </h3>
          <p class="text-lg mb-6">
            Jelajahi destinasi menakjubkan dan ciptakan kenangan tak terlupakan
          </p>
          <NuxtLink
            to="/trip"
            class="px-4 py-2 border-2 border-white rounded-xl cursor-pointer font-semibold transition-all hover:bg-white hover:text-black"
          >
            Mulai Perjalanan
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
// Set page meta
useHead({
  title: 'Hubungi Kami - Peponi',
  meta: [
    { name: 'description', content: 'Hubungi tim Peponi untuk konsultasi perjalanan, bantuan booking, atau pertanyaan seputar layanan travel kami.' }
  ]
})

// Form state
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

// Subject options
const subjectOptions = [
  { label: 'Konsultasi Perjalanan', value: 'consultation' },
  { label: 'Booking & Reservasi', value: 'booking' },
  { label: 'Keluhan & Saran', value: 'complaint' },
  { label: 'Kerjasama & Partnership', value: 'partnership' },
  { label: 'Media & Press', value: 'media' },
  { label: 'Lainnya', value: 'other' }
]

// FAQ items
const faqItems = [
  {
    name: 'Bagaimana cara melakukan booking trip?',
    content: 'Anda dapat melakukan booking melalui website kami dengan memilih destinasi dan tanggal keberangkatan. Tim kami akan menghubungi Anda untuk konfirmasi dalam 24 jam.'
  },
  {
    name: 'Apakah ada jaminan uang kembali jika trip dibatalkan?',
    content: 'Ya, kami memiliki kebijakan pengembalian dana yang fleksibel. Pembatalan lebih dari 14 hari sebelum keberangkatan mendapat pengembalian 100% dikurangi biaya admin.'
  },
  {
    name: 'Apa yang sudah termasuk dalam paket trip?',
    content: 'Paket trip kami biasanya sudah termasuk akomodasi, transportasi lokal, guide berpengalaman, dan beberapa aktivitas. Detail lengkap tersedia di halaman masing-masing trip.'
  },
  {
    name: 'Apakah trip cocok untuk pemula yang baru pertama kali traveling?',
    content: 'Tentu saja! Kami memiliki berbagai level trip dari pemula hingga advanced. Tim guide kami sangat berpengalaman dalam mendampingi first-time travelers.'
  },
  {
    name: 'Bagaimana jika saya memiliki kebutuhan khusus atau diet tertentu?',
    content: 'Kami akan mengakomodasi kebutuhan khusus Anda. Silakan informasikan kepada tim kami saat booking atau melalui form kontak ini.'
  }
]

// Form submission
const submitForm = async () => {
  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }

    // Show success message (you can use a toast notification here)
    alert('Pesan berhasil dikirim! Tim kami akan menghubungi Anda segera.')
  } catch (error) {
    alert('Terjadi kesalahan. Silakan coba lagi.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
