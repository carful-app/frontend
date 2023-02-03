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
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 col-10 d-flex flex-column justify-content-center align-items-center vh-100">
        <div class="row justify-content-center mb-3">
          <div class="col-8">
            <Logo :color="'white'" />
          </div>
        </div>

        <div class="row justify-content-center w-100">
          <div class="col-6">
            <Button :color="'blue'"> Test </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/styles/variables.sass'
body
  background-color: $color-dark-blue !important
</style>
