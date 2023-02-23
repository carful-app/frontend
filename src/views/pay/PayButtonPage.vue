<script setup lang="ts">
const emit = defineEmits(['setCenter'])

const router = useRouter()

const select = () => {
  router.push({
    name: 'select',
  })
}

const setCenter = () => {
  emit('setCenter')
}
</script>

<template>
  <div class="btnBackground py-4">
    <div class="d-flex justify-content-end me-3 mb-5">
      <Button color="blue" btn-classes="centerButton p-0" @click="setCenter">
        <font-awesome-icon icon="fa-solid fa-location-crosshairs" />
      </Button>
    </div>

    <div class="d-flex justify-content-center">
      <Button color="blue" btn-classes="px-5 payButton" @click="select"> Pay parking </Button>
    </div>
  </div>
</template>

<style lang="sass">
@import '~bootstrap/scss/bootstrap-utilities'

.centerButton
  border: none !important
  border-radius: 50% !important
  width: 30px
  height: 30px
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5)

.payButton
  font-size: 20px !important

.btnBackground
  @include gradient-y(transparent, rgba(70, 83, 119, 0.7663))
</style>
