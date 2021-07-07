import createPersistedState from "vuex-persistedstate";
import { createStore, Store } from 'vuex';
import { user, UserState } from './user';
import { game, GameState } from './game';

const state = {};

export type State = {
  user: UserState,
  game: GameState,
} & typeof state;

export default createStore({
  state,
  modules: {
    user,
    game,
  },
  plugins: [createPersistedState({
    paths: ["user"]
  })],
}) as Store<State>;
