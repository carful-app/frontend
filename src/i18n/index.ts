import en from './locales/en.json'
import bg from './locales/bg.json'

type MessageSchema = typeof bg

export default createI18n<[MessageSchema], 'bg' | 'en'>({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  messages: {
    bg,
    en,
  },
})
