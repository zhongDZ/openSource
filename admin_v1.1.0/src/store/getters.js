export default {
	countAnother: function (state) {
        return state.anotherIncrement;
    },
    /*doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
    */
    doneTodos: function(state) {
      return state.todos.filter(todo => todo.done);
    }
}