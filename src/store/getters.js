export default {
    cartLength(state, getters) {
        return state.cartList.length
    },
    cartList(state) {
        return state.cartList
    }
}