<script setup lang="ts">
const parkingStore = useParkingStore()

const timer = ref('')
const interval = ref()

const calcTimer = () => {
  const now = new Date()
  const end = new Date(parkingStore.parkCar.endTime ?? 0)
  const diff = end.getTime() - now.getTime()

  if (diff - 1000 <= 0) {
    timer.value = ''
    parkingStore.clearParkCar()
    clearInterval(interval.value)
    return
  }

  let hours: string = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) as unknown as string
  let minutes: string = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)) as unknown as string
  let seconds: string = Math.floor((diff % (1000 * 60)) / 1000) as unknown as string

  if (Number(hours) < 10) hours = `0${hours}`
  if (Number(minutes) < 10) minutes = `0${minutes}`
  if (Number(seconds) < 10) seconds = `0${seconds}`

  timer.value = Number(hours) <= 0 ? `${minutes}:${seconds}` : `${hours}:${minutes}`
}

onMounted(() => {
  calcTimer()

  setTimeout(() => {
    interval.value = setInterval(() => {
      calcTimer()
    }, 1000)
  }, 1000 - new Date().getMilliseconds())
})
</script>

<template>
  <Button color="blue">
    <div class="d-flex text-start">
      <div class="d-flex">
        <div class="d-flex justify-content-center align-items-center me-2">
          <div class="icon d-flex justify-content-center align-items-center p-1">
            <font-awesome-icon icon="fa-solid fa-car" />
          </div>
        </div>

        <div class="info d-flex flex-column justify-content-center">
          <span class="main-info">
            {{ parkingStore.parkCar.car?.name }}
          </span>
          <span class="sub-info">
            {{ parkingStore.parkCar.car?.registrationNumber }}
          </span>
        </div>
      </div>

      <div class="vr mx-2"></div>

      <div class="d-flex gap-2 justify-content-center align-items-center">
        <font-awesome-icon icon="fa-regular fa-clock" />
        <span class="main-info timer"> {{ timer }}</span>
      </div>
    </div>
  </Button>
</template>

<style lang="sass">
@import '@/assets/styles/variables.sass'
.icon
    background-color: transparentize($color-light-blue, 0.5)
    color: $color-white
    width: 30px
    height: 30px
    border-radius: 15px

.main-info
    color: $color-white
    font-size: 16px
    font-weight: 600

.sub-info
    color: $color-light-blue
    font-size: 11px
    font-weight: 400

.timer
    width: 40px
</style>
