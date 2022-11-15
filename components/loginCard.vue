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
          <v-card-title>
            {{ title }}
          </v-card-title>
          <v-card-text>
            <v-row v-if="description" class="mb-5">
              <p>
                <span v-html="description"></span>
              </p>
            </v-row>
            <v-text-field
              v-if="showEmail"
              :value="props.email"
              label="Email"
              :rules="[rules.email('Veuillez saisir un email valide.')]"
              prepend-icon="mdi-at"
              @input="$emit('update:email', $event.target.value)"
            />
            <v-text-field
              :value="props.password"
              label="Mot de passe"
              type="password"
              :rules="[rules.minLength(8, 'Le mot de passe doit faire minimum 8 caratères'), rules.required()]"
              prepend-icon="mdi-lock"
              @input="$emit('update:password', $event.target.value)"
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
import { ref } from 'vue'
import { VForm } from 'vuetify/components'
const props = defineProps({
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
  email: {
    type: String,
    default: null
  },
  password: {
    type: String,
    default: null
  },
  showEmail: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits<{
  (e: 'submit'): void
  (e: 'update:email'): void
  (e: 'update:password'): void
}>()
const credentialsForm = ref()
const valid = ref(false)
const submit = () => {
  console.log('submit')
  emit('submit')
}

</script>

<style scoped>

</style>
