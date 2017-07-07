import Vue from 'vue'
import App from './App.vue'

//import store from "./store_1.js"  // 引入store 对象

//我们把所有的getters, actions, mutations 都写到的store 中，如果有很多的话，代码可读性太差，所以就需要 action 创建一个actions.js 文件，mutations 创建一个mutation.js文件，getters 也创建一个getters.js文件，state  作为主要的入口文件命名为index.js，把这四个js文件放到store 文件夹中。

//state所在的文件命名为index.js 还和 nodejs 加载模块有关。如果不命名为index.js , 那假设命名为store.js.

//在store.js, 我们暴露出通过 new Vuex.Store 构造函数生成的store 对象（export default new Vuex.Store({...})）, 这个store 对象需要在 main.js 中引入，然后注入到vue 根实例中。所以在 main.js 中需要写入 import store from './store/store.js',  后面的路径就比较长了。如果我们命名为 index.js， 我们可以直接写 import store from './store', 后面的路径直接到文件夹名就可以了，index.js 可以省略。node 在加载文件夹模块的时候，有如下规定:

//var mode = require(“./moduleDir”);

//如果moduleDir 是一个文件夹名，Node 就会在指定的文件夹下查找模块。Node 会假定该文件夹是一个包，并试验查找包定义。 包定义在名为 package.json 文件中。如果文件夹中没有package.json, 那么就会查找index.js文件，相当于加载 var mode = require(“./moduleDir/index.js”). 如果有package.json 文件，就会查找文件中的 main 属性，如下package.json文件, 相当于加载 var mode = require(“./moduleDir/lib/mymodldule.js”)
import store from "./store"  // 引入store 对象

new Vue({
  el: '#app',
  store,  // 注入到根实例中
  render: h => h(App)
})