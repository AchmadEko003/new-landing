<script lang="ts" setup>
interface Package {
  uid: string
  name: string
  price: number
  caption?: string
  referenceType?: string
  referenceId?: number | null
}

const props = defineProps<{
  modelValue: boolean
  selectedPackage: Package | null
  packageDetails: any
  loadingDetails: boolean
  dialogSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const selectedBannerIndex = ref(0)

const selectBanner = (index: number) => {
  selectedBannerIndex.value = index
}
</script>

<template>
  <UtilDialog
    v-model="isOpen"
    :title="selectedPackage?.name || 'Package Details'"
    :size="dialogSize || 'xl'"
    :closable="true"
    :show-footer="false"
  >
    <template v-if="selectedPackage">
      <div class="space-y-6">
        <!-- Header with Enhanced Design -->
        <div
          v-if="selectedPackage.referenceType !== 'experience' && selectedPackage.referenceType !== 'visa'"
          class="relative bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-6 mb-2 border border-blue-200 shadow-sm"
        >
          <div class="absolute top-0 right-0 w-40 h-40 bg-blue-200/20 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div class="relative z-10">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h2 class="text-3xl font-bold text-gray-900">
                  {{ selectedPackage.name }}
                </h2>
                <p
                  v-if="selectedPackage.caption"
                  class="text-gray-600 mt-2 text-sm"
                >
                  {{ selectedPackage.caption }}
                </p>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-blue-200">
              <p class="text-3xl font-bold text-blue-600">
                {{ selectedPackage.price.toLocaleString('id-ID') }}
              </p>
              <p class="text-xs text-gray-500 mt-1">
                Harga per paket
              </p>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div
          v-if="loadingDetails"
          class="flex items-center justify-center py-12"
        >
          <div class="animate-spin">
            <svg
              class="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
          <p class="ml-3 text-gray-600 font-medium">
            Memuat detail paket...
          </p>
        </div>

        <!-- Package Details -->
        <div
          v-else-if="packageDetails"
          class="space-y-6"
        >
          <!-- For Visa -->
          <template v-if="selectedPackage.referenceType === 'visa'">
            <!-- Visa Content -->
            <div v-if="packageDetails.content">
              <h3 class="font-bold text-lg mb-3 text-gray-900">
                Persyaratan Visa
              </h3>
              <!-- <div class="text-gray-700 space-y-3 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg" v-html="packageDetails.content" /> -->
              <UtilHtmlRender
                class="bg-gray-50 p-4 rounded-lg"
                :content="packageDetails.content"
              />
            </div>
          </template>

          <!-- For Experience -->
          <template v-else-if="selectedPackage.referenceType === 'experience'">
            <!-- Experience Images -->
            <div
              v-if="packageDetails.bannerList?.length"
              class="space-y-4"
            >
              <!-- Main Banner -->
              <div class="rounded-xl overflow-hidden bg-gray-200 shadow-md">
                <NuxtImg
                  provider="peponi"
                  :src="`/unique-experience/${packageDetails.bannerList[selectedBannerIndex]}.jpeg`"
                  :alt="`${packageDetails.name} - Image ${selectedBannerIndex + 1}`"
                  class="w-full h-80 object-cover"
                />
              </div>

              <!-- Thumbnail Navigation -->
              <div
                v-if="packageDetails.bannerList.length > 1"
                class="flex gap-3 overflow-x-auto pb-2"
              >
                <button
                  v-for="(banner, idx) in packageDetails.bannerList"
                  :key="idx"
                  class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all hover:shadow-md"
                  :class="
                    selectedBannerIndex === Number(idx)
                      ? 'border-green-600 shadow-md'
                      : 'border-gray-300 hover:border-green-300'
                  "
                  @click="selectBanner(Number(idx))"
                >
                  <NuxtImg
                    provider="peponi"
                    :src="`/unique-experience/512_${banner}.webp`"
                    :alt="`Thumbnail ${Number(idx) + 1}`"
                    class="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>

            <!-- Category -->
            <div
              v-if="packageDetails.category"
              class="bg-green-50 p-4 rounded-lg border border-green-200"
            >
              <p class="text-xs text-green-700 font-bold uppercase">
                Kategori
              </p>
              <p class="text-gray-900 font-semibold mt-1">
                {{ packageDetails.category }}
              </p>
            </div>

            <!-- Summary (Description) -->
            <div
              v-if="packageDetails.summary"
              class="border-t border-gray-200 pt-6"
            >
              <h3 class="font-bold text-lg mb-3 text-gray-900">
                Deskripsi Pengalaman
              </h3>
              <div
                class="text-gray-700 leading-relaxed prose prose-sm max-w-none text-sm"
                v-html="packageDetails.summary"
              />
            </div>

            <!-- Countries -->
            <!-- <div v-if="packageDetails.countries?.length" class="border-t border-gray-200 pt-6">
              <h3 class="font-bold text-lg mb-4 text-gray-900">Negara yang Dikunjungi</h3>
              <div class="space-y-4">
                <div
                  v-for="country in packageDetails.countries"
                  :key="country.uid"
                  class="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <h4 class="font-bold text-base mb-3 text-gray-900 flex items-center gap-2">
                    <span class="text-lg">🌍</span>
                    {{ country.name }}
                  </h4>

                  <div v-if="country.bannerName" class="rounded-lg overflow-hidden bg-gray-200">
                    <NuxtImg
                      provider="peponi"
                      :src="`/country/${country.bannerName}.jpeg`"
                      :alt="country.name"
                      class="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div> -->
          </template>
        </div>

        <!-- No Details Message -->
        <div
          v-else
          class="text-center py-8 text-gray-500"
        >
          No additional details available for this package
        </div>
      </div>
    </template>
  </UtilDialog>
</template>
