<template>
    <div>
        <cu-custom bgColor="bg-gradual-pink" :isBack="false" :bgImage="bgImage" class="t_nav">
            <block slot="backText">返回</block>
            <block slot="content">糖糖部落格</block>
        </cu-custom>
        <!--<Index v-if="PageCur==='index'"></Index>-->
        <!--<About v-if="PageCur==='about'"></About>-->
        <!--<div @click="PageCur = !PageCur">点击</div>-->
    </div>
</template>

<script>
    // import Index from '@/pages/index/index'
    // import About from '@/pages/about/about'
    export default {
        name: "com",
        data () {
            return {
                bgImage: 'https://7473-ts-007-1258546774.tcb.qcloud.la/wave.gif?sign=1093f2b406a63c81959840324ac42ccc&t=1571030338',
                // bgImage: require('@/static/images/wave.gif'),
                // bgImage: '',
                PageCur: ''
            }
        },
        components:{
            // Index,
            // About
        },
        onLoad (options) {
            wx.showModal({
                title: '提示',
                content: JSON.stringify(options),
                showCancel: false,
                success (res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
            console.log(options)
        },
        mounted ()  {
            // console.log(this.$store.state.PageCur)
            // console.log(this.$mp.page.getTabBar().data.PageCur)
            this.PageCur =  wx.getStorageSync('pageCur') || this.$mp.page.getTabBar().data.PageCur
            // console.log(this.PageCur)
        },
        watch: {
            PageCur: {
                handler(newVal, oldVal){
                    // console.log(newVal)
                    // console.log(oldVal)
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>

<style scoped>

</style>