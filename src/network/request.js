import axios from 'axios'

export function request(config) {
    // 1、新建xiaos的实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })

    // 2、请求的拦截
    instance.interceptors.request.use(config => {
        // console.log(config);
        return config
    }), err => {
        console.log(err);
    }

    // 3、响应的拦截
    instance.interceptors.response.use(res => {
        // console.log(res);
        return res.data
    }, err => {
        console.log(err);
    })

    // 4、发送真正的网络请求
    return instance(config)
}