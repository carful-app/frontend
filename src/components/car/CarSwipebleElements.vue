<script setup lang="ts">
const emit = defineEmits(['deleteClick', 'editClick'])
const props = defineProps({
  carId: {
    type: String,
    required: true,
  },
})

const { carId } = toRefs(props)

const editClick = (carId: string) => emit('editClick', carId)
const deleteClick = (carId: string) => emit('deleteClick', carId)
</script>

<template>
  <div class="d-flex d-100">
    <div
      class="d-flex justify-content-center align-items-center bg-delete px-3 rounded-4 swipe-element"
      @click="deleteClick(carId)"
    >
      <div class="d-flex justify-content-center align-items-center p-1">
        <font-awesome-icon :icon="['fas', 'trash-alt']" />
      </div>
    </div>
    <div
      class="d-flex justify-content-center align-items-center bg-edit px-3 rounded-4 swipe-element"
      @click="editClick(carId)"
    >
      <div class="d-flex justify-content-center align-items-center p-1">
        <font-awesome-icon :icon="['fas', 'pen']" />
      </div>
    </div>
  </div>
</template>

<style lang="sass"></style>
