import { createStore } from 'vuex'

export default createStore({
  state: {
    difficulty: 'Junior',
  },
  mutations: {
    setDifficulty(state, difficulty:string){
      state.difficulty = difficulty;
    }
  },
  actions: {
  },
  modules: {
  }
})
