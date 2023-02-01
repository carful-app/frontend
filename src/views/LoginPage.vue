<script setup lang="ts">
const router = useRouter()
const authStore = useAuthStore()

watchEffect(() => {
  if (!authStore.isEmptyUser) {
    router.push({ name: 'home' })
  }
})
</script>

<template>
  <div class="container-xs text-center vh-100 align-items-center d-flex justify-content-center">
    <div class="row justify-content-center">
      <div class="col-8">
        <Logo :color="'white'" />
      </div>
    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/styles/variables.sass'
body
  background-color: $color-dark-blue !important
</style>
