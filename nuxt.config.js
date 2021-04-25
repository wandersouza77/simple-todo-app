import env from './env'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'simple-todo-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: ['~/assets/scss/global.scss'],
  // styleResources: {
  //   scss: '~/assets/scss/colors.scss',
  // },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/notify.ts'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv',
    '@nuxtjs/fontawesome',
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  tailwindcss: {
    jit: true,
  },

  fontawesome: {
    icons: {
      solid: [
        'faBars',
        'faHome',
        'faSearch',
        'faPlus',
        'faLock',
        'faLockOpen',
        'faChevronLeft',
        'faSignOutAlt',
        'faPaperPlane',
      ],
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios

  axios: {
    baseURL: env.apiUrl,
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'get' },
          user: { url: '/user', method: 'get' },
        },
        user: {
          property: 'account',
        },
        token: {
          type: '',
          property: 'token',
          required: true,
        },
      },
      discord: {
        clientId: env.clientId,
        clientSecret: env.clientSecret,
        grantType: 'authorization_code',
        codeChallengeMethod: '',
      },
    },
    redirect: {
      login: '/auth',
      logout: '/auth',
      home: '/app',
    },
  },

  serverMiddleware: [{ path: '/', handler: '~/server-middleware/api.ts' }],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
