<script setup lang="ts">
const router = useRouter()

const closeCard = () => {
  router.push({ name: 'select' })
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
    <template #elements>
      <SwipebleCardElement
        v-for="car in carStore.cars"
        :key="car.id"
        icon="fa-solid fa-car"
        :main-info="car.name"
        :sub-info="car.registrationNumber"
        @click="makeDefault(car.id)"
      />

      <CreateCardElement />
    </template>

    <template #buttons="{ close }">
      <Button color="blue" outline @click="close"> Cancel </Button>
    </template>
  </Card>
</template>
