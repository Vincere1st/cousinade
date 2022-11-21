<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useDisplay, useTheme } from 'vuetify'
import { onBeforeMount } from '#imports'
import localStorage from '@supabase/gotrue-js/src/lib/local-storage'
import { ref, watch } from 'vue'
const layout = ref('default')

const theme = useTheme()

const { mobile } = useDisplay()

const defineLayout = ()=> {
  if (mobile.value) {
    console.log('mobile')
    layout.value ='mobile'
  } else {
    console.log('desktop')
    layout.value = 'default'
  }
}

watch(mobile, () => {
  defineLayout()
})

onBeforeMount(async () => {
  defineLayout()
  const userTheme = await localStorage.getItem('themeColor')
  if (userTheme) {
    theme.global.name.value = userTheme
  }
})
</script>
