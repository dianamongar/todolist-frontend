// store.js
import { createStore } from 'vuex';

const store = createStore({
    state: {
        userId: null,
        taskId: null,
        taskName: null,
        taskDueDate: null,
        taskTags: [],
        taskState: null,
    },
    mutations: {
        setUserId(state, userId) {
            state.userId = userId;
        },
        setTaskId(state, taskId) {
            state.taskId = taskId;
        },
        setTaskName(state, taskName) {
            state.taskName = taskName;
        },
        setTaskDueDate(state, taskDueDate) {
            state.taskDueDate = taskDueDate;
        },
        setTaskTags(state, taskTags) {
            state.taskTags = taskTags;
        },
        setTaskState(state, taskState) {
            state.taskState = taskState;
        },
    },
    actions: {
        setUserId({ commit }, id) {
            commit('setUserId', id);
        },
        setTaskId({ commit }, id) {
            commit('setTaskId', id);
        },
        setTaskName({ commit }, name) {
            commit('setTaskName', name);
        },
        setTaskDueDate({ commit }, dueDate) {
            commit('setTaskDueDate', dueDate);
        },
        setTaskTags({ commit }, tags) {
            commit('setTaskTags', tags);
        },
        setTaskState({ commit }, state) {
            commit('setTaskState', state);
        },
    },
    getters: {
        getUserId: (state) => state.userId,
        getTaskId: (state) => state.taskId,
        getTaskName: (state) => state.taskName,
        getTaskDueDate: (state) => state.taskDueDate,
        getTaskTags: (state) => state.taskTags,
        getTaskState: (state) => state.taskState,
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
