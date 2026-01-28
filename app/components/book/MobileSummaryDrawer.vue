<script lang="ts" setup>
import type { IDetailBook } from '~~/shared/interface/IDetailBook'
import type { IVoucher } from '~~/shared/interface/IVoucher'

type SelectedPackage = {
  packageUid: string
  quantity: number
}

type SelectedExtraPackage = {
  packageUid: string
  selectedGuestIndexes: number[]
}

type BookingStepSnapshot = {
  currentStep: number
  selectedPackages: SelectedPackage[]
  selectedExtraPackages: SelectedExtraPackage[]
  selectedPaymentMethod?: { name: string, fee?: number }
}

const props = defineProps<{
  booking: IDetailBook
  bookingStep: BookingStepSnapshot
  appliedVoucher: IVoucher | null
  formatCurrency: (value: number) => string
  totalAmountAfterDiscount: number
  finalPaymentAmount: number
  fullPayment: boolean
  canProceed: boolean
  bookingLoading: boolean
  nextStep: () => void
  confirmBooking: () => void
}>()

const open = defineModel<boolean>('open', { default: false })

// Calculate total guests (excluding additional fee packages)
const totalGuestCount = computed(() => {
  if (!props.booking.package) return 1

  const total = props.bookingStep.selectedPackages.reduce(
    (sum, selection) => {
      const pkg = props.booking.package?.find(
        p => p.uid === selection.packageUid
      )
      if (pkg && !pkg.additionalFee) {
        return sum + selection.quantity
      }
      return sum
    },
    0
  )

  return Math.max(1, total)
})

// Only show strikethrough when Full Payment is selected AND on step 4
const showStrikeThrough = computed(
  () =>
    props.bookingStep.currentStep === 4
    && props.fullPayment
    && Boolean(props.appliedVoucher?.isApplied)
)

// Calculate original total before discount for strikethrough display
const originalTotal = computed(() => {
  let total = props.bookingStep.selectedPackages.reduce((sum, selection) => {
    const pkg = props.booking.package?.find(
      p => p.uid === selection.packageUid
    )
    if (pkg) {
      return sum + pkg.price * selection.quantity
    }
    return sum
  }, 0)

  // Add extra packages
  props.bookingStep.selectedExtraPackages.forEach((selection) => {
    const pkg = props.booking.extraPackage?.find(
      p => p.uid === selection.packageUid
    )
    if (pkg) {
      total += pkg.price * selection.selectedGuestIndexes.length
    }
  })

  // Add payment method fee if applicable
  if (props.bookingStep.selectedPaymentMethod?.fee) {
    total += props.bookingStep.selectedPaymentMethod.fee
  }

  return total
})

const displayedTotal = computed(() => {
  if (props.bookingStep.currentStep === 4) {
    // On step 4, show different totals based on payment mode
    if (props.fullPayment) {
      return props.totalAmountAfterDiscount
    } else {
      // Down Payment: multiply downPayment by totalGuestCount and add service fee
      const dpBase = props.booking?.downPayment || 0
      const guestCount = totalGuestCount.value
      let dpAmount = dpBase * guestCount

      // Add service fee if payment method is selected
      if (props.bookingStep.selectedPaymentMethod?.fee) {
        dpAmount += props.bookingStep.selectedPaymentMethod.fee
      }

      return dpAmount > 0 ? dpAmount : 0
    }
  }
  return props.totalAmountAfterDiscount
})

const displayLabel = computed(() => {
  if (props.bookingStep.currentStep === 4) {
    return props.fullPayment ? 'Total Biaya' : 'Down Payment'
  }
  return 'Total Biaya'
})

// Calculate Full Payment amount for reference when Down Payment is selected
const fullPaymentAmount = computed(() => props.totalAmountAfterDiscount)
</script>

<template>
  <div
    class="fixed bottom-0 w-full p-5 z-10 bg-white border-t border-gray-200 shadow-lg"
  >
    <div>
      <div
        class="flex items-center gap-1"
        @click="open = !open"
      >
        <h5 class="text-sm font-bold text-gray-500">
          {{ displayLabel }}
        </h5>
        <UIcon
          name="i-heroicons-chevron-up"
          class="size-5"
        />
      </div>
      <p
        v-if="showStrikeThrough"
        class="font-bold text-lg line-through"
      >
        {{ props.formatCurrency(originalTotal) }}
      </p>
      <div class="flex justify-between">
        <p
          class="font-bold text-2xl"
          @click="open = !open"
        >
          {{ props.formatCurrency(displayedTotal || 0) }}
        </p>

        <UButton
          v-if="props.bookingStep.currentStep < 4"
          :disabled="!props.canProceed"
          @click="props.nextStep()"
        >
          Lanjutkan
        </UButton>
        <UButton
          v-else
          :disabled="!props.canProceed || props.bookingLoading"
          :loading="props.bookingLoading"
          @click="props.confirmBooking()"
        >
          {{
            props.bookingLoading
              ? "Processing..."
              : "Selesaikan Booking"
          }}
        </UButton>
      </div>
    </div>

    <UDrawer
      v-model:open="open"
      class="z-50"
      title="Rincian Biaya"
      :ui="{
        overlay: 'bg-black/20',
        content: 'rounded-t-3xl',
        title: 'text-xl font-black'
      }"
    >
      <template #body>
        <div class="rounded-lg">
          <div
            v-if="props.bookingStep.selectedPackages.length"
            class="space-y-2"
          >
            <h5 class="text-xl font-black text-black">
              Paket
              <span v-if="props.bookingStep.currentStep === 4">
                ({{
                  props.fullPayment
                    ? "Full Payment"
                    : "Down Payment"
                }})
              </span>
            </h5>
            <div
              v-for="selection in props.bookingStep
                .selectedPackages"
              :key="selection.packageUid"
              class="space-y-1"
            >
              <div class="flex justify-between">
                <span>{{
                  props.booking.package?.find(
                    (p) => p.uid === selection.packageUid
                  )?.name
                }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>{{ selection.quantity }} x Orang</span>
                <span class="font-bold text-black">
                  {{
                    props.formatCurrency(
                      (props.booking.package?.find(
                        (p) =>
                          p.uid
                          === selection.packageUid
                      )?.price || 0) * selection.quantity
                    )
                  }}
                </span>
              </div>
            </div>
          </div>

          <div
            v-if="props.bookingStep.selectedExtraPackages.length"
            class="mt-2 space-y-2"
          >
            <h5 class="text-xl font-black text-black">
              Layanan Extra
            </h5>
            <div
              v-for="selection in props.bookingStep
                .selectedExtraPackages"
              :key="selection.packageUid"
              class="flex justify-between"
            >
              <span>
                {{
                  props.booking.extraPackage?.find(
                    (p) => p.uid === selection.packageUid
                  )?.name
                }}
                ({{ selection.selectedGuestIndexes.length }}x)
              </span>
              <span class="font-bold text-black">
                {{
                  props.formatCurrency(
                    (props.booking.extraPackage?.find(
                      (p) =>
                        p.uid === selection.packageUid
                    )?.price || 0)
                      * selection.selectedGuestIndexes
                        .length
                  )
                }}
              </span>
            </div>
          </div>

          <div
            v-if="props.appliedVoucher?.isApplied"
            class="mt-2"
          >
            <h5 class="text-xl font-black text-black">
              Diskon
            </h5>
            <div class="flex justify-between">
              <span class="text-green-600">Voucher ({{ props.appliedVoucher.code }})</span>
              <span class="font-bold text-green-600">
                -{{
                  props.formatCurrency(
                    props.appliedVoucher.discount
                      * totalGuestCount
                  )
                }}
              </span>
            </div>
          </div>

          <!-- Show Full Payment amount when Down Payment is selected -->
          <div
            v-if="
              props.bookingStep.currentStep === 4
                && !props.fullPayment
                && props.appliedVoucher?.isApplied
            "
            class="mt-2 pt-2 border-t"
          >
            <h5 class="text-xl font-black text-black">
              Full Payment
            </h5>
            <div class="flex justify-between">
              <span>Harga Total</span>
              <span class="font-bold text-black">{{
                props.formatCurrency(fullPaymentAmount)
              }}</span>
            </div>
          </div>

          <div
            v-if="props.bookingStep.selectedPaymentMethod?.fee"
            class="mt-2"
          >
            <h5 class="text-xl font-black text-black">
              Service Fee
            </h5>
            <div class="flex justify-between">
              <span>{{
                props.bookingStep.selectedPaymentMethod.name
              }}</span>
              <span class="font-bold text-black">
                {{
                  props.formatCurrency(
                    props.bookingStep.selectedPaymentMethod
                      .fee
                  )
                }}
              </span>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div>
          <div
            class="flex items-center gap-1"
            @click="open = !open"
          >
            <h5 class="text-sm font-bold text-gray-500">
              {{ displayLabel }}
            </h5>
            <UIcon
              name="i-heroicons-chevron-down"
              class="size-5"
            />
          </div>
          <p
            v-if="showStrikeThrough"
            class="font-bold text-lg line-through"
          >
            {{ props.formatCurrency(originalTotal) }}
          </p>
          <div class="flex justify-between">
            <p
              class="font-bold text-2xl"
              @click="open = !open"
            >
              {{ props.formatCurrency(displayedTotal || 0) }}
            </p>

            <UButton
              v-if="props.bookingStep.currentStep < 4"
              :disabled="!props.canProceed"
              @click="props.nextStep()"
            >
              Lanjutkan
            </UButton>
            <UButton
              v-else
              :disabled="
                !props.canProceed || props.bookingLoading
              "
              :loading="props.bookingLoading"
              @click="props.confirmBooking()"
            >
              {{
                props.bookingLoading
                  ? "Processing..."
                  : "Selesaikan Booking"
              }}
            </UButton>
          </div>
        </div>
      </template>
    </UDrawer>
  </div>
</template>
