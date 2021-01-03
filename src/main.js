import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

Vue.config.productionTip = false

// 创建Vue对象实例中加$bus，用来事件总线
Vue.prototype.$bus = new Vue()
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

Vue.prototype.$hhh = [111, 222]
    // console.log(Vue.prototype);