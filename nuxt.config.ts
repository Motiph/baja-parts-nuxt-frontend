// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
      'vuetify/lib/styles/main.sass',
      '@mdi/font/css/materialdesignicons.min.css',
      '/assets/css/global.css'
    ],

    build: {
      transpile: ['vuetify']
    },

    typescript: {
      shim: false
    },

    modules: [
      '@nuxt/devtools'
    ],

    devtools: {
      enabled: true
    },

    runtimeConfig: {
      public: {
        baseUrl: process.env.API_BASE_URL || 'http://localhost:8000/api',
      }
    },

    // components: [
    //   {
    //     path: '~/components',
    //     pathPrefix: false,
    //   }
    // ]
})
