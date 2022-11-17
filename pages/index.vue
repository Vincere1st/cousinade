<template>
  <v-row>
    <v-col
      v-for="house in houses"
      :key="house"
      cols="3"
    >
      <v-card height="200" />
    </v-col>
  </v-row>
</template>
<script setup>
definePageMeta({
  middleware: 'auth'
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
