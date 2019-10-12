<template>
    <div>
        <cu-custom bgColor="bg-gradual-pink" :isBack="false" :bgImage="bgImage" class="t_nav">
            <block slot="backText">返回</block>
            <block slot="content">导航栏</block>
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
                backText: 'back',
                content: '中间',
                title: 'Hello',
                // bgImage: '',
                bgImage: require('@/static/images/wave.gif'),
                PageCur: ''
            }
        },
        components:{
            // Index,
            // About
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