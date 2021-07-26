import createPersistedState from "vuex-persistedstate";
import { createStore, Store } from 'vuex';
import { user, UserState } from './user';
import { game, GameState } from './game';
import { editor, EditorState } from "./editor";

const state = {};

export type State = {
  user: UserState,
  game: GameState,
  editor: EditorState,
} & typeof state;

export default createStore({
  state,
  modules: {
    user,
    game,
    editor
  },
  plugins: [createPersistedState({
    paths: ["user"]
  })],
}) as Store<State>;
