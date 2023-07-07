<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

const { t } = useI18n()

const { needRefresh, updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegisteredSW(swUrl, r) {
    // eslint-disable-next-line no-console
    console.log(`Service Worker at: ${swUrl}`)
    r &&
      setInterval(async () => {
        // eslint-disable-next-line no-console
        console.log('Checking for sw update')
        await r.update()
      }, 2000)
  },
})

const close = async () => {
  needRefresh.value = false
}

const isLoading = ref(false)

const reloadClick = () => {
  updateServiceWorker()
}
</script>

<template>
  <div class="position-fixed top-0 end-0 w-100 serviceWorkerNotificationCardContainer p-3" v-if="needRefresh">
    <div class="row flex-column align-items-end">
      <div class="col col-sm-3">
        <div class="card">
          <div class="card-body">
            <p class="card-text">
              {{ t('New content available, click on reload button to update.') }}
            </p>
            <div class="row">
              <div class="col">
                <Button color="blue" text @click="close">{{ t('Close') }}</Button>
              </div>
              <div class="col">
                <Button color="blue" @click="reloadClick" :loading="isLoading">{{ t('Reload') }}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.serviceWorkerNotificationCardContainer
    z-index: 555
</style>
