<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()

const closeCard = () => {
  router.push({ name: 'select' })
}

const cardRouteName = ref('')
const cardRouteParams = ref<Record<string, string>>({})

onBeforeMount(() => {
  cardRouteName.value = (router.currentRoute.value.name as string) ?? ''
  cardRouteParams.value = (router.currentRoute.value.params as Record<string, string>) ?? {}
})

const createCar = () => {
  cardRouteName.value = 'create-car'
  router.push({ name: cardRouteName.value })
}

const carStore = useCarStore()
const { mutate: setDefaultCarMutate, onDone } = carStore.getSetDefaultCarMutation()
const { mutate: deleteCarMutate } = carStore.getDeleteCarMutation()

onDone(() => {
  closeCard()
})

const makeDefault = (id: string) => {
  setDefaultCarMutate({ id })
}

const onDeleteClick = (id: string) => {
  deleteCarMutate({ input: { id } })
}

const onEditClick = (id: string) => {
  cardRouteName.value = 'edit-car'
  cardRouteParams.value = { id }
  router.push({ name: cardRouteName.value, params: cardRouteParams.value })
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
      >
        <template #swipeElements>
          <CarSwipebleElements :car-id="car.id" @delete-click="onDeleteClick" @edit-click="onEditClick" />
        </template>
      </SwipebleCardElement>
    </template>

    <template #elements>
      <CreateCardElement @click="createCar" />
    </template>

    <template #buttons="{ close }">
      <Button color="blue" outline @click="close"> {{ t('Cancel') }} </Button>
    </template>

    <template #other>
      <CardContainer :card-route-name="cardRouteName" :card-route-params="cardRouteParams" />
    </template>
  </Card>
</template>
