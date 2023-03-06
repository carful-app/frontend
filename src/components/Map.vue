<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader'

const { coords: rawCooords, error } = useGeolocation({ enableHighAccuracy: true })

const gmapsLoader = new Loader({ apiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY })

const mapDiv = ref()
// eslint-disable-next-line no-undef
const map = ref<google.maps.Map>()

onMounted(async () => {
  await gmapsLoader.load()
  // eslint-disable-next-line no-undef
  map.value = new google.maps.Map(mapDiv.value, {
    zoom: 15,
    disableDefaultUI: true,
  })
})

const coords = computed((): { lat: number; lng: number } => {
  let lat, lng

  if (rawCooords.value.latitude >= 0 && rawCooords.value.latitude <= Infinity) {
    lat = rawCooords.value.latitude
  } else {
    lat = 0
  }

  if (rawCooords.value.longitude >= 0 && rawCooords.value.longitude <= Infinity) {
    lng = rawCooords.value.longitude
  } else {
    lng = 0
  }

  return { lat, lng }
})

const setCenter = () => {
  map.value?.setCenter({ lat: coords.value.lat, lng: coords.value.lng })
}

watchEffect(() => {
  setCenter()
})
</script>

<template>
  <div class="w-100 h-100 d-grid">
    <div ref="mapDiv" class="w-100 h-100"></div>

    <PayButton @setCenter="setCenter" />
  </div>
</template>

<style lang="sass">
@import '@/assets/styles/variables.sass'

a[href^="http://maps.google.com/maps"],
a[href^="https://maps.google.com/maps"]
  display: none !important

.gmnoprint a,
.gmnoprint span,
.gm-style-cc
  display: none

.gmnoprint div
  background: none !important
</style>
