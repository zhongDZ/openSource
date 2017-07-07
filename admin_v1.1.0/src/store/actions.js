export default {
	//默认参数context,  它是一个store 实例，通过它可以获取到store 实例的属性和方法,如 context.state 就会获取到 state 属性， context.commit 就会执行commit命令。
	/*increment(context){
		context.commit('INCREMENT');
	},
	decrement(context){
		context.commit('DECREMENT');
		//context.state 暴露的是本地状态
		//context.rootState暴露的才是根状态
	}
	*/
	increment({commit}){
        commit("INCREMENT")
    },
    decrement({commit}){
        commit("DECREMENT")
    },
    //传值
    incrementWithValue({commit, state}, value){
    	console.log(state.count)
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
    },
    updateMessage({commit}, value){
    	commit('UPDATE_MESSAGE', value);
    }
}