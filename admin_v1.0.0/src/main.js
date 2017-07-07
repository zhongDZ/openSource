import Vue from 'vue'
import App from './App.vue'

import store from "./store.js"  // 引入store 对象

new Vue({
  el: '#app',
  store,  // 注入到根实例中
  render: h => h(App)
})