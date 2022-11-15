<template>
  <v-row
    justify="center"
    align="center"
  >
    <v-col cols="6">
      <v-card>
        <v-card-title>
          Connexion
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="email"
            label="Email"
            :rules="[rules.email('Veuillez saisir un email valide.')]"
            prepend-icon="mdi-at"
          />
          <v-text-field
            v-model="password"
            label="Mot de passe"
            prepend-icon="mdi-lock"
            type="password"
          />
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            variant="flat"
            color="primary"
            @click="login"
          >
            <span class="mx-2">Se connecter</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import rules from 'rulingjs'
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
