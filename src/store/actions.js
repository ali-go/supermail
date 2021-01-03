// 1、导入mutation-type的常量
import { ADD_COUNTER, ADD_TO_CART } from './mutation-type'

export default {
    addCart(context, payload) {
        // console.log(payload);
        // 1、查找之前数组中是否有该项
        let oldProduct = context.state.cartList.find(item => {
            return item.id === payload.id
        })

        // 2、有的情况和没得情况分别提交到mutations中
        if (oldProduct) {
            // oldProduct.count++
            context.commit(ADD_COUNTER, oldProduct)

        } else {
            payload.count = 1
                // context.state.cartList.push(payload)
            context.commit(ADD_TO_CART, payload)
        }
    }
}