<script setup lang="ts">
const route = useRoute()
const broadcast = new BroadcastChannel('payment_status')

useSeoMeta({
  title: 'Pembayaran Kartu Kredit - Peponi',
  description: 'Selesaikan pembayaran kartu kredit untuk booking trip Anda bersama Peponi Travel.',
  ogTitle: 'Pembayaran Kartu Kredit - Peponi',
  ogDescription: 'Selesaikan pembayaran kartu kredit untuk booking trip Anda bersama Peponi Travel.',
  twitterCard: 'summary',
  twitterTitle: 'Pembayaran Kartu Kredit - Peponi',
  twitterDescription: 'Selesaikan pembayaran kartu kredit untuk booking trip Anda bersama Peponi Travel.'
})

onMounted(() => {
  const status = route.query.status

  broadcast.postMessage({ status })
})
</script>

<template>
  <div>
    Loading
  </div>
</template>
