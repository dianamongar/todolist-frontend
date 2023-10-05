// store.js
import { createStore } from 'vuex';

const store = createStore({
    state: {
            userId: null,
            task : {
                id: null,
                name: null,
                dueDate: null,
                tags: [],
                state: null,
            },
        },
        mutations: {
            setUserId(state, userId) {
            state.userId = userId
            },
            setTask(state, task) {
                state.task = task;
            },
            
        },
        actions: {
            setUserId({ commit }, id) {
            commit('setUserId', id);
            },
        },
        getters: {
            getUserId: (state) => state.userId,
            getTask: (state) => state.task,
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
