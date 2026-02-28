<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section
      class="relative h-[60vh] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style="background-image: url('http://103.189.234.243/img-asset/assets/7e2b465e-54d9-418c-a88d-62352fee79c8.jpeg')"
    >
      <div class="absolute inset-0 bg-linear-to-t from-black/50 via-black/[1%] to-transparent" />
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl md:text-7xl font-bold mb-4">
          Tentang Peponi
        </h1>
        <p class="text-xl md:text-2xl max-w-2xl mx-auto">
          Membangun jembatan antara traveler dan pengalaman lokal yang autentik
        </p>
      </div>
    </section>

    <!-- <section class="py-16 px-4 md:px-8 max-w-6xl mx-auto">
      <div class="prose prose-lg max-w-none">
        <div class="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h2 class="text-4xl font-bold mb-6 text-gray-800">Tentang Peponi</h2>
            <img
              src="http://103.189.234.243/img-asset/assets/8cf27ee9-9d6d-4e05-b253-ea596915769c.jpeg"
              alt="Peponi Travel"
              class="rounded-2xl shadow-lg mb-6 w-full"
            />
          </div>
          <div class="space-y-6">
            <p class="text-lg text-gray-700 leading-relaxed">
              <strong>Peponi Travel</strong> adalah perusahaan perjalanan petualangan di bawah naungan
              <strong>PT Aku Bisa Liburan</strong>, didirikan pada 7 Februari 2015 oleh para petualang Indonesia
              yang penuh semangat dan memiliki visi untuk mendefinisikan ulang arti sebuah eksplorasi.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed">
              Misi kami adalah menciptakan pengalaman perjalanan yang otentik, mendalam, dan immersif—membawa
              para petualang untuk benar-benar terhubung dengan tempat yang mereka kunjungi, melampaui apa
              yang terlihat di permukaan.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed">
              Sebagai penyedia jasa perjalanan yang terpercaya dan dikelola secara profesional,
              <strong>Peponi Travel</strong> telah sukses menyelenggarakan perjalanan untuk lebih dari
              <strong>5.000 traveler Indonesia</strong>.
            </p>
          </div>
        </div>

        <div class="bg-gray-50 rounded-2xl p-8 mb-16">
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            Kami membawa mereka menjelajah ke luar jalur wisata biasa—mulai dari Jepang, Korea,
            Selandia Baru, Australia, Inggris, Eropa, hingga ke kawasan Arktik dan wilayah Polar
            yang menakjubkan lainnya.
          </p>

          <div class="bg-green-100 border-l-4 border-green-500 p-6 rounded-r-lg">
            <p class="text-lg font-semibold text-green-800 mb-3">
              Filosofi kami: <em>"Travel Like a Local"</em>
            </p>
            <p class="text-gray-700 leading-relaxed">
              Kami percaya bahwa cara terbaik untuk mengenal suatu tempat adalah dengan berinteraksi
              langsung dengan orang-orangnya, budayanya, dan kehidupan sehari-harinya—entah itu menginap
              di akomodasi khas, makan di warung lokal yang autentik, atau naik kereta pegunungan yang
              indah bersama penduduk setempat.
            </p>
          </div>
        </div>

        <div class="text-center mb-16">
          <p class="text-xl text-gray-700 leading-relaxed">
            Itinerary kami dirancang dengan cermat untuk memadukan pengalaman lokal yang tulus dengan
            paket perjalanan yang efisien secara biaya, sehingga menjadikan petualangan luar biasa
            lebih terjangkau dan bisa dinikmati lebih banyak orang.
          </p>
          <p class="text-xl font-bold text-green-600 mt-6">
            Bersama Peponi, temukan dunia dengan cara yang belum pernah kamu rasakan sebelumnya—lebih
            dalam, lebih bermakna, dan sungguh tak terlupakan.
          </p>
        </div>
      </div>
    </section>

    <section class="bg-white py-16 px-4 md:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div class="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8">
              <h3 class="text-3xl font-bold mb-4 text-gray-800">Arti "Peponi"</h3>
              <p class="text-lg text-gray-700 leading-relaxed mb-4">
                <strong>Peponi</strong> lahir dari rasa cinta terhadap alam, budaya, dan koneksi antarmanusia
                yang otentik. Kami adalah travel company yang membawa masyarakat Indonesia ke belahan dunia
                yang paling indah dan jarang dijangkau—mulai dari desa-desa kecil di Swiss hingga keajaiban
                langit Arktik di utara bumi.
              </p>
              <div class="bg-white rounded-lg p-4 border-l-4 border-green-500">
                <p class="text-gray-700 font-medium">
                  Nama "Peponi" berasal dari bahasa Swahili yang berarti <strong>"surga"</strong>.
                  Kami percaya bahwa surga itu bukan hanya tempat, tapi juga perasaan: saat kamu
                  benar-benar terhubung dengan tempat, orang-orang, dan dirimu sendiri selama perjalanan.
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-8">
            <div>
              <h3 class="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                <UIcon name="heroicons:users" class="text-green-500 mr-3" />
                Perjalanan Seperti Orang Lokal
              </h3>
              <p class="text-gray-700 leading-relaxed">
                <em>Travel Like a Local</em> — Kami tidak sekadar membuat itinerary. Kami menciptakan pengalaman.
                Di setiap perjalanan Peponi, kamu akan diajak hidup seperti penduduk lokal—bertemu warga desa,
                tinggal di rumah tradisional, naik transportasi umum yang jarang diketahui turis, atau duduk
                di bawah aurora bersama pemandu lokal yang telah menjadi teman.
              </p>
              <p class="text-gray-700 leading-relaxed mt-4">
                Semua dirancang agar perjalananmu tak hanya mengesankan, tapi juga bermakna.
              </p>
            </div>

            <div class="relative">
              <img
                src="http://103.189.234.243/img-asset/assets/94b40709-7c7b-4019-a310-fa171f758860.jpeg"
                alt="Travel Like a Local"
                class="rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Values Section -->
    <section class="py-20 px-4 md:px-8 bg-gray-50">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row pr-1">
        <!-- Header -->
        <div class="max-w-2xl mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Nilai-Nilai Kami
          </h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            Di setiap perjalanan, Peponi percaya bahwa makna sesungguhnya bukan hanya tentang ke mana kita pergi, tapi
            bagaimana kita menjalaninya. Dari merangkai pengalaman autentik layaknya orang lokal, menjaga keintiman
            dalam grup kecil, hingga memilih cara berkelanjutan untuk menjelajah dunia. <span
              class="font-bold"
            >PeponiValue</span> adalah prinsip yang membentuk setiap detail perjalanan bersama kami.
          </p>
        </div>

        <!-- Values Grid -->
        <div class="grid gap-y-12">
          <div
            v-for="(value, index) in values"
            :key="index"
            class="group"
          >
            <h3 class="text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors">
              {{ value.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed text-base">
              {{ value.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Company History -->
    <!-- <section class="bg-white py-16 px-4 md:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4 text-gray-800">Sejarah Perjalanan Kami</h2>
          <p class="text-xl text-gray-600">Dari mimpi hingga menjadi kenyataan</p>
        </div>

        <div class="relative">
          <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-green-500 hidden lg:block"></div>

          <div class="space-y-16">
            <div class="flex flex-col lg:flex-row items-center gap-8">
              <div class="lg:w-1/2 lg:pr-12">
                <div class="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 lg:ml-auto lg:max-w-lg">
                  <div class="flex items-center mb-4">
                    <div class="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">1</div>
                    <h3 class="text-2xl font-bold ml-4 text-gray-800">2015 - Awal Mula</h3>
                  </div>
                  <p class="text-gray-700 leading-relaxed mb-4">
                    <strong>PT Aku Bisa Liburan</strong> didirikan pada <strong>7 Februari 2015</strong>.
                    Bermula dari keinginan sederhana untuk memberikan akses liburan yang lebih
                    terjangkau dan bermakna bagi masyarakat Indonesia.
                  </p>
                  <div class="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                    <p class="text-sm text-gray-600 font-medium">
                      "Setiap orang berhak merasakan keajaiban dunia, tidak peduli dari latar belakang apa."
                    </p>
                  </div>
                </div>
              </div>
              <div class="lg:w-1/2 lg:pl-12">
                <img
                  src="http://103.189.234.243/img-asset/assets/52ceaddf-e1b9-4ff1-aa89-7f5b30d85b2e.jpeg"
                  alt="Peponi Founding Story"
                  class="rounded-2xl shadow-lg w-full"
                />
              </div>
            </div>

            <div class="flex flex-col lg:flex-row-reverse items-center gap-8">
              <div class="lg:w-1/2 lg:pl-12">
                <div class="bg-gradient-to-br from-green-100 to-green-50 rounded-2xl p-8 lg:mr-auto lg:max-w-lg">
                  <div class="flex items-center mb-4">
                    <div class="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">2</div>
                    <h3 class="text-2xl font-bold ml-4 text-gray-800">2020-2024 - Berkembang</h3>
                  </div>
                  <p class="text-gray-700 leading-relaxed mb-4">
                    Melalui inovasi dan komitmen terhadap kualitas, kami berhasil melayani
                    <strong>lebih dari 5.000 traveler</strong> dengan kepuasan tinggi. Dari trip
                    domestik hingga petualangan internasional yang menantang.
                  </p>
                  <div class="grid grid-cols-2 gap-4 mt-6">
                    <div class="text-center bg-white rounded-lg p-3">
                      <div class="text-2xl font-bold text-green-600">5,000+</div>
                      <div class="text-sm text-gray-600">Happy Travelers</div>
                    </div>
                    <div class="text-center bg-white rounded-lg p-3">
                      <div class="text-2xl font-bold text-green-600">50+</div>
                      <div class="text-sm text-gray-600">Destinations</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="lg:w-1/2 lg:pr-12">
                <img
                  src="http://103.189.234.243/img-asset/assets/94b40709-7c7b-4019-a310-fa171f758860.jpeg"
                  alt="Peponi Growth Journey"
                  class="rounded-2xl shadow-lg w-full"
                />
              </div>
            </div>

            <div class="flex flex-col lg:flex-row items-center gap-8">
              <div class="lg:w-1/2 lg:pr-12">
                <div class="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-8 lg:ml-auto lg:max-w-lg">
                  <div class="flex items-center mb-4">
                    <div class="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">3</div>
                    <h3 class="text-2xl font-bold ml-4 text-gray-800">Sekarang & Masa Depan</h3>
                  </div>
                  <p class="text-gray-700 leading-relaxed mb-4">
                    Kini, Peponi bukan hanya travel company, tapi juga <strong>komunitas pencinta perjalanan</strong>
                    yang saling berbagi cerita, pengalaman, dan mimpi untuk menjelajahi dunia.
                  </p>
                  <p class="text-gray-700 leading-relaxed">
                    Kami terus berinovasi dengan teknologi terdepan sambil mempertahankan
                    sentuhan personal dan kearifan lokal dalam setiap perjalanan.
                  </p>
                </div>
              </div>
              <div class="lg:w-1/2 lg:pl-12">
                <img
                  src="http://103.189.234.243/img-asset/assets/52ceaddf-e1b9-4ff1-aa89-7f5b30d85b2e.jpeg"
                  alt="Peponi Future Vision"
                  class="rounded-2xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- CTA Section -->
    <section class="py-16 px-4 md:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-bold mb-6 text-gray-800">
          Mulai Petualangan Anda
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          Bergabunglah dengan ribuan traveler yang telah merasakan pengalaman tak terlupakan bersama kami
        </p>
        <div class="flex flex-row gap-4 justify-center">
          <UButton
            to="/trip"
            size="xl"
            class="px-8 py-4"
          >
            Jelajahi Trip
          </UButton>
          <UButton
            to="/contact-us"
            size="xl"
            variant="outline"
            class="px-8 py-4"
          >
            Hubungi Kami
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
// Set page meta
useHead({
  title: 'Tentang Kami - Peponi',
  meta: [
    { name: 'description', content: 'Pelajari lebih lanjut tentang Peponi, platform travel yang menghubungkan traveler dengan pengalaman lokal autentik di Indonesia.' }
  ]
})

useSeoMeta({
  title: 'Tentang Kami - Peponi',
  description: 'Pelajari lebih lanjut tentang Peponi Travel. Kami adalah pionir perjalanan seperti orang lokal pertama di Indonesia, telah melayani lebih dari 5.000 traveler.',
  ogTitle: 'Tentang Kami - Peponi',
  ogDescription: 'Pelajari lebih lanjut tentang Peponi Travel. Kami adalah pionir perjalanan seperti orang lokal pertama di Indonesia, telah melayani lebih dari 5.000 traveler.',
  ogImage: '/assets/peponi-og-image.png',
  ogImageAlt: 'Tentang Kami - Peponi Travel',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Tentang Kami - Peponi',
  twitterDescription: 'Pelajari lebih lanjut tentang Peponi Travel. Kami adalah pionir perjalanan seperti orang lokal pertama di Indonesia, telah melayani lebih dari 5.000 traveler.'
})

// Values data
const values = [
  {
    title: 'Unik Seperti Lokal',
    description: 'Tim expert kami merangkai itinerary berdasarkan pengalamannya tinggal di destinasi. Perjalanan dibuat rinci agar kamu dapat menjelajahi destinasi seperti orang lokal, bukan turis.'
  },
  {
    title: 'Grup Kecil',
    description: 'Dengan rata-rata rasio trip leader dengan guest Peponi adalah 1 : 10, kamu akan menjelajahi destinasi impian dalam nuansa grup kecil dengan suasana kekeluargaan.'
  },
  {
    title: 'Penginapan Strategis',
    description: 'Tinggal hanya dalam radius 100-500 meter dari stasiun kereta, halte bus, hingga pusat belanja, membuat kamu memiliki waktu libur tanpa batas.'
  },
  {
    title: 'Expert Trip Leaders',
    description: 'Tim Peponi adalah personil berjiwa muda dan sangat memahami destinasi dan menguasai bahasa lokal. Mereka juga akan menjadi sahabat pertama-mu dalam perjalanan liburan.'
  },
  {
    title: 'Keberagaman',
    description: 'Usia, budget, pilihan penginapan, liburan solo atau bersama sahabat. Apapun latar belakang-mu, perjalanan Peponi adalah wadah dimana kamu dapat saling berbagi cerita dan canda tawa.'
  },
  {
    title: 'On The Road to Sustainability',
    description: 'Bagi Peponi, perjalanan bukan hanya tentang keindahan tempat, tapi juga tentang bagaimana kita menjaganya. Karena itu, melalui gerakan ini, Peponi memilih langkah kecil namun berarti: bepergian dengan transportasi publik, tinggal lebih lama agar lebih terhubung dengan destinasi, mendukung komunitas lokal, menghindari penggunaan plastik sekali pakai, dan membuka jalan ke tempat-tempat yang jarang dijelajahi. Setiap langkah ini kami jalani agar bumi tetap indah, dan setiap perjalanan memberi arti lebih dalam.'
  }
]
</script>
