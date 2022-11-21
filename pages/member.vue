<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <v-expansion-panels variant="accordion">
          <v-expansion-panel>
            <v-expansion-panel-title>
              Informations personnels
            </v-expansion-panel-title>
            <v-expansion-panel-text class="ma-2 pa-2">
              <v-form
                ref="userForm"
                v-model="userFormValid"
              >
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
                <v-row no-gutters>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      label="Mot de passe"
                      v-model="password"
                      :type="showPassword"
                      :rules="[rules.required()]"
                      hint="Tapez votre mot de passe pour sauvegarder vos changements"
                      persistent-hint
                      class="pb-2"
                      density="compact"
                      :append-inner-icon="showPassword === PasswordEnum.text ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                      @click:append-inner="tooglePassword('showPassword')"
                    >
                      <!-- // TODO règle back sécurité, si owner ok , si admin ok-->
                    </v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <!--                  // TODO manage avatar file-->
                    <v-file-input
                      accept="image/*"
                      density="compact"
                      reverse
                      prepend-icon="mdi-camera"
                      label="Avatar/Photo"
                      hint="Un(e) petit(e) avatar/photo rendra le site plus vivant 😁"
                      persistent-hint
                    />
                  </v-col>
                </v-row>
                <v-row class="justify-end pr-3 pt-5">
                  <v-btn
                    variant="flat"
                    rounded="lg"
                    type="submit"
                    :disabled="userFormValid"
                    @click="sendUserInfo"
                  >
                    <span class="px-2">Sauvegarder</span>
                  </v-btn>
                </v-row>
              </v-form>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              Changement mot de passe
            </v-expansion-panel-title>
            <v-expansion-panel-text class="ma-2 pa-2">
              <v-form
                ref="passwordForm"
                v-model="passwordFormValid"
              >
                <v-row no-gutters>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      label="Ancien mot de passe"
                      :type="showOldPassword"
                      v-model="oldPassword"
                      :rules="[rules.required()]"
                      density="compact"
                      :append-inner-icon="showOldPassword === PasswordEnum.text ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                      @click:append-inner="tooglePassword('showOldPassword')"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      label="Nouveau mot de passe"
                      hint="8 caractères mini"
                      :rules="[rules.minLength(8), rules.required()]"
                      :type="showNewPassword"
                      v-model="newPassword"
                      density="compact"
                      :append-inner-icon="showNewPassword === PasswordEnum.text ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                      @click:append-inner="tooglePassword('showNewPassword')"
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
                      density="compact"
                      :append-inner-icon="showRepeatPassword === PasswordEnum.text ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                      @click:append-inner="tooglePassword('showRepeatPassword')"
                    />
                  </v-col>
                </v-row>
                <!-- // TODO règle back sécurité, ancien mot de passe ok et owner, changer mot de passe -->
                <v-row class="justify-end pr-3">
                  <v-btn
                    variant="flat"
                    rounded="lg"
                    type="submit"
                    :disabled="passwordFormValid"
                    @click="sendNewPassword"
                  >
                    <span class="px-2">Sauvegarder</span>
                  </v-btn>
                </v-row>
              </v-form>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              Préférences:
            </v-expansion-panel-title>
            <v-expansion-panel-text class="ma-2 pa-2">
              <v-row no-gutters>
                <v-col>
                  <v-switch
                    color="primary"
                    class="theme-switch"
                    prepend-icon="mdi-theme-light-dark"
                    @click="toggleTheme"
                  />
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { reactive, ref, useSupabase } from '#imports'
import { PasswordEnum } from '~/enums/userEnum'
import rules from '~/utils/rulingjs'
import type { VForm } from 'vuetify/components'
import { useTheme } from 'vuetify'
import localStorage from '@supabase/gotrue-js/src/lib/local-storage'

const member = reactive({
  lastname: 'name1',
  firstname: 'firstname1',
  address: 'street1'
})
const userForm = ref<VForm>()
const userFormValid = ref(false)
const passwordForm = ref<VForm>()
const passwordFormValid = ref(false)
const password = ref<string | null>(null)
const oldPassword = ref<string | null>(null)
const newPassword = ref<string | null>(null)
const repeatPassword = ref<string | null>(null)
const showPassword = ref(PasswordEnum.password)
const showOldPassword = ref(PasswordEnum.password)
const showNewPassword = ref(PasswordEnum.password)
const showRepeatPassword = ref(PasswordEnum.password)
const theme = useTheme()

const tooglePassword = (passwordTarget: string) => {
  switch (passwordTarget) {
    case 'showPassword':
      showPassword.value = showPassword.value === PasswordEnum.password ? PasswordEnum.text : PasswordEnum.password
      break
    case 'showOldPassword':
      showOldPassword.value = showOldPassword.value === PasswordEnum.password ? PasswordEnum.text : PasswordEnum.password
      break
    case 'showNewPassword':
      showNewPassword.value = showNewPassword.value === PasswordEnum.password ? PasswordEnum.text : PasswordEnum.password
      break
    case 'showRepeatPassword':
      showRepeatPassword.value = showRepeatPassword.value === PasswordEnum.password ? PasswordEnum.text : PasswordEnum.password
      break
    default:
      showPassword.value = PasswordEnum.password
      showOldPassword.value = PasswordEnum.password
      showNewPassword.value = PasswordEnum.password
      showRepeatPassword.value = PasswordEnum.password
  }
}

const sendUserInfo = async () => {
  if (userForm.value) {
    const { valid } = await userForm.value.validate()
    if (valid) {
    }
  }
}
const sendNewPassword = async () => {
  // TODO voir le typage de la ref et la validation du formulaire
  if (passwordForm.value) {
    const { valid } = await passwordForm.value.validate()
    if (valid) {
      // TODO send request
    }
  }
}


const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  localStorage.setItem('themeColor', theme.global.name.value)
}

// TODO faire la validation du renewPassword

</script>

<style scoped>

</style>
