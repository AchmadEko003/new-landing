<script lang="ts" setup>
import type { IResponseList } from '~~/shared/interface/IResponse'

interface ICreditCardForm {
  cardName: string
  cardNumber: string
  expiryDate: string
  cvv: number | null
}

interface IVaList {
  code: string
  name: string
  fee: number
  is_Activated: boolean
  icon: string
  country: string
}

const props = defineProps({
  formData: {
    type: Object as () => Record<string, any>,
    required: true
  }
})

const baseUrl = useRuntimeConfig().public.apiBase
const selectedPaymentType = ref<'virtual_account' | 'credit_card' | null>(null)
const selectedBank = ref<{ code: string, name: string, icon: string } | null>(null)

const { data: vaList, pending: vaListPending } = await useLazyFetch<IResponseList<IVaList>>(
  `${baseUrl}/Booking/payment-list`,
  {
    method: 'GET',
    key: 'va-list'
  }
)

const switchPaymentType = (type: 'virtual_account' | 'credit_card') => {
  selectedPaymentType.value = type
  if (type === 'virtual_account') {
    creditCardForm.value = { cardName: '', cardNumber: '', expiryDate: '', cvv: null }
  } else {
    selectedBank.value = null
  }
}

const creditCardForm = ref<ICreditCardForm>({
  cardName: '',
  cardNumber: '',
  expiryDate: '',
  cvv: null
})

const selectBank = (bank: { code: string, name: string, icon: string }) => {
  selectedBank.value = bank
}
</script>

<template>
  <UCard>
    {{ vaList }}
    <template #header>
      <h2 class="text-xl font-semibold">
        Pilih Metode Pembayaran
      </h2>
    </template>

    <div class="space-y-6">
      <!-- Payment Method Selection Buttons -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Virtual Account Button -->
        <button
          :class="[
            'group relative p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-4 min-h-[160px] overflow-hidden cursor-pointer',
            selectedPaymentType === 'virtual_account'
              ? 'border-primary bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-lg shadow-primary/20 scale-[1.02]'
              : 'border-gray-200 bg-white hover:border-primary/40 hover:shadow-md hover:scale-[1.01]'
          ]"
          @click="switchPaymentType('virtual_account')"
        >
          <!-- Background Pattern -->
          <div
            :class="[
              'absolute inset-0 opacity-5 transition-opacity duration-300',
              selectedPaymentType === 'virtual_account'
                ? 'opacity-10'
                : 'group-hover:opacity-10'
            ]"
          >
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-3xl" />
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-primary rounded-full blur-2xl" />
          </div>

          <!-- Selected Badge -->
          <div
            v-if="selectedPaymentType === 'virtual_account'"
            class="absolute top-3 right-3 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-lg animate-in fade-in zoom-in duration-300"
          >
            <UIcon
              name="i-heroicons-check"
              class="w-4 h-4 text-white"
            />
          </div>

          <div class="relative z-10 flex flex-col items-center gap-4">
            <!-- Icon Container -->
            <div
              :class="[
                'w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300',
                selectedPaymentType === 'virtual_account'
                  ? 'bg-primary shadow-lg shadow-primary/30'
                  : 'bg-gray-100 group-hover:bg-primary/10'
              ]"
            >
              <UIcon
                name="i-heroicons-building-library"
                :class="[
                  'w-8 h-8 transition-all duration-300',
                  selectedPaymentType === 'virtual_account'
                    ? 'text-white'
                    : 'text-gray-500 group-hover:text-primary'
                ]"
              />
            </div>

            <!-- Text -->
            <div class="text-center">
              <div
                :class="[
                  'font-bold text-lg mb-1 transition-colors duration-300',
                  selectedPaymentType === 'virtual_account'
                    ? 'text-primary'
                    : 'text-gray-700 group-hover:text-primary'
                ]"
              >
                Virtual Account
              </div>
              <p
                :class="[
                  'text-xs transition-colors duration-300',
                  selectedPaymentType === 'virtual_account'
                    ? 'text-primary/70'
                    : 'text-gray-500'
                ]"
              >
                Transfer melalui bank
              </p>
            </div>
          </div>
        </button>

        <!-- Credit Card Button -->
        <button
          :class="[
            'group relative p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-4 min-h-[160px] overflow-hidden cursor-pointer',
            selectedPaymentType === 'credit_card'
              ? 'border-primary bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-lg shadow-primary/20 scale-[1.02]'
              : 'border-gray-200 bg-white hover:border-primary/40 hover:shadow-md hover:scale-[1.01]'
          ]"
          @click="switchPaymentType('credit_card')"
        >
          <!-- Background Pattern -->
          <div
            :class="[
              'absolute inset-0 opacity-5 transition-opacity duration-300',
              selectedPaymentType === 'credit_card'
                ? 'opacity-10'
                : 'group-hover:opacity-10'
            ]"
          >
            <div class="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full blur-3xl" />
            <div class="absolute bottom-0 right-0 w-24 h-24 bg-primary rounded-full blur-2xl" />
          </div>

          <!-- Selected Badge -->
          <div
            v-if="selectedPaymentType === 'credit_card'"
            class="absolute top-3 right-3 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-lg animate-in fade-in zoom-in duration-300"
          >
            <UIcon
              name="i-heroicons-check"
              class="w-4 h-4 text-white"
            />
          </div>

          <div class="relative z-10 flex flex-col items-center gap-4">
            <!-- Icon Container -->
            <div
              :class="[
                'w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300',
                selectedPaymentType === 'credit_card'
                  ? 'bg-primary shadow-lg shadow-primary/30'
                  : 'bg-gray-100 group-hover:bg-primary/10'
              ]"
            >
              <UIcon
                name="i-heroicons-credit-card"
                :class="[
                  'w-8 h-8 transition-all duration-300',
                  selectedPaymentType === 'credit_card'
                    ? 'text-white'
                    : 'text-gray-500 group-hover:text-primary'
                ]"
              />
            </div>

            <!-- Text -->
            <div class="text-center">
              <div
                :class="[
                  'font-bold text-lg mb-1 transition-colors duration-300',
                  selectedPaymentType === 'credit_card'
                    ? 'text-primary'
                    : 'text-gray-700 group-hover:text-primary'
                ]"
              >
                Kartu Kredit
              </div>
              <p
                :class="[
                  'text-xs transition-colors duration-300',
                  selectedPaymentType === 'credit_card'
                    ? 'text-primary/70'
                    : 'text-gray-500'
                ]"
              >
                Pembayaran langsung
              </p>
            </div>
          </div>
        </button>
      </div>

      <!-- Virtual Account Section -->
      <div
        v-if="selectedPaymentType === 'virtual_account'"
        class="space-y-5 pt-2"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <UIcon
              name="i-heroicons-building-library"
              class="w-5 h-5 text-blue-600"
            />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">
              Pilih Bank
            </h3>
            <p class="text-sm text-gray-600">
              Transfer melalui Virtual Account
            </p>
          </div>
        </div>

        <div
          v-if="vaListPending"
          class="flex justify-center py-8"
        >
          <div class="text-center">
            <div class="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p class="text-sm text-gray-500">
              Memuat daftar bank...
            </p>
          </div>
        </div>

        <div
          v-else
          class="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          <button
            v-for="bank in vaList?.data?.filter(item => item.is_Activated)"
            :key="bank.code"
            :class="[
              'group relative p-5 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-3 hover:shadow-md cursor-pointer',
              selectedBank?.code === bank.code
                ? 'border-primary bg-primary/5 shadow-md scale-[1.02]'
                : 'border-gray-200 bg-white hover:border-primary/50'
            ]"
            @click="selectBank(bank)"
          >
            <div
              v-if="selectedBank?.code === bank.code"
              class="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg"
            >
              <UIcon
                name="i-heroicons-check"
                class="w-4 h-4 text-white"
              />
            </div>

            <div class="w-full h-12 flex items-center justify-center">
              <img
                :src="`/assets/bank/${bank.code}.png`"
                :alt="bank.name"
                class="max-h-10 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                @error="
                  ($event.target as HTMLImageElement).src
                    = '/placeholder-bank.png'
                "
              >
            </div>
            <span class="text-sm font-semibold text-center text-gray-700">{{
              bank.name
            }}</span>
          </button>
        </div>

        <div
          v-if="selectedBank"
          class="bg-green-50 border border-green-200 rounded-lg p-4"
        >
          <div class="flex items-start gap-3">
            <UIcon
              name="i-heroicons-check-circle"
              class="w-5 h-5 text-green-600 mt-0.5 shrink-0"
            />
            <div class="flex-1">
              <p class="text-sm font-medium text-green-800 mb-1">
                Bank Terpilih: {{ selectedBank.name }}
              </p>
              <p class="text-xs text-green-700">
                Nomor Virtual Account akan dikirimkan setelah Anda melanjutkan
                pembayaran
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Credit Card Section -->
      <div
        v-if="selectedPaymentType === 'credit_card'"
        class="space-y-5 pt-2"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <UIcon
              name="i-heroicons-credit-card"
              class="w-5 h-5 text-purple-600"
            />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">
              Informasi Kartu Kredit
            </h3>
            <p class="text-sm text-gray-600">
              Pembayaran diproses secara aman
            </p>
          </div>
        </div>

        <div class="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 shadow-sm">
          <div class="flex items-start gap-3">
            <UIcon
              name="i-heroicons-shield-check"
              class="w-5 h-5 text-amber-600 mt-0.5 shrink-0"
            />
            <div>
              <p class="text-sm font-medium text-amber-900 mb-1">
                Transaksi Aman & Terenkripsi
              </p>
              <p class="text-xs text-amber-800">
                Data kartu Anda dilindungi dengan enkripsi SSL 256-bit melalui
                gateway pembayaran terpercaya.
              </p>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <!-- Cardholder Name -->
          <div>
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <UIcon
                name="i-heroicons-user"
                class="w-4 h-4 text-gray-500"
              />
              Nama Pemegang Kartu
            </label>
            <UInput
              v-model="creditCardForm.cardName"
              placeholder="JOHN DOE"
              size="lg"
              class="w-full"
              :ui="{ base: 'uppercase' }"
              @blur="
                creditCardForm.cardName = creditCardForm.cardName.toUpperCase()
              "
            />
            <p class="text-xs text-gray-500 mt-1.5 ml-1">
              Sesuai yang tertera pada kartu
            </p>
          </div>

          <!-- Card Number -->
          <div>
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <UIcon
                name="i-heroicons-credit-card"
                class="w-4 h-4 text-gray-500"
              />
              Nomor Kartu
            </label>
            <UInput
              v-model="creditCardForm.cardNumber"
              placeholder="1234 5678 9012 3456"
              maxlength="19"
              size="lg"
              class="w-full font-mono"
            />
            <p class="text-xs text-gray-500 mt-1.5 ml-1">
              16 digit nomor kartu kredit
            </p>
          </div>

          <!-- Expiry and CVV -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <UIcon
                  name="i-heroicons-calendar"
                  class="w-4 h-4 text-gray-500"
                />
                Berlaku Hingga
              </label>
              <UInput
                v-model="creditCardForm.expiryDate"
                placeholder="MM/YY"
                maxlength="5"
                size="lg"
                class="w-full font-mono"
              />
              <p class="text-xs text-gray-500 mt-1.5 ml-1">
                Format: MM/YY
              </p>
            </div>
            <div>
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <UIcon
                  name="i-heroicons-lock-closed"
                  class="w-4 h-4 text-gray-500"
                />
                CVV
              </label>
              <UInput
                v-model="creditCardForm.cvv"
                placeholder="123"
                type="password"
                maxlength="4"
                size="lg"
                class="w-full font-mono"
              />
              <p class="text-xs text-gray-500 mt-1.5 ml-1">
                3-4 digit kode keamanan
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Proceed Button -->
      <div
        v-if="selectedPaymentType"
        class="pt-4 border-t"
      >
        <!-- <UButton
          :loading="isSubmitting"
          :disabled="!canProceed"
          block
          size="lg"
          :class="[
            !canProceed
              ? 'bg-gray-300! text-white cursor-not-allowed opacity-70'
              : 'bg-primary hover:bg-primary/90'
          ]"
          @click="proceedToCheckout"
        >
          Bayar Sekarang
        </UButton> -->
      </div>
    </div>
  </UCard>
</template>
