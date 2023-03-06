<script setup lang="ts">
const router = useRouter()

const props = defineProps<{
  cardRouteName: string
}>()

const cardRoute = computed(() => router.resolve({ name: props.cardRouteName }))

const showCard = computed(() => router.currentRoute.value.name === cardRoute.value.name)

const cardAlreadyShown = computed(
  () =>
    router.currentRoute.value.fullPath != cardRoute.value.fullPath &&
    router.currentRoute.value.fullPath.startsWith(cardRoute.value.fullPath)
)
</script>

<template>
  <router-view v-slot="{ Component }">
    <div class="position-absolute bottom-0 end-0 w-100">
      <Transition
        :enter-active-class="!cardAlreadyShown ? 'animate__animated animate__slideInUp' : ''"
        leave-active-class="animate__animated animate__slideOutDown"
      >
        <component :is="Component" v-if="showCard || cardAlreadyShown" :key="cardRouteName" />
      </Transition>
    </div>
  </router-view>
</template>
