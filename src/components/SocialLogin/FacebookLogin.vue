<script setup lang="ts">
// const authStore = useAuthStore()

const props = defineProps<{
  signin?: boolean
  signup?: boolean
}>()

const text = computed(() => {
  if (props.signin) {
    return 'Sign in Facebook'
  } else if (props.signup) {
    return 'Sign up Facebook'
  } else {
    return 'Sign in Facebook'
  }
})
</script>

<template>
  <Button color="blue" outline>
    <font-awesome-icon icon="fa-brands fa-facebook" />
    {{ text }}
  </Button>
</template>
