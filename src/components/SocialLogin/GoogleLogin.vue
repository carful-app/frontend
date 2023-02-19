<script setup lang="ts">
const authStore = useAuthStore()

const props = defineProps<{
  signin?: boolean
  signup?: boolean
}>()

const text = computed(() => {
  if (props.signin) {
    return 'Sign in Google'
  } else if (props.signup) {
    return 'Sign up Google'
  } else {
    return 'Sign in Google'
  }
})
</script>

<template>
  <Button @click="authStore.socialLogin('google', 'http://localhost')" color="blue" outline>
    <font-awesome-icon icon="fa-brands fa-google" />
    {{ text }}
  </Button>
</template>
