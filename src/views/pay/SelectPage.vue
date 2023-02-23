<script setup lang="ts">
const router = useRouter()

const closeCard = () => {
  router.back()
}
</script>

<template>
  <Card @close="closeCard">
    <template #elements>
      <CardElement icon="fa-solid fa-car" main-info="Car 1" sub-info="CA1233AS" />
      <CardElement icon="fa-regular fa-clock" main-info="1 hour" sub-info="CA1233AS" />
      <CardElement icon="fa-regular fa-credit-card" main-info="****4242" />
    </template>

    <template #buttons="{ close }">
      <Button color="blue"> Pay </Button>
      <Button color="blue" outline @click="close"> Cancel </Button>
    </template>
  </Card>
</template>
