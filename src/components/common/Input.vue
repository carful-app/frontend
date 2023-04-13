<script setup lang="ts">
type Validation = {
  $errors: {
    $message: string
    uuid: string
  }[]
}

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  type: 'email' | 'number' | 'password' | 'search' | 'text'
  placeholder?: string
  modelValue?: string
  validation?: unknown
}>()

const { type, placeholder } = toRefs(props)

const validation = computed(() => props.validation as Validation)

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

const maxChildCount = computed(() => {
  let count = 2

  if (showIconLeft.value) count++
  if (showIconRight.value) count++

  return count
})

const hasMoreChildren = computed(() => childrenCount.value > maxChildCount.value)

const inputGroupRef = ref<HTMLDivElement>()
const childrenCount = ref(0)

const observer = new MutationObserver(() => {
  if (inputGroupRef.value) {
    childrenCount.value = inputGroupRef.value.children.length
  }
})

onMounted(() => {
  if (inputGroupRef.value) {
    observer.observe(inputGroupRef.value, { childList: true })
  }
})
</script>

<template>
  <div
    ref="inputGroupRef"
    class="input-group mb-3 has-validation"
    :class="{
      'is-invalid': validation?.$errors.length,
      'has-more-children-3': hasMoreChildren && maxChildCount === 3,
      'has-more-children-4': hasMoreChildren && maxChildCount === 4,
    }"
  >
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
      <span class="d-block" v-for="error in validation?.$errors" :key="error.uuid">
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

.has-more-children-3
  .form-control
    border-top-right-radius: 0.375rem !important
    border-bottom-right-radius: 0.375rem !important

.has-more-children-4
  .input-group-text:not(:first-child)
    border-top-right-radius: 0.375rem !important
    border-bottom-right-radius: 0.375rem !important
</style>
