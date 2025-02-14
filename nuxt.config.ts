// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  css: ['@/assets/scss/main.scss'], // Add global SCSS file

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/core/variables.scss";
            @use "@/assets/scss/mixins/mediaqueries.scss";
          `, // Auto-import variables
        },
      },
    },
  },

  app: {
    head: {
      title: 'Letters of Love',
      meta: [
        { name: 'description', content: 'Send beautiful letters to loved ones' },
        { property: 'og:title', content: 'Letters of Love' },
        { property: 'og:description', content: 'Send beautiful letters to loved ones' },
        { property: 'og:image', content: 'https://lettersoflove.netlify.app/meta-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Letters of Love' },
        { name: 'twitter:description', content: 'Send beautiful letters to loved ones' },
        { name: 'twitter:image', content: 'https://lettersoflove.netlify.app/meta-image.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      encryptionKey: process.env.NUXT_PUBLIC_ENCRYPTION_KEY,
      encryptionAlgorithm: process.env.NUXT_PUBLIC_ENCRYPTION_ALGORITHM
    },
  },

  nitro: {
    preset: "netlify-edge"
  },
})
