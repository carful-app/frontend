<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader'
import { Ref } from 'vue'

const zoneStore = useZoneStore()
const coords = computed(() => zoneStore.coords)
const zones = computed(() => zoneStore.getZones)

const city = ref('')

const gmapsLoader = new Loader({ apiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY })

const mapDiv = ref()
// eslint-disable-next-line no-undef
const map = ref<google.maps.Map>()
// eslint-disable-next-line no-undef
const geocoder = ref() as Ref<google.maps.Geocoder>

onBeforeMount(async () => {
  await gmapsLoader.load()

  // eslint-disable-next-line no-undef
  geocoder.value = new google.maps.Geocoder()
})

onMounted(async () => {
  await gmapsLoader.load()
  // eslint-disable-next-line no-undef
  map.value = new google.maps.Map(mapDiv.value, {
    zoom: 18,
    disableDefaultUI: true,
  })

  map.value.data.setStyle((feature) => {
    const color = feature.getProperty('color')
    return {
      fillColor: color,
      fillOpacity: 0.4,
      strokeColor: color,
      strokeWeight: 4,
    }
  })
})

const setCenter = () => {
  map.value?.setCenter({ lat: coords.value.lat, lng: coords.value.lng })
}

const getCity = async () => {
  const response = await geocoder.value?.geocode({
    location: { lat: coords.value.lat, lng: coords.value.lng },
  })
  if (response?.results) {
    const geocodeCity = response.results
      .find((result) => {
        return result.types.includes('administrative_area_level_1')
      })
      ?.address_components.find((component) => {
        return component.types.includes('administrative_area_level_1')
      })?.long_name

    if (geocodeCity) {
      city.value = geocodeCity
    }
  }
}

watchEffect(() => {
  setCenter()
  getCity()
})

watchEffect(() => {
  if (zones.value) {
    map.value?.data.forEach((feature) => {
      map.value?.data.remove(feature)
    })

    map.value?.data.addGeoJson(zones.value)
  }
})

watch(city, (newCity, oldCity) => {
  if (newCity !== oldCity) {
    zoneStore.fetchZones(newCity)
  }
})
</script>

<template>
  <div class="w-100 h-100 d-grid">
    <div ref="mapDiv" class="w-100 h-100"></div>

    <router-view @setCenter="setCenter" />
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
