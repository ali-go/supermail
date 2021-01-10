import { request } from './request'

// 获取category数据
export function getCategory() {
    return request({
        url: '/category'
    })
}

// 获取maitKey下对应的数据
export function getCategoryItem(maitKey) {
    return request({
        url: '/subcategory',
        params: {
            maitKey,
        }
    })
}

// 获取miniWallkey下对应的推荐图数据
export function getCategoryImage(miniWallkey) {
    return request({
        url: '/subcategory/detail',
        params: {
            miniWallkey,
        }
    })
}