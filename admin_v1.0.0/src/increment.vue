<template>
	<div>
	    <div>
	        <button @click="increment">+1</button>
	        <button @click="decrement">-1</button>
	    </div>

	    <div>
	        <input type="text" v-model="incrementValue">
	        <button @click="incrementWithValue">increment</button>
	    </div>
	    <!-- 展示信息 -->
        <div v-if ="show">
            waiting 
        </div>
    </div>
</template>

<script>
	import {mapActions} from "vuex";
	import {mapGetters} from "vuex";

    export default {
    	/*
        methods: {
            increment(){
                this.$store.dispatch("increment");
            },
            decrement() {
                this.$store.dispatch("decrement")
            }
        }
        */

        //如果有10 个按钮，我们要写10 个函数，且存在大量的重复，并且我们的事件处理函数名字和action的名字是一样的，这时vue  提供了mapAction 函数，它和mapState  是一样的，把我们的 action 直接映射到store 里面的action中。

		//像这种组件中的事件处理函数名字和action的名字是相同的，直接把 事件处理函数名字放到一个数组中。组件中的methods 修改如下：
        
	    data() {
            return {
                incrementValue: 0
            }
        },
        methods: {
            ...mapActions(["increment","decrement"]),
            incrementWithValue() {
                try {
                    //this.$store.dispatch("incrementWithValue", this.incrementValue);
                    // dispatch 只能接受一个参数，需要传对象参数
                	this.$store.dispatch("incrementWithValue", { value : this.incrementValue, anotherValue : this.countAnother})
                }catch(error) {
                    alert(error)
                }
            }
        },
        computed : {
        	show: function() {
                return this.$store.state.waiting;
            },
            /*countAnother: function () { //获取getters
                return this.$store.getters.countAnother;
            }
            */
            //vuex 也提供了mapGetters 方法，和其的mapState,mapActions 是一样的，如果组件中使用的getters 和store 里面的getters 相同，那就用 数组形式，如果不相同，那就要用对象形式。
            ...mapGetters(["countAnother"])
        }

        //如果事件处理函数名字和action的名字不同，给mapActions 提供一个对象，对象的属性是事件处理函数名字, 属性值是 对应的dispatch 的action 的名字。
        /*methods: {
            ...mapActions(["decrement"]),

			// mapActions 对应做出改变
            ...mapActions({
                add: "increment"
            })
        }
        */
    }
</script>