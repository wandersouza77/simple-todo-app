import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  interface Vue {
    $notify(
      message: string,
      duration: number,
      type: string,
      location: string
    ): void
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$ dentro de asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $notify(
      message: string,
      duration: number,
      type: string,
      location: string
    ): void
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $notify(
      message: string,
      duration: number,
      type: string,
      location: string
    ): void
  }
}

declare module 'vuex/types/index' {
  // this.$ dentro de stores Vuex
  /* eslint-disable */
  interface Store<S> {
    $notify(message: string, duration: number, type: string, location: string): void
  }
}

const notifyPlugin: Plugin = ({ store }, inject) => {
  inject('notify', (message: string, duration: number, type: string, location: string) => {
    store.commit('notify/SHOW_MESSAGE', { message, duration, type, location })
  })
}

export default notifyPlugin
