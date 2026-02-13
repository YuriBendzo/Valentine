// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ['@nuxt/fonts', '@nuxt/eslint', '@nuxtjs/google-fonts'],
  css: ['./app/assets/css/main.css'],
  fonts: {
    defaults: {
      weights: [400, 700],
    },
    families: [
      {
        name: 'Playpen Sans',
        provider: 'google',
      },
    ],
  }
})