import { ref } from '#imports'
import isEmpty from 'lodash/isEmpty'

export interface SnackbarButton {
  text?: string,
  action?: () => any
}

export interface SnackbarEntry {
  message?: string
  untranslatedMessage?: string
  info?: string
  icon?: string
  title?: string
  untranslatedTitle?: string
  color?: string
  multiLine?: boolean
  timeout?: number
  closable?: boolean
  button?: SnackbarButton
}

const entry = ref<SnackbarEntry | never>({})
const showSnackbar = ref(false)

function setSnackbarEntry (payload: SnackbarEntry): void {
  entry.value = {}
  showSnackbar.value = false
  if (!isEmpty(payload)) {
    showSnackbar.value = true
    if (payload.closable === undefined) {
      payload.closable = true
    }
  }
  entry.value = payload
}

function clearSnackbarEntry (): void {
  entry.value = {}
}

function currentSnackbarEntry (): SnackbarEntry | never {
  return entry.value
}

export const useSnackbar = () => {
  return {
    setSnackbarEntry,
    clearSnackbarEntry,
    currentSnackbarEntry,
    entry,
    showSnackbar
  }
}
