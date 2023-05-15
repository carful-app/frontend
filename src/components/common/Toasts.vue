<script setup lang="ts">
import type { Toast as ToastType } from '@/stores/toast'
import { Toast } from 'bootstrap'

const toastStore = useToastStore()
const toasts = computed(() => toastStore.toasts)
const toastRefs = ref<HTMLElement[]>([])
const toastsShown = ref(0)

let initToastIds: number[] = []

watchEffect(() => {
  toastRefs.value.forEach((ref) => {
    const toast: ToastType = JSON.parse(ref.dataset.toast || '{}')

    if (initToastIds.includes(toast.id)) return

    const toastInstance = new Toast(ref)

    toastInstance.show()

    const timeout = setTimeout(() => {
      toastInstance.hide()
    }, toast.duration || 5000)

    ref.addEventListener('shown.bs.toast', () => {
      toastsShown.value++
    })

    ref.addEventListener('hidden.bs.toast', () => {
      clearTimeout(timeout)
      toastsShown.value--
    })

    initToastIds.push(toast.id)
  })
})

watch(toastsShown, (newValue, oldValue) => {
  if (newValue < oldValue && newValue === 0) {
    toastStore.clear()
    initToastIds = []
  }
})
</script>

<template>
  <div class="toast-container position-fixed top-0 end-0 p-3">
    <div
      class="toast align-items-center border-0"
      :class="`toast-${toast.type}`"
      role="toast"
      aria-live="assertive"
      aria-atomic="true"
      data-bs-autohide="false"
      ref="toastRefs"
      :data-toast="JSON.stringify(toast)"
      v-for="toast in toasts"
      :key="toast.id"
    >
      <div class="d-flex">
        <div class="toast-body" v-if="Array.isArray(toast.message)">
          <p class="mb-0" v-for="(message, i) in toast.message" :key="i">
            {{ message }}
          </p>
        </div>
        <div class="toast-body" v-else>{{ toast.message }}</div>
        <button
          type="button"
          class="btn-close btn-close me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
@import '~bootstrap/scss/bootstrap-utilities'

@mixin toast-variant($background, $border, $color)
  --#{$prefix}toast-color: #{$color} !important
  --#{$prefix}toast-bg: #{$background} !important
  --#{$prefix}toast-border-color: #{$border} !important


@each $state, $value in $theme-colors
  $toast-background: shift-color($value, $alert-bg-scale)
  $toast-border: shift-color($value, $alert-border-scale)
  $toast-color: shift-color($value, $alert-color-scale)

  @if (contrast-ratio($toast-background, $toast-color) < $min-contrast-ratio)
    $toast-color: mix($value, color-contrast($toast-background), abs($alert-color-scale))

  .toast-#{$state}
    @include toast-variant($toast-background, $toast-border, $toast-color)
</style>
