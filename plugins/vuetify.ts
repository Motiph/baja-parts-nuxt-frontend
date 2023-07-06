import '@fortawesome/fontawesome-free/css/all.css'

import { createVuetify } from 'vuetify';
import { aliases, fa } from 'vuetify/iconsets/fa'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';


const dreamBridgeTheme = {
  dark: false,
  colors: {
    background: '#080a46',
    primary: '#080a46',
    secondary: '#3b795b',
  }
}

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'fa',
      aliases,
      sets: {
        fa,
      }
    },
    theme: {
      defaultTheme: 'dreamBridgeTheme',
      themes: {
        dreamBridgeTheme
      }
    }

  })

  nuxtApp.vueApp.use(vuetify);
})

