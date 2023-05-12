<script setup lang="ts">
const { t } = useI18n()

const props = defineProps<{
  signin?: boolean
  signup?: boolean
}>()

const text = computed(() => {
  if (props.signin) {
    return t('Sign in with Facebook')
  } else if (props.signup) {
    return t('Sign up with Facebook')
  } else {
    return t('Sign in with Facebook')
  }
})
</script>

<template>
  <Button color="blue" outline>
    <font-awesome-icon icon="fa-brands fa-facebook" />
    {{ text }}
  </Button>
</template>
