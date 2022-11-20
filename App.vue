<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useDisplay, useTheme } from 'vuetify'
import { onBeforeMount } from '#imports'
import localStorage from '@supabase/gotrue-js/src/lib/local-storage'
const theme = useTheme()
const { mobile } = useDisplay()
const layout = mobile.value ? 'mobile' : 'default'

onBeforeMount(async ()=> {
  const userTheme = await localStorage.getItem('themeColor')
  if (userTheme) {
    theme.global.name.value = userTheme
  }
})
</script>
