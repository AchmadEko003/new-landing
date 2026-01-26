<script lang="ts" setup>
import type { ITripCard } from "~~/shared/interface/ITrip";
import { formatCurrency } from "~~/shared/script/currency";

const props = defineProps<ITripCard>();

const imageSrc = computed(() => props.imageSrc);
const title = computed(() => props.title || "");
const days = computed(() => props.days || "0");
const summary = computed(() => props.summary || "");
const startPrice = computed(() => props.startPrice ?? 0);
const url = computed(() => props.url || "#");
</script>

<template>
  <NuxtLink :to="url">
    <div
      :class="[
        'w-full max-w-[15em] md:max-w-[20em] min-h-[400px] md:min-h-[608px] rounded-2xl overflow-hidden',
        'border-[1px] border-gray-200 hover:border-primary group cursor-pointer flex flex-col select-none',
        'hover:-mt-2 transition-all duration-300 ease-in-out',
      ]"
    >
      <!-- Image Section -->
      <div class="relative pointer-events-none flex-shrink-0">
        <ImageResponsive :img-url="`/trip/${imageSrc}.jpeg`" size="medium" />
      </div>

      <!-- Content Section - Flexible height -->
      <div class="flex flex-col flex-1 p-3">
        <!-- Top content that can expand -->
        <div class="flex flex-col gap-2 md:gap-3 flex-1">
          <h2
            class="text-base md:text-lg lg:text-2xl font-semibold line-clamp-2 select-none"
          >
            {{ title }}
          </h2>

          <p class="font-bold text-xs md:text-sm lg:text-base select-none">
            {{ days }} Hari
          </p>

          <p class="text-xs md:text-sm lg:text-base line-clamp-2 select-none">
            {{ summary }}
          </p>
        </div>

        <!-- Price section - Sticks above button -->
        <div class="mt-auto mb-3">
          <p class="text-xs md:text-sm lg:text-base select-none">
            mulai dari
            <span
              class="text-sm md:text-lg lg:text-2xl font-bold select-none block mt-1"
            >
              {{ formatCurrency(startPrice) }}
            </span>
          </p>
        </div>

        <!-- Button section - Always at bottom -->
        <div class="flex-shrink-0">
          <button
            class="w-full border-[1px] border-gray-400 rounded-lg py-2 md:py-3 text-sm md:text-base group-hover:cursor-pointer group-hover:border-primary group-hover:bg-primary-100 group-hover:text-primary transition-colors select-none"
          >
            Lihat Trip
          </button>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
