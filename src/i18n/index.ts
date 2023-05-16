import en from './locales/en.json'
import bg from './locales/bg.json'

type MessageSchema = typeof bg

const bgPlurarizartionRule = (choice: number) => {
  if (choice <= 1) {
    return 0
  }

  return 1
}

export default createI18n<[MessageSchema], 'bg' | 'en'>({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  messages: {
    bg,
    en,
  },
  pluralRules: {
    bg: bgPlurarizartionRule,
  },
})
