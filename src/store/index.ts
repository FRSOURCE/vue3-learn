import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    difficulty: 'Junior',
    userName : '',
  },
  mutations: {
    setDifficulty(state, difficulty:string){
      state.difficulty = difficulty;
    },
    setUserName(state, userName:string){
      state.userName = userName;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
