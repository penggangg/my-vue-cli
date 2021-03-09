import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false
// import Axios from 'axios'
// console.log(Axios)
new Vue({
    el: '#app',
    router,
    render: h=>h(App)
})
console.log(789)