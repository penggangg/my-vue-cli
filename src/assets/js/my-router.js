import Vue from 'vue'
let _Vue
class HistoryRoute {
    constructor(){
        this.current = '/'
    }
}
class myRouter {
    static install(Vue){
        Vue.mixin({
            beforeCreate() {
                console.log(this.$options)
                if (this.$options.router) {
                    this._router = this.$options.router
                    this._router.init()
                    // _Vue.util.defineReactive(this, '_router', '/')
                    Object.defineProperty(this, '_router', {
                        set() {
                            console.log('set')
                        },
                        get() {
                            console.log('get')
                        }
                    })
                }
            },
        })
        _Vue = Vue
        Vue.component('RouterLink', '')
        Vue.component('RouterView', {
            name: 'RouterView',
            render(h) {
                let _router = this.$root.$options.router
                let _routerMap = _router.routerMap
                let _current = _router.history.current
                return h(_routerMap[_current].component)
            },
        })
    }
    // options
    /**
     * {
     *  routes: [
     *       {
     *          path: '/list',
     *          name: 'list',
     *          component: () => import('@/pages/List.vue')
     *     }
     * ]
     * }
     *  
     */
    constructor(options){
        this.routerArray = options.routes 
        this.routerMap = {}
        this.history = new HistoryRoute()
        this.routerArray.map(item => {
            this.routerMap[item.path] = item
        })
    }
    init() {
        console.log('初始化路由')
        window.addEventListener('load', ()=> {
            this.history.current = window.location.hash.split('#')[1] || '/'
        })
        window.addEventListener('hashchange', (e)=> {
            console.log('改变',  window.location.hash.split('#')[1])
            this.history.current = window.location.hash.split('#')[1] || '/'
        })
    }
}

export default myRouter