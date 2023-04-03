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
        priceFormated: '',
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
      if (result) {
        plans.splice(0, plans.length, ...result.data.plans)
      }
    })

    onError(() => {
      console.error('Error while fetching plans')
    })

    return loading
  }

  const subscribeToPlan = () => {
    const { mutate, onDone } = useMutation(SUBSCRIBE_TO_PLAN_MUTATION)

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
  }
})

const PLANS_QUERY = gql`
  query Plans {
    plans {
      id
      name
      slug
      price
      priceFormated
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
  mutation SubscribeToPlan($planId: ID!, $paymentMethodId: String!) {
    subscribe(planId: $planId, paymentMethodId: $paymentMethodId)
  }
`

export type Plan = {
  id: number
  name: string
  slug: string
  price: number
  priceFormated: string
  planType: PlanType
  uses: number
  stripeId: string
}

type PlanType = {
  id?: number
  name?: string
  slug: string
}
