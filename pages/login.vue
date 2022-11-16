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
import { ref, watchEffect } from 'vue'
import { navigateTo, useSupabaseClient, useSupabaseUser } from '#imports'

const user = useSupabaseUser()
const email = ref<string | null>(null)
const password = ref<string | null>(null)
const { auth } = useSupabaseClient()
const login = async () => {
  if (email.value && password.value) {
    const {
      data,
      error
    } = await auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if (error) {
      console.log(error)
    } else {
      console.log(data)
    }
  }
}

watchEffect(() => {
  if (user.value) {
    navigateTo('/')
  }
})
</script>

<style scoped>

</style>
