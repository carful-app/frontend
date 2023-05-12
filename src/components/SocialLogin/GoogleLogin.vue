<script setup lang="ts">
const authStore = useAuthStore()
const { t } = useI18n()

const props = defineProps<{
  signin?: boolean
  signup?: boolean
}>()

const text = computed(() => {
  if (props.signin) {
    return t('Sign in with Google')
  } else if (props.signup) {
    return t('Sign up with Google')
  } else {
    return t('Sign in with Google')
  }
})
</script>

<template>
  <Button @click="authStore.socialLogin('google', 'http://localhost')" color="blue" outline>
    <font-awesome-icon icon="fa-brands fa-google" />
    {{ text }}
  </Button>
</template>
