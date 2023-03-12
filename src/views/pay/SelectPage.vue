<script setup lang="ts">
import { useCarStore } from '@/stores/car'

const router = useRouter()

const closeCard = () => {
  router.push({ name: 'home' })
}

const carRouteName = 'select-car'
const openCarCard = () => {
  router.push({ name: carRouteName })
}

const carStore = useCarStore()
let isCarLoading = ref(true)

onBeforeMount(() => {
  isCarLoading = carStore.getCars()
})
</script>

<template>
  <Card @closed="closeCard">
    <template #elements>
      <CardElement
        icon="fa-solid fa-car"
        :main-info="carStore.getDefaultCar?.name || ''"
        :sub-info="carStore.getDefaultCar?.registrationNumber || ''"
        :is-loading="isCarLoading"
        @click="openCarCard"
      />
      <CardElement icon="fa-regular fa-clock" main-info="1 hour" sub-info="CA1233AS" />
      <CardElement icon="fa-regular fa-credit-card" main-info="****4242" />
    </template>

    <template #buttons="{ close }">
      <Button color="blue"> Pay </Button>
      <Button color="blue" outline @click="close"> Cancel </Button>
    </template>

    <template #other>
      <CardContainer :card-route-name="carRouteName" />
    </template>
  </Card>
</template>
