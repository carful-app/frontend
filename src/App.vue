<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const { result } = useQuery(gql`
  query getUsers {
    users {
      data {
        id
        name
        email
      }
      paginatorInfo {
        total
        currentPage
        lastPage
        total
      }
    }
  }
`)
</script>

<template>
  <div>
    <h1>Users</h1>
    <ul>
      <li v-for="user in result?.users?.data" :key="user.id">
        {{ user.name }}
      </li>
    </ul>

    <div v-if="result?.users.paginatorInfo">
      <p>
        Page {{ result.users.paginatorInfo.currentPage }} of
        {{ result.users.paginatorInfo.lastPage }}
      </p>
      <p>Total {{ result.users.paginatorInfo.total }}</p>
    </div>
  </div>
</template>

<style scoped></style>
