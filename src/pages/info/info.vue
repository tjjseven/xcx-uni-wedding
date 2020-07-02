<template>
    <div class="t_content">
        <button open-type="getUserInfo" @getuserinfo="getUserInfo">获取信息</button>
        <button open-type="openSetting" @opensetting="openSetting">打开设置页</button>
        <!--<button open-type="getPhoneNumber" @bindgetphonenumber="getPhoneNumber">获取手机号</button>-->
        <!--<web-view src="http://weixin.cyapp.net/cycloud"></web-view>-->
        <!--<img :src="headerImg" alt="">-->
        <open-data type="userNickName" lang="zh_CN"></open-data>
        <open-data type="userGender" lang="zh_CN"></open-data>
        <navigator url="/package/detail/detail?id=1" style="padding: 20px 0">canvas跳转</navigator>
        <button @click="scanQrcode">扫一扫</button>
        <button @click="autoLocation">获取地址</button>
        <button @click="createCamera">拍照</button>
        <button @click="imgSrc = ''">重拍</button>
        <button @click="onload1">刷新</button>
        <img :src="imgSrc" alt="" style="width: 100%; height: 300px;" v-if="imgSrc">
        <camera device-position="back" flash="off" binderror="error" style="width: 100%; height: 300px;" v-if="!imgSrc"></camera>


    </div>
</template>

<script>

    export default {
        name: "info",
        data () {
            return {
                headerImg: '',
                sysLocationEnabled: false,
                wxLocationEnable: false,
                cameraContext: null,
                imgSrc: '',
            }
        },
        mounted () {
            // 登陆接口
            // uni.login({
            //     provider:'weixin',
            //     scopes:'auth_base',
            //     timeout:20000,
            // }).then(data=> {    //返回一系列登陆信息
            //     console.log(data)
            // })

            // console.log(this.$root.$mp)
            return
            wx.showModal({
                title: '提示',
                content: JSON.stringify(1),
                showCancel: false,
                success (res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
            // this.getSystemInfo()
            // this.getSetting('location')
            // this.autoLocation()

            // this.cameraContext = wx.createCameraContext()
        },
        methods: {
            /*按钮打开微信设置*/
            openSetting (e) {
                console.log(e)
            },
            /*按钮授权获取用户信息*/
            getUserInfo (e) {
                console.log(e)
            },
            /*按钮获取手机号 对非个人开发者，且完成了认证的小程序开放*/
            getPhoneNumber (e) {
                console.log(e)
            },

            /*获取手机相关功能权限信息*/
            getSystemInfo () {
                wx.getSystemInfo({
                    success: (res) => {
                        wx.showModal({
                            title: '提示',
                            content: JSON.stringify(res),
                            showCancel: false,
                            success (res) {
                                if (res.confirm) {
                                    console.log('用户点击确定')
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        })
                    }
                })
            },
            /*获取微信相关功能权限信息*/
            getSetting (type) {
                wx.getSetting({ // 获取设置
                    success: (res) => {
                        console.log(res)
                        // if(res.authSetting["scope.userInfo"]){ // 已经授权
                        //     wx.getUserInfo({
                        //         success: (res) => {
                        //             console.log(res)
                        //             console.log(res.userInfo)
                        //             this.headerImg = res.userInfo.avatarUrl
                        //         }
                        //     })
                        // }else{ // 未授权
                        //
                        // }

                        let systemInfo = wx.getSystemInfoSync() // 手机权限
                        switch (type) {
                            case 'location':
                                if(!systemInfo.locationEnabled){
                                    wx.showModal({
                                        title: '授权提示',
                                        content: '请开启手机系统定位功能',
                                        showCancel: false,
                                        success (res) {
                                            if (res.confirm) {
                                                console.log('用户点击确定')
                                            } else if (res.cancel) {
                                                console.log('用户点击取消')
                                            }
                                        }
                                    })
                                    return
                                }
                                if(!res.authSetting["scope.userLocation"]){
                                    // this.wxLocationEnable = true
                                    wx.showModal({
                                        title: '授权提示',
                                        content: '如需要授权您的位置，请打开设置',
                                        confirmText: '需要',
                                        cancelText: '不需要',
                                        success (res) {
                                            if (res.confirm) {
                                                console.log('用户点击确定')
                                                wx.openSetting({
                                                    success: (res) => {
                                                        console.log(res.authSetting)
                                                    }
                                                })
                                            } else if (res.cancel) {
                                                console.log('用户点击取消')
                                            }
                                        }
                                    })
                                    return
                                }
                                this.getLocation()
                                break;
                        }
                    }
                })
            },

            /*定位*/
            getLocation () {
                wx.getLocation({
                    isHighAccuracy: true,
                    success: (res) => {
                        console.log(res)
                        const latitude = res.latitude
                        const longitude = res.longitude
                        wx.openLocation({
                            latitude,
                            longitude,
                            scale: 18
                        })
                    },
                    fail: (res) => {
                        console.log(res)
                    }
                })
            },
            /*自动定位*/
            autoLocation () {
                wx.authorize({ // 提前发起授权请求 用户信息除外
                    scope: 'scope.userLocation',
                    success: () => {
                        let systemInfo = wx.getSystemInfoSync() // 手机权限
                        if(!systemInfo.locationEnabled) {
                            wx.showModal({
                                title: '授权提示',
                                content: '请开启手机系统定位功能',
                                showCancel: false,
                                success(res) {
                                    if (res.confirm) {
                                        console.log('用户点击确定')
                                    } else if (res.cancel) {
                                        console.log('用户点击取消')
                                    }
                                }
                            })
                        }else{
                            this.getLocation()
                        }
                    },
                    fail: () => {
                        console.log(123)
                        wx.showModal({
                            title: '授权失败提示',
                            content: '如需要授权您的位置，请打开设置',
                            confirmText: '需要',
                            cancelText: '不需要',
                            success: (res) => {
                                if (res.confirm) {
                                    console.log('用户点击确定')
                                    wx.openSetting({
                                        success: (res) => {
                                            console.log(res.authSetting)
                                            wx.showToast({
                                                title: '授权成功',
                                                icon: 'none',
                                            })
                                            if(res.authSetting['scope.userLocation']){
                                                // this.autoLocation()
                                                console.log(this)
                                                console.log(wx)


                                            }
                                        }
                                    })
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        })
                    }
                })
            },
            /*拍照*/
            createCamera () {
                wx.authorize({ // 提前发起授权请求 用户信息除外
                    scope: 'scope.camera',
                    success: () => {
                        this.cameraContext.takePhoto({
                            success: (res) => {
                                console.log(res)
                                wx.showToast({
                                    title: this.imgSrc,
                                    icon: 'none',
                                })
                                this.imgSrc = res.tempImagePath
                            },
                            fail: (res) => {
                                console.log(res)
                            },
                        })
                    },
                    fail: () => {
                        wx.showModal({
                            title: '授权失败提示',
                            content: '如需要拍照，请打开设置',
                            confirmText: '需要',
                            cancelText: '不需要',
                            success: (res) => {
                                if (res.confirm) {
                                    console.log('用户点击确定')
                                    wx.openSetting({
                                        success: (res) => {
                                            console.log(res.authSetting)
                                            if(res.authSetting['scope.camera']){

                                                // wx.showToast({
                                                //     title: this.imgSrc,
                                                //     icon: 'none',
                                                // })
                                            }
                                        }
                                    })
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        })
                    }
                })


            },
            /*扫码*/
            scanQrcode () {
                wx.scanCode({
                    success (res) {
                        console.log(res)
                        wx.showModal({
                            title: '提示',
                            content: JSON.stringify(res),
                            showCancel: false,
                            success (res) {
                                if (res.confirm) {
                                    console.log('用户点击确定')
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        })
                    }
                })
            },
            onload1 () {
                const pages = getCurrentPages()
                console.log(pages)
                const perpage = pages[pages.length - 1]
                console.log(perpage)
                perpage.onLoad()
                // let url = '/pages/com/com'
                // uni.reLaunch({ url })
            }
        }

    }
</script>

<style scoped>

</style>