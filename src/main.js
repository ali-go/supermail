import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Toast from 'components/common/toast' //导入toast的index.js
import FastClick from 'fastclick' //导入解决300ms延时的fastclick插件
import VueLazyLoad from 'vue-lazyload' //导入图片懒加载的插件

Vue.use(Toast) //安装Toast插件，实际是调用内部的install函数
Vue.use(VueLazyLoad, {
        // perLoad: 1.3,
        // error: require(),
        loading: require('assets/img/common/placeholder.png'),
        // attempt: 1
    }) //安装VueLazyLoad 插件

// 调用fastclick插件
FastClick.attach(document.body)

// 安装VueLazyLoad懒加载插件


Vue.config.productionTip = false

// 创建Vue对象实例中加$bus，用来事件总线
Vue.prototype.$bus = new Vue()

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')