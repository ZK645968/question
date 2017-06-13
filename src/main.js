import Vue from 'vue'
import App from './App'
import router from './router'

//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import bus from './store'

// var Promise = require('es6-promise').Promise;
require('es6-promise').polyfill();
import axios from 'axios'


var Promise = require('es6-promise').Promise;
Vue.config.productionTip = false
Vue.use(ElementUI);

// 路由中间件，遍历meta(判断是否已经登录，如果没有登录，则转到/login)
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(bus.user.username) {
      next()
    }  else {
      next({
         path: '/login'
      })
    }
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
