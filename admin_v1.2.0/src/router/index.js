import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/Home.vue'
import list from '../components/List.vue'
import add from '../components/Add.vue'
import manger from '../components/Manger.vue'
import detail from '../components/Detail.vue'
import update from '../components/Update.vue'
import Delete from '../components/Delete.vue'
import cart from '../components/Cart.vue'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'home',
			component: home
		},
		{
			path: '/list',
			name: 'list',
			component: list
		},
		{
			path: '/manger',
			name: 'manger',
			component: manger,
			children: [{
					path: 'add',
					name: 'add',
					component: add
				},
				{
					path: 'update',
					name: 'update',
					component: update
				},
				{
					path: 'delete',
					name: 'delete',
					component: Delete
				}
			]
		},
		{
			path: '/cart',
			name: 'cart',
			component: cart
		},
		{
			path: '/detail/:id',
			name: 'detail',
			component: detail
		}
	]
})