// 导入debounce
import { debounce } from './utils'

// 公共代码的mixin混入
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
    },
}