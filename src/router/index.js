import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
        path: '/',
        name: 'main',
        component: require('../components/login/loginwrapper')
    },
    {
        path: '/all',
        name: 'all',
        component: require('../components/all/all')
    },
    {
        path: '/user/:userId',
        name: 'user',
        component: require('../components/user/user'),
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'login',
        component: require('../components/login/loginwrapper')
    },
    {
        path: '/register',
        name: 'register',
        component: require('../components/register/register')
    },
    {
        path: '/create',
        name: 'create',
        component: require('../components/create/create'),
        meta: { requiresAuth: true }
    },
    {
        path: '/update/:id',
        name: 'update',
        component: require('../components/update/update'),
        meta: { requiresAuth: true }
    },
    {
        path: '/check/:id',
        name: 'check',
        component: require('../components/check/check'),
        meta: { requiresAuth: true }
    },
    {
        path: '/data/:id',
        name: 'data',
        component: require('../components/data/data'),
        meta: { requiresAuth: true }
    },
    {
        path: '/questionaire/:id',
        name: 'questionaire',
        component: require('../components/questionaire/questionaire')
    },
    {
        path: '*',
        component: require('../components/all/all')
    }
  ]
})
