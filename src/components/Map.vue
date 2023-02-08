<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader'

const { coords, error } = useGeolocation({ enableHighAccuracy: true })

const gmapsLoader = new Loader({ apiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY })

const mapDiv = ref()
// eslint-disable-next-line no-undef
const map = ref<google.maps.Map>()

onMounted(async () => {
  await gmapsLoader.load()
  // eslint-disable-next-line no-undef
  map.value = new google.maps.Map(mapDiv.value, {
    zoom: 15,
  })
})

watchEffect(() => {
  console.log('coords', coords.value)
  let lat, lng

  if (coords.value.latitude >= 0 && coords.value.latitude <= Infinity) {
    lat = coords.value.latitude
  } else {
    lat = 0
  }

  if (coords.value.longitude >= 0 && coords.value.longitude <= Infinity) {
    lng = coords.value.longitude
  } else {
    lng = 0
  }

  map.value?.setCenter({ lat, lng })
})
</script>

<template>
  <div>
    <div ref="mapDiv" style="widht: 100%; height: 80vh"></div>
  </div>
</template>
