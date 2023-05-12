<script setup lang="ts">
import { Plan } from '@/stores/plan'

const { t } = useI18n()

const props = defineProps<{
  plan?: Plan | null
  loading?: boolean
}>()

const emit = defineEmits(['choosePlan'])

const { plan, loading } = toRefs(props)
const buttonLoading = ref(false)

const choosePlan = () => {
  buttonLoading.value = true
  emit('choosePlan', plan?.value)
}
</script>

<template>
  <div class="card placeholder-glow" v-if="loading">
    <div class="card-body">
      <div class="card-title">
        <h4><span class="placeholder col-12"></span></h4>
      </div>
      <div class="card-subtitle">
        <h5><span class="placeholder col-10"></span></h5>
      </div>
      <p class="card-text"><span class="placeholder col-4"></span></p>

      <Button color="blue" btn-classes="disabled placeholder col-12"></Button>
    </div>
  </div>

  <div class="card" v-else>
    <div class="card-body">
      <div class="card-title">
        <h4>{{ plan?.name }}</h4>
      </div>
      <div class="card-subtitle">
        <h5>{{ plan?.priceFormated }}/{{ t('month') }}</h5>
      </div>
      <p class="card-text">{{ plan?.uses }} {{ t('uses') }}</p>
      <Button color="blue" @click="choosePlan()" :loading="buttonLoading">{{ t('Subscribe') }}</Button>
    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/styles/variables.sass'

.card-title
    h4
        color: $color-blue

.card-subtitle
    h5
        color: $color-dark-blue

.card-text
    color: $color-light-blue
</style>
