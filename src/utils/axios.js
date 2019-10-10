import axios from 'axios'
// import qs from 'qs'
import store from "../vuex/store";
// import Toast from '../../static/dist/toast/toast';
axios.defaults.baseURL = 'https://apply.cycloud.net'
// axios.defaults.baseURL = 'http://192.168.5.88:8112'  // 配置本地代理时，删除此项设置， 线上必配，代理线上不可用
axios.defaults.timeout = 5000
// axios.defaults.headers = {
//     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
// }
axios.defaults.adapter = function (config) {
    return new Promise((resolve, reject) => {
        let data = config.method === 'get' ? config.params : config.data
        // wx小程序 发起请求相应 log 就可以看到熟悉的返回啦qs.stringify(
        wx.request({
            url: config.url,
            method: config.method,
            data: data,
            header: {
                token: wx.getStorageSync('token') ? wx.getStorageSync('token') : ''
            },
            success: (res) => {
                console.log('成功')
                return resolve(res)
            },
            fail: (err) => {
                console.log('失败')
                return reject(err)
            }
        })
    })
}
axios.interceptors.request.use(function (config) {
    // 处理请求之前的配置
    console.log()
    let msg = ''
    if(/login/ig.test(config.url)){
        msg = '登录中...'
    }else{
        msg = '加载中...'
    }
    if (store.state.loadState) {
        // wx.showLoading({ title: '加载中...' })
        // Toast.loading({
        //     mask: false,
        //     message: msg,
        //     duration: 0
        // });
    }
    return config
}, function (error) {
    // 请求失败的处理
    if (store.state.loadState) {
        // wx.showLoading({ title: '请求超时，请检查网络设置' })
        // Toast.fail({
        //     message: '请求超时，请检查网络设置',
        //     duration: 2000
        // });
    }
    return Promise.reject(error)
})
// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(function (response) {
    // 处理响应数据
    console.log(response.data.status)
    if(response.data.status === '102') {
        wx.removeStorage({
            key: 'token',
            success (res) {
                // Toast(response.data.msg)
                // setTimeout(() => {
                //     const url = '../login/main'
                //     mpvue.redirectTo({ url })
                // }, 1000)
            }
        })
    }
    if (store.state.loadState) {
        wx.hideLoading()
        // Toast.clear()
    }
    return response
}, function (error) {
    // 处理响应失败
    if (store.state.loadState) {
        // wx.showLoading({ title: '无法连接网络,请检查设置' })
        // Toast.fail({
        //     message: '无法连接网络,请检查设置',
        //     duration: 2000
        // })
    }
    return Promise.reject(error)
})


export default {
    // toast: Toast,
    request: axios,
    defUrl: 'http://114.55.211.158/group1/M00/00/04/rBBHflz0j1CAfRziAAAKmA6ENjE305.png',// 默认用户图像
    url: axios.defaults.baseURL, // 服务器地址
    // isIOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}
