<template>
  <div class="position-absolute bottom-0 end-0 w-100 d-md-flex justify-content-center">
    <Transition
      enter-active-class="animate__animated animate__slideInUp"
      leave-active-class="animate__animated animate__slideOutDown"
    >
      <slot />
    </Transition>
  </div>
</template>
