<script setup lang="ts">
const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>

<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Profile</h5>
          <h6 class="card-subtitle mb-2 text-muted">User profile</h6>
          <div class="card-text">
            <div class="row">
              <div class="col-3">
                <strong>Name</strong>
              </div>
              <div class="col-9">
                {{ user.name }}
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <strong>Email</strong>
              </div>
              <div class="col-9">
                {{ user.email }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
