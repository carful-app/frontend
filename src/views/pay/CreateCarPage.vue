<script setup lang="ts">
const router = useRouter()

const closeCard = () => {
  router.push({ name: 'select-car' })
}

const name = ref('')
const registrationNumber = ref('')

const carStore = useCarStore()
const { mutate: createCarMutation, onDone } = carStore.getCreateCarMutation()

onDone(() => {
  closeCard()
})

const createCar = () => {
  createCarMutation({
    input: {
      name: name.value,
      registrationNumber: registrationNumber.value,
    },
  })
}
</script>

<template>
  <Card @closed="closeCard">
    <template #elements>
      <Input type="text" v-model="name" placeholder="Name">
        <template #iconLeft>
          <font-awesome-icon icon="fa-solid fa-car" />
        </template>
      </Input>
      <Input type="text" v-model="registrationNumber" placeholder="Registration number">
        <template #iconLeft>
          <font-awesome-icon icon="fa-solid fa-hashtag" />
        </template>
      </Input>
    </template>

    <template #buttons="{ close }">
      <Button color="blue" @click="createCar"> Create car </Button>
      <Button color="blue" outline @click="close"> Cancel </Button>
    </template>
  </Card>
</template>
