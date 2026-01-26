// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    rootAttrs: {
      "data-vaul-drawer-wrapper": "",
      class: "bg-default",
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxt/scripts",
    "@pinia/nuxt",
    "@vueuse/nuxt",
  ],

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { prerender: true },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL,
    },
  },

  image: {
    providers: {
      peponi: {
        name: "peponi",
        provider: "~/providers/peponi.ts", // Path to custom provider
        options: {
          baseURL: "http://103.189.234.243/img-asset",
        },
      },
    },
  },

  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
