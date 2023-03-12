<script setup lang="ts">
const emit = defineEmits(['click'])

const onClick = () => {
  emit('click')
}
</script>

<template>
  <div
    class="d-flex justify-content-center align-items-center create-card-element px-3 py-1 rounded-4"
    @click="onClick"
  >
    <span><font-awesome-icon icon="fa-solid fa-plus" /> Create</span>
  </div>
</template>
<style lang="sass">
@import '@/assets/styles/variables.sass'

.create-card-element
    background-color: $color-white
    color: $color-blue
    height: 50px
    cursor: pointer
</style>
