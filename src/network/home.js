import { request } from './request';

// 轮播图的数据获取网络模块二次封装
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}

// 列表图的数据获取网络模块封装
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}