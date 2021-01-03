// 1、导入mutation-type的常量
import { ADD_COUNTER, ADD_TO_CART } from './mutation-type'

export default {
    // 1、state内有该商品
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    // 2、state内无该商品
    [ADD_TO_CART](state, payload) {
        state.cartList.push(payload)
    }
}