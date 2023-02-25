<script setup lang="ts">
const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>
<template>
  <div class="d-flex card pt-2 pb-3 px-3 col-md-6 col-lg-4 col-xxl-3 d-flex m-auto">
    <div class="row mb-4">
      <div class="col d-flex justify-content-center">
        <span class="line"></span>
      </div>
    </div>
    <div class="d-flex flex-column gap-2">
      <slot name="elements"></slot>

      <div class="d-flex flex-column gap-2 mt-2">
        <slot name="buttons" :close="close"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/styles/variables.sass'
.card
    background-color: $color-dark-blue !important
    border-radius: 36px 36px 0 0 !important
    color: $color-white !important

.line
    width: 40%
    height: 5px
    background-color: $color-white
    border-radius: 10px
    display: block
</style>
