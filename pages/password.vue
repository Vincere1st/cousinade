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
  <v-form
    v-model="formValid"
    ref="form"
  >
    <v-card>
      <v-card-title>
        Bienvenue sur le site de la cousinade
      </v-card-title>
      <v-card-subtitle>
        Rempli tes infos stp
      </v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              label="Nom"
              v-model="member.lastname"
              :rules="[rules.required()]"
              density="compact"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              label="Prénom"
              v-model="member.firstname"
              :rules="[rules.required()]"
              density="compact"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col
            cols="12"
          >
            <v-text-field
              label="Adresse:"
              v-model="member.address"
              :rules="[rules.required()]"
              density="compact"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            <v-text-field
              label="Nouveau mot de passe"
              hint="8 caractères mini"
              :rules="[rules.minLength(8), rules.required()]"
              :type="showPassword"
              v-model="password"
              ref="refPassword"
              density="compact"
              :append-inner-icon="showPassword === PasswordEnum.text ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              @click:append-inner="tooglePassword('showPassword')"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <v-text-field
              label="Retaper mot de passe"
              hint="8 caractères mini"
              :rules="[rules.minLength(8), rules.required()]"
              :type="showRepeatPassword"
              v-model="repeatPassword"
              ref="refRepeatPassword"
              density="compact"
              :append-inner-icon="showRepeatPassword === PasswordEnum.text ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              @click:append-inner="tooglePassword('showRepeatPassword')"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          variant="flat"
          rounded="lg"
          type="submit"
          :disabled="formValid"
          @click="register"
        >
          <span class="px-2">Sauvegarder</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
import { definePageMeta, navigateTo, reactive, useSupabase, onMounted, ref, watch } from '#imports'
import type { VForm } from 'vuetify/components'
import type { VTextField } from 'vuetify/components/'
import rules from '~/utils/rulingjs'
import { PasswordEnum } from '~/enums/userEnum'

definePageMeta({
  layout: 'login'
})

const refPassword = ref<VTextField>()
const refRepeatPassword = ref<VTextField>()

const form = ref<VForm>()
const supabase = useSupabase()
const formValid = ref(false)

const password = ref<string | null>(null)
const repeatPassword = ref<string | null>(null)
const showPassword = ref(PasswordEnum.password)
const showRepeatPassword = ref(PasswordEnum.password)

const openSnackar = ref(false)
const errorTitle = ref<string | null>(null)
const errorMessage = ref<string | null>(null)

const member = reactive({
  lastname: null,
  firstname: null,
  address: null
})

const initialize = async () => {
  const response = await supabase.auth.initialize()
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
  initialize()
})

const tooglePassword = (passwordTarget: string) => {
  switch (passwordTarget) {
    case 'showPassword':
      showPassword.value = showPassword.value === PasswordEnum.password ? PasswordEnum.text : PasswordEnum.password
      break
    case 'showRepeatPassword':
      showRepeatPassword.value = showRepeatPassword.value === PasswordEnum.password ? PasswordEnum.text : PasswordEnum.password
      break
    default:
      showPassword.value = PasswordEnum.password
      showRepeatPassword.value = PasswordEnum.password
  }
}


const register = async () => {
  console.log('register')
  if (password.value !== null && repeatPassword.value !== null) {
    if (password.value !== repeatPassword.value) {
        // TODO Snackbar
    } else {
      const {
        error
      } = await supabase.auth.updateUser({
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
}

</script>

<style scoped>

</style>
