import Vue from 'vue'
// import Router from 'vue-router'
import Router from '@/assets/js/my-router.js'
import Details from '@/pages/Details.vue'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('@/pages/Login.vue')
        },
        {
            path: '/list',
            name: 'list',
            component: () => import('@/pages/List.vue')
        },
        {
            path: '/details',
            name: 'details',
            component: Details
        }
    ]
})