import { MutationTree } from 'vuex'

export const state = () => ({
  message: '',
  duration: 0,
  type: '',
  location: '',
})

export type NotifyState = ReturnType<typeof state>

export const mutations: MutationTree<NotifyState> = {
  SHOW_MESSAGE: (state, payload: NotifyState) => {
    state.message = payload.message
    state.duration = payload.duration
    state.type = payload.type
    state.location = payload.location
  },
}
