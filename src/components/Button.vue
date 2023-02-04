<script setup lang="ts">
const props = defineProps<{
  color: 'light' | 'dark' | 'blue'
  text?: boolean
  outline?: boolean
}>()

const { color, text, outline } = toRefs(props)
</script>

<template>
  <div class="d-grid">
    <button
      :class="{
        btn: true,
        light: color === 'light',
        dark: color === 'dark',
        blue: color === 'blue',
        text: text,
        outline: outline,
      }"
    >
      <slot />
    </button>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/styles/variables.sass'

@mixin button($style, $bg-color, $color)
    .#{$style}
        background-color: #{$bg-color}
        color: #{$color}

        &:hover
            background-color: darken($bg-color, 15%)
            color: darken($color, 15%)

        &.text
            background-color: transparent
            color: $bg-color

            &:hover
                background-color: fade-out($bg-color, 0.9)
                color: darken($bg-color, 15%)

        &.outline
            background-color: transparent
            border: 1px solid $bg-color
            color: $bg-color

            &:hover
                background-color: fade-out($bg-color, 0.9)
                border: 1px solid darken($bg-color, 15%)
                color: darken($bg-color, 15%)

@include button("light", $color-light-blue, $color-white)
@include button("dark", $color-dark-blue, $color-white)
@include button("blue", $color-blue, $color-white)
</style>
