<template>
  <v-snackbar
    vertical
    :model-value="openSnackar"
    :color="'error'"
  >
    <div class="text-subtitle-1 pb-2">
      {{ errorTitle }}
    </div>
    <p>{{ errorMessage }}</p>
  </v-snackbar>
  <login-card
    :title="'Bienvenue sur le site de la cousinade!'"
    :description="description"
    :button-value="'S\'enregistrer'"
    @submit="register"
    @password="password = $event"
    @email="email = $event"
    :email="email"
    :show-email="false"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { definePageMeta, navigateTo, useSupabaseClient } from '#imports'
definePageMeta({
  layout: 'login'
})

const { auth } = useSupabaseClient()
const description = 'Nous allons créer ton compte, pour ce faire il faut que tu saisisse un mot de passe sécurisé ci-dessous (mini 8 caractères).<br />N\'oublie pas de le sauvegarder 😊'
const password = ref<string | null>(null)
const email = ref<string | null>(null)
const errorMessage = ref<string | null>(null)
const errorTitle = ref<string | null>(null)
const openSnackar = ref(false)

const initialize = async () => {
  const response = await auth.initialize()
  if (response.error) {
    if (response.error.message.includes('token is expired') || response.error.message.includes('has expired')) {
      openSnackar.value = true
      errorTitle.value = 'Erreur de lien.'
      errorMessage.value = 'Demande un nouveau lien à l\'admin.'
    } else {
      openSnackar.value = true
      errorTitle.value = 'Erreur.'
      errorMessage.value = 'Une erreur est survenue contacte l\'admin.'
      console.error(response.error)
    }
  }
}

onMounted(() => {
  console.log(process.env)
  initialize()
})

const register = async () => {
  console.log('register')
  if (password.value !== null) {
    const {
      error
    } = await auth.updateUser({
      password: password.value,
      data: {
        password_updated: true,
        role: 'admin'
      }
    })
    if (error) {
      throw error
    } else {
      navigateTo('')
    }
  }
}

</script>

<style scoped>

</style>
