import { defineStore } from 'pinia'

import { computed, reactive } from 'vue'
import { LocationQueryValue } from 'vue-router'

import { apolloClient } from '@/apollo'
import { useMutation, provideApolloClient, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useLocalStorage } from '@vueuse/core'

provideApolloClient(apolloClient)

export const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN_NAME

export const useAuthStore = defineStore('auth', () => {
  const user = reactive<User>({
    email: '',
    name: '',
    avatar: '',
  })
  const accessToken = useLocalStorage(ACCESS_TOKEN, '')

  const isUserLoggedIn = computed(() => !!accessToken.value)

  const isEmptyUser = computed(() => !user.name || !user.email || !user.avatar)

  const socialLogin = (code: Code, provider: Provider) => {
    socialLoginMutation({
      input: {
        code,
        provider,
      },
    })
  }

  onDoneSocialLoginMutation((result) => {
    const { access_token, user: authUser } = result.data.socialLogin
    accessToken.value = access_token
    user.name = authUser.name
    user.email = authUser.email
    user.avatar = authUser.providers[0].avatar
  })

  const fetchAuthUser = () => {
    const { onResult } = useQuery(AUTH_USER_QUERY)

    onResult((result) => {
      if (result) {
        const { me } = result.data
        user.name = me.name
        user.email = me.email
        user.avatar = me.providers[0].avatar
      }
    })
  }

  if (isUserLoggedIn.value && !user.name) {
    fetchAuthUser()
  }

  return {
    user,
    accessToken,

    isUserLoggedIn,
    isEmptyUser,

    socialLogin,
    fetchAuthUser,
  }
})

const AUTH_USER_QUERY = gql`
  query getAuthUser {
    me {
      name
      email
      providers {
        avatar
      }
    }
  }
`
const SOCIAL_LOGIN_MUTATION = gql`
  mutation socialLogin($input: SocialLoginInput!) {
    socialLogin(input: $input) {
      access_token
      user {
        name
        email
        providers {
          avatar
        }
      }
    }
  }
`

const { mutate: socialLoginMutation, onDone: onDoneSocialLoginMutation } = useMutation(SOCIAL_LOGIN_MUTATION)

interface User {
  email: string
  name: string
  avatar: string
}

type Code = string | LocationQueryValue[]
type Provider = string | string[]
