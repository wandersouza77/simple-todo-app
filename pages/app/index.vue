<template>
  <main>
    <div class="w-full px-10 flex items-center justify-center mt-2">
      <input
        v-model="newTask"
        class="max-w-max text-4xl h-20 border-2 border-r-0 border-primary-base overflow-hidden outline-none py-2 px-5"
        type="text"
        placeholder="task"
      />
      <font-awesome-icon
        icon="paper-plane"
        style="font-size: 80px"
        class="bg-primary-base text-white p-2 hover:bg-primary-dark cursor-pointer"
        @click="addTask"
      />
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 w-full">
      <template v-for="(task, i) in $store.getters['todo/getTasks']">
        <AppTask :key="i" :task="task" :index="i">
          <template #date>{{
            new Date(task.date).toLocaleDateString()
          }}</template>
          <template #content>{{ task.content }}</template>
        </AppTask>
      </template>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'app',
  middleware: 'auth',
  data: () => ({
    newTask: '',
  }),

  async mounted() {
    await this.$store.dispatch('todo/fetchTasks')
  },

  methods: {
    addTask() {
      this.$store.dispatch('todo/createTask', this.newTask)
    },
  },
})
</script>
