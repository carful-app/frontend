<script setup lang="ts">
import { useCookies } from '@vueuse/integrations/useCookies'

const props = defineProps<{
  isInNav?: boolean
}>()

const { availableLocales, locale, t } = useI18n()
const cookies = useCookies(['locale'])

const caret = ref('caret-down')
const dropdown = ref()

const changeLanguage = (l: string) => {
  locale.value = l

  cookies.set('locale', l, { path: '/', expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365) })
}

const changeCaret = () => {
  caret.value = caret.value === 'caret-down' ? 'caret-up' : 'caret-down'
}

onMounted(() => {
  if (!dropdown.value) return

  dropdown.value.addEventListener('show.bs.dropdown', changeCaret)
  dropdown.value.addEventListener('hide.bs.dropdown', changeCaret)
})

onUnmounted(() => {
  if (!dropdown.value) return

  dropdown.value.removeEventListener('show.bs.dropdown', changeCaret)
  dropdown.value.removeEventListener('hide.bs.dropdown', changeCaret)
})
</script>

<template>
  <div :class="props.isInNav ? 'dropup' : 'dropdown'" ref="dropdown">
    <Button color="blue" outline class="w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      <font-awesome-icon icon="fa-solid fa-globe" />
      {{ t(`languages.${locale}`) }}
      <font-awesome-icon :icon="['fas', caret]" />
    </Button>
    <ul class="dropdown-menu w-100">
      <li v-for="l in availableLocales" :key="l">
        <a class="dropdown-item" href="#" @click="changeLanguage(l)">
          {{ t(`languages.${l}`) }}
        </a>
      </li>
    </ul>
  </div>
</template>
