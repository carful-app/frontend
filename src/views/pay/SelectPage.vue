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
      <Button color="blue"> Pay </Button>
      <Button color="blue" outline @click="close"> {{ t('Cancel') }} </Button>
    </template>

    <template #other>
      <CardContainer :card-route-name="cardRouteName" />
    </template>
  </Card>
</template>
