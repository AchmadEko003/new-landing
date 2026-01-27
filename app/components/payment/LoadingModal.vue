<script lang="ts" setup>
interface Props {
  isOpen: boolean
  invoiceId?: string
  redirectUrl?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  redirect: []
}>()

const redirecting = ref(false)

const handleRedirect = () => {
  if (props.redirectUrl) {
    redirecting.value = true
    // Open redirect URL in new tab
    window.open(props.redirectUrl, '_blank')
    emit('redirect')
  }
}
</script>

<template>
  <!-- Modal Backdrop - Not closeable -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
  >
    <!-- Modal -->
    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
      <!-- Icon -->
      <div class="flex justify-center mb-6">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            class="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <!-- Title -->
      <h2 class="text-2xl font-bold text-center text-gray-900 mb-2">
        Pembayaran Terdeteksi
      </h2>

      <!-- Message -->
      <p class="text-center text-gray-600 mb-6">
        Silakan selesaikan pembayaran di halaman yang baru dibuka untuk melanjutkan proses pemesanan Anda.
      </p>

      <!-- Invoice Info -->
      <div
        v-if="invoiceId"
        class="bg-gray-50 rounded-lg p-4 mb-6"
      >
        <p class="text-sm text-gray-600 mb-1">
          Invoice ID
        </p>
        <p class="text-lg font-semibold text-gray-900 font-mono">
          {{ invoiceId }}
        </p>
      </div>

      <!-- Info Box -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p class="text-sm text-blue-800">
          <strong>ℹ️ Penting:</strong> Jangan tutup halaman ini sampai Anda menyelesaikan verifikasi pembayaran di tab yang baru dibuka.
        </p>
      </div>

      <!-- Loading Indicator -->
      <div class="flex justify-center items-center gap-2 mb-6">
        <div class="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <p class="text-sm text-gray-600">
          Menunggu konfirmasi pembayaran...
        </p>
      </div>

      <!-- Button -->
      <button
        :disabled="redirecting"
        class="w-full bg-primary hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        @click="handleRedirect"
      >
        <span v-if="!redirecting">Lanjutkan ke Pembayaran</span>
        <span
          v-else
          class="flex items-center justify-center gap-2"
        >
          <svg
            class="w-4 h-4 animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Mengarahkan...
        </span>
      </button>
    </div>
  </div>
</template>
