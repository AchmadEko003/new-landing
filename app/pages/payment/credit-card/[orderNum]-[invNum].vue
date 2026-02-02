<script setup lang="ts">
const route = useRoute()
const broadcast = new BroadcastChannel('payment_status')

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
