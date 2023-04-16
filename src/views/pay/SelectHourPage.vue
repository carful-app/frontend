<script setup lang="ts">
const router = useRouter()

const closeCard = () => {
  router.push({ name: 'select' })
}

const zoneStore = useZoneStore()
const hours = computed(() => zoneStore.selectedHours)

const selectHour = (hour: string) => {
  zoneStore.selectedHour = hour
  closeCard()
}
</script>

<template>
  <Card @closed="closeCard">
    <template #scrollElements>
      <CardElement
        v-for="(hour, index) in hours"
        :key="index"
        icon="fa-regular fa-clock"
        :main-info="hour"
        @click="selectHour(hour)"
        arrow-hidden
      />
    </template>

    <template #buttons="{ close }">
      <Button color="blue" outline @click="close"> Cancel </Button>
    </template>
  </Card>
</template>
