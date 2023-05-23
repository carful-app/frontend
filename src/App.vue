<script setup lang="ts">
import initPush from '@/utils/initPush'

const authStore = useAuthStore()

watchEffect(() => {
  if (!authStore.isEmptyUser) {
    initPush()
  }
})

onMounted(() => {
  if (!authStore.isEmptyUser) {
    initPush()
  }
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Suspense>
        <template #default>
          <div>
            <Toasts />
            <component :is="Component" />
          </div>
        </template>

        <template #fallback>
          <div class="container">
            <div class="row justify-content-center px-2">
              <div class="d-flex flex-column justify-content-center align-items-center vh-100 w-auto">
                <div class="row justify-content-center mb-3">
                  <div class="col">
                    <Logo :color="'white'" />
                  </div>
                </div>

                <div class="row justify-content-center w-100">
                  <div class="col-10 text-center mt-2">
                    <div class="spinner-border loadingSpinner" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Suspense>
    </template>
  </RouterView>
</template>

<style lang="sass" scoped>
@import '@/assets/styles/variables.sass'
.loadingSpinner
  color: $color-white
</style>
