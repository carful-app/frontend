<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()

const closeCard = () => {
  router.push({ name: 'home' })
}

const cardRouteName = ref('add-hour')

const zoneStore = useZoneStore()
const hour = computed(() => zoneStore.selectedHour)
const openHourCard = () => {
  cardRouteName.value = 'add-hour'

  router.push({ name: cardRouteName.value })
}

const parkStore = useParkingStore()
const { mutate: addTimeMutate, loading: addTimeLoading, onDone: addTimeOnDone } = parkStore.getAddTimeMutation()

addTimeOnDone(() => {
  closeCard()
})

const addTime = () => {
  addTimeMutate({
    input: {
      hours: zoneStore.getSelectedHour,
    },
  })
}
</script>

<template>
  <Card @closed="closeCard">
    <template #elements>
      <CardElement
        icon="fa-regular fa-clock"
        :main-info="Number(hour) != 0 ? hour : t('No available hours')"
        @click="openHourCard"
      />
    </template>

    <template #buttons="{ close }">
      <Button color="blue" @click="addTime" :loading="addTimeLoading" :is-disabled="Number(hour) == 0">
        {{ t('Add time') }}
      </Button>
      <Button color="blue" outline @click="close"> {{ t('Cancel') }} </Button>
    </template>

    <template #other>
      <CardContainer :card-route-name="cardRouteName" />
    </template>
  </Card>
</template>
