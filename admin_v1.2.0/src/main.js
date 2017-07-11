import Vue from 'vue'
import App from './App.vue'
import  router from './router/index'
import store from "./store"

import iview from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iview)

new Vue({
  el: '#app',
  router,
  store,  //注入到根实例中
  render: h => h(App)
})