<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import GithubLogin from '@/components/SocialLogin/GithubLogin.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const code = route.query.code
const provider = route.params.provider

onMounted(() => {
  if (authStore.isUserLoggedIn) {
    router.push({ name: 'home' })
  } else {
    if (code && provider) {
      authStore.socialLogin(code, provider)
    }
  }
})

watch(
  () => authStore.isUserLoggedIn,
  (isUserLoggedIn: boolean) => {
    if (isUserLoggedIn) {
      router.push({ name: 'home' })
    }
  }
)
</script>

<template>
  <div>
    <GithubLogin :is-loading="provider == 'github'" />
  </div>
</template>
