import ajax from '../utils/axios'
import Vue from 'vue';
const comMethods = {
    /*图片懒加载*/
    setPhotoLay (loadingImg) {
        console.log('设置懒加载')
        Vue.use(Lazyload, {
            loading: loadingImg,
            // error: require('../../assets/img/loadererr.png'),
            adapter: {
                loaded ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init }) {
                    // console.log('图片加载完成')
                },
                loading (listender, Init) {
                    // console.log('图片loading')
                },
                error (listender, Init) {
                    // console.log('图片error')
                }
            }
        });
    },
    /*短信获取验证码*/
    getCodeByPhone (phone, areaCode) {
        return new Promise ((res, rej) =>{
            /*获取验证码*/
            ajax.request({
                method: 'post',
                url: '/mbiz/sms/send',
                data: {
                    phone: phone,
                    areaCode: areaCode,
                }
            }).then((data)=>{
                console.log(data)
                res(data.data)
            }).catch((err) => {
                rej(err)
            })
        })
    },
    /*邮箱获取验证码*/
    getCodeByEmail (email) {
        return new Promise ((res, rej) =>{
            /*获取验证码*/
            ajax.post('/api/email/send', {
                email: email,
            }).then((data) => {
                console.log(data)
                res(data)

            }).catch((err) => {
                rej(err)
            })
        })
    },
    /*用户信息*/
    getUserInfo () {
        ajax.get('/api/user/getUserInfo').then((res) =>{
            console.log(res.data)
            if(res.status === '200'){
                sessionStorage.setItem('userInfo',JSON.stringify({
                    nickName: res.data.nickName,
                    name: res.data.name,
                    headerImage: res.data.headerImage,
                    id: res.data.id
                }))
            }
        });
    },
    /*图片加载*/
    imgLoad (img, callcack) {
        img.forEach((img) => {
            var timer = setInterval(function () {
                if (img.complete) { // 判断图片是否加载完成
                    callcack(img)
                    clearInterval(timer)
                } else {
                    console.log('404')
                }
            }, 50)
            img.onerror = () => {
                console.log('404失败')
                this.onerror = null
            }
        })
    },
    /*加载失败*/
    errImg () {
        console.log('404失败')
        this.src = "require('assets/images/load_logo01.png')"
    },
}
export default comMethods
