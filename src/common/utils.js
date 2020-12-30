// 1、防抖动函数debounce的封装
export const debounce = function(fn, delay) {
        let timer = null;
        return function(...args) {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, delay)
        }
    }
    // 2、时间戳转换成时间格式
export const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const formatNumber = n => {
        n = n.toString()
        return n[1] ? n : '0' + n
    }
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}