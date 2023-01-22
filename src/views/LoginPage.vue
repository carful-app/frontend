<script setup lang="ts">
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
