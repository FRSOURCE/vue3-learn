import createPersistedState from "vuex-persistedstate";
import { createStore, Store } from 'vuex';

const userState = {
  difficulty: 'Junior',
  userName: '',
}

interface State {
  user: typeof userState,
}

const user = {
  state: () => userState,
   mutations: {
      setDifficulty(state: typeof userState, difficulty:string){
        state.difficulty = difficulty;
      },
      setUserName(state: typeof userState, userName:string){
        state.userName = userName;
      }
   },
}

const store = createStore({
  state: {},
  modules: {
    user: user,
  },
  plugins: [createPersistedState()],
}) as Store<State>

export default store;