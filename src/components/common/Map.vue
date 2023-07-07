<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
/// <reference types="google.maps" />
/* eslint-disable no-undef */
import { Loader } from '@googlemaps/js-api-loader'
import { Ref } from 'vue'
import type { GeoJson } from '@/stores/zone'

const { locale } = useI18n()

const zoneStore = useZoneStore()
const coords = computed(() => zoneStore.coords)
const zones = computed(() => zoneStore.getZones)

const parkingStore = useParkingStore()

const city = ref('')

const gmapsLoader = new Loader({ apiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY, libraries: ['geometry'] })

const mapDiv = ref()
const map = ref<google.maps.Map>()
const geocoder = ref() as Ref<google.maps.Geocoder>
const markerCoords = computed(() => zoneStore.markerCoords)
const centerMarker = ref() as Ref<google.maps.Marker>
const centerMarkerPosition = computed(() => centerMarker.value?.getPosition())

const mapClickHandler = (event: google.maps.MapMouseEvent) => {
  if (event.latLng) {
    setMarkerInternal(event.latLng)
  }
}

onMounted(async () => {
  await gmapsLoader.load()
  geocoder.value = new google.maps.Geocoder()
  map.value = new google.maps.Map(mapDiv.value, {
    zoom: 18,
    disableDefaultUI: true,
    clickableIcons: false,
    center: { lat: 43.214006, lng: 27.9140573 },
  })

  centerMarker.value = new google.maps.Marker({
    map: map.value,
    position: markerCoords.value,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillColor: '#fff',
      fillOpacity: 1,
      strokeColor: '#3066BE',
      strokeWeight: 10,
    },
  })

  map.value.addListener('click', mapClickHandler)
  map.value.data.addListener('click', mapClickHandler)

  map.value.data.setStyle((feature) => {
    const color = feature.getProperty('color')
    return {
      fillColor: color,
      fillOpacity: 0.4,
      strokeColor: color,
      strokeWeight: 4,
    }
  })

  if (zones.value) {
    setZone(zones.value)
  }
})

const setCenterInternal = () => {
  map.value?.setCenter({ lat: coords.value.lat, lng: coords.value.lng })
}

const setMarkerInternal = (position?: google.maps.LatLng | null) => {
  if (!position || !parkingStore.isEmptyParkCar) {
    return
  }

  centerMarker.value?.setPosition(position)
  zoneStore.setMarkerCoords(position.lat(), position.lng())

  let selectedZone = null

  map.value?.data.forEach((feature) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const polyPath = feature.getGeometry()?.getAt(0).getArray()
    const poly = new google.maps.Polygon({
      paths: polyPath,
    })

    if (google.maps.geometry.poly.containsLocation(position, poly)) {
      selectedZone = feature
    }
  })

  if (selectedZone) {
    zoneStore.setSelectedHours((selectedZone as google.maps.Data.Feature)?.getProperty('hours'))
    zoneStore.outsideZone = false
  } else {
    zoneStore.outsideZone = true
  }
}

const setCenter = () => {
  setCenterInternal()
  setMarkerInternal(new google.maps.LatLng(coords.value.lat, coords.value.lng))
}

const getCity = async () => {
  const response = await geocoder.value?.geocode({
    location: centerMarkerPosition.value,
    language: 'en',
  })
  if (response?.results) {
    let geocodeCity = response.results
      .find((result) => {
        return result.types.includes('administrative_area_level_2')
      })
      ?.address_components.find((component) => {
        return component.types.includes('administrative_area_level_2')
      })?.long_name

    if (geocodeCity) {
      if (geocodeCity.endsWith('Municipality')) {
        geocodeCity = geocodeCity.replace(' Municipality', '')
      }

      city.value = geocodeCity
    }
  }
}

const setZone = (zone: GeoJson) => {
  map.value?.data.forEach((feature) => {
    map.value?.data.remove(feature)
  })

  map.value?.data.addGeoJson(zone)
}

const isLoaded = ref(false)

const stopCoordsWatch = watch(coords, (newCoords, oldCoords) => {
  if (oldCoords.lat === 0 && oldCoords.lng === 0 && newCoords.lat !== 0 && newCoords.lng !== 0) {
    isLoaded.value = true
  }

  if (centerMarker.value && isLoaded.value) {
    setCenterInternal()
    setMarkerInternal(new google.maps.LatLng(newCoords.lat, newCoords.lng))
    stopCoordsWatch()
  }
})

watch(centerMarkerPosition, (newCenterMarkerPosition, oldCenterMarkerPosition) => {
  if (newCenterMarkerPosition !== oldCenterMarkerPosition) {
    getCity()
  }
})

watch(zones, (newZone, oldZone) => {
  if (newZone !== oldZone && newZone) {
    setZone(newZone)

    setMarkerInternal(centerMarkerPosition.value)
  }
})

watch(city, (newCity, oldCity) => {
  if (newCity !== oldCity) {
    zoneStore.fetchZones(newCity)
  }
})

watch(locale, () => {
  setMarkerInternal(centerMarkerPosition.value)
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
