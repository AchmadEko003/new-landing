<template>
  <UCard v-if="availablePackages.length > 0">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-heroicons-plus-circle"
          class="w-5 h-5 text-primary"
        />
        <h2 class="text-xl font-semibold">
          Paket Tambahan yang Bisa Ditambahkan
        </h2>
      </div>
    </template>

    <div class="space-y-4">
      <div
        v-for="pkg in availablePackages"
        :key="pkg.uid"
        class="border rounded-lg p-4"
      >
        <!-- Header: Title/Caption and Price -->
        <div class="flex items-start justify-between mb-4 pb-4 border-b">
          <div class="flex-1">
            <div class="flex items-start gap-2 mb-1">
              <h3 class="font-semibold text-gray-900">
                {{ pkg.name }}
              </h3>
              <button
                v-if="pkg.referenceId"
                class="text-primary hover:text-primary/80 transition-colors p-1"
                @click="$emit('open-detail', pkg)"
              >
                <UIcon
                  name="i-heroicons-information-circle"
                  class="w-5 h-5"
                />
              </button>
            </div>
            <p class="text-sm text-gray-600">
              {{ pkg.caption }}
            </p>
          </div>
          <p class="text-lg font-semibold text-primary ml-4 whitespace-nowrap">
            Rp {{ pkg.price }}
          </p>
        </div>

        <!-- Guest Buttons with Counter -->
        <div class="flex items-center justify-between gap-4">
          <!-- Guest Buttons and Select All -->
          <div class="flex flex-wrap gap-2 items-center">
            <!-- Select All Button (only if more than 1 guest available) -->
            <button
              v-if="getAvailableGuestsForPackage(pkg.uid).length > 1"
              :class="[
                'px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2',
                getAllGuestsSelected(pkg.uid)
                  ? 'bg-primary text-white shadow-md'
                  : 'border border-gray-300 text-gray-700 hover:border-primary hover:text-primary'
              ]"
              @click="$emit('toggle-all', pkg.uid)"
            >
              <UIcon
                name="i-heroicons-users"
                class="w-4 h-4"
              />
              {{ getSelectAllButtonText(pkg.uid) }}
            </button>

            <!-- Individual Guest Buttons -->
            <div
              v-for="(guest, idx) in guests"
              v-show="!isGuestLockedForPackage(pkg.uid, idx)"
              :key="guest.name"
            >
              <button
                :class="[
                  'px-2 py-2 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2',
                  isGuestSelectedForPackage(pkg.uid, idx)
                    ? 'bg-primary text-white shadow-md'
                    : 'border border-gray-300 text-gray-700 hover:border-primary hover:text-primary'
                ]"
                @click="$emit('toggle-guest', { packageUid: pkg.uid, guestIndex: idx })"
              >
                <UIcon
                  name="i-heroicons-user"
                  class="w-4 h-4"
                />
                {{ guest.name }}
              </button>
            </div>
          </div>

          <!-- Guest Counter -->
          <div class="flex items-center gap-1 text-sm text-gray-700 whitespace-nowrap">
            <UIcon
              name="i-heroicons-users"
              class="w-4 h-4"
            />
            <span class="font-medium">{{ getNewSelectionsForPackage(pkg.uid) }} / {{ getAvailableGuestsForPackage(pkg.uid).length }}</span>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface Package {
  uid: string
  name: string
  caption: string
  price: string
  priceValue: number
  referenceType?: string
  referenceId?: string
}

interface Guest {
  name: string
}

const props = defineProps<{
  availablePackages: Package[]
  guests: Guest[]
  isGuestSelectedForPackage: (uid: string, guestIndex: number) => boolean
  isGuestLockedForPackage: (uid: string, guestIndex: number) => boolean
  getAvailableGuestsForPackage: (uid: string) => Guest[]
  getNewSelectionsForPackage: (uid: string) => number
  getAllGuestsSelected: (uid: string) => boolean
  getSelectAllButtonText: (uid: string) => string
}>()

const guests = computed(() => props.guests)
const availablePackages = computed(() => props.availablePackages)
const isGuestSelectedForPackage = computed(() => props.isGuestSelectedForPackage)
const isGuestLockedForPackage = computed(() => props.isGuestLockedForPackage)
const getAvailableGuestsForPackage = computed(() => props.getAvailableGuestsForPackage)
const getNewSelectionsForPackage = computed(() => props.getNewSelectionsForPackage)
const getAllGuestsSelected = computed(() => props.getAllGuestsSelected)
const getSelectAllButtonText = computed(() => props.getSelectAllButtonText)

defineEmits<{
  'toggle-guest': [value: { packageUid: string, guestIndex: number }]
  'toggle-all': [packageUid: string]
  'open-detail': [pkg: Package]
}>()
</script>
