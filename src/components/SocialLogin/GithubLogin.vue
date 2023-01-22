<script setup lang="ts">
const authStore = useAuthStore()
</script>

<template>
  <a @click="authStore.socialLogin('github')">Login with Github</a>
</template>
