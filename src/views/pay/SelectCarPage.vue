<script setup lang="ts">
const router = useRouter()

const closeCard = () => {
  router.push({ name: 'select' })
}

const createCarRouteName = 'create-car'
const createCar = () => {
  router.push({ name: createCarRouteName })
}

const carStore = useCarStore()
const { mutate: setDefaultCarMutate, onDone } = carStore.getSetDefaultCarMutation()

onDone(() => {
  closeCard()
})

const makeDefault = (id: number) => {
  setDefaultCarMutate({ id })
}
</script>

<template>
  <Card @closed="closeCard">
    <template #scrollElements>
      <SwipebleCardElement
        v-for="car in carStore.cars"
        :key="car.id"
        icon="fa-solid fa-car"
        :main-info="car.name"
        :sub-info="car.registrationNumber"
        @click="makeDefault(car.id)"
      />
    </template>

    <template #elements>
      <CreateCardElement @click="createCar" />
    </template>

    <template #buttons="{ close }">
      <Button color="blue" outline @click="close"> Cancel </Button>
    </template>

    <template #other>
      <CardContainer :card-route-name="createCarRouteName" />
    </template>
  </Card>
</template>
