provideApolloClient(apolloClient)

export const useParking = defineStore('parking', () => {
  const parkCar = reactive<ParkCar>({
    id: '',
    carId: 0,
    latitude: 0,
    longitude: 0,
    startTime: new Date(),
    endTime: new Date(),
  })

  const getParkCarMutation = () => {
    const { mutate, onDone, onError, loading } = useMutation(PARK_CAR_MUTATION)

    onError((error) => {
      console.log(error)
    })

    return {
      mutate,
      loading,
      onDone,
    }
  }

  const setParkCar = (
    id: string,
    carId: number,
    latitude: number,
    longitude: number,
    startTime: Date,
    endTime: Date
  ) => {
    parkCar.id = id
    parkCar.carId = carId
    parkCar.latitude = latitude
    parkCar.longitude = longitude
    parkCar.startTime = startTime
    parkCar.endTime = endTime
  }

  return {
    parkCar,
    setParkCar,

    getParkCarMutation,
  }
})

const PARK_CAR_MUTATION = gql`
  mutation ParkCarMutation($input: ParkCarInput!) {
    parkCar(input: $input) {
      id
      car {
        id
      }
      latitude
      longitude
      startTime
      endTime
    }
  }
`

type ParkCar = {
  id: string
  carId: number
  latitude: number
  longitude: number
  startTime: Date
  endTime: Date
}
