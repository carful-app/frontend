<script setup lang="ts">
import GithubLogin from '@/components/SocialLogin/GithubLogin.vue'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const authData = ref({})

const code = route.query.code
const provider = route.params.provider

const { mutate: socialLogin, onDone } = useMutation(
  gql`
    mutation socialLogin($input: SocialLoginInput!) {
      socialLogin(input: $input) {
        access_token
        user {
          name
          email
          id
          created_at
          updated_at
          providers {
            id
            provider
            provider_id
            avatar
            created_at
            updated_at
          }
        }
      }
    }
  `,
  () => ({
    variables: {
      input: {
        code,
        provider,
      },
    },
  })
)

onMounted(() => {
  if (code && provider) {
    socialLogin()
  }
})

onDone((result) => {
  authData.value = result.data.socialLogin
})
</script>

<template>
  <div>
    <GithubLogin :is-loading="provider == 'github'" />

    <div v-if="authData">
      <pre>{{ authData }}</pre>
    </div>
  </div>
</template>
