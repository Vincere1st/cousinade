<template>
  <v-app id="inspire">
    <v-layout>
      <Navigation />
    </v-layout>
  </v-app>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
