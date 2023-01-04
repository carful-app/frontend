<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <a @click="authStore.socialLogin('google', 'http://localhost')">Login with Google</a>
</template>
