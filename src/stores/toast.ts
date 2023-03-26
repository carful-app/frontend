export const useToastStore = defineStore('toast', () => {
  const toasts: Toast[] = reactive([])

  const lastId = ref(1)

  const getNewId = () => {
    return lastId.value++
  }

  const addToast = (toast: Toast) => {
    toasts.push(toast)
  }

  const clear = () => {
    toasts.splice(0, toasts.length)
    lastId.value = 1
  }

  return {
    toasts,
    addToast,
    clear,
    getNewId,
  }
})

export type Toast = {
  id: number
  type: 'success' | 'danger' | 'info' | 'warning'
  message: string
  duration?: number
}
