<script lang="ts" setup>
import type { IDetailBook } from '~~/shared/interface/IDetailBook'
import type { IVoucher } from '~~/shared/interface/IVoucher'

const props = defineProps<{
  data: IDetailBook
  formattedStartDate: string
  formattedEndDate: string
  appliedVoucher: IVoucher | null
  voucherLoading: boolean
  voucherError: string
  canRemovePackage: (uid: string) => boolean
  getPackageQuantity: (uid: string) => number
  incrementPackageQuantity: (uid: string) => void
  decrementPackageQuantity: (uid: string) => void
  claimVoucher: () => void
  removeVoucher: () => void
  formatCurrency: (value: number) => string
}>()

const voucherCode = defineModel<string>('voucherCode', { default: '' })

// const packages = computed(() => props.data.package || [])
const packages = computed(() => {
  if (!props.data.package) return []
  const mainPackages = props.data.package.filter(p => !p.additionalFee)
  console.log(mainPackages, props.data.package.filter(p => !p.additionalFee))
  const additionalPackages = props.data.package.filter(p => p.additionalFee)
  return [...mainPackages, ...additionalPackages]
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-xl font-bold mb-4">
        {{ props.data.name }}
      </h3>
      <p class="text-gray-600 mb-4">
        Jadwal keberangkatan: {{ props.formattedStartDate }} - {{ props.formattedEndDate }}
      </p>
    </div>

    <div class="border rounded-2xl">
      <div
        v-for="pkg in packages"
        :key="pkg.uid"
        class="rounded-2xl px-3 py-2"
      >
        <div class="flex justify-between items-center gap-4">
          <div class="flex-1 flex flex-col justify-center">
            <div :class="['font-bold flex items-center flex-wrap text-lg gap-2', pkg.isSold === false ? 'text-gray-300' : '']">
              <span class="flex items-center gap-2">
                {{ pkg.name }}
              </span>

              <UPopover v-if="pkg.isSold">
                <UIcon
                  name="i-heroicons-information-circle"
                  class="size-6 cursor-pointer"
                />
                <template #content>
                  <div class="p-2 text-sm">
                    {{ pkg.caption }}
                  </div>
                </template>
              </UPopover>

              <UBadge
                v-else
                variant="solid"
                class="text-xs px-2 py-1"
                :ui="{
                  base: 'bg-gray-200 text-gray-500 font-bold'
                }"
              >
                Fully Booked
              </UBadge>
            </div>
            <p :class="['font-bold text-lg', pkg.isSold === false ? 'text-gray-300' : 'text-subPrimary']">
              {{ props.formatCurrency(pkg.price) }}
            </p>
          </div>
          <div class="flex items-center justify-center">
            <div class="flex items-center gap-2">
              <UButton
                icon="i-heroicons-minus"
                size="sm"
                variant="outline"
                class="rounded-full active:scale-95 transition-transform"
                :ui="{
                  base: pkg.additionalFee && pkg.isSold === false
                    ? 'text-gray-300 cursor-not-allowed ring-gray-300'
                    : 'ring-subPrimary text-subPrimary hover:bg-subPrimary/10 active:bg-subPrimary/20 cursor-pointer'
                }"
                :disabled="pkg.additionalFee || !props.canRemovePackage(pkg.uid) || pkg.isSold === false"
                @click="pkg.isSold ? props.decrementPackageQuantity(pkg.uid) : null"
              />
              <span :class="['w-8 text-center text-lg font-bold', pkg.isSold === false ? 'text-gray-300' : '']">{{ props.getPackageQuantity(pkg.uid) }}</span>
              <UButton
                icon="i-heroicons-plus"
                size="sm"
                variant="outline"
                class="rounded-full active:scale-95 transition-transform"
                :ui="{
                  base: pkg.additionalFee && pkg.isSold === false
                    ? 'text-gray-300 cursor-not-allowed ring-gray-300'
                    : 'ring-subPrimary text-subPrimary hover:bg-subPrimary/10 active:bg-subPrimary/20 cursor-pointer'
                }"
                :disabled="pkg.additionalFee || pkg.isSold === false"
                @click="pkg.isSold ? props.incrementPackageQuantity(pkg.uid) : null"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <h4 class="font-bold text-lg mb-3">
        Kode promo & voucher
      </h4>

      <div
        v-if="props.appliedVoucher?.isApplied"
        class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg"
      >
        <div class="flex items-center justify-between">
          <div>
            <span class="font-medium text-green-800">{{ props.appliedVoucher.code }}</span>
            <p class="text-sm text-green-600">
              Discount: {{ props.formatCurrency(props.appliedVoucher.discount) }}
            </p>
          </div>
          <UButton
            variant="ghost"
            color="error"
            size="sm"
            class="cursor-pointer"
            @click="props.removeVoucher()"
          >
            Remove
          </UButton>
        </div>
      </div>

      <div v-else>
        <div class="flex gap-2 mb-2">
          <UInput
            v-model="voucherCode"
            placeholder="Masukkan Kode Kupon"
            class="flex-1"
            size="lg"
            :disabled="props.voucherLoading"
          />
          <UButton
            color="primary"
            size="lg"
            :disabled="!voucherCode || props.voucherLoading"
            :loading="props.voucherLoading"
            class="cursor-pointer"
            @click="props.claimVoucher()"
          >
            Pakai
          </UButton>
        </div>

        <div
          v-if="props.voucherError"
          class="text-red-500 text-sm"
        >
          {{ props.voucherError }}
        </div>
      </div>
    </div>
  </div>
</template>
