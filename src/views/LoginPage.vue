<script setup lang="ts">
const router = useRouter()
const authStore = useAuthStore()

watchEffect(() => {
  if (!authStore.isEmptyUser) {
    router.push({ name: 'home' })
  }
})

const loginInfo = reactive({
  email: '',
  password: '',
})

const handleLogin = async () => {
  console.log('loginInfo', loginInfo)
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

        <div class="row justify-content-center w-100 d-flex flex-column align-items-center">
          <div class="col-10">
            <Input type="email" placeholder="Email" v-model="loginInfo.email">
              <template #iconLeft>
                <i class="bi bi-envelope"></i>
              </template>
            </Input>
          </div>
          <div class="col-10">
            <Input type="password" placeholder="Password" v-model="loginInfo.password">
              <template #iconLeft>
                <i class="bi bi-lock"></i>
              </template>

              <template #iconRight>
                <i class="bi bi-eye-fill"></i>
              </template>
            </Input>
          </div>
        </div>

        <div class="row justify-content-center w-100">
          <div class="col-10">
            <Button :color="'blue'" @click="handleLogin"> Test </Button>
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
</style>
