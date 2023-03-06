<script setup lang="ts">
const authStore = useAuthStore()
const { mutate: loginMutate, loading } = authStore.getLoginMutation()

const loginForm = reactive({
  email: '',
  password: '',
})

const handleLogin = async () => {
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
            <Input type="email" placeholder="Email" v-model="loginForm.email" :loading="loading">
              <template #iconLeft>
                <font-awesome-icon icon="fa-solid fa-envelope" />
              </template>
            </Input>
          </div>
          <div class="col-10">
            <Input type="password" placeholder="Password" v-model="loginForm.password" :loading="loading">
              <template #iconLeft>
                <font-awesome-icon icon="fa-solid fa-lock" />
              </template>

              <template #iconRight>
                <font-awesome-icon icon="fa-solid fa-eye" />
              </template>
            </Input>
          </div>
          <div class="col-10">
            <Button color="blue" @click="handleLogin" :loading="loading"> Sign in </Button>
          </div>
        </form>

        <div class="row justify-content-center w-100">
          <div class="col-10 text-center mt-2">
            <span class="text signUpText"
              >Don't have an account?
              <router-link :to="{ name: 'register' }" class="text"> Sign up </router-link>
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
                <span class="text text-white text-uppercase">or</span>
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