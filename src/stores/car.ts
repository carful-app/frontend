provideApolloClient(apolloClient)

export const useCarStore = defineStore('car', () => {
  const cars = reactive<Car[]>([])

  const getCars = () => {
    const { onResult, onError, loading } = useQuery(CARS_QUERY)

    onResult((result) => {
      if (!result.loading) {
        cars.splice(0, cars.length, ...result.data.cars)
      }
    })

    onError(() => {
      console.error('Error while fetching cars')
    })

    return loading
  }

  const getDefaultCar = computed(() => {
    return cars.find((car) => car.isDefault)
  })

  const getSetDefaultCarMutation = () => {
    const { mutate, onDone } = useMutation(SET_DEFAULT_CAR_MUTATION, {
      update: (cache, { data: { setDefaultCar } }) => {
        cache.writeQuery({
          query: CARS_QUERY,
          data: {
            cars: setDefaultCar,
          },
        })
      },
    })

    return {
      mutate,
      onDone,
    }
  }

  const getCreateCarMutation = () => {
    const { mutate, onDone } = useMutation(CREATE_CAR_MUTATION, {
      update: (cache, { data: { createCar } }) => {
        const { cars: oldCars } = cache.readQuery({ query: CARS_QUERY }) as { cars: Car[] }

        const newCars = [...oldCars, createCar]

        cache.writeQuery({
          query: CARS_QUERY,
          data: {
            cars: newCars,
          },
        })
      },
    })

    return {
      mutate,
      onDone,
    }
  }

  const getEditCarMutation = () => {
    const { mutate, onDone } = useMutation(EDIT_CAR_MUTATION)

    return {
      mutate,
      onDone,
    }
  }

  const getDeleteCarMutation = () => {
    const { mutate } = useMutation(DELETE_CAR_MUTATION, {
      update: (cache, { data: { deleteCar } }) => {
        cache.evict({ id: cache.identify(deleteCar) })
      },
    })

    return {
      mutate,
    }
  }

  return {
    cars,
    getCars,

    getDefaultCar,

    getSetDefaultCarMutation,
    getCreateCarMutation,
    getEditCarMutation,
    getDeleteCarMutation,
  }
})

const CARS_QUERY = gql`
  query getAuthUserCars {
    cars {
      id
      name
      registrationNumber
      isDefault
    }
  }
`

const SET_DEFAULT_CAR_MUTATION = gql`
  mutation setDefaultCar($id: ID!) {
    setDefaultCar(id: $id) {
      id
      name
      registrationNumber
      isDefault
    }
  }
`

const CREATE_CAR_MUTATION = gql`
  mutation createCar($input: CreateCarInput!) {
    createCar(input: $input) {
      id
      name
      registrationNumber
      isDefault
    }
  }
`

const EDIT_CAR_MUTATION = gql`
  mutation editCar($input: UpdateCarInput!) {
    updateCar(input: $input) {
      id
      name
      registrationNumber
      isDefault
    }
  }
`

const DELETE_CAR_MUTATION = gql`
  mutation deleteCar($input: DeleteCarInput!) {
    deleteCar(input: $input) {
      id
    }
  }
`

interface Car {
  id: string
  name: string
  registrationNumber: string
  isDefault: boolean
}
