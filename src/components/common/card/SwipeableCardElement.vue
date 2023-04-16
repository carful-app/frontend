<script setup lang="ts">
import Hammer, { Pan, DIRECTION_HORIZONTAL } from 'hammerjs'

const props = defineProps<{
  icon: string
  mainInfo: string
  subInfo: string
}>()

const { icon, mainInfo, subInfo } = toRefs(props)

const emit = defineEmits(['click'])

const canClick = refAutoReset(true, 100)
const onClick = () => {
  if (!canClick.value) return
  emit('click')
}

const elementContainer = ref()
const elementContainerWidth = computed(() => elementContainer.value?.clientWidth)
const minWidth = computed(() => Math.round(elementContainerWidth.value * 0.8))

const elementContent = ref()
const elementWidth = computed(() => elementContent.value?.clientWidth)
const contentTransform = ref(0)
const contentMaxWidth = ref(0)
watchEffect(() => {
  contentMaxWidth.value = elementWidth.value
})

const elementOptions = ref()
const elementOptionsTransform = ref(0)
const elementOptionsWidth = computed(() => elementOptions.value?.clientWidth)

const moving = ref(false)
const direction = ref('')
const nextDirection = ref('left')

// eslint-disable-next-line no-undef
const hammerOptions: HammerOptions = {
  recognizers: [[Pan, { direction: DIRECTION_HORIZONTAL }]],
}

const init = () => {
  const hammer = new Hammer(elementContainer.value, hammerOptions)
  hammer.on('panstart panleft panright panend', move)
}

// eslint-disable-next-line no-undef
const move = (event: HammerInput) => {
  const { deltaX, type, isFinal } = event

  if (type === 'panleft' || type === 'panright') {
    if (direction.value === '') {
      direction.value = deltaX > 0 ? 'right' : 'left'
    }
    if (direction.value === nextDirection.value) {
      moving.value = true
      if (Math.abs(deltaX) <= elementOptionsWidth.value) {
        if (deltaX <= 0 && direction.value === 'left') {
          if (elementWidth.value - Math.abs(deltaX) < minWidth.value) {
            contentTransform.value = elementWidth.value - minWidth.value + deltaX
            contentMaxWidth.value = minWidth.value
          } else {
            contentMaxWidth.value = elementWidth.value - Math.abs(deltaX)
          }
          elementOptionsTransform.value = deltaX
        } else if (deltaX >= 0 && direction.value === 'right') {
          if (contentTransform.value >= 0) {
            if (elementWidth.value - minWidth.value - elementOptionsWidth.value + deltaX < 0) {
              contentTransform.value = elementWidth.value - minWidth.value - elementOptionsWidth.value + deltaX
            } else {
              contentTransform.value = 0
            }
            contentMaxWidth.value = elementWidth.value - deltaX
          } else {
            contentTransform.value = elementWidth.value - minWidth.value - elementOptionsWidth.value + deltaX
          }
          elementOptionsTransform.value = deltaX - elementOptionsWidth.value
        }
      }
    }
  }

  if (isFinal) {
    moving.value = false

    if (nextDirection.value === direction.value) {
      if (direction.value === 'left') {
        if (Math.abs(deltaX) > elementOptionsWidth.value / 2) {
          nextDirection.value = 'right'
          elementOptionsTransform.value = -elementOptionsWidth.value
          if (elementWidth.value - elementOptionsWidth.value < minWidth.value) {
            contentTransform.value = elementWidth.value - minWidth.value - elementOptionsWidth.value
            contentMaxWidth.value = minWidth.value
          } else {
            contentTransform.value = 0
            contentMaxWidth.value = elementWidth.value - elementOptionsWidth.value
          }
        } else {
          elementOptionsTransform.value = 0
          contentTransform.value = 0
          contentMaxWidth.value = elementWidth.value
        }
      } else if (direction.value === 'right') {
        if (deltaX < elementOptionsWidth.value / 2) {
          elementOptionsTransform.value = -elementOptionsWidth.value
          if (elementWidth.value - elementOptionsWidth.value < minWidth.value) {
            contentTransform.value = elementWidth.value - minWidth.value - elementOptionsWidth.value
            contentMaxWidth.value = minWidth.value
          } else {
            contentTransform.value = 0
            contentMaxWidth.value = elementWidth.value - elementOptionsWidth.value
          }
        } else {
          nextDirection.value = 'left'
          elementOptionsTransform.value = 0
          contentTransform.value = 0
          contentMaxWidth.value = elementWidth.value
        }
      }
    }

    direction.value = ''
    canClick.value = false
  }
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="d-flex gap-3 card-element rounded-4 position-relative overflow-hidden" ref="elementContainer">
    <div
      class="d-flex gap-3 w-100 px-3 py-1 element-content"
      :class="{ moving }"
      :style="{
        transform: `translateX(${contentTransform}px)`,
        maxWidth: `${contentMaxWidth}px`,
      }"
      ref="elementContent"
      @click="onClick"
    >
      <div class="d-flex justify-content-center align-items-center">
        <div class="icon d-flex justify-content-center align-items-center p-1">
          <font-awesome-icon :icon="icon" />
        </div>
      </div>
      <div class="info flex-grow-1 d-flex flex-column justify-content-center">
        <span class="main-info">
          {{ mainInfo }}
        </span>
        <span class="sub-info">
          {{ subInfo }}
        </span>
      </div>
    </div>
    <div
      class="d-flex position-absolute top-0 start-100 h-100 element-options"
      ref="elementOptions"
      :class="{ moving }"
      :style="{
        transform: `translateX(${elementOptionsTransform}px)`,
      }"
    >
      <div class="d-flex justify-content-center align-items-center bg-primary">
        <div class="icon d-flex justify-content-center align-items-center p-1">
          <font-awesome-icon :icon="icon" />
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center bg-secondary">
        <div class="icon d-flex justify-content-center align-items-center p-1">
          <font-awesome-icon :icon="icon" />
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center bg-warning">
        <div class="icon d-flex justify-content-center align-items-center p-1">
          <font-awesome-icon :icon="icon" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="sass">
@import '@/assets/styles/variables.sass'

.card-element
  background-color: $color-light-blue
  height: 50px
  cursor: pointer

  .element-content
    transition: transform 0.4s ease-in-out

    &.moving
      transition: none

    .icon
      background-color: transparentize($color-blue, 0.5)
      color: $color-dark-blue
      width: 30px
      height: 30px
      border-radius: 15px

    .main-info
      color: $color-blue
      margin: 0
      font-size: 16px
      font-weight: 600

    .sub-info
      color: $color-dark-blue
      font-size: 11px
      font-weight: 400

  .element-options
    transition: transform 0.4s ease-in-out

    &.moving
      transition: none
</style>
