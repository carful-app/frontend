<script setup lang="ts">
const props = defineProps<{
  icon: string
  mainInfo: string
  subInfo?: string
  isLoading?: boolean
  arrowHidden?: boolean
}>()

const { icon, mainInfo, subInfo, isLoading, arrowHidden } = toRefs(props)

const emit = defineEmits(['click'])

const onClick = () => {
  emit('click')
}
</script>

<template>
  <div class="d-flex gap-3 card-element px-3 py-1 rounded-4" @click="onClick">
    <div class="d-flex justify-content-center align-items-center">
      <div class="icon d-flex justify-content-center align-items-center p-1">
        <font-awesome-icon :icon="icon" />
      </div>
    </div>
    <div
      class="info flex-grow-1 gap-1 d-flex flex-column justify-content-center placeholder-glow"
      aria-hidden="true"
      v-if="isLoading"
    >
      <span class="main-info placeholder placeholder-sm col-6"></span>
      <span class="sub-info placeholder placeholder-xs col-4"></span>
    </div>
    <div class="info flex-grow-1 d-flex flex-column justify-content-center" v-else>
      <span class="main-info">
        {{ mainInfo }}
      </span>
      <span class="sub-info" v-if="subInfo">
        {{ subInfo }}
      </span>
    </div>
    <div class="d-flex justify-content-center align-items-center arrow" v-if="!arrowHidden">
      <font-awesome-icon icon="fa-solid fa-angle-right" />
    </div>
  </div>
</template>
<style lang="sass">
@import '@/assets/styles/variables.sass'

.card-element
  background-color: $color-light-blue
  height: 50px
  cursor: pointer

  .icon
    background-color: transparentize($color-blue, 0.5)
    color: $color-dark-blue
    width: 30px
    height: 30px
    border-radius: 15px

  .arrow
    color: $color-dark-blue

  .main-info
    color: $color-blue
    margin: 0
    font-size: 16px
    font-weight: 600

  .sub-info
    color: $color-dark-blue
    font-size: 11px
    font-weight: 400
</style>
