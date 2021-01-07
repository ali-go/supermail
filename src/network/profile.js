//1、网络数据的获取此处省略，暂时没有数据接口



// 2、设置下面五个选项的数据信息类
class ProfileMgs {
    constructor(img, text, skip, border) {
        this.img = img;
        this.text = text;
        this.skip = skip;
        this.border = border;
    }
}
export { ProfileMgs }