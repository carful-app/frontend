<script setup lang="ts">
const props = defineProps<{
  isInNav?: boolean
}>()

const { availableLocales, locale, t } = useI18n()
const localStorageLocale = useLocalStorage('locale', import.meta.env.VITE_DEFAULT_LOCALE)

const caret = ref('caret-down')
const dropdown = ref()

const changeLanguage = (l: string) => {
  locale.value = l
  localStorageLocale.value = l
}

const changeCaret = () => {
  caret.value = caret.value === 'caret-down' ? 'caret-up' : 'caret-down'
}

onMounted(() => {
  locale.value = localStorageLocale.value

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
