<script setup lang="ts">
const { t } = useI18n()
const authStore = useAuthStore()
const toastStore = useToastStore()

const { mutate: loginMutate, loading: loginLoading, onError: loginOnError } = authStore.getLoginMutation()
const loading = ref(false)

watch(loginLoading, (value) => {
  if (value) loading.value = value
})

loginOnError(({ message, graphQLErrors }) => {
  toastStore.handleErrors(message, graphQLErrors)
  loading.value = false
})

const showPassword = ref(false)

const loginForm = reactive({
  email: '',
  password: '',
})

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(8) },
}

const v$ = useVuelidate(rules, loginForm)

const handleLogin = async () => {
  const result = await v$.value.$validate()

  if (!result) return

  loginMutate({ input: { email: loginForm.email, password: loginForm.password } })
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center px-2">
      <div class="d-flex flex-column justify-content-center align-items-center vh-100 w-auto">
        <div class="row justify-content-center mb-3">
          <div class="col">
            <Logo :color="'white'" />
          </div>
        </div>

        <form
          @submit.prevent="handleLogin"
          class="row justify-content-center w-100 d-flex flex-column align-items-center px-0"
        >
          <div class="col-10">
            <Input
              type="email"
              :placeholder="t('Email')"
              v-model="loginForm.email"
              :loading="loading"
              :validation="v$.email"
            >
              <template #iconLeft>
                <font-awesome-icon icon="fa-solid fa-envelope" />
              </template>
            </Input>
          </div>
          <div class="col-10">
            <Input
              :type="showPassword ? 'text' : 'password'"
              :placeholder="t('Password')"
              v-model="loginForm.password"
              :loading="loading"
              :validation="v$.password"
            >
              <template #iconLeft>
                <font-awesome-icon icon="fa-solid fa-lock" />
              </template>

              <template #iconRight>
                <font-awesome-icon icon="fa-solid fa-eye" @click="showPassword = !showPassword" />
              </template>
            </Input>
          </div>
          <div class="col-10">
            <Button color="blue" @click="handleLogin" :loading="loading"> {{ t('Sign in') }} </Button>
          </div>
        </form>

        <div class="row justify-content-center w-100">
          <div class="col-10 text-center mt-2">
            <span class="text signUpText">
              {{ t("Don't have an account?") }}
              <router-link :to="{ name: 'register' }" class="text"> {{ t('Sign up') }} </router-link>
            </span>
          </div>
        </div>

        <div class="row justify-content-center w-100">
          <div class="col-8 my-3">
            <div class="d-flex flex-row justify-content-center align-items-center">
              <div class="w-100">
                <hr class="text-white border-2" />
              </div>
              <div class="mx-2">
                <span class="text text-white text-uppercase">{{ t('or') }}</span>
              </div>
              <div class="w-100">
                <hr class="text-white border-2" />
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-center w-100 gap-2">
          <div class="col-10">
            <FacebookLogin signin />
          </div>
          <div class="col-10">
            <GoogleLogin signin />
          </div>
        </div>

        <div class="row justify-content-center w-100">
          <div class="col-8 mt-3">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/styles/variables.sass'
body
  background-color: $color-dark-blue !important

.signUpText
  color: $color-white
  font-size: 0.9rem

  a
    color: $color-light-blue
    text-decoration: none
</style>
