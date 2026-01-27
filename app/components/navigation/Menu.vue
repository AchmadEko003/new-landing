<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { getListCountry } from '~/composables/country/list'

const dialogState = ref<boolean>(false)

const { data, pending } = await getListCountry()

const itemsMobile = computed(() => {
  return [
    {
      label: 'Home',
      to: '/'
    },
    {
      label: 'Destinasi',
      to: '/destinasi-populer'
    },
    ...items.value,
    {
      label: 'Terms & Conditions',
      to: '/terms-and-conditions'
    }
  ]
})

const itemsDesktop = computed(() => {
  return [
    {
      label: 'Destinasi',
      children: data,
      class: 'hover:text-primary'
    },
    ...items.value
  ]
})

const items = ref<NavigationMenuItem[]>([
  // {
  //   label: 'Destinasi',
  //   children: reformattedTodos(),
  //   class: 'hover:text-primary'
  // },
  {
    label: 'Aktivitas',
    to: '/pengalaman-unik',
    class: 'hover:text-primary'
  },
  {
    label: 'Trip Saya',
    to: '/booking/detail',
    class: 'hover:text-primary'
  },
  {
    label: 'Tentang Kami',
    to: '/info',
    class: 'hover:text-primary'
  },
  {
    label: 'Bantuan',
    to: '/contact-us',
    class: 'hover:text-primary'
  }
])
</script>

<template>
  <header class="flex items-center justify-between px-3 md:px-10 h-[62px] shadow-lg sticky top-0 bg-white z-50">
    <div>
      <NuxtLink href="/">
        <img
          src="/assets/logo-with-title.png"
          alt="Peponi Logo"
          class="h-12 w-auto"
        >
      </NuxtLink>
    </div>

    <!-- Desktop Menu -->
    <div class="hidden md:block">
      <UNavigationMenu
        :items="itemsDesktop"
        arrow
        class="item-center justify-end"
      />
    </div>

    <!-- Mobile Menu -->
    <div class="block md:hidden">
      <ClientOnly>
        <template #fallback>
          <button class="bg-white text-black flex items-center active:scale-95 transition-transform">
            <Icon
              name="heroicons:list-bullet"
              size="30"
            />
          </button>
        </template>

        <UDrawer
          v-model:open="dialogState"
          should-scale-background
          set-background-color-on-scale
          direction="right"
          :ui="{
            overlay: 'bg-black/30',
            content: 'bg-primary/95 ring-0 w-screen max-w-none'
          }"
        >
          <button
            label="Open"
            class="bg-white text-black flex items-center active:scale-95 transition-transform"
          >
            <Icon
              name="heroicons:list-bullet"
              size="30"
            />
          </button>

          <template #header>
            <div class="flex justify-between">
              <NuxtLink href="/">
                <img
                  src="/assets/logo-with-title-white.png"
                  alt="Peponi Logo"
                  class="h-12 w-auto"
                >
              </NuxtLink>

              <button @click="dialogState = false">
                <UIcon
                  name="i-heroicons-x-mark"
                  class="w-8 h-8 text-white"
                />
              </button>
            </div>
          </template>

          <template #body>
            <!-- <UNavigationMenu :items="items" arrow orientation="vertical"
              class="" :ui="{
                linkLabel: 'text-white text-xl font-bold',
                linkTrailing: 'text-white',
                label: '!bg-black'
              }" /> -->
            <div class="flex flex-col gap-5">
              <div
                v-for="value in itemsMobile"
                :key="value.label"
              >
                <NuxtLink
                  :to="value.to"
                  @click="dialogState = false"
                >
                  <div class="flex items-center justify-between">
                    <h4 class="text-2xl font-bold text-white">{{ value.label }}</h4>
                    <Icon
                      name="heroicons:chevron-right"
                      color="white"
                      class="text-white"
                      size="24"
                    />
                  </div>
                </NuxtLink>
              </div>
            </div>
          </template>
        </UDrawer>
      </ClientOnly>
    </div>
  </header>
</template>
