<script setup lang="ts">
const { t } = useI18n()
const emit = defineEmits(['setCenter'])

const setCenter = () => {
  emit('setCenter')
}

const router = useRouter()
const cardRouteName = ref('select')

const showSelectCard = () => {
  cardRouteName.value = 'select'
  router.push({ name: cardRouteName.value })
}

const addTime = () => {
  cardRouteName.value = 'add-time'
  router.push({ name: cardRouteName.value })
}

const parkingStore = useParkingStore()

onBeforeMount(() => {
  if (router.currentRoute.value.matched.some((record) => record.name === 'add-time')) {
    cardRouteName.value = 'add-time'
  }

  parkingStore.getLastParkCar()
})

const zoneStore = useZoneStore()
const outsideZone = computed(() => zoneStore.outsideZone)
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <div class="position-absolute bottom-0 end-0 w-100">
    <div class="btnBackground py-4">
      <div class="d-flex justify-content-end me-3 mb-5" :style="outsideZone ? { marginBottom: '92px !important' } : {}">
        <Button color="blue" btn-classes="centerButton p-0" @click="setCenter">
          <font-awesome-icon icon="fa-solid fa-location-crosshairs" />
        </Button>
      </div>

      <div class="d-flex justify-content-center">
        <Button
          color="blue"
          btn-classes="px-5 payButton"
          @click="showSelectCard"
          v-if="!outsideZone && parkingStore.isEmptyParkCar"
        >
          {{ t('Pay parking') }}
        </Button>

        <ParkCarTimer @click="addTime" v-else-if="!parkingStore.isEmptyParkCar" />
      </div>
    </div>
  </div>

  <CardContainer :card-route-name="cardRouteName" />
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
