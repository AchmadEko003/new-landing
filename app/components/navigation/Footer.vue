<template>
  <footer class="bg-gray-50 w-full pt-8 pb-6 px-4 md:px-12 lg:px-24 xl:px-32 2xl:px-44 mt-10">
    <div class="max-w-7xl mx-auto">
      <!-- Mobile: Accordion Sections -->
      <div class="md:hidden">
        <UAccordion
          :items="accordionItems"
          type="multiple"
          :ui="{
            item: 'border-0',
            label: 'text-xl',
            trailingIcon: 'text-primary h-7 w-7'
          }"
        >
          <template #tentang-kami>
            <div class="space-y-2">
              <div
                v-if="loadingFetch"
                class="space-y-2"
              >
                <div class="h-4 bg-gray-300 rounded animate-pulse w-24" />
                <div class="h-4 bg-gray-300 rounded animate-pulse w-20" />
              </div>
              <div
                v-else-if="aboutUs.length > 0"
                class="space-y-2"
              >
                <NuxtLink
                  v-for="item in aboutUs"
                  :key="item.header"
                  :to="`/info/${item.section}`"
                  class="block text-gray-600 hover:text-primary transition-colors"
                >
                  {{ item.header }}
                </NuxtLink>
              </div>
              <div
                v-else
                class="space-y-2"
              >
                <NuxtLink
                  to="/info/about-us"
                  class="block text-gray-600 hover:text-primary transition-colors"
                >
                  Mengenal Peponi
                </NuxtLink>
              </div>
            </div>
          </template>

          <template #destinasi>
            <!-- <div class="space-y-2"> -->
            <!--     <NuxtLink v-for="country in country.getList" :key="country.uid" -->
            <!--         :to="`/destinasi-populer/${encodeURIComponent((country.name ?? '').trim().replace(/\s+/g, '-').toLowerCase())}_${country.uid}`" -->
            <!--         class="block text-gray-600 hover:text-primary transition-colors"> -->
            <!--         {{ country.name ?? '' }} -->
            <!--     </NuxtLink> -->
            <!-- </div> -->
          </template>

          <template #bantuan>
            <div class="space-y-2">
              <NuxtLink
                to="/contact-us"
                class="block text-gray-600 hover:text-primary transition-colors"
              >
                Hubungi Kami
              </NuxtLink>
              <NuxtLink
                to="/faq"
                class="block text-gray-600 hover:text-primary transition-colors"
              >
                FAQ
              </NuxtLink>
            </div>
          </template>

          <template #terms>
            <div class="space-y-2">
              <div
                v-if="loadingFetch"
                class="space-y-2"
              >
                <div class="h-4 bg-gray-300 rounded animate-pulse w-24" />
                <div class="h-4 bg-gray-300 rounded animate-pulse w-20" />
              </div>
              <div
                v-else-if="termsCondition.length > 0"
                class="space-y-2"
              >
                <NuxtLink
                  v-for="(item, i) in termsCondition"
                  :key="i"
                  :to="`/terms-and-conditions/${item.section}`"
                  class="block text-gray-600 hover:text-primary transition-colors"
                >
                  {{ item.header }}
                </NuxtLink>
              </div>
            </div>
          </template>
        </UAccordion>
      </div>

      <!-- Desktop: Regular Layout -->
      <div class="hidden md:flex md:flex-wrap md:justify-between md:items-start gap-8">
        <!-- Tentang Kami -->
        <div class="min-w-[180px]">
          <div class="font-semibold mb-4 text-gray-900">
            Tentang kami
          </div>
          <ul
            v-if="loadingFetch"
            class="space-y-3"
          >
            <li class="animate-pulse">
              <div class="h-4 bg-gray-300 rounded w-20" />
            </li>
            <li class="animate-pulse">
              <div class="h-4 bg-gray-300 rounded w-16" />
            </li>
          </ul>
          <ul
            v-else-if="aboutUs"
            class="space-y-3"
          >
            <li
              v-for="item in aboutUs"
              :key="item.header"
            >
              <NuxtLink
                :to="`/info/${item.section}`"
                class="text-gray-600 hover:text-primary transition-colors"
              >
                {{ item.header }}
              </NuxtLink>
            </li>
          </ul>
          <ul
            v-else
            class="space-y-3"
          >
            <li>
              <NuxtLink
                to="/info/about-us"
                class="text-gray-600 hover:text-primary transition-colors"
              >
                Mengenal Peponi
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/info/peponi-value"
                class="text-gray-600 hover:text-primary transition-colors"
              >
                PeponiValue
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/info/testimonial"
                class="text-gray-600 hover:text-primary transition-colors"
              >
                Testimonial
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/info/frequent-travelers"
                class="text-gray-600 hover:text-primary transition-colors"
              >
                Peponi Frequent Travelers
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Destinasi -->
        <div class="min-w-[180px]">
          <div class="font-semibold mb-4 text-gray-900">
            Destinasi
          </div>
          <ul class="space-y-3">
            <li
              v-for="country in countryStore.countryList"
              :key="country.uid"
            >
              <NuxtLink
                :to="`/destinasi-populer/${encodeURIComponent((country.name ?? '').trim().replace(/\s+/g, '-').toLowerCase())}_${country.uid}`"
                class="text-gray-600 hover:text-primary transition-colors"
              >
                {{ country.name ?? '' }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Bantuan -->
        <div class="min-w-[180px]">
          <div class="font-semibold mb-4 text-gray-900">
            Bantuan
          </div>
          <ul class="space-y-3">
            <li>
              <NuxtLink
                to="/contact-us"
                class="text-gray-600 hover:text-primary transition-colors"
              >
                Hubungi Kami
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/faq"
                class="text-gray-600 hover:text-primary transition-colors"
              >
                FAQ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/book/detail"
                class="text-gray-600 hover:text-primary transition-colors"
              >
                Trip Saya
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Terms & Conditions -->
        <div class="min-w-[180px]">
          <div class="font-semibold mb-4 text-gray-900">
            Terms & Conditions
          </div>
          <ul
            v-if="loadingFetch"
            class="space-y-3"
          >
            <li class="animate-pulse">
              <div class="h-4 bg-gray-300 rounded w-24" />
            </li>
            <li class="animate-pulse">
              <div class="h-4 bg-gray-300 rounded w-20" />
            </li>
          </ul>
          <ul
            v-else-if="termsCondition"
            class="space-y-3"
          >
            <li
              v-for="(item, i) in termsCondition"
              :key="i"
            >
              <NuxtLink
                :to="`/terms-and-conditions/${item.section}`"
                class="text-gray-600 hover:text-primary transition-colors"
              >
                {{ item.header }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <!-- Social Media and Copyright -->
          <div class="flex flex-col gap-4 md:gap-6">
            <div class="text-lg text-center md:text-start font-medium text-gray-700">
              Ikuti kami
            </div>
            <div class="flex justify-center md:justify-start space-x-3">
              <UButton
                icon="simple-icons:instagram"
                size="lg"
                variant="soft"
                color="neutral"
                to="https://www.instagram.com/peponitravel"
                target="_blank"
                external
              />
              <UButton
                icon="simple-icons:linkedin"
                size="lg"
                variant="soft"
                color="neutral"
                to="https://www.linkedin.com/company/peponi-travel/"
                target="_blank"
                external
              />
              <UButton
                icon="simple-icons:tiktok"
                size="lg"
                variant="soft"
                color="neutral"
                to="https://www.tiktok.com/@wearepeponi?_t=ZS-8zFDR5ICBts&_r=1"
                target="_blank"
                external
              />
            </div>
          </div>
        </div>

        <!-- Copyright -->
        <div class="mt-6 text-center md:text-left">
          <div class="text-sm text-gray-600">
            © 2024 | Peponi, PT Aku Bisa Liburan
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { getDataFooter } from '~/composables/footer/get'

const countryStore = useCountryStore()

const { aboutUs, termsCondition, loadingFetch } = await getDataFooter()

// Accordion items for mobile sections
const accordionItems = [
  {
    label: 'Tentang kami',
    slot: 'tentang-kami',
    defaultOpen: false
  },
  {
    label: 'Destinasi',
    slot: 'destinasi',
    defaultOpen: false
  },
  {
    label: 'Bantuan',
    slot: 'bantuan',
    defaultOpen: false
  },
  {
    label: 'Terms & Conditions',
    slot: 'terms',
    defaultOpen: false
  }
]
</script>
