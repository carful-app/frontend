<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div>
    <div v-if="authStore.user">
      <pre>{{ authStore.user }}</pre>
    </div>
  </div>
</template>
