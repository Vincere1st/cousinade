import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { md3 } from 'vuetify/blueprints'
import { defineNuxtPlugin } from '#app'

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#1C1B1F',
    'on-background': '#E6E1E5',
    primary: '#D0BCFF',
    'on-primary': '#371E73',
    secondary: '#CCC2DC',
    'on-secondary': '#332D41',
    surface: '#1C1B1F',
    'on-surface': '#E6E1E5',
    error: '#F2B8B5',
    'on-error': '#601410'
  }
}

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFBFE',
    'on-background': '#1C1B1F',
    primary: '#6750A4',
    'on-primary': '#FFFFFF',
    secondary: '#625B71',
    'on-secondary': '#FFFFFF',
    surface: '#FFFBFE',
    'on-surface': '#1C1B1F',
    error: '#B3261E',
    'on-error': '#FFFFFF'
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    blueprint: md3,
    theme: {
      defaultTheme: 'darkTheme',
      themes: {
        darkTheme,
        lightTheme
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
