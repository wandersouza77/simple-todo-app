<template>
  <div
    class="m-2 border-secondary-base border-8 relative h-20 w-auto"
    :class="task.completed ? 'bg-green-500' : 'bg-red-500'"
  >
    <span class="absolute top-0 left-0 cursor-pointer" @click="finishTask"
      >✔️</span
    >
    <span class="absolute top-0 left-5 cursor-pointer" @click="unfinishTask"
      >📂</span
    >
    <span class="absolute top-0 left-10 cursor-pointer" @click="removeTask"
      >❌</span
    >
    <span class="absolute top-0 right-0 cursor-pointer">
      <slot name="date" />
    </span>
    <div class="text-black w-full text-center mt-4 font-extrabold text-2xl">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['task', 'index'],
  methods: {
    finishTask() {
      this.$store.dispatch('todo/finishTask', {
        _id: this.task._id,
        index: this.index,
      })
    },
    unfinishTask() {
      this.$store.dispatch('todo/unfinishTask', {
        _id: this.task._id,
        index: this.index,
      })
    },
    removeTask() {
      this.$store.dispatch('todo/deleteTask', {
        id: this.task._id,
        index: this.index,
      })
    },
  },
})
</script>
