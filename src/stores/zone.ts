provideApolloClient(apolloClient)

export const useZoneStore = defineStore('zone', () => {
  const { coords: rawCooords } = useGeolocation({ enableHighAccuracy: true })

  const coords = computed((): { lat: number; lng: number } => {
    let lat, lng

    if (rawCooords.value.latitude >= 0 && rawCooords.value.latitude < Infinity) {
      lat = rawCooords.value.latitude
    } else {
      lat = 0
    }

    if (rawCooords.value.longitude >= 0 && rawCooords.value.longitude < Infinity) {
      lng = rawCooords.value.longitude
    } else {
      lng = 0
    }

    return { lat, lng }
  })

  const zones = reactive<Zone[]>([])

  const getZones = computed(() => {
    if (zones.length == 0) return null

    const geoJson: GeoJson = {
      type: 'FeatureCollection',
      features: [],
    }

    zones.forEach((city) => {
      city.zones.forEach((zone) => {
        const color = zone.type == 'blue' ? '#3066be' : '#ff0000'
        geoJson.features.push({
          type: 'Feature',
          properties: {
            color,
          },
          geometry: {
            type: 'Polygon',
            coordinates: zone.coordinates,
          },
        })
      })
    })

    return geoJson
  })

  const fetchZones = (city: string) => {
    if (zones.filter((z) => z.city == city).length > 0) return

    const { onResult: citiesOnResult, onError: citiesOnError } = useQuery(CITY_QUERY, {
      slug: city,
    })

    const { onResult: zonesOnResult, onError: zonesOnError, load, variables } = useLazyQuery(ZONES_QUERY)

    citiesOnResult(({ data }) => {
      if (!data?.city) return

      variables.value = {
        cityId: data.city.id,
      }

      load()
    })

    citiesOnError((error) => {
      console.log(error)
    })

    zonesOnResult(({ data }) => {
      if (!data?.zones) return

      zones.push({
        city,
        zones: data.zones.map((zone: { zoneType: { slug: string }; coordsArray: number[] }) => {
          return {
            type: zone.zoneType.slug,
            coordinates: [zone.coordsArray],
          }
        }),
      })
    })

    zonesOnError((error) => {
      console.log(error)
    })
  }

  return {
    zones,
    coords,

    getZones,

    fetchZones,
  }
})

type Zone = {
  city: string
  zones: {
    type: string
    coordinates: number[][]
  }[]
}

const ZONES_QUERY = gql`
  query Zones($cityId: ID!) {
    zones(city_id: $cityId) {
      zoneType {
        slug
      }
      coordsArray
    }
  }
`

const CITY_QUERY = gql`
  query City($slug: String!) {
    city(slug: $slug) {
      id
    }
  }
`

type GeoJson = {
  type: string
  features: GeoJsonFeature[]
}

type GeoJsonFeature = {
  type: string
  properties: {
    color: string
  }
  geometry: {
    type: string
    coordinates: number[][]
  }
}