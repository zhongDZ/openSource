import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var login = r => require.ensure([], () => r(require('../page/login')), 'login');
var notFound = r => require.ensure([], () => r(require('../page/404')), 'notFound');
var home= r => require.ensure([], () => r(require('../page/home')), 'home');
var table = r => require.ensure([], () => r(require('../page/nav1/table')), 'table');
var form = r => require.ensure([], () => r(require('../page/nav1/form')), 'form');
var echarts = r => require.ensure([], () => r(require('../page/nav1/echarts')), 'echarts');

var router = new Router({
	routes: [
		{
			path: '/login',
			name: 'login',
			hidden : true,
			component: login
		},
		{
			path: '/notFound',
			name: 'notFound',
			hidden : true,
			component: notFound
		},
		{
	        path: '/',
	        component: home,
	        name: '模板',
	        iconCls: 'ios-home', //图标样式class
	        children: [
	            //{ path: '/main', component: notFound, name: '主页', hidden: true },
	            { path: '/table', component: table, name: '表格' },
	            { path: '/form', component: form, name: '表单' },
	            { path: '/echarts', component: echarts, name: 'echarts' }
	        ]
	    },
	    {
	        path: '/',
	        component: home,
	        name: '导航二',
	        iconCls: 'ios-paw',
	        children: [
	            { path: '/page4', component: notFound, name: '页面4' },
	            { path: '/page5', component: notFound, name: '页面5' }
	        ]
	    },
	    {
	        path: '/',
	        component: home,
	        name: '',
	        iconCls: 'social-freebsd-devil',
	        leaf: true, //只有一个节点
	        children: [
	            { path: '/page6', component: notFound, name: '导航三' }
	        ]
	    },
	    {
	        path: '/',
	        component: home,
	        name: '导航四',
	        iconCls: 'stats-bars',
	        children: [
	            { path: '/echarts', component: notFound, name: 'echarts' }
	        ]
	    },
	    {
	        path: '*',
	        hidden: true,
	        redirect: { path: '/notFound' }
	    }
	]
})

router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        sessionStorage.removeItem('user');
    }
    var user = JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path != '/login') {
        next({ path: '/login' })
    } else {
        next()
    }
});

export default router;