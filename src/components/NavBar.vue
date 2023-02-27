<script setup lang="ts">
const { user, getLogoutMutation } = useAuthStore()
const { mutate: logoutMutate } = getLogoutMutation()

const menu = ref(false)

const toggleMenu = () => {
  menu.value = !menu.value
}
</script>

<template>
  <div class="d-flex flex-row w-100 navbar px-4 justify-content-space-around">
    <div
      @click="toggleMenu"
      class="menuToggle navbarIcon d-flex align-items-center justify-content-center user-select-none"
    >
      <font-awesome-icon icon="fa-solid fa-bars" />
    </div>

    <div
      class="navbarIcon d-flex align-items-center justify-content-center user-select-none"
      :class="{ userIcon: !user.avatar, userProfilePic: !!user.avatar }"
    >
      <img :src="user.avatar" :alt="user.name" v-if="user.avatar" class="w-100" :title="user.name" />
      <font-awesome-icon icon="fa-solid fa-user" :title="user.name" v-else />
    </div>

    <div class="d-flex flex-column menu px-2 pb-2" :class="{ open: menu }">
      <router-link to="" class="menu-item">
        <div class="row">
          <div class="col d-flex flex-row gap-2 align-items-center">
            <font-awesome-icon icon="fa-solid fa-bars" />
            Profile
          </div>
        </div>
      </router-link>
      <router-link to="" class="menu-item">
        <div class="row">
          <div class="col d-flex flex-row gap-2 align-items-center">
            <font-awesome-icon icon="fa-solid fa-bars" />
            Profile
          </div>
        </div>
      </router-link>
      <router-link to="" class="menu-item">
        <div class="row">
          <div class="col d-flex flex-row gap-2 align-items-center">
            <font-awesome-icon icon="fa-solid fa-bars" />
            Profile
          </div>
        </div>
      </router-link>

      <div class="flex-grow-1"></div>

      <div class="row">
        <div class="col">
          <Button color="blue" outline @click="logoutMutate">Logout</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/styles/variables.sass'
@import '~bootstrap/scss/bootstrap-utilities'

.navbar
  background-color: $color-dark-blue
  color: $color-white
  height: 45px

.menu
  width: 200px
  height: calc(100vh - 45px)
  background-color: $color-dark-blue
  position: fixed
  top: 45px
  left: -200px
  transition: left 0.3s ease-in-out
  z-index: 2

  &.open
    left: 0

  .menu-item
    text-decoration: none

    .row
      --bs-gutter-x: 1rem

    .col
      height: 40px
      color: $color-white

      &.active
        background-color: $color-blue

        &:hover
          background-color: shade-color($color-blue, 15%)


      &:hover
        background-color: shade-color($color-blue, 35%)

.navbarIcon
  width: 30px
  height: 30px
  cursor: pointer
  border-radius: 50%

.userProfilePic
  overflow: hidden

.userIcon
  background-color: $color-white
  font-size: small
  color: $color-black

  &:hover
    background-color: shade-color($color-white, 5%)

.menuToggle:hover
  background-color: shade-color($color-blue, 35%)
</style>
