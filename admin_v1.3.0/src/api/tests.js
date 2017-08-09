import Vue from 'vue';
//import Env from './config/env';
import axios from 'axios';
import qs from 'querystring';

//require('es6-promise').polyfill();

//配置axios
Vue.prototype.$http = axios.create({
    // baseURL: Env != 'production' ? '/tempapi' : 'http://112.74.215.56:8021/mgb-manager',
    baseURL: '/',
    headers: {
//      'Content-Type': 'application/x-www-form-urlencoded',
//      'withCredentials': false
    },
    transformRequest: [function(data){
        data = qs.stringify(data);
        return data;
    }]
});

//配置axios拦截器
Vue.prototype.$http.interceptors.request.use(
    config => {
        let tokenVal = localStorage.getItem('token');
        if(tokenVal) {
            config.headers.common['token'] = tokenVal;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });
Vue.prototype.$http.interceptors.response.use(
    response => {
    	//判断token是否过期
        if ( response.data.state == 'fail' && response.data.error.indexOf('非法请求') != -1 ) {
            let queryparams = localStorage.getItem('merchantno');
        	localStorage.clear();
    		window.location.href = '/#/passport/login?merchantNo='+queryparams;
        }
        //判断是否有权限访问资源
        if ( response.data.state == 'fail' && response.data.error.indexOf('没有该资源权限访问') != -1) {
            window.location.href = '/nopermission';
        }
        return response;
    },
    error => {
        if(error.response) {
            switch (error.response.status) {
                case 401:
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    });
            }
        }
        return Promise.reject(error);
    });
