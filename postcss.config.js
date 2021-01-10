module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportWidth: 375, //视窗的宽度，对应的是我们设计稿的宽度
            viewportHeight: 667, //视窗的宽度，对应的是我们设计稿的高度。（也可以不配置）
            unitPrecision: 5, //指定'px'转换为视窗单位值得小数位数（很多时候无法整除）
            viewportUnit: 'vw', //指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: ['.ignor'], //(Array),指定不需要转换为视窗单位的类（class的类），保留原始的单位px
            minPixelValue: 1, //小于或者等于'1px'，不转换为视窗单位
            mediaQuery: false, //是否允许在媒体查询中转换'px'
            exclude: [/TabBar/], //忽视转换视窗单位的文件，即不转换，内部填正则表达式
        }
    }
}