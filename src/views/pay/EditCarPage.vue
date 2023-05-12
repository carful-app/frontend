<script setup lang="ts">
const { t } = useI18n()
const carStore = useCarStore()
const router = useRouter()

const id = ref(router.currentRoute.value.params.id)

const closeCard = () => {
  router.push({ name: 'select-car' })
}

const car = computed(() => {
  return carStore.cars.find((car) => car.id === id.value)
})

const name = ref(car.value?.name ?? '')
const registrationNumber = ref(car.value?.registrationNumber ?? '')

const { mutate: editCarMutation, onDone } = carStore.getEditCarMutation()

onDone(() => {
  closeCard()
})

const editCar = () => {
  editCarMutation({
    input: {
      id: id.value,
      name: name.value,
      registrationNumber: registrationNumber.value,
    },
  })
}
</script>

<template>
  <Card @closed="closeCard">
    <template #elements>
      <Input type="text" v-model="name" :placeholder="t('Name')">
        <template #iconLeft>
          <font-awesome-icon icon="fa-solid fa-car" />
        </template>
      </Input>
      <Input type="text" v-model="registrationNumber" :placeholder="t('Registration number')">
        <template #iconLeft>
          <font-awesome-icon icon="fa-solid fa-hashtag" />
        </template>
      </Input>
    </template>

    <template #buttons="{ close }">
      <Button color="blue" @click="editCar"> {{ t('Save') }} </Button>
      <Button color="blue" outline @click="close"> {{ t('Cancel') }} </Button>
    </template>
  </Card>
</template>
