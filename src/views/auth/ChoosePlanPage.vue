<script setup lang="ts">
import { Plan } from '@/stores/plan'
import { Ref } from 'vue'

const planStore = usePlanStore()
const { mutate: getPaymentIntentMutate, onDone: getPaymentIntentOnDone } = planStore.getPaymentIntent()

const isLoading = planStore.getPlans()

const plans = computed(() => planStore.plansMonthly)
const planChoosed = ref<Plan | null>(null)
const paymentIntentSecret = ref('')
const isPlansVisible = ref(true)
const cards: Ref<HTMLElement[]> = ref([])

const choosePlan = (plan: Plan) => {
  planChoosed.value = plan
  getPaymentIntentMutate({ planId: plan.id })
}

const mainContainerMaxHeight = computed(() => {
  const cardsHeight = cards.value.reduce((acc, curr) => {
    const cardHeight = curr.children[0].clientHeight + 5
    const cardMargin = parseInt(getComputedStyle(curr).marginTop)

    return acc + cardHeight + cardMargin
  }, 0)

  return cardsHeight
})

const { height } = useWindowSize()

getPaymentIntentOnDone(({ data }) => {
  paymentIntentSecret.value = data.createPaymentIntent
  isPlansVisible.value = false
})
</script>

<template>
  <div class="container">
    <div class="row justify-content-center px-2 py-3 vh-100 align-content-center">
      <h2 class="text-center text-white header" :class="{ center: isPlansVisible }">
        {{ isPlansVisible ? 'Choose your plan' : 'Enter your payment information' }}
      </h2>

      <Transition
        mode="out-in"
        :duration="150"
        leave-active-class="animate__animated animate__slideOutLeft"
        enter-active-class="animate__animated animate__slideInRight"
      >
        <div
          class="row justify-content-center overflow-scroll g-3 mt-0"
          :class="{ 'main-container': mainContainerMaxHeight > height }"
          v-if="isPlansVisible"
        >
          <div class="col-12 col-md-7 col-lg-4" v-for="plan in plans" :key="plan.id" ref="cards">
            <PlanCard :plan="plan" :loading="isLoading" @choose-plan="choosePlan" />
          </div>
        </div>
        <div class="row justify-content-center overflow-scroll g-3 mt-0" v-else>
          <div class="col-12 col-md-7 col-lg-4">
            <CreditCardCard :payment-intent-secret="paymentIntentSecret" :plan-id="planChoosed?.id" />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/styles/variables.sass'

body
  background-color: $color-dark-blue !important

.header
    height: 60px

    &.center
        line-height: 60px

.animate__animated
    animation-duration: 0.15s

.main-container
  height: calc(100% - 60px)
</style>
