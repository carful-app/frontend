<script setup lang="ts">
import { loadStripe, Stripe, StripeCardElement, StripeElements, StripePaymentElement } from '@stripe/stripe-js'
import { Ref } from 'vue'

const router = useRouter()

const props = defineProps<{
  paymentIntentSecret: string
  planId: number | undefined
}>()

const { paymentIntentSecret, planId } = toRefs(props)

const planStore = usePlanStore()
const { mutate: subscribeToPlanMutate, onDone: subscribeToPlanonDone } = planStore.subscribeToPlan()

const stripe: Ref<Stripe | null> = ref(null)
const cardElement: Ref<StripeCardElement | undefined> = ref()
const cardErrors = ref()

const buttonLoading = ref(false)

const handleSubmit = async () => {
  if (stripe.value) {
    buttonLoading.value = true
    const result = await stripe.value.confirmCardPayment(paymentIntentSecret.value, {
      payment_method: {
        card: cardElement.value!,
      },
    })

    if (result.error) {
      cardErrors.value.textContent = result.error.message
      buttonLoading.value = false
    } else {
      subscribeToPlanMutate({ planId: planId.value, paymentIntentId: result.paymentIntent?.id })
    }
  }
}

subscribeToPlanonDone(() => {
  router.push({ name: 'home' })
})

onMounted(async () => {
  stripe.value = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

  const elements = stripe.value?.elements({
    clientSecret: paymentIntentSecret.value,
  })

  if (elements) {
    cardElement.value = elements.create('card', {
      classes: {
        base: 'card-element',
      },
      hidePostalCode: true,
      iconStyle: 'solid',
    })
    cardElement.value?.mount('#card-element')
  }
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
          <Button color="blue" type="submit" :loading="buttonLoading">Submit</Button>
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
