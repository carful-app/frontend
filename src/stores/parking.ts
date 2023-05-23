provideApolloClient(apolloClient)

export const useParkingStore = defineStore('parking', () => {
  const toastStore = useToastStore()

  const emptyState = {
    id: '',
    car: {
      id: '',
      name: '',
      registrationNumber: '',
    },
    latitude: 0,
    longitude: 0,
    startTime: null,
    endTime: null,
  }

  const parkCar = ref<ParkCar>({ ...emptyState })

  const isEmptyParkCar = computed(
    () =>
      parkCar.value.id === emptyState.id &&
      parkCar.value.car.id === emptyState.car.id &&
      parkCar.value.car.name === emptyState.car.name &&
      parkCar.value.car.registrationNumber === emptyState.car.registrationNumber &&
      parkCar.value.latitude === emptyState.latitude &&
      parkCar.value.longitude === emptyState.longitude &&
      parkCar.value.startTime === emptyState.startTime &&
      parkCar.value.endTime === emptyState.endTime
  )

  const clearParkCar = () => {
    parkCar.value = emptyState
  }

  const getLastParkCar = () => {
    const { onResult, onError } = useQuery(LAST_PARK_CAR_QUERY)

    onResult((result) => {
      if (!result.loading) {
        const { lastParkCar } = result.data

        if (lastParkCar) {
          setParkCar(
            lastParkCar.id,
            lastParkCar.car,
            lastParkCar.latitude,
            lastParkCar.longitude,
            new Date(lastParkCar.startTime),
            new Date(lastParkCar.endTime)
          )
        }
      }
    })

    onError(() => {
      toastStore.addErrorToast(i18n.global.t('Error while fetching last park car'))
    })
  }

  const getParkCarMutation = () => {
    const { mutate, onDone, onError, loading } = useMutation(PARK_CAR_MUTATION, {
      update: (cache, { data: { parkCar } }) => {
        cache.writeQuery({
          query: LAST_PARK_CAR_QUERY,
          data: {
            lastParkCar: parkCar,
          },
        })
      },
    })

    onError(({ message, graphQLErrors }) => {
      toastStore.handleErrors(message, graphQLErrors)
    })

    return {
      mutate,
      loading,
      onDone,
    }
  }

  const setParkCar = (id: string, car: Car, latitude: number, longitude: number, startTime: Date, endTime: Date) => {
    parkCar.value.id = id
    parkCar.value.car = car
    parkCar.value.latitude = latitude
    parkCar.value.longitude = longitude
    parkCar.value.startTime = startTime
    parkCar.value.endTime = endTime
  }

  return {
    parkCar,
    isEmptyParkCar,
    clearParkCar,

    getLastParkCar,

    setParkCar,
    getParkCarMutation,
  }
})

const LAST_PARK_CAR_QUERY = gql`
  query LastParkCarQuery {
    lastParkCar {
      id
      car {
        id
        name
        registrationNumber
      }
      latitude
      longitude
      startTime
      endTime
    }
  }
`

const PARK_CAR_MUTATION = gql`
  mutation ParkCarMutation($input: ParkCarInput!) {
    parkCar(input: $input) {
      id
      car {
        id
        name
        registrationNumber
      }
      latitude
      longitude
      startTime
      endTime
    }
  }
`
type Car = { id: string; name: string; registrationNumber: string }

type ParkCar = {
  id: string
  car: Car
  latitude: number
  longitude: number
  startTime: Date | null
  endTime: Date | null
}
