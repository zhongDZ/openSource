import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count:20,
        // 新增waiting  状态
        waiting : false,
        anotherIncrement: 5,
    },
    mutations : {
    	//加一
    	INCREMENT(state){
    		state.count++;
    	},
    	//减一
    	DECREMENT(state){
    		state.count--;
    	},
        INCREMENT_WITH_VALUE(state, value){
            state.count = state.count + value.intValue + value.anotherValue;
        },
        // 显示和隐藏waiting
        SHOW_WAITING_MESSAGE(state){
            state.waiting = true;
        },
        HIDE_WAITING_MESSAGE(state){
            state.waiting = false;
        }
    },
    /* actions : {
    	//默认参数context,  它是一个store 实例，通过它可以获取到store 实例的属性和方法,如 context.state 就会获取到 state 属性， context.commit 就会执行commit命令。
    	increment(context){
    		context.commit('INCREMENT');
    	},
    	decrement(context){
    		context.commit('DECREMENT');
    	}
    }
    */
    actions: {
        increment({commit}){
            commit("INCREMENT")
        },
        decrement({commit}){
            commit("DECREMENT")
        },
        //传值
        incrementWithValue({commit}, value){
            commit("SHOW_WAITING_MESSAGE");
            let intValue = parseInt(value.value);
            let anotherValue = value.anotherValue;
            setTimeout(function() {
                if(isNaN(intValue)) {
                    alert("Not an Interger")
                }else {    
                    commit("HIDE_WAITING_MESSAGE");
                    //commit("INCREMENT_WITH_VALUE", intValue);
                    commit("INCREMENT_WITH_VALUE", {intValue, anotherValue})
                }
            }, 1000);
        }
    },
    getters: {// getters 写操作
        countAnother: function (state) {
            return state.anotherIncrement;
        }
    }
})

export default store