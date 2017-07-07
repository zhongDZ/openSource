<template>
    <div>
        <h3>Count is {{count}}</h3>
        <p>组件自己的内部计算属性 {{ localComputed }}</p>
        <h3>AnoterIncrement is {{countAnother}}</h3>
        <h6>doneTodosCount is...{{doneTodos[0].id}}</h6><br>


        <h5>Count is {{testInput}}</h5>
        <input :value="testInput" @input="updateMessage"><br>
    </div>
</template>

<script>
    import {mapState} from "vuex";// 引入mapState 
    import {mapGetters} from "vuex";
    
    export default {
      /* computed : {
        count (){
          return this.$store.state.count
        }
      }
      */
      /* computed : mapState({
        //count : state => state.count  // 组件内的每一个属性函数都会获得一个默认参数state, 然后通过state 直接获取它的属性更简洁     
        count : 'count' // 'count' 直接映射到state 对象中的count, 它相当于 this.$store.state.count,
      })
      */
      /* computed : mapState([
        "count"//如果我们组件中的属性和state 中的属性名称一样，我们不想改名字，那就把直接把属性名写在数组中。
      ])
    */

      //如果我们组件内部也有computed 属性怎么办？它又不属于mapState 中。那就用到了对象分割，把mapState函数生成的对象再分割成一个个的，就像最开始的时候，我们一个一个罗列计算属性，有10个属性，我们就写10个函数。

      //es6中的... 就是分割用的，但是只能分割数组。在ECMAScript stage-3 阶段它可以分割对象，所以这时还要用到babel-stage-3;  npm install babel-preset-stage-3 --save-dev, 安装完全后，一定不要忘记在babelrc 就是babel 的配置文件中，写入stage-3,
      //引入自己内部的计算属性
      computed: {
		localComputed () {
			return this.count + 10;
		},
		...mapState({
			count: "count",
			testInput : 'testInput'
		}),
		/*countAnother: function () { //获取getters
		  return this.$store.getters.countAnother;
		}
		*/
		//vuex 也提供了mapGetters 方法，和其的mapState,mapActions 是一样的，如果组件中使用的getters 和store 里面的getters 相同，那就用 数组形式，如果不相同，那就要用对象形式。
		...mapGetters(["countAnother", "doneTodos"]),
      },
      methods : {
      	updateMessage(e){
      		this.$store.dispatch("updateMessage", e.target.value)
      	}
      }
    }
</script>

<style scoped>
    h3 {
        font-size: 30px;
    }
</style>