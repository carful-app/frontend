<script setup lang="ts">
const authStore = useAuthStore()
const { mutate: registerMutate, loading } = authStore.getRegisterMutation()

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const registerForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const handleRegister = async () => {
  registerMutate({
    input: {
      name: registerForm.name,
      email: registerForm.email,
      password: registerForm.password,
      password_confirmation: registerForm.confirmPassword,
    },
  })
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
          @submit.prevent="handleRegister"
          class="row justify-content-center w-100 d-flex flex-column align-items-center px-0"
        >
          <div class="col-10">
            <Input type="text" placeholder="Name" v-model="registerForm.name" :loading="loading">
              <template #iconLeft>
                <font-awesome-icon icon="fa-solid fa-user" />
              </template>
            </Input>
          </div>
          <div class="col-10">
            <Input type="email" placeholder="Email" v-model="registerForm.email" :loading="loading">
              <template #iconLeft>
                <font-awesome-icon icon="fa-solid fa-envelope" />
              </template>
            </Input>
          </div>
          <div class="col-10">
            <Input
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              v-model="registerForm.password"
              :loading="loading"
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
            <Input
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm password"
              v-model="registerForm.confirmPassword"
              :loading="loading"
            >
              <template #iconLeft>
                <font-awesome-icon icon="fa-solid fa-lock" />
              </template>

              <template #iconRight>
                <font-awesome-icon icon="fa-solid fa-eye" @click="showConfirmPassword = !showConfirmPassword" />
              </template>
            </Input>
          </div>
          <div class="col-10">
            <Button color="blue" @click="handleRegister" :loading="loading"> Sign up </Button>
          </div>
        </form>

        <div class="row justify-content-center w-100">
          <div class="col-10 text-center mt-2">
            <span class="text signInText"
              >Already have an account?
              <router-link :to="{ name: 'login' }" class="text"> Sign in </router-link>
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
            <FacebookLogin signup />
          </div>
          <div class="col-10">
            <GoogleLogin signup />
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

.signInText
  color: $color-white
  font-size: 0.9rem

  a
    color: $color-light-blue
    text-decoration: none
</style>
