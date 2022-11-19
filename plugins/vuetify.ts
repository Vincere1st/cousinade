import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { md3 } from 'vuetify/blueprints'
import { defineNuxtPlugin } from '#app'

const darkTheme: ThemeDefinition = {
  dark: true
}

const lightTheme: ThemeDefinition = {
  dark: false
}

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    blueprint: md3,
    display: {
      mobileBreakpoint: 'md',
    },
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
