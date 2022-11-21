<template>
  <v-row>
    <v-col
      v-for="house in houses"
      :key="house"
      cols="12"
      md="3"
    >
      <v-card height="200" />
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { definePageMeta } from '#imports'

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const houses = [
  {
    picture: 'picture1',
    name: 'house1',
    town: 'Town1',
    description: 'description1'
  },
  {
    picture: 'picture2',
    name: 'house2',
    town: 'Town2',
    description: 'description2'
  }
]
</script>
