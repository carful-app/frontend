import { User } from './auth'

provideApolloClient(apolloClient)

export const usePlanStore = defineStore('plan', () => {
  const plans = reactive<Plan[]>([])

  const plansMonthly = computed(() => {
    if (plans.length === 0) {
      return Array.from({ length: 3 }, (_, id) => ({
        id,
        name: '',
        slug: '',
        price: 0,
        priceFormatted: '',
        planType: { slug: '' },
        uses: 0,
        stripeId: '',
      }))
    }

    return plans.filter((plan) => plan.planType.slug === 'monthly')
  })

  const getPlans = () => {
    const { onResult, onError, loading } = useQuery(PLANS_QUERY)

    onResult((result) => {
      if (!result.loading) {
        plans.splice(0, plans.length, ...result.data.plans)
      }
    })

    onError(() => {
      console.error('Error while fetching plans')
    })

    return loading
  }

  const subscribeToPlan = () => {
    const { mutate, onDone } = useMutation(SUBSCRIBE_TO_PLAN_MUTATION, {
      update: (cache, { data: { subscribe } }) => {
        const { me } = cache.readQuery({
          query: AUTH_USER_QUERY,
        }) as { me: User }

        cache.writeQuery({
          query: AUTH_USER_QUERY,
          data: {
            me: {
              ...me,
              isComplete: subscribe,
            },
          },
        })
      },
    })

    return {
      mutate,
      onDone,
    }
  }

  const getPaymentIntent = () => {
    const { mutate, onDone } = useMutation(GET_PAYMENT_INTENT_MUTATION)

    return {
      mutate,
      onDone,
    }
  }

  return {
    plans,
    plansMonthly,

    getPlans,
    subscribeToPlan,
    getPaymentIntent,
  }
})

const PLANS_QUERY = gql`
  query Plans {
    plans {
      id
      name
      slug
      price
      priceFormatted
      planType {
        id
        name
        slug
      }
      uses
      stripeId
    }
  }
`

const SUBSCRIBE_TO_PLAN_MUTATION = gql`
  mutation SubscribeToPlan($planId: ID!, $paymentIntentId: String!) {
    subscribe(planId: $planId, paymentIntentId: $paymentIntentId)
  }
`

const GET_PAYMENT_INTENT_MUTATION = gql`
  mutation GetPaymentIntent($planId: ID!) {
    createPaymentIntent(planId: $planId)
  }
`

export type Plan = {
  id: number
  name: string
  slug: string
  price: number
  priceFormatted: string
  planType: PlanType
  uses: number
  stripeId: string
}

type PlanType = {
  id?: number
  name?: string
  slug: string
}
