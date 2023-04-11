<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  type: 'email' | 'number' | 'password' | 'search' | 'text'
  placeholder?: string
  modelValue?: string
  validation?: unknown
}>()

const { type, placeholder, validation } = toRefs(props)

const value = computed({
  get() {
    return props.modelValue ?? ''
  },
  set(value: string) {
    emit('update:modelValue', value)
  },
})

const slots = useSlots()

const showIconLeft = computed(() => slots.iconLeft)
const showIconRight = computed(() => slots.iconRight)
</script>

<template>
  <div class="input-group mb-3 has-validation" :class="{ 'is-invalid': validation?.$errors.length }">
    <span class="input-group-text pe-0" v-if="showIconLeft">
      <slot name="iconLeft" />
    </span>
    <input
      class="form-control px-2"
      :type="type"
      :placeholder="placeholder"
      :aria-label="placeholder"
      v-model="value"
    />
    <span class="input-group-text ps-0" v-if="showIconRight">
      <slot name="iconRight" />
    </span>
    <div class="invalid-feedback">
      <span v-for="error in validation?.$errors" :key="error.uuid">
        {{ error.$message }}
      </span>
    </div>
  </div>
</template>

<style lang="sass">
.is-invalid
  .input-group-text,
  .form-control
    border-color: var(--bs-red)

  .form-control:not(:first-child)
    border-left: 0

  .form-control:not(:last-child)
    border-right: 0

  .invalid-feedback
    display: block
</style>
