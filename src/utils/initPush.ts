provideApolloClient(apolloClient)

export default function () {
  navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY),
    }

    serviceWorkerRegistration.pushManager.subscribe(subscribeOptions).then((pushSubscription) => {
      storePushSubscription(pushSubscription)
    })
  })
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function storePushSubscription(pushSubscription: PushSubscription) {
  const json = pushSubscription.toJSON()

  const { mutate } = useMutation(PUSH_SUBSCRIPTION_MUTATION, {
    variables: {
      subscription: {
        endpoint: json.endpoint,
        keys: {
          p256dh: json.keys?.p256dh || '',
          auth: json.keys?.auth || '',
        },
      },
    },
  })

  mutate()
}

const PUSH_SUBSCRIPTION_MUTATION = gql`
  mutation pushSubscription($subscription: PushSubscriptionInput!) {
    pushSubscription(subscription: $subscription)
  }
`
