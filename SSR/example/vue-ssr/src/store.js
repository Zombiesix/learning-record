import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

export default function createStore() {
  return new vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      init(state, count) {
        state.count = count
      },
      add(state) {
        state.count += 1
      }
    },
    actions: {
      getCount({ commit }) {
        return new Promise(resolve => {
          setTimeout(() => {
            commit('init', Math.random() * 100)
            resolve()
          }, 1000)
        })
      }
    }
  })
}
