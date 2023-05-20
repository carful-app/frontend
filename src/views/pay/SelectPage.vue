<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()

const closeCard = () => {
  router.push({ name: 'home' })
}

const cardRouteName = ref('')

const openCarCard = () => {
  cardRouteName.value = 'select-car'

  router.push({ name: cardRouteName.value })
}

const carStore = useCarStore()
let isCarLoading = ref(true)

const zoneStore = useZoneStore()
const hour = computed(() => zoneStore.selectedHour)
const openHourCard = () => {
  cardRouteName.value = 'select-hour'

  router.push({ name: cardRouteName.value })
}

onBeforeMount(() => {
  isCarLoading = carStore.getCars()
})

const parkStore = useParkingStore()
const { mutate: parkCarMutate, loading: parkCarLoading, onDone: parkCarOnDone } = parkStore.getParkCarMutation()

parkCarOnDone(() => {
  closeCard()
})

const { lat, lng } = zoneStore.coords

const parkCar = () => {
  parkCarMutate({
    input: {
      carId: carStore.getDefaultCar?.id,
      hours: zoneStore.getSelectedHour,
      latitude: lat,
      longitude: lng,
    },
  })
}
</script>

<template>
  <Card @closed="closeCard">
    <template #elements>
      <CardElement
        icon="fa-solid fa-car"
        :main-info="carStore.getDefaultCar?.name || t('No car')"
        :sub-info="carStore.getDefaultCar?.registrationNumber || ''"
        :is-loading="isCarLoading"
        @click="openCarCard"
      />
      <CardElement icon="fa-regular fa-clock" :main-info="hour" @click="openHourCard" />
    </template>

    <template #buttons="{ close }">
      <Button color="blue" @click="parkCar" :loading="parkCarLoading"> {{ t('Pay') }} </Button>
      <Button color="blue" outline @click="close"> {{ t('Cancel') }} </Button>
    </template>

    <template #other>
      <CardContainer :card-route-name="cardRouteName" />
    </template>
  </Card>
</template>
