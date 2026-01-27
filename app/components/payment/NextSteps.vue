<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'success' | 'warning'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary'
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'success':
      return {
        container: 'bg-green-50 rounded-2xl p-6 border border-green-100',
        title: 'text-lg font-semibold text-green-800 mb-3 flex items-center',
        titleIcon: 'w-6 h-6 mr-2',
        list: 'text-green-700 space-y-3 text-left text-sm'
      }
    case 'warning':
      return {
        container: 'bg-yellow-50 rounded-2xl p-6 border border-yellow-100',
        title: 'text-lg font-semibold text-yellow-800 mb-3 flex items-center',
        titleIcon: 'w-6 h-6 mr-2',
        list: 'text-yellow-700 space-y-3 text-left text-sm'
      }
    default:
      return {
        container: 'bg-primary-50 rounded-2xl p-6 border border-primary-100',
        title: 'text-lg font-semibold text-primary mb-3 flex items-center',
        titleIcon: 'w-6 h-6 mr-2',
        list: 'text-primary space-y-3 text-left text-sm'
      }
  }
})

const steps = [
  'Cek <i>email</i> Anda untuk detail pembayaran lengkap',
  'Simpan <i>invoice number</i> untuk referensi',
  'Selesaikan pembayaran sesuai instruksi di <i>email</i>',
  'Pembayaran akan dikonfirmasi otomatis'
]
</script>

<template>
  <div :class="variantClasses.container">
    <h3 :class="variantClasses.title">
      <svg
        :class="variantClasses.titleIcon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Langkah Selanjutnya
    </h3>
    <ul :class="variantClasses.list">
      <li
        v-for="(step, index) in steps"
        :key="index"
        class="flex items-start gap-3"
      >
        <span class="font-bold shrink-0">{{ index + 1 }}.</span>
        <span v-html="step" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
:deep(i) {
  font-style: italic;
}
</style>
