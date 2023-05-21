<script setup lang="ts">
const { t } = useI18n()
const isSupported = useSupported(() => !!window && 'Notification' in window)
const alreadyAskedForPermissions = useLocalStorage('alreadyAskedForPermissions', false)
const shouldAskPerm = ref(false)

const requestPermission = async () => {
  await Notification.requestPermission()
  hidePrompt()
}

const hidePrompt = () => {
  alreadyAskedForPermissions.value = true
  shouldAskPerm.value = false
}

onBeforeMount(() => {
  if (isSupported.value && !alreadyAskedForPermissions.value) {
    shouldAskPerm.value = Notification.permission === 'default'
  }
})
</script>

<template>
  <div class="position-fixed top-0 end-0 w-100 notificationCardContainer p-3" v-if="isSupported && shouldAskPerm">
    <div class="row flex-column align-items-end">
      <div class="col col-sm-3">
        <div class="card">
          <div class="card-body">
            <p class="card-text">{{ t('We would like to show you notifications for updates on your parkings.') }}</p>
            <div class="row">
              <div class="col">
                <Button color="blue" text @click="hidePrompt">{{ t('No thanks') }}</Button>
              </div>
              <div class="col">
                <Button color="blue" @click="requestPermission">{{ t('Allow') }}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.notificationCardContainer
    z-index: 500
</style>
