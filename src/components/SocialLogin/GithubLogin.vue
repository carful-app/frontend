<script setup lang="ts">
import { toRef } from 'vue'

const client_id = import.meta.env.VITE_GITHUB_CLIENT_ID
const redirect_uri = import.meta.env.VITE_GITHUB_REDIRECT_URI

const url = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const isLoading = toRef(props, 'isLoading')
</script>

<template>
  <a :href="url" v-if="!isLoading">Login with Github</a>
  <a v-else>Login in with Github...</a>
</template>
