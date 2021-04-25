<template>
  <div
    class="border-2 space-y-5 rounded-lg overflow-hidden mx-auto w-auto lg:w-1/4 lg:mt-20 h-screen lg:h-auto flex flex-col p-10"
  >
    <div class="space-y-4">
      <strong class="text-6xl">TO/DO</strong>
      <h1 class="font-black text-4xl">Entrar</h1>
    </div>
    <div class="flex flex-col">
      <button
        class="flex border-2 lg:text-lg cursor-pointer justify-center rounded-lg hover:bg-gray-100 items-center"
        @click="$auth.loginWith('discord')"
      >
        <img src="~/assets/img/discord.svg" alt="discord logo" class="h-auto" />
        Continuar com Discord
      </button>
    </div>
    <fieldset class="border-0 border-t-2 border-solid border-black">
      <legend class="mx-auto px-2">OU</legend>
    </fieldset>
    <form class="flex flex-col space-y-2" @submit.prevent="handleLogin">
      <label for="email">E-mail</label>
      <input
        id="email"
        v-model="email"
        type="email"
        required
        class="px-2 py-1 lg:text-lg border-2 rounded-lg focus:outline-none"
      />
      <label for="password">Senha</label>
      <div class="flex items-center relative">
        <input
          id="password"
          v-model="password"
          :type="inputType"
          required
          class="px-2 py-1 lg:text-lg border rounded-lg focus:outline-none w-full"
        />
        <font-awesome-icon
          icon="lock"
          class="absolute right-1 cursor-pointer"
          @click="showPass = !showPass"
        />
      </div>
      <button
        class="bg-primary-base lg:text-lg text-white flex border cursor-pointer justify-center rounded-lg hover:bg-blue-900 items-center"
      >
        Entrar
      </button>
    </form>
    <div class="text-center divide-y-5 divide-yellow-500">
      <p>
        Não tem conta?
        <nuxt-link to="/auth/register">Inscreva-se</nuxt-link>
      </p>
    </div>
    <Notify />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'auth',

  data: () => ({
    email: '',
    password: '',
    showPass: false,
  }),

  computed: {
    inputType() {
      return this.showPass ? 'text' : 'password'
    },
  },

  beforeMount() {
    if (this.$auth.loggedIn) {
      // this.$router.push('/app')
    }
  },

  methods: {
    handleLogin() {
      this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .catch((error) => {
          this.$notify(error.response.data.message, 4000, 'error', 'topRight')
        })
    },
  },
})
</script>

<style scoped>
input:invalid {
  @apply border-red-500;
  @apply text-red-500;
}
</style>
