<template>
  <header
    class="flex justify-between items-center px-2 bg-primary-base text-white"
  >
    <div class="text-2xl md:text-6xl font-bold">
      <nuxt-link class="text-white" to="/app">TO/DO APP</nuxt-link>
    </div>
    <div v-if="$auth.strategy.name === 'local'" class="flex items-center">
      <p class="text-1xl md:text-4xl">
        {{ $auth.user.name }}
      </p>
      <font-awesome-icon
        icon="sign-out-alt"
        title="sair"
        style="font-size: 30px"
        class="cursor-pointer hover:text-gray-100 mx-5"
        @click="$auth.logout('local')"
      />
    </div>
    <div v-else class="flex items-center">
      <img
        class="rounded-full w-12"
        :src="`https://cdn.discordapp.com/avatars/${$auth.user.id}/${$auth.user.avatar}.jpg`"
      />
      <p class="text-1xl md:text-4xl">
        {{ $auth.user.username
        }}<span class="text-gray-200">{{ $auth.user.discriminator }}</span>
      </p>
      <font-awesome-icon
        icon="sign-out-alt"
        title="sair"
        style="font-size: 30px"
        class="cursor-pointer hover:text-gray-100 mx-5"
        @click="$auth.logout('local')"
      />
    </div>
  </header>
</template>
