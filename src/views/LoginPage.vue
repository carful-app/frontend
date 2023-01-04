<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import GithubLogin from '@/components/SocialLogin/GithubLogin.vue'
import GoogleLogin from '@/components/SocialLogin/GoogleLogin.vue'

const router = useRouter()
const authStore = useAuthStore()

watchEffect(() => {
  console.log(!authStore.isEmptyUser)

  if (!authStore.isEmptyUser) {
    router.push({ name: 'home' })
  }
})
</script>

<template>
  <div><GithubLogin /> | <GoogleLogin /></div>
</template>
