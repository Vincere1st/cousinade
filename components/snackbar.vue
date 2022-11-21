<template>
  <v-snackbar
    class="snackbar-global"
    :multi-line="currentSnackbarEntry ? !!currentSnackbarEntry.title && !!currentSnackbarEntry.message : false"
    v-bind="currentSnackbarEntry"
    v-model="snackbarDisplayed"
  >
    <v-row no-gutters>
      <v-col
        cols="auto"
        v-if="currentSnackbarEntry.icon"
        class="pr-2"
      >
        <v-icon class="vertical-center">
          {{ currentSnackbarEntry.icon }}
        </v-icon>
      </v-col>
      <v-col class="white--text">
        <v-row no-gutters>
          <v-col
            cols="12"
            v-if="currentSnackbarEntry.title"
          >
            <h4>{{ currentSnackbarEntry.title }}</h4>
          </v-col>
          <v-col
            cols="12"
            v-if="currentSnackbarEntry.message"
          >
            <span v-html="currentSnackbarEntry.message" />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="auto"
        class="pl-3"
        v-if="currentSnackbarEntry.button"
      >
        <v-btn
          dark
          text
          @click="performButtonAction()"
          class="vertical-center"
        >
          {{ currentSnackbarEntry.button.text }}
        </v-btn>
      </v-col>
      <v-col
        cols="auto"
        class="pl-2"
        v-if="currentSnackbarEntry.closable"
      >
        <v-btn
          variant="text"
          color="black"
          icon="mdi-close"
          @click="snackbarDisplayed = false"
          class="vertical-center font-weight-bold"
        />
      </v-col>
    </v-row>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, watch } from '#imports'
import { SnackbarEntry, useSnackbar } from '~/composables/useSnackbar'

const snackbarDisplayed = ref(false)
const snackbar = useSnackbar()
const currentSnackbarEntry = ref<SnackbarEntry>({})

watch(snackbar.entry, () => {
  currentSnackbarEntry.value = snackbar.entry.value
  snackbarDisplayed.value = snackbar.showSnackbar.value
})

const performButtonAction = () => {
  const button = currentSnackbarEntry.value.button
  if (button && button.action) {
    button.action()
  }
}
</script>

<style lang="scss" scoped>
.snackbar-global:deep(.v-snack__wrapper) {
    max-width: initial !important;

  .snack__content {
    height: initial !important;

    .btn {
      margin-left: 0 !important;
    }
  }
}
</style>