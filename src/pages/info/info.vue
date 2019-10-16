<template>
    <div class="t_content">
        <button open-type="getUserInfo" @getuserinfo="getUserInfo">获取信息</button>
        <button open-type="openSetting" @opensetting="openSetting">打开设置页</button>
        <!--<web-view src="http://weixin.cyapp.net/cycloud"></web-view>-->
        <img :src="headerImg" alt="">
        <open-data type="userNickName" lang="zh_CN"></open-data>
        <open-data type="userGender" lang="zh_CN"></open-data>
        <button @click="getL">获取地址</button>
        <navigator url="/package/detail/detail">canvas</navigator>
    </div>
</template>

<script>

    export default {
        name: "info",
        data () {
            return {
                headerImg: ''
            }
        },
        mounted () {
            // uni.login({     // 登陆接口
            //     provider:'weixin',
            //     scopes:'auth_base',
            //     timeout:20000,
            // }).then(data=> {    //返回一系列登陆信息
            //     console.log(data)
            // })

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



                    if(res.authSetting["scope.userLocation"]){
                        this.getLocation()
                    }else{
                        wx.authorize({ // 调用授权 用户信息除外
                            scope: 'scope.userLocation',
                            success: () => {
                                this.getLocation()
                            },
                            fail: () => {
                                console.log(123)
                                wx.showModal({
                                    title: '授权失败提示',
                                    content: '罗雪是只猪',
                                    confirmText: '是的',
                                    cancelText: '是的',
                                    // content: '如需要授权您的位置，请打开设置',
                                    // confirmText: '需要',
                                    // cancelText: '不需要',
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
                            }
                        })
                    }
                }
            })
        },
        methods: {
            getL () {
                wx.openSetting({
                    success: (res) => {
                        console.log(res.authSetting)
                    }
                })
            },
            openSetting (e) {
                console.log(e)
            },
            getUserInfo (e) {
                console.log(e)
            },
            getLocation () {
                wx.getLocation({
                    success: (res) => {
                        console.log(res)
                        const latitude = res.latitude
                        const longitude = res.longitude
                        wx.openLocation({
                            latitude,
                            longitude,
                            scale: 18
                        })
                    }
                })
            }
        }

    }
</script>

<style scoped>

</style>