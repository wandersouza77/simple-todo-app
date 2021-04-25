<template>
  <div
    class="border-2 space-y-5 rounded-lg overflow-hidden mx-auto w-auto lg:w-1/4 lg:mt-20 h-screen lg:h-auto flex flex-col p-10"
  >
    <div class="space-y-4">
      <strong class="text-6xl">TO/DO</strong>
      <h1 v-if="step === 1" class="font-black text-4xl">Inscreva-se</h1>
      <div v-else>
        <font-awesome-icon icon="chevron-left" class="mr-2" />
        <i>{{ email }}</i>

        <h1 class="font-black text-4xl">Quase lá</h1>
      </div>
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
    <form class="flex flex-col space-y-2" @submit.prevent="handleRegister">
      <label v-if="step === 1" for="email">E-mail</label>
      <input
        v-if="step === 1"
        id="email"
        v-model="email"
        type="email"
        required
        class="px-2 py-1 lg:text-lg border-2 rounded-lg focus:outline-none"
      />
      <label v-if="step === 2" for="name">Seu nome</label>
      <input
        v-if="step === 2"
        id="name"
        v-model="name"
        type="name"
        title="Nome deve ter conter entre 4 - 12 caracteres"
        pattern="[A-Za-z0-9]{4,12}"
        required
        class="px-2 py-1 lg:text-lg border rounded-lg focus:outline-none"
      />
      <label v-if="step === 2" for="password">Senha</label>
      <div v-if="step === 2" class="flex items-center relative">
        <input
          v-if="step === 2"
          id="password"
          v-model="password"
          :type="inputType"
          title="Senha deve ter conter entre 8 - 12 caracteres"
          pattern="[A-Za-z0-9]{8,12}"
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
        v-if="step === 1"
        class="bg-primary-base lg:text-lg text-white flex border cursor-pointer justify-center rounded-lg hover:bg-blue-900 items-center"
      >
        Entrar com e-mail
      </button>
      <button
        v-else
        class="bg-primary-base lg:text-lg text-white flex border cursor-pointer justify-center rounded-lg hover:bg-primary-dark items-center"
      >
        Inscreva-se agora
      </button>
    </form>
    <div class="text-center divide-y-5 divide-yellow-500">
      <p>
        Já se inscreveu?
        <nuxt-link to="/auth">Ir para login</nuxt-link>
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
    step: 1,
    email: '',
    name: '',
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
    handleRegister() {
      if (this.step === 1) {
        this.step = 2
        return
      }
      this.$axios
        .$post('/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$notify(
            'conta criada com sucesso! redirecionando',
            4000,
            'success',
            'topRight'
          )
        })
        .then(() => {
          setTimeout(() => {
            this.$auth.loginWith('local', {
              data: {
                name: this.name,
                email: this.email,
                password: this.password,
              },
            })
          }, 4000)
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
  @apply text-red-500;
  @apply border-red-500;
}
</style>
