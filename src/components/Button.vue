<script setup lang="ts">
const props = defineProps<{
  color: 'light' | 'dark' | 'blue'
  text?: boolean
  outline?: boolean
  loading?: boolean
  btnClasses?: string
}>()

const { color, text, outline, btnClasses } = toRefs(props)

const externalBtnClasses = computed(() => {
  return btnClasses?.value ? btnClasses.value.split(' ').reduce((acc, curr) => ({ ...acc, [curr]: true }), {}) : []
})

interface ButtonClasses {
  btn: boolean
  'btn-light'?: boolean
  'btn-dark'?: boolean
  'btn-blue'?: boolean
  'btn-outline-light'?: boolean
  'btn-outline-dark'?: boolean
  'btn-outline-blue'?: boolean
  'btn-text-light'?: boolean
  'btn-text-dark'?: boolean
  'btn-text-blue'?: boolean
}

const internalBtnClasses = computed(() => {
  const classes: ButtonClasses = {
    btn: true,
  }

  if (text?.value) {
    classes[`btn-text-${color.value}`] = true
  } else if (outline?.value) {
    classes[`btn-outline-${color.value}`] = true
  } else {
    classes[`btn-${color.value}`] = true
  }

  return classes
})

defineEmits(['click'])
</script>

<template>
  <div class="d-grid">
    <button :class="{ ...internalBtnClasses, ...externalBtnClasses }" @click="$emit('click')" :disabled="loading">
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="loading"></span>
      <slot />
    </button>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/styles/variables.sass'
@import '~bootstrap/scss/bootstrap-utilities'

.btn-light
  @include button-variant($color-light-blue, $color-light-blue, $color-white)

.btn-dark
  @include button-variant($color-dark-blue, $color-dark-blue, $color-white)

.btn-blue
  @include button-variant($color-blue, $color-blue, $color-white)

.btn-outline-light
  @include button-outline-variant($color-light-blue)

.btn-outline-dark
  @include button-outline-variant($color-dark-blue)

.btn-outline-blue
  @include button-outline-variant($color-blue)

.btn-text-light
  @include button-outline-variant($color-light-blue)
  border: none

.btn-text-dark
  @include button-outline-variant($color-dark-blue)
  border: none

.btn-text-blue
  @include button-outline-variant($color-blue)
  border: none
</style>
