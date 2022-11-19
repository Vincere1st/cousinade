<template>
  <!-- Markup shared across all pages, ex: NavBar -->
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()
const layout = mobile.value ? 'mobile' : 'default'
</script>
