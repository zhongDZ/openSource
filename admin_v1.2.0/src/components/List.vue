<template>
	<div class="listContainer">
		<Row>
			<Col span="5" offset="1" v-for="book in books" :key = "book.id" class="text">
				<!--
                	作者：offline
                	时间：2017-07-11
                	描述：要给Vue一个提示，以便它可以跟踪每个节点的身份，并因此重用和重新排序现有元素，您需要为每个项目提供唯一的密钥属性。键的理想值将是每个项目的唯一ID。这个特殊属性与1.x中的跟踪粗略相当，但它的作用类似于一个属性，因此您需要使用v-bind将其绑定到动态值（在此使用简写）：
						<div v-for =“item in items”：key =“item.id”>
						  <！ - content - >
						</ DIV>
                -->
				<Card >
					<p slot="title">{{book.bookName}}</p>
					<img  class="bookimg" :src="book.imgUrl" alt="">
					<p>售价：{{book.price}}</p>
					<router-link :to="{ name:'detail',params:{id:book.id}}">详情</router-link>
				</Card>
			</Col>
		</Row>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default{
		name: 'list',
		computed:{
			...mapGetters({
				books:'books'
			})
		},
		methods:{

		}
	}
</script>
<style>
  .bookimg{
    height: 200px;
  }
  .listContainer{
    padding-top: 30px;
  }
</style>

