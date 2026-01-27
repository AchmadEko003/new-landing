<template>
  <UCard v-if="packagesAlreadyAdded.length > 0">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-heroicons-check-circle"
          class="w-5 h-5 text-green-600"
        />
        <h2 class="text-xl font-semibold">
          Paket Tambahan yang Sudah Ditambahkan
        </h2>
      </div>
    </template>

    <div class="space-y-4">
      <div
        v-for="item in packagesAlreadyAdded"
        :key="item.pkg.uid"
        class="border rounded-lg p-4 bg-white"
      >
        <!-- Header: Title/Caption and Price -->
        <div class="flex items-start justify-between mb-4 pb-4 border-b">
          <div class="flex-1">
            <div class="flex items-start gap-2 mb-1">
              <h3 class="font-semibold text-gray-900">
                {{ item.pkg.name }}
              </h3>
              <button
                v-if="item.pkg.referenceId"
                class="text-green-600 hover:text-green-700 transition-colors p-1"
                @click="$emit('open-detail', item.pkg)"
              >
                <UIcon
                  name="i-heroicons-information-circle"
                  class="w-5 h-5"
                />
              </button>
            </div>
            <p class="text-sm text-gray-600">
              {{ item.pkg.caption }}
            </p>
          </div>
          <p class="text-lg font-semibold text-primary ml-4 whitespace-nowrap">
            Rp {{ item.pkg.price }}
          </p>
        </div>

        <!-- Guest Buttons with Counter -->
        <div class="flex items-center justify-between gap-4">
          <!-- Guest Buttons (always active, not clickable) -->
          <div class="flex flex-wrap gap-2 items-center">
            <button
              v-for="guest in item.guests"
              :key="guest.name"
              disabled
              class="px-2 py-2 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2 bg-green-600 text-white shadow-md cursor-not-allowed"
            >
              <UIcon
                name="i-heroicons-user"
                class="w-4 h-4"
              />
              {{ guest.name }}
            </button>
          </div>

          <!-- Guest Counter -->
          <div class="flex items-center gap-1 text-sm text-gray-700 whitespace-nowrap">
            <UIcon
              name="i-heroicons-users"
              class="w-4 h-4"
            />
            <span class="font-medium">{{ item.guests.length }} / {{ totalGuests }}</span>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface Package {
  pkg: any
  guests: any[]
}

defineProps<{
  packagesAlreadyAdded: Package[]
  totalGuests: number
}>()

defineEmits<{
  'open-detail': [pkg: any]
}>()
</script>
