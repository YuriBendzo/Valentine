// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ['@nuxt/fonts', '@nuxt/eslint'],

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
  },

  app: {
    baseURL: '/',
    head: {
      htmlAttrs: { lang: 'uk' },
      title: 'Важливе питання',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Натисни "Так" — якщо зможеш 😏' },
        { property: 'og:title', content: 'Важливе питання' },
        { property: 'og:description', content: 'Натисни "Так" — якщо зможеш 😏' },
        { property: 'og:type', content: 'website' },
        { name: 'theme-color', content: '#fdf2f8' },
      ],
    },
  },
})