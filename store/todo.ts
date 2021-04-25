import { GetterTree, MutationTree, ActionTree } from 'vuex'

interface TaskData {
  tasks: Array<{
    id: string
    date: string
    content: string
    completed: boolean
  }>
}

export const state = () => ({
  tasks: [],
})

export const getters: GetterTree<TaskData, TaskData> = {
  getTasks: (state) => state.tasks,
}

export const actions: ActionTree<TaskData, TaskData> = {
  async fetchTasks({ commit }) {
    try {
      const tasks = await this.$axios.$get('/task')
      commit('SET_STATE', tasks)
    } catch (error) {}
  },

  async createTask({ dispatch }, content) {
    try {
      await this.$axios.$post('/task', { content })
      dispatch('fetchTasks')
    } catch (error) {}
  },

  async finishTask({ commit }, { _id, index }) {
    try {
      await this.$axios.$patch('/task', { taskData: { _id, completed: true } })
      commit('FINISH_TASK', index)
    } catch (error) {}
  },
  async unfinishTask({ commit }, { _id, index }) {
    try {
      await this.$axios.$patch('/task', { taskData: { _id, completed: false } })
      commit('UNFINISH_TASK', index)
    } catch (error) {}
  },

  deleteTask({ commit }, { id, index }) {
    try {
      this.$axios.$delete('/task', { data: { id } })
      commit('REMOVE_TASK', index)
    } catch (error) {}
  },
}

export const mutations: MutationTree<TaskData> = {
  SET_STATE: (state, payload) => {
    state.tasks = payload
  },

  ADD_TASK: (state, payload) =>
    state.tasks.push({
      id: payload.id,
      date: new Date().toLocaleDateString(),
      content: payload.content,
      completed: payload.completed,
    }),
  REMOVE_TASK: (state, payload) => state.tasks.splice(payload, 1),
  FINISH_TASK: (state, payload) => (state.tasks[payload].completed = true),
  UNFINISH_TASK: (state, payload) => (state.tasks[payload].completed = false),
}
