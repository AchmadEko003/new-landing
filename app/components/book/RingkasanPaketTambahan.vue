<template>
  <UCard v-if="newPackageSelections.length > 0">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-heroicons-receipt"
          class="w-5 h-5 text-primary"
        />
        <h2 class="text-xl font-semibold">
          Ringkasan Paket Tambahan
        </h2>
      </div>
    </template>

    <div class="space-y-4">
      <!-- Each selected package detail -->
      <div
        v-for="item in newPackageSelections"
        :key="item.pkg.uid"
        class="border rounded-lg p-4 bg-white border-blue-200"
      >
        <!-- Package Header -->
        <div class="flex items-start justify-between mb-3 pb-3 border-b border-blue-200">
          <div class="flex-1">
            <h3 class="font-semibold text-gray-900">
              {{ item.pkg.name }}
            </h3>
            <p class="text-sm text-gray-600">
              {{ item.pkg.caption }}
            </p>
          </div>
          <div class="text-right">
            <p class="text-lg font-semibold text-primary">
              Rp {{ item.pkg.priceValue.toLocaleString('id-ID') }}
            </p>
            <p class="text-xs text-gray-500 mt-1">
              × {{ item.guests.length }} orang
            </p>
          </div>
        </div>

        <!-- Guest List -->
        <div class="space-y-2 mb-3">
          <p class="text-sm font-medium text-gray-700">
            Tamu yang Dipilih:
          </p>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="guest in item.guests"
              :key="guest.index"
              class="px-3 py-1.5 rounded-full bg-white border border-blue-200 text-sm font-medium text-gray-700 flex items-center gap-2"
            >
              <UIcon
                name="i-heroicons-user"
                class="w-4 h-4"
              />
              {{ guest.name }}
            </div>
          </div>
        </div>

        <!-- Subtotal -->
        <div class="flex justify-between items-center pt-2 border-t border-blue-200">
          <span class="text-sm font-medium text-gray-700">Subtotal:</span>
          <span class="font-semibold text-primary">Rp {{ item.subtotal.toLocaleString('id-ID') }}</span>
        </div>
      </div>

      <!-- Total Section -->
      <div class="border-t-2 border-primary pt-4 mt-6">
        <div class="flex justify-between items-center bg-primary/5 rounded-lg p-4 border border-primary/20">
          <span class="text-lg font-bold text-gray-900">Total Paket Tambahan:</span>
          <span class="text-2xl font-bold text-primary">Rp {{ newPackageSelectionsTotal.toLocaleString('id-ID') }}</span>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface Guest {
  name: string
  index: number
}

interface PackageSelection {
  pkg: {
    name: string
    caption: string
    priceValue: number
    uid: string
  }
  guests: Guest[]
  subtotal: number
}

defineProps<{
  newPackageSelections: PackageSelection[]
  newPackageSelectionsTotal: number
}>()
</script>
