// 导入debounce
import { debounce } from './utils'
import { HIGH_BACK } from './const'
import BackTop from 'components/content/backtop/BackTop' //导入返回顶部组件

// 公共代码的mixin混入
// 1、关于refresh的防抖
export const itemLinstnerMinxin = {
    data() {
        return {
            newFresh: null, //为了便于其他地方复用，此处用定义属性
            itemImgListener: null
        }
    },
    mounted() {
        // 推荐图刷新高度，注意此处同home内的goodlistitem一样都用防抖来函数控制次数
        this.newFresh = debounce(this.$refs.scroll.refresh, 200)
        this.itemImgListener = () => {
            this.newFresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImgListener)
    }
}

// 2、关于返回顶部按钮
export const backTopMinxin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 300)
        },
        showBackTop(position) {
            this.isShowBackTop = (-position.y) > HIGH_BACK
        },
    }
}