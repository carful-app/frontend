import { GraphQLErrors } from '@apollo/client/errors'

export const useToastStore = defineStore('toast', () => {
  const toasts: Toast[] = reactive([])

  const lastId = ref(1)

  const getNewId = () => {
    return lastId.value++
  }

  const addToast = (toast: Toast) => {
    toasts.push(toast)
  }

  const removeToast = (id: number) => {
    const index = toasts.findIndex((toast) => toast.id === id)
    if (index !== -1) {
      toasts.splice(index, 1)
    }
  }

  const clear = () => {
    toasts.splice(0, toasts.length)
    lastId.value = 1
  }

  const addErrorToast = (message: string | string[], duration = 5000) => {
    addToast({
      id: getNewId(),
      type: 'danger',
      message,
      duration,
    })
  }

  const handleErrors = (message: string, graphQLErrors: GraphQLErrors) => {
    if (graphQLErrors.find((error) => error.extensions && 'validation' in error.extensions)) {
      graphQLErrors.forEach((error) => {
        if (error.extensions.validation) {
          const errors: string[] = []
          Object.values(error.extensions.validation).forEach((field) => {
            field.forEach((e: string) => {
              errors.push(e)
            })
          })

          addErrorToast(errors)
        }
      })
    } else {
      addErrorToast(message)
    }
  }

  return {
    toasts,
    addToast,
    removeToast,
    clear,
    getNewId,
    addErrorToast,

    handleErrors,
  }
})

type ToastType = 'success' | 'danger' | 'info' | 'warning'

export type Toast = {
  id: number
  type: ToastType
  message: string | string[]
  duration?: number
}
