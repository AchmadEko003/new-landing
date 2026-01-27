<template>
  <div
    id="map"
    class="w-full h-full min-h-100"
  />
</template>

<script setup lang="ts">
import type { Marker, Map } from 'leaflet'

interface Props {
  latitude?: number
  longitude?: number
  zoom?: number
  markerTitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  latitude: -6.1875444,
  longitude: 106.7332636,
  zoom: 16,
  markerTitle: 'Peponi Travel'
})

let map: Map | null = null
const marker = ref<Marker | null>(null)

onMounted(async () => {
  if (import.meta.client) {
    const L = await import('leaflet')
    await import('leaflet/dist/leaflet.css')

    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })

    L.Marker.prototype.options.icon = DefaultIcon

    map = L.map('map').setView([props.latitude, props.longitude], props.zoom)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    marker.value = L.marker([props.latitude, props.longitude])
      .addTo(map)
      .bindPopup(`
        <div class="text-center">
          <h3 class="font-bold text-lg mb-2">${props.markerTitle}</h3>
          <p class="text-sm">Sentra Niaga Puri Indah blok T2-28,<br/>
          Kembangan, Jakarta Barat</p>
        </div>
      `)
      .openPopup()
  }
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style>
#map {
  z-index: 0;
}

.leaflet-popup-content {
  margin: 12px;
}

.leaflet-popup-content-wrapper {
  border-radius: 8px;
}
</style>
