import { request } from './request';

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid //后台数据是从iid中获取的，所以此处要写iid
        }
    })
}

// 推荐信息在不同的url内
//  获取推荐信息的数据
export function getRecommends() {
    return request({
        url: '/recommend'
    })
}




// 由于有些数据不是放在一起，需要从多个地方获取，但是我们为了效率，
// 提取之后放在一个变量中进行转储，因此此处用es6语法中的创建类来保存
// 一个组件中需要从不同位置提取的数据，放在类的属性中

// 1、goods,商品信息的数据获取
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title; //标题---
        this.newPrice = itemInfo.price; //新价格
        this.oldPrice = itemInfo.oldPrice; //老价格
        this.discountDesc = itemInfo.discountDesc; //折扣活动
        this.descColor = itemInfo.discountBgColor; //折扣活动的背景颜色
        this.columns = columns; //销量、收藏,只取0和1
        this.services = services; //在shopInfo的services的第3索引号对应七天无理由退货
        this.desc = itemInfo.desc; //描述---
        this.realPrice = itemInfo.lowPrice; //价格---
        this.image = itemInfo.topImages[0]; //图片---
    }
}
// 2、店铺信息的数据获取
export class Shop {
    constructor(shopInfo) {
        this.name = shopInfo.name;
        this.logo = shopInfo.shopLogo;
        this.sells = shopInfo.cSells;
        this.goods = shopInfo.cGoods;
        this.score = shopInfo.score;
        this.shopUrl = shopInfo.shopUrl;
    }
}

// 3、店铺尺码信息获取
export class GoodsParam {
    constructor(info, rule = "") {
        this.info = info.set; //一些参数信息
        this.sizes = rule.tables; //尺码信息
        this.images = info.images ? info.images : "";
    }
}