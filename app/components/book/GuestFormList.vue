<script lang="ts" setup>
type Guest = {
  fullNameAsPerPassport: string
  gender: string
  email?: string
  whatsappNumber: string
}

const guests = defineModel<Guest[]>('guests', { required: true })

const props = defineProps<{
  genderOptions: string[]
  isPrimaryEmail?: boolean
}>()

// Email validator
const isValidEmail = (value: string) => {
  if (!value) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

// Name validator (minimum 3 characters)
const isValidName = (value: string) => !!value && value.trim().length >= 3

// Phone number validator (digits only, minimum 9 digits, maximum 15)
const isValidPhoneNumber = (value: string) => !!value && /^\d{9,15}$/.test(value)
</script>

<template>
  <div class="space-y-6">
    <div
      v-for="(guest, index) in guests"
      :key="index"
      class="rounded-2xl p-4 border border-subPrimary"
    >
      <div class="flex justify-between items-center mb-4">
        <h4 class="font-bold text-lg">
          {{ index === 0 ? 'Primary Guest' : `#${index + 1} Guest` }}
        </h4>
      </div>

      <div class="space-y-4">
        <div>
          <h5 class="text-sm font-semibold text-gray-700 mb-3">
            Personal Information
          </h5>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Gender</label>
              <USelect
                v-model="guest.gender"
                :items="props.genderOptions"
                placeholder="Select gender"
                size="lg"
                color="primary"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Nama Lengkap Sesuai Passport <span class="text-red-500">*</span></label>
              <UInput
                v-model="guest.fullNameAsPerPassport"
                placeholder="Enter full name as per passport"
                size="lg"
                class="w-full"
                :class="guest.fullNameAsPerPassport && !isValidName(guest.fullNameAsPerPassport) ? 'border-red-500' : ''"
              />
              <p
                v-if="guest.fullNameAsPerPassport && !isValidName(guest.fullNameAsPerPassport)"
                class="text-xs text-red-500 mt-1"
              >
                Minimal 3 karakter
              </p>
            </div>
          </div>
        </div>

        <div>
          <h5 class="text-sm font-semibold text-gray-700 mb-3">
            Contact Details
          </h5>
          <div
            v-if="index === 0"
            class="grid md:grid-cols-2 gap-4"
          >
            <div>
              <label class="block text-sm font-medium mb-2">Email <span class="text-red-500">*</span></label>
              <UInput
                v-model="guest.email"
                type="email"
                placeholder="Enter email address"
                size="lg"
                class="w-full"
                :class="guest.email && !isValidEmail(guest.email) ? 'border-red-500' : ''"
              />
              <p
                v-if="guest.email && !isValidEmail(guest.email)"
                class="text-xs text-red-500 mt-1"
              >
                Format email tidak valid
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">No WhatsApp <span class="text-red-500">*</span></label>
              <UInput
                v-model="guest.whatsappNumber"
                placeholder="Contoh: 628123456789"
                size="lg"
                class="w-full"
                maxlength="15"
                type="tel"
                inputmode="numeric"
                :class="guest.whatsappNumber && !isValidPhoneNumber(guest.whatsappNumber) ? 'border-red-500' : ''"
                @input="guest.whatsappNumber = guest.whatsappNumber.replace(/[^0-9]/g, '')"
              />
              <p
                v-if="guest.whatsappNumber && !isValidPhoneNumber(guest.whatsappNumber)"
                class="text-xs text-red-500 mt-1"
              >
                Nomor harus 9-15 digit
              </p>
            </div>
          </div>
          <div v-else>
            <div>
              <label class="block text-sm font-medium mb-2">No WhatsApp <span class="text-red-500">*</span></label>
              <UInput
                v-model="guest.whatsappNumber"
                placeholder="Contoh: 628123456789"
                size="lg"
                class="w-full"
                maxlength="15"
                type="tel"
                inputmode="numeric"
                :class="guest.whatsappNumber && !isValidPhoneNumber(guest.whatsappNumber) ? 'border-red-500' : ''"
                @input="guest.whatsappNumber = guest.whatsappNumber.replace(/[^0-9]/g, '')"
              />
              <p
                v-if="guest.whatsappNumber && !isValidPhoneNumber(guest.whatsappNumber)"
                class="text-xs text-red-500 mt-1"
              >
                Nomor harus 9-15 digit
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
