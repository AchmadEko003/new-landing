<template>
  <!-- Detail Modal for Extra Packages -->
  <UtilDialog
    v-model="isOpen"
    :title="selectedPackage?.name || 'Package Details'"
    :size="dialogSize"
    :closable="true"
    :show-footer="false"
  >
    <template v-if="selectedPackage">
      <div class="space-y-6">
        <!-- Header -->
        <div
          v-if="selectedPackage.referenceType !== 'experience' && selectedPackage.referenceType !== 'visa'"
          class="relative bg-linear-to-br from-primary/5 via-primary/10 to-transparent rounded-2xl p-6 mb-2 border border-primary/20"
        >
          <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div class="relative">
            <div class="flex items-start justify-between gap-4 mb-3">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <UIcon
                    name="i-heroicons-sparkles"
                    class="w-5 h-5 text-primary"
                  />
                  <span class="text-xs font-semibold text-primary uppercase tracking-wider">Paket
                    Tambahan</span>
                </div>
                <h2 class="text-3xl font-bold text-gray-900 leading-tight">
                  {{ selectedPackage.name
                  }}
                </h2>
              </div>
              <UBadge
                color="primary"
                variant="solid"
                size="lg"
                class="shrink-0 px-4 py-2 text-lg font-bold shadow-lg"
              >
                {{ selectedPackage.price }}
              </UBadge>
            </div>
            <p class="text-gray-600 text-base leading-relaxed">
              {{ selectedPackage.description }}
            </p>
          </div>
        </div>

        <!-- Loading State -->
        <div
          v-if="loadingDetails"
          class="flex items-center justify-center py-8"
        >
          <div class="animate-spin">
            <svg
              class="w-6 h-6 text-primary"
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
          <p class="ml-3 text-gray-600">
            Loading details...
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
            <div
              v-if="packageDetails.content"
              class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div class="flex items-center gap-2 mb-4">
                <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <UIcon
                    name="i-heroicons-document-text"
                    class="w-5 h-5 text-primary"
                  />
                </div>
                <h3 class="font-bold text-xl text-gray-900">
                  Deskripsi Visa
                </h3>
              </div>
              <div
                class="text-gray-700 space-y-3 leading-relaxed prose prose-sm max-w-none"
                v-html="packageDetails.content"
              />
            </div>

            <!-- Country Information -->
            <div
              v-if="packageDetails.country"
              class="bg-linear-to-br from-gray-50 to-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div class="p-6 pb-4">
                <div class="flex items-center gap-3 mb-4">
                  <div
                    class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"
                  >
                    <UIcon
                      name="i-heroicons-map-pin"
                      class="w-6 h-6 text-primary"
                    />
                  </div>
                  <div>
                    <span
                      class="text-xs font-semibold text-primary uppercase tracking-wider block mb-1"
                    >Destinasi</span>
                    <h3 class="font-bold text-2xl text-gray-900">
                      {{ packageDetails.country.name
                      }}
                    </h3>
                  </div>
                </div>
              </div>

              <!-- Country Banner -->
              <div
                v-if="packageDetails.country.bannerName"
                class="relative mx-6 mb-6 rounded-2xl overflow-hidden group"
              >
                <div
                  class="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent z-10"
                />
                <NuxtImg
                  provider="peponi"
                  :src="`/country/${packageDetails.country.bannerName}.jpeg`"
                  :alt="packageDetails.country.name"
                  class="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div class="absolute bottom-4 left-4 z-20">
                  <UBadge
                    color="neutral"
                    variant="solid"
                    size="lg"
                    class="shadow-xl"
                  >
                    <UIcon
                      name="i-heroicons-globe-alt"
                      class="w-4 h-4 mr-1"
                    />
                    {{ packageDetails.country.name }}
                  </UBadge>
                </div>
              </div>

              <!-- Country Summary -->
              <div
                v-if="packageDetails.country.summary"
                class="px-6 pb-6"
              >
                <div class="bg-white rounded-xl p-5 border border-gray-100">
                  <p class="text-gray-700 leading-relaxed text-base">
                    {{
                      packageDetails.country.summary }}
                  </p>
                </div>
              </div>
            </div>
          </template>

          <!-- For Experience -->
          <template v-else-if="selectedPackage.referenceType === 'experience'">
            <!-- Experience Header Card -->
            <div
              class="bg-linear-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-6 border border-primary/20 shadow-sm"
            >
              <div class="flex items-center justify-between gap-4 flex-wrap">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center"
                  >
                    <UIcon
                      name="i-heroicons-sparkles"
                      class="w-6 h-6 text-primary"
                    />
                  </div>
                  <div>
                    <p class="text-xs font-semibold text-primary uppercase tracking-wider">
                      Pengalaman Unik
                    </p>
                    <h3 class="font-bold text-2xl text-gray-900">
                      {{ packageDetails.name }}
                    </h3>
                  </div>
                </div>
                <UBadge
                  v-if="packageDetails.category"
                  color="primary"
                  variant="soft"
                  size="lg"
                  class="px-4 py-2"
                >
                  <UIcon
                    name="i-heroicons-tag"
                    class="w-4 h-4 mr-1"
                  />
                  {{ packageDetails.category }}
                </UBadge>
              </div>
            </div>

            <!-- Experience Banner Gallery -->
            <div
              v-if="packageDetails.bannerList && packageDetails.bannerList.length > 0"
              class="relative rounded-2xl overflow-hidden shadow-xl"
            >
              <!-- Main Banner Image -->
              <div class="relative group">
                <div
                  class="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent z-10"
                />
                <NuxtImg
                  provider="peponi"
                  :src="`/unique-experience/${packageDetails.bannerList[selectedBannerIndex]}.jpeg`"
                  :alt="packageDetails.name"
                  class="w-full h-96 object-cover"
                />

                <!-- Image Counter Badge -->
                <div
                  v-if="packageDetails.bannerList.length > 1"
                  class="absolute top-4 right-4 z-20"
                >
                  <UBadge
                    color="neutral"
                    variant="solid"
                    size="md"
                    class="shadow-lg backdrop-blur-sm"
                  >
                    <UIcon
                      name="i-heroicons-photo"
                      class="w-4 h-4 mr-1"
                    />
                    {{ packageDetails.bannerList.length }} Foto
                  </UBadge>
                </div>

                <!-- Bottom Info Overlay -->
                <div class="absolute bottom-6 left-6 z-20">
                  <UBadge
                    color="neutral"
                    variant="solid"
                    size="lg"
                    class="shadow-2xl"
                  >
                    <UIcon
                      name="i-heroicons-camera"
                      class="w-4 h-4 mr-1"
                    />
                    Gallery Pengalaman
                  </UBadge>
                </div>
              </div>

              <!-- Thumbnail Gallery (if more than 1 image) -->
              <div
                v-if="packageDetails.bannerList.length > 1"
                class="grid grid-cols-4 gap-2 p-4 bg-gray-50"
              >
                <div
                  v-for="(banner, idx) in packageDetails.bannerList.slice(0, 4)"
                  :key="idx"
                  class="relative rounded-lg overflow-hidden group cursor-pointer aspect-video transition-all duration-300"
                  :class="selectedBannerIndex === Number(idx) ? 'ring-4 ring-primary shadow-lg scale-105' : 'hover:ring-2 hover:ring-primary/50'"
                  @click="selectBanner(Number(idx))"
                >
                  <NuxtImg
                    provider="peponi"
                    :src="`/unique-experience/512_${banner}.webp`"
                    :alt="`${packageDetails.name} - ${Number(idx) + 1}`"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div
                    class="absolute inset-0 transition-colors duration-300"
                    :class="selectedBannerIndex === idx ? 'bg-primary/10' : 'bg-black/0 group-hover:bg-black/20'"
                  />
                  <div
                    v-if="selectedBannerIndex === idx"
                    class="absolute top-1 right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg"
                  >
                    <UIcon
                      name="i-heroicons-check"
                      class="w-4 h-4 text-white"
                    />
                  </div>
                </div>
                <!-- Show "More" overlay on last thumbnail if more images exist -->
                <div
                  v-if="packageDetails.bannerList.length > 4"
                  class="relative rounded-lg overflow-hidden flex items-center justify-center aspect-video cursor-pointer group transition-all duration-300"
                  :class="selectedBannerIndex >= 4 ? 'bg-primary ring-4 ring-primary shadow-lg scale-105' : 'bg-gray-900 hover:ring-2 hover:ring-primary/50'"
                  @click="selectBanner(4)"
                >
                  <div class="text-center">
                    <p class="text-white font-bold text-lg">
                      +{{
                        packageDetails.bannerList.length - 4 }}
                    </p>
                    <p class="text-white text-xs">
                      Lainnya
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Experience Summary/Description -->
            <div
              v-if="packageDetails.summary"
              class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div class="p-6">
                <div class="flex items-center gap-2 mb-5">
                  <div
                    class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
                  >
                    <UIcon
                      name="i-heroicons-document-text"
                      class="w-5 h-5 text-primary"
                    />
                  </div>
                  <h3 class="font-bold text-xl text-gray-900">
                    Detail Pengalaman
                  </h3>
                </div>
                <div
                  class="text-gray-700 leading-relaxed prose prose-sm max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-base prose-p:my-3 prose-ul:my-3 prose-li:my-1 prose-img:rounded-xl prose-img:shadow-lg prose-img:my-6"
                  v-html="sanitizeAndTransformImages(packageDetails.summary)"
                />
              </div>
            </div>
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

<script setup lang="ts">
import DOMPurify from 'dompurify'

// Function to sanitize and transform image URLs
const sanitizeAndTransformImages = (html: string): string => {
  if (!html) return ''

  if (import.meta.client) {
    // First sanitize the HTML
    let sanitized = DOMPurify.sanitize(html)

    // Transform image URLs: add 512_ prefix and change .jpeg to .webp
    // Pattern: http://103.189.234.243/img-asset/assets/[uuid].jpeg
    // Result: http://103.189.234.243/img-asset/assets/512_[uuid].webp
    sanitized = sanitized.replace(
      /(http:\/\/103\.189\.234\.243\/img-asset\/assets\/)([a-zA-Z0-9-]+)(\.jpeg)/g,
      '$1512_$2.webp'
    )

    return sanitized
  }

  return html
}

const { width } = useWindowSize()
const computedWidth = computed(() => width.value || 0)

const props = defineProps<{
  modelValue: boolean
  selectedPackage: any
  packageDetails: any
  loadingDetails: boolean
  selectedBannerIndex: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'select-banner': [index: number]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const dialogSize = computed(() => computedWidth.value <= 768 ? 'full' : '4xl')

const selectBanner = (index: number) => {
  emit('select-banner', index)
}
</script>
