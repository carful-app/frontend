<template>
  <div class="d-flex flex-column vh-100">
    <ReloadPrompt />
    <NavBar />
    <div class="d-flex h-100 container flex-column py-2">
      <router-view />
    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/styles/variables.sass'

.container
  background-color: $color-light-blue
</style>
