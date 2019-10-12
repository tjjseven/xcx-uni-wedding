<template>
    <div class="t_content">
        <!--<web-view src="http://weixin.cyapp.net/cycloud"></web-view>-->
        <img :src="headerImg" alt="">
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
            wx.getSetting({ // 获取设置
                success: (res) => {
                    console.log(res.authSetting["scope.userInfo"])
                    // res.authSetting = {
                    //   "scope.userInfo": true,
                    //   "scope.userLocation": true
                    // }
                    if(res.authSetting["scope.userInfo"]){ // 已经授权
                        wx.getLocation({
                            success: (res) => {
                                console.log(res)
                            }
                        })
                        wx.openSetting({
                            success: (res) => {
                                console.log(res.authSetting)
                            }
                        })
                    }else{ // 未授权
                        wx.authorize({ // 调用授权
                            scope: 'scope.record',
                            success: () => {
                                wx.getUserInfo({
                                    success: (res) => {
                                        console.log(res)
                                        console.log(res.userInfo)
                                        this.headerImg = res.userInfo.avatarUrl
                                    }
                                })
                            }
                        })


                    }
                }
            })
        }
    }
</script>

<style scoped>

</style>