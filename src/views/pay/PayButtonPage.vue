<script setup lang="ts">
const emit = defineEmits(['setCenter'])

const setCenter = () => {
  emit('setCenter')
}

const router = useRouter()
const selectPageRouteName = 'select'
const showSelectCard = () => {
  router.push({ name: selectPageRouteName })
}
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <div class="position-absolute bottom-0 end-0 w-100">
    <div class="btnBackground py-4">
      <div class="d-flex justify-content-end me-3 mb-5">
        <Button color="blue" btn-classes="centerButton p-0" @click="setCenter">
          <font-awesome-icon icon="fa-solid fa-location-crosshairs" />
        </Button>
      </div>

      <div class="d-flex justify-content-center">
        <Button color="blue" btn-classes="px-5 payButton" @click="showSelectCard"> Pay parking </Button>
      </div>
    </div>
  </div>

  <CardContainer :card-route-name="selectPageRouteName" />
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
