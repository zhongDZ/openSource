import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 引入actions, mutations, getters
import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";

const state = {
    count:20,
    // 新增waiting  状态
    waiting : false,
    anotherIncrement: 5,
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: true },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false }
    ],
    testInput : 10,
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});

export default store