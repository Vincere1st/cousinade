<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <v-form ref="formUser">
          <v-card class="ma-2 pa-2">
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
                    density="comfortable"
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
                    density="comfortable"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    label="Adresse:"
                    v-model="member.address"
                    :rules="[rules.required()]"
                    density="comfortable"
                  />
                </v-col>
              </v-row>
              <v-row>
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
                  <v-file-input />
                </v-col>
                <v-col
                  cols="12"
                >
                  <!-- // TODO manage theme color and store in database userProfile -->
                  <v-switch />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn @click="sendUserInfo">
                Envoyer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
        <v-form ref="formPassword">
          <v-card class="ma-2">
            <v-card-title> Nouveau de mot de passe</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Ancien mot de passe"
                    :type="showOldPassword"
                    v-model="oldPassword"
                    :append-inner-icon="showOldPassword === PasswordEnum.text ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append-inner="tooglePassword('showOldPassword')"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Nouveau mot de passe"
                    hint="8 caractères mini"
                    :rules="[rules.minLength(8), rules.required()]"
                    :type="showNewPassword"
                    v-model="newPassword"
                    :append-inner-icon="showNewPassword === PasswordEnum.text ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append-inner="tooglePassword('showNewPassword')"
                  />
                  <v-spacer />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Retaper mot de passe"
                    hint="8 caractères mini"
                    :rules="[rules.minLength(8), rules.required()]"
                    :type="showRepeatPassword"
                    v-model="repeatPassword"
                    :append-inner-icon="showRepeatPassword === PasswordEnum.text ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append-inner="tooglePassword('showRepeatPassword')"
                  />
                </v-col>
              </v-row>
              <!-- // TODO règle back sécurité, ancien mot de passe ok et owner, changer mot de passe -->
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn>Envoyer</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from '#imports'
import { PasswordEnum } from '~/enums/userEnum'
import rules from 'rulingjs'
import { VForm } from 'vuetify/components/VForm'

const member = {
  lastname: 'name1',
  firstname: 'firstname1',
  address: 'street1'
}

const formUser = ref<VForm>()
const formPassword = ref<VForm| null>(null)
const password = ref<string | null>(null)
const oldPassword = ref<string | null>(null)
const newPassword = ref<string | null>(null)
const repeatPassword = ref<string | null>(null)
const showPassword = ref(PasswordEnum.password)
const showOldPassword = ref(PasswordEnum.password)
const showNewPassword = ref(PasswordEnum.password)
const showRepeatPassword = ref(PasswordEnum.password)

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

const sendUserInfo = () => {
  // TODO voir le typage de la ref et la validation du formulaire
  // const { valid } =
}

// TODO faire la validation du renewPassword

</script>

<style scoped>

</style>
