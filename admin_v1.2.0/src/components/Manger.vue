<template>
	<Row>
		<Col>
			<Breadcrumb>
				<Breadcrumb-item href="/manger/add">添加图书</Breadcrumb-item>
				<Breadcrumb-item href="/manger/update">修改图书</Breadcrumb-item>
				<Breadcrumb-item href="/manger/delete">删除图书</Breadcrumb-item>
			</Breadcrumb>
			<transition :name="transitionName">
				<router-view></router-view>
			</transition>
			<!-- 观察数据为字符串或数组 -->
	　　 <input v-model="example0"/>
	　　 <input v-model="example1"/>
	　　 <!-- 当单观察数据examples2为对象时，如果键值发生变化，为了监听到数据变化，需要添加deep:true参数 -->
	　　 <input v-model="example2.inner0"/>
		</Col>
	</Row>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default{
    name: 'Manger',
    data(){
        return{
          transitionName:'',
          example0:"",
					example1:"",
					example2:{
						inner0:1,
						innner1:2
					}
        }
    },
    computed: {
      ...mapGetters({
        books: 'books'
      }),
      bookDetail(){
        let bId = this.$route.params.id;
     		return this.books.find(function (item) {
          return item.id == bId;
        })
      }
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        console.log(toDepth, fromDepth)
        this.transitionName = toDepth < fromDepth ? 'fade' : 'fade'
      },
      example0(curVal,oldVal){
				console.log(curVal,oldVal);
			},
			example1:'a',//值可以为methods的方法名
			example2:{
			//注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
				handler(curVal,oldVal){
					console.log(curVal,oldVal)
				},
				deep:true
			}
    },
		methods:{
			a(curVal,oldVal){
				console.log(curVal,oldVal)
			}
		}
  }
</script>
<style>
  .bookimg {
    height: 200px;
  }
  .text{
    text-align: center;
  }
  .listContainer {
    padding-top: 30px;
  }
</style>

