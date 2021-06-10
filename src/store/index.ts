import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
  },
  mutations: {
    incrementCount: (state) => {
      ++state.count;
    },
    incrementCountBy: (state, value: number) => {
      state.count += value;
    },
    overflow: (state) => {
      state.count += 100;
    },
    reset: (state) => {
      state.count = 0;
    }
  },
  actions: {
    reset: (store, timeout: number) => {
      if (store.state.count === 0) return;

      store.commit('overflow');

      return new Promise<number>((resolve, reject) => {
        setTimeout(() => {
          if (store.state.count === 102) return reject();

          store.commit('reset');
          resolve(store.state.count);
        }, timeout);
      });
    }
    // reset: (store, payload: { timeout: number, callback: ()=> void }) => {
    //   if (store.state.count === 0) return;

    //   store.commit('overflow');

    //   setTimeout(() => {
    //     store.commit('reset');
    //     payload.callback();
    //   }, payload.timeout);
    // }
  },
  getters: {
  },
  modules: {
  }
})
