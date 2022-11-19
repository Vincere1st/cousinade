<template>
  <login-card
    :title="'Bienvenue sur le site de la cousinade!'"
    :button-value="'Se connecter'"
    @submit="login"
    @password="password = $event"
    @email="email = $event"
    :email="email"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { definePageMeta, navigateTo, useSupabase } from '#imports'

definePageMeta({
  layout: 'login'
})
const supabase = useSupabase()

const email = ref<string | null>(null)
const password = ref<string | null>(null)
const login = async () => {
  if (email.value && password.value) {
    const {
      user,
      session,
      error
    } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if (error) {
      // TODO manage error
      console.log(error)
    } else {
      navigateTo('/')
    }
  }
}
</script>

<style scoped>

</style>
