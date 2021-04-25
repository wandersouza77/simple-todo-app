<template>
  <div :class="[$style.app, 'h-screen']">
    <AppHeader class="col-span-2" />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  middleware: 'auth',
})
</script>

<style lang="scss" module>
.app {
  display: grid;
  grid-template-columns: minmax(280px, 1fr);
  grid-template-rows: minmax(80px, 8%) 1fr;
}
</style>
