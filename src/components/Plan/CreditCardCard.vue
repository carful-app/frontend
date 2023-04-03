<script setup lang="ts">
import { Plan } from '@/stores/plan'
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js'
import { Ref } from 'vue'

const router = useRouter()

const props = defineProps<{
  plan: Plan | null
}>()

const { plan } = toRefs(props)

const planStore = usePlanStore()
const { mutate: subscribeToPlanMutate, onDone } = planStore.subscribeToPlan()

const stripe: Ref<Stripe | null> = ref(null)
const cardElement: Ref<StripeCardElement | null> = ref(null)
const cardErrors = ref()

const handleSubmit = async () => {
  if (stripe.value) {
    const { error, paymentMethod } = await stripe.value.createPaymentMethod({
      type: 'card',
      card: cardElement.value as StripeCardElement,
    })

    if (error) {
      cardErrors.value.textContent = error.message
    } else {
      console.log(paymentMethod)
      subscribeToPlanMutate({ planId: plan.value?.id, paymentMethodId: paymentMethod?.id })
    }
  }
}

onDone(() => {
  router.push({ name: 'home' })
})

onMounted(async () => {
  stripe.value = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  cardElement.value =
    stripe.value?.elements().create('card', {
      classes: {
        base: 'card-element',
      },
      hidePostalCode: true,
      iconStyle: 'solid',
    }) ?? null
  cardElement.value?.mount('#card-element')
})
</script>

<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <div id="card-element"></div>
          <div id="card-errors" class="form-text" ref="cardErrors" role="alert"></div>
        </div>

        <div class="mb-3">
          <Button color="blue" type="submit">Submit</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/styles/variables.sass'

.card-element
    color: $color-blue
</style>
