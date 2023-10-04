// store.js
import { createStore } from 'vuex';

const store = createStore({
    state: {
            userId: null
        },
        mutations: {
            setUserId(state, userId) {
            state.userId = userId
            }
        },
        actions: {
            setUserId({ commit }, id) {
            commit('setUserId', id);
            },
        },
        getters: {
            getUserId: (state) => state.userId,
        },
});

export default store;
// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//     userId: null
//   },
//   mutations: {
//     setUserId(state, userId) {
//       state.userId = userId
//     }
//   },
//   actions: {
//     // ...
//   },
//   getters: {
//     getUserId(state) {
//       return state.userId
//     }
//   }
// })
