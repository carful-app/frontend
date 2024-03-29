<script setup lang="ts">
import Hammer from 'hammerjs'
import { Ref } from 'vue'

const slots = useSlots()
const showScrollElements = computed(() => !!slots.scrollElements)

interface IEvent {
  type: string
  deltaY: number
  isFinal: boolean
}

const emit = defineEmits(['closed'])

const stripe = ref() as Ref<HTMLElement | SVGElement>
const card = ref<HTMLElement>()
const cardTransform = ref(0)

const moving = ref(false)

const cardHeight = computed(() => card.value?.clientHeight || 0)

// eslint-disable-next-line no-undef
const hammerOptions: HammerOptions = {
  recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }]],
}

const init = () => {
  const hammer = new Hammer(stripe.value, hammerOptions)
  hammer.on('panstart panup pandown panend', move)
}

const move = (event: IEvent) => {
  const { deltaY, type, isFinal } = event

  if (type === 'panup' || type === 'pandown') {
    moving.value = true
    if (deltaY > 0) {
      cardTransform.value = deltaY
    }
  }

  if (isFinal) {
    moving.value = false
    if (deltaY > cardHeight.value - 150) {
      close()
    } else {
      cardTransform.value = 0
    }
  }
}

const close = () => {
  cardTransform.value = cardHeight.value + 5
  emit('closed')
}

onMounted(() => {
  init()
})
</script>
<template>
  <div class="w-100 d-md-flex justify-content-center card-container">
    <div
      ref="card"
      class="d-flex card pb-3 px-3 col-md-6 col-lg-4 col-xxl-3"
      :class="{ moving }"
      :style="{ transform: `translateY(${cardTransform}px)` }"
    >
      <div class="row mb-3">
        <div ref="stripe" class="col d-flex justify-content-center py-2">
          <span class="line"></span>
        </div>
      </div>
      <div class="d-flex flex-column gap-2">
        <div class="scroll d-flex flex-column gap-2" v-if="showScrollElements">
          <slot name="scrollElements"></slot>
        </div>
        <slot name="elements"></slot>

        <div class="d-flex flex-column gap-2 mt-2">
          <slot name="buttons" :close="close"></slot>
        </div>
      </div>
    </div>

    <slot name="other" />
  </div>
</template>

<style lang="sass">
@import '@/assets/styles/variables.sass'
.card-container
  --animate-duration: 0.4s !important

  &.animate__slideOutDown
    animation-name: slideCardDown

  @keyframes slideCardDown
    from
      transform: translate3d(0, v-bind(cardTransform), 0)

    to
      visibility: hidden
      transform: translate3d(0, 100%, 0)

.card
  background-color: $color-dark-blue !important
  border-radius: 36px 36px 0 0 !important
  color: $color-white !important
  transition: transform var(--animate-duration) ease-in-out
  justify-self: center

  .scroll
    overflow-y: auto
    max-height: 25vh
    height: 100%

  .line
    width: 40%
    height: 5px
    background-color: $color-white
    border-radius: 10px
    display: block
    cursor: grab

  &.moving
    transition: none
</style>
