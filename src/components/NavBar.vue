<script setup lang="ts">
const authStore = useAuthStore()
const { mutate: logoutMutate } = authStore.getLogoutMutation()
</script>

<template>
  <div id="navbar" class="d-flex flex-row">
    <font-awesome-icon icon="fa-solid fa-bars" />

    <div>NavBar</div>

    <button @click="logoutMutate">Logout</button>
  </div>
</template>

<style lang="css">
#navbar {
  background-color: #000;
  color: #fff;
  height: 50px;
  width: 100%;
}
</style>
