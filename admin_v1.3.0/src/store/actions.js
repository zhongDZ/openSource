export default {
    buyBook : function({commit}, value){
    	commit("BUY_BOOKS", value);
    },
    addBook : function({commit}, value){
    	commit("ADD_BOOKS", value);
    },
    deleteBook : function({commit}, value){
    	commit("DELETE_BOOKS", value);
    },
    cancelBook : function({commit}, value){
    	commit("CANCEL_BOOKS", value);
    },
    updateBook : function({commit}, value){
    	commit("UPDATE_BOOKS", value);
    }
}