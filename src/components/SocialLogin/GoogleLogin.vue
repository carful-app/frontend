<script setup lang="ts">
const authStore = useAuthStore()
</script>

<template>
  <a @click="authStore.socialLogin('google', 'http://localhost')">Login with Google</a>
</template>
