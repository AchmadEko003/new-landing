// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/scripts',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/leaflet'
  ],

  devtools: {
    enabled: true
  },

  app: {
    rootAttrs: {
      'data-vaul-drawer-wrapper': '',
      'class': 'bg-default'
    }
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/info/about-us': { prerender: true },
    '/contact-us': { prerender: true }
    // '/destinasi-populer/**': { swr: true, prerender: true },
    // '/trip/**': { swr: true, prerender: true }
  },

  compatibilityDate: '2025-01-15',

  // nitro: {
  //   prerender: {
  //     crawlLinks: true,
  //     routes: ['/']
  //   }
  // },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  image: {
    providers: {
      peponi: {
        name: 'peponi',
        provider: '~/providers/peponi.ts', // Path to custom provider
        options: {
          baseURL: 'http://103.189.234.243/img-asset'
        }
      }
    }
  }
})
