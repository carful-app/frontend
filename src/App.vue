<script setup lang="ts">
import { useCounterStore } from './stores/couter'

const counterStore = useCounterStore()
</script>

<template>
  <div>
    <RouterView />

    <div class="counter">
      <span> {{ counterStore.count }} </span>

      <button @click="counterStore.increment">+</button>
      <button @click="counterStore.decrement">-</button>
    </div>
  </div>
</template>
