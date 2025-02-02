// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  css: ['@/assets/scss/main.scss'], // Add global SCSS file

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/core/variables.scss";`, // Auto-import variables
        },
      },
    },
  },
})
