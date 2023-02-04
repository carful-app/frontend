<script setup lang="ts">
const props = defineProps<{
  type: 'email' | 'number' | 'password' | 'search' | 'text'
  placeholder?: string
}>()

const { type, placeholder } = toRefs(props)

const slots = useSlots()

const showIconLeft = computed(() => slots.iconLeft)
const showIconRight = computed(() => slots.iconRight)
</script>

<template>
  <div class="input-group mb-3">
    <span class="input-group-text pe-0" v-if="showIconLeft">
      <slot name="iconLeft" />
    </span>
    <input class="form-control px-2" :type="type" :placeholder="placeholder" :aria-label="placeholder" />
    <span class="input-group-text ps-0" v-if="showIconRight">
      <slot name="iconRight" />
    </span>
  </div>
</template>
