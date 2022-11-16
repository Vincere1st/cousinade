<template>
  <v-form
    justify="center"
    ref="credentialsForm"
    class="h-100"
    v-model="valid"
  >
    <v-row
      justify="center"
      align="center"
      class="h-100"
    >
      <v-col cols="6">
        <v-card>
          <v-card-title class="mb-5">
            {{ title }}
          </v-card-title>
          <v-card-text>
            <v-row
              v-if="description"
              class="mb-5 ml-1"
            >
              <p>
                <span v-html="description"></span>
              </p>
            </v-row>
            <v-text-field
              v-if="showEmail"
              v-model="emailInput"
              label="Email"
              :rules="[rules.email('Veuillez saisir un email valide.')]"
              prepend-icon="mdi-at"
              @input="emit('email', $event.target.value)"
            />
            <v-text-field
              label="Mot de passe"
              type="password"
              :rules="[rules.minLength(8, 'Le mot de passe doit faire minimum 8 caratères'), rules.required()]"
              prepend-icon="mdi-lock"
              @input="emit('password', $event.target.value)"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn
              variant="flat"
              color="primary"
              @click="submit"
              :disabled="!valid"
            >
              <span class="mx-2">{{ buttonValue }}</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import rules from 'rulingjs'
import { ref, defineEmits, watch } from 'vue'
import { VForm } from 'vuetify/components'

const props = defineProps({
  email: {
    type: String,
    default: null
  },
  buttonValue: {
    type: String,
    default: 'Se connecter'
  },
  title: {
    type: String,
    default: 'S\'identifier'
  },
  description: {
    type: String,
    default: null
  },
  showEmail: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['submit', 'password', 'email'])
const emailInput = ref<string | null>(null)
const credentialsForm = ref()
const valid = ref(false)

watch(() => props.email, (email) => {
  if (props.showEmail) {
    emailInput.value = email
  }
}, { immediate: true })

const submit = () => {
  emit('submit')
}

</script>

<style scoped>

</style>
