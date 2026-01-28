<script lang="ts" setup>
interface ExtraPackage {
  uid: string
  name: string
  price: number
  caption?: string
  referenceType?: string
  referenceId?: number | null
}

interface GuestSummary {
  fullNameAsPerPassport?: string
  name?: string
}

type SelectorVariant = 'default' | 'sudah-dipesan' | 'bisa-ditambahkan'

const props = defineProps<{
  extraPackages: ExtraPackage[] | undefined
  guests: GuestSummary[]
  isGuestSelectedForPackage: (packageUid: string, guestIndex: number) => boolean
  getSelectedGuestCount: (packageUid: string) => number
  formatCurrency: (value: number) => string
  variant?: SelectorVariant
  showCaption?: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle', packageUid: string, guestIndex: number): void
}>()

// Modal state
const baseUrl = useRuntimeConfig().public.apiBase
const showDetailModal = ref(false)
const selectedPackage = ref<ExtraPackage | null>(null)
const packageDetails = ref<any>(null)
const loadingDetails = ref(false)

const openDetailModal = async (pkg: ExtraPackage) => {
  selectedPackage.value = pkg
  showDetailModal.value = true

  // Fetch package details if referenceType and referenceId exist
  if (pkg.referenceType && pkg.referenceId) {
    loadingDetails.value = true
    try {
      let endpoint = ''
      if (pkg.referenceType === 'visa') {
        endpoint = `${baseUrl}/Visa/${pkg.referenceId}`
      } else if (pkg.referenceType === 'experience') {
        endpoint = `${baseUrl}/UniqueExperience/${pkg.referenceId}`
      }

      if (endpoint) {
        const response = await $fetch<any>(endpoint)
        packageDetails.value = response?.data || response
      }
    } catch (error) {
      console.error('Failed to fetch package details:', error)
      packageDetails.value = null
    } finally {
      loadingDetails.value = false
    }
  }
}

// Check if all guests are selected for a package
const areAllGuestsSelected = (packageUid: string) => {
  if (props.guests.length === 0) return false
  return props.guests.every((_, guestIndex) => props.isGuestSelectedForPackage(packageUid, guestIndex))
}

// Toggle all guests for a package
const toggleAllGuests = (packageUid: string) => {
  const allSelected = areAllGuestsSelected(packageUid)
  props.guests.forEach((_, guestIndex) => {
    const isSelected = props.isGuestSelectedForPackage(packageUid, guestIndex)
    // If all are selected, deselect all. Otherwise, select all that aren't selected
    if (allSelected || !isSelected) {
      emit('toggle', packageUid, guestIndex)
    }
  })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Default Variant: For selection during initial booking -->
    <template v-if="variant === 'default'">
      <p class="text-gray-600 mb-4">
        Select additional packages for each guest (optional)
      </p>
      <div
        v-if="props.extraPackages?.length"
        class="space-y-4"
      >
        <div
          v-for="pkg in props.extraPackages"
          :key="pkg.uid"
          class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-all bg-white dark:bg-gray-800 shadow-sm"
        >
          <div class="flex justify-between items-start mb-3">
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-semibold">
                  {{ pkg.name }}
                </h4>
                <button
                  v-if="pkg.referenceType === 'visa' || pkg.referenceType === 'experience'"
                  class="flex items-center justify-center w-6 h-6 cursor-pointer transition-opacity hover:opacity-70 shrink-0"
                  title="View package details"
                  @click="openDetailModal(pkg)"
                >
                  <UIcon
                    name="i-heroicons-information-circle"
                    class="size-6"
                  />
                </button>
              </div>
              <p
                v-if="showCaption && pkg.caption"
                class="text-gray-600 text-sm"
              >
                {{ pkg.caption }}
              </p>
            </div>
            <div class="text-right">
              <p class="font-bold text-lg">
                {{ props.formatCurrency(pkg.price) }}
              </p>
              <div class="text-sm text-gray-600 mt-1 flex items-center justify-end gap-1">
                <UIcon
                  name="i-heroicons-users"
                  class="w-4 h-4 text-primary-600"
                />
                <span>{{ props.getSelectedGuestCount(pkg.uid) }}/{{ props.guests?.length || 0
                }}</span>
              </div>
            </div>
          </div>
          <!-- Guest Selection Buttons -->
          <div class="flex flex-wrap gap-2">
            <UButton
              :variant="areAllGuestsSelected(pkg.uid) ? 'solid' : 'outline'"
              :color="areAllGuestsSelected(pkg.uid) ? 'primary' : 'neutral'"
              size="sm"
              :class="!areAllGuestsSelected(pkg.uid) ? 'border-gray-300' : ''"
              @click="toggleAllGuests(pkg.uid)"
            >
              <UIcon
                name="i-heroicons-users"
                class="mr-1"
              />
              Semua Tamu
            </UButton>
            <div class="flex flex-wrap gap-2">
              <UButton
                v-for="(guest, guestIndex) in props.guests"
                :key="guestIndex"
                :variant="props.isGuestSelectedForPackage(pkg.uid, guestIndex) ? 'solid' : 'outline'"
                :color="props.isGuestSelectedForPackage(pkg.uid, guestIndex) ? 'primary' : 'neutral'"
                size="sm"
                :class="!props.isGuestSelectedForPackage(pkg.uid, guestIndex) ? 'border-gray-300' : ''"
                @click="emit('toggle', pkg.uid, guestIndex)"
              >
                {{ guest.fullNameAsPerPassport || guest.name }}
              </UButton>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="text-center py-8 text-gray-500"
      >
        No extra packages available for this trip
      </div>
    </template>

    <!-- "Sudah Dipesan" Variant -->
    <template v-if="variant === 'sudah-dipesan'">
      <UCard
        :ui="{
          header: { padding: 'px-4 py-5 sm:px-6' },
          body: { padding: 'p-4' }
        }"
      >
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon
              name="i-heroicons-archive-box"
              class="text-primary-500 w-8 h-8"
            />
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              Extra Package yang Sudah Dipesan
            </h3>
          </div>
        </template>

        <div
          v-if="props.extraPackages?.length"
          class="space-y-4"
        >
          <div
            v-for="pkg in props.extraPackages"
            :key="pkg.uid"
            class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-all bg-white dark:bg-gray-800 shadow-sm"
          >
            <div class="flex justify-between items-start mb-3">
              <div>
                <div class="flex items-center gap-2">
                  <h4 class="font-semibold">
                    {{ pkg.name }}
                  </h4>
                  <button
                    v-if="pkg.referenceType === 'visa' || pkg.referenceType === 'experience'"
                    class="flex items-center justify-center w-6 h-6 cursor-pointer transition-opacity hover:opacity-70 shrink-0"
                    title="View package details"
                    @click="openDetailModal(pkg)"
                  >
                    <UIcon
                      name="i-heroicons-information-circle"
                      class="size-6"
                    />
                  </button>
                  <UBadge
                    color="primary"
                    variant="solid"
                  >
                    Sudah Dipesan
                  </UBadge>
                </div>
                <p
                  v-if="showCaption && pkg.caption"
                  class="text-gray-600 text-sm"
                >
                  {{ pkg.caption }}
                </p>
              </div>
              <div class="text-right">
                <p class="font-bold text-lg">
                  {{ props.formatCurrency(pkg.price) }}
                </p>
                <div class="text-sm text-gray-600 mt-1 flex items-center justify-end gap-1">
                  <UIcon
                    name="i-heroicons-users"
                    class="w-4 h-4 text-primary-600"
                  />
                  <span>{{ props.getSelectedGuestCount(pkg.uid) }}/{{ props.guests?.length || 0
                  }}</span>
                </div>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h5 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Dipesan untuk:
              </h5>
              <div class="flex flex-wrap gap-2">
                <template v-for="(guest, guestIndex) in props.guests">
                  <div
                    v-if="props.isGuestSelectedForPackage(pkg.uid, guestIndex)"
                    :key="guestIndex"
                    class="flex items-center gap-x-2 rounded-full px-3 py-1 text-sm font-semibold text-primary-800 dark:text-primary-100 bg-primary-100 dark:bg-primary-800/50"
                  >
                    <UIcon
                      name="i-heroicons-user-solid"
                      class="h-5 w-5"
                    />
                    <span>{{ guest.fullNameAsPerPassport || guest.name }}</span>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="text-center py-8 text-gray-500"
        >
          No extra packages have been ordered.
        </div>
      </UCard>
    </template>

    <!-- "Bisa Ditambahkan" Variant -->
    <template v-if="variant === 'bisa-ditambahkan'">
      <UCard
        :ui="{
          header: { padding: 'px-4 py-5 sm:px-6' },
          body: { padding: 'p-4' }
        }"
      >
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon
              name="i-heroicons-plus-circle"
              class="text-primary-500 w-8 h-8"
            />
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              Extra Package yang Bisa Ditambahkan
            </h3>
          </div>
        </template>

        <div
          v-if="props.extraPackages?.length"
          class="space-y-4"
        >
          <div
            v-for="pkg in props.extraPackages"
            :key="pkg.uid"
            class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-all bg-white dark:bg-gray-800 shadow-sm"
          >
            <div class="flex justify-between items-start mb-3">
              <div>
                <div class="flex items-center gap-2">
                  <h4 class="font-semibold">
                    {{ pkg.name }}
                  </h4>
                  <button
                    v-if="pkg.referenceType === 'visa' || pkg.referenceType === 'experience'"
                    class="flex items-center justify-center w-6 h-6 cursor-pointer transition-opacity hover:opacity-70 shrink-0"
                    title="View package details"
                    @click="openDetailModal(pkg)"
                  >
                    <UIcon
                      name="i-heroicons-information-circle"
                      class="size-6"
                    />
                  </button>
                </div>
                <p
                  v-if="showCaption && pkg.caption"
                  class="text-gray-600 text-sm"
                >
                  {{ pkg.caption }}
                </p>
              </div>
              <div class="text-right">
                <p class="font-bold text-lg">
                  {{ props.formatCurrency(pkg.price) }}
                </p>
                <div class="text-sm text-gray-600 mt-1 flex items-center justify-end gap-1">
                  <UIcon
                    name="i-heroicons-users"
                    class="w-4 h-4 text-primary-600"
                  />
                  <span>{{ props.getSelectedGuestCount(pkg.uid) }}/{{ props.guests?.length || 0
                  }}</span>
                </div>
              </div>
            </div>
            <!-- Guest Selection Buttons -->
            <div class="flex flex-wrap gap-2">
              <UButton
                :variant="areAllGuestsSelected(pkg.uid) ? 'solid' : 'outline'"
                :color="areAllGuestsSelected(pkg.uid) ? 'primary' : 'neutral'"
                size="sm"
                :class="!areAllGuestsSelected(pkg.uid) ? 'border-gray-300' : ''"
                @click="toggleAllGuests(pkg.uid)"
              >
                <UIcon
                  name="i-heroicons-users"
                  class="mr-1"
                />
                Semua Tamu
              </UButton>
              <div class="flex flex-wrap gap-2">
                <UButton
                  v-for="(guest, guestIndex) in props.guests"
                  :key="guestIndex"
                  :variant="props.isGuestSelectedForPackage(pkg.uid, guestIndex) ? 'solid' : 'outline'"
                  :color="props.isGuestSelectedForPackage(pkg.uid, guestIndex) ? 'primary' : 'neutral'"
                  size="sm"
                  :class="!props.isGuestSelectedForPackage(pkg.uid, guestIndex) ? 'border-gray-300' : ''"
                  @click="emit('toggle', pkg.uid, guestIndex)"
                >
                  {{ guest.fullNameAsPerPassport || guest.name }}
                </UButton>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="text-center py-8 text-gray-500"
        >
          No additional packages can be added.
        </div>
      </UCard>
    </template>

    <!-- Detail Modal - Using PackageDetailDialog -->
    <UtilPackageDetailDialog
      v-model="showDetailModal"
      :selected-package="selectedPackage"
      :package-details="packageDetails"
      :loading-details="loadingDetails"
      dialog-size="xl"
    />
  </div>
</template>
