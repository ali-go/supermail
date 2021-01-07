// 1、导入mutation-type的常量
import { ADD_COUNTER, ADD_TO_CART } from './mutation-type'

export default {
    addCart(context, payload) {
        // 用promise方法来接收购物车商品添加后的反馈
        return new Promise((resolve, reject) => {
            // console.log(payload);
            // 1、查找之前数组中是否有该项
            let oldProduct = context.state.cartList.find(item => {
                return item.id === payload.id
            })

            // 2、有的情况和没得情况分别提交到mutations中
            if (oldProduct) {
                context.commit(ADD_COUNTER, oldProduct)
                    // （1）、原先有这个商品
                resolve('所选商品数量+1')

            } else {
                payload.count = 1
                payload.checked = true
                context.commit(ADD_TO_CART, payload)
                    // （2）、原先没有这个商品
                resolve('商品已添加到购物车')
            }
        })
    }
}