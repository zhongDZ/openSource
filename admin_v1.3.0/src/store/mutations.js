export default {
	BUY_BOOKS(state, value){
		if(!value.num){
		    value.num =1;
		    state.added.push(value)
		}else{
		    state.added.find(item=>{
		        if(item.id == value.id){
			        item.num++
			    }
		 	})
		}
	},
    ADD_BOOKS(state, book) {
	    if(state.bookInfo.length == 0){
	      	book.id=1
	    }else{
	      	book.id= state.bookInfo[state.bookInfo.length-1].id+1
	    }
	    state.bookInfo.push(book)
	},
    DELETE_BOOKS(state, bid) {
	    state.bookInfo=state.bookInfo.filter(item=>{
	      	return  item.id != bid
	    })
	},
    CANCEL_BOOKS(state, id) {
	    state.added = state.added.filter(item=>{
	      	if(item.id == id)item.num = 0
	    	return item.id != id
	    })
	    console.log(state.added)
	},
    UPDATE_BOOKS(state, book) {
	    state.bookInfo.map(item=>{
		      if(item.id == book.id){
		        return book
		      }
	    })
	}
}