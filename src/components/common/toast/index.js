// 该文件是为了把toast封装成Vue的插件

import Toast from 'components/common/toast/Toast' //导入组件

const obj = {}

obj.install = function(Vue) { //执行Vue.use(Toast)时调用内部的install方法，并自动传递Vue作为参数
    // 1、创建组件构造器
    const toastConstractor = Vue.extend(Toast)

    // 2、用new的方式 ，根据组件构造器，创建一个组件对象
    const toast = new toastConstractor()

    // 3、将组建对象挂载到新创建的元素上
    toast.$mount(document.createElement('div'))

    // 4、toast.$el对应的就是这个div，并把它添加到页面上
    document.body.appendChild(toast.$el)

    // 5、把toast对象添加到Vue原型上
    Vue.prototype.$toast = toast



}


export default obj