<template>
    <div>
        <cu-custom bgColor="bg-gradual-pink" :isBack="true" :bgImage="bgImage" class="t_nav">
            <block slot="backText">返回</block>
            <block slot="content">糖糖部落格</block>
        </cu-custom>
        <div class="t_content">
            <img src="../../static/images/tabbar/about.png" alt="">1
            <!--<canvas id="lottie" type="2d"></canvas>-->
        </div>
    </div>

</template>

<script>
    import lottie from 'lottie-miniprogram'
    export default {
        name: "detail",
        data () {
            return {
                bgImage: 'https://7473-ts-007-1258546774.tcb.qcloud.la/wave.gif?sign=1093f2b406a63c81959840324ac42ccc&t=1571030338',
                pathData:'https://labs.nearpod.com/bodymovin/demo/al_boardman/articulation/estimate.json'
            }
        },
        mounted() {
            return
            // console.log(uni.createSelectorQuery().selectAll('#lottie'))
            // console.log(wx.createSelectorQuery().select('#lottie'))
            const query = uni.createSelectorQuery().in(this).select('#lottie');
            query.boundingClientRect(data => {
                console.log("得到布局位置信息" + JSON.stringify(data));
                console.log("节点离页面顶部的距离为" + data.top);
            }).exec();

            query.fields({
                id: true,
                dataset: true,
                rect: true,
                size: true,
                scrollOffset: true,
                properties: ['type'],
                computedStyle: ['id'],
                context: true
            }, data => {
                console.log("得到节点信息" + JSON.stringify(data));
                console.log("节点的宽为" + data.width);
            }).exec();

            query.node(res => {
                console.log(res)
                // 	console.log(uni.createCanvasContext('lottie', this))
                const canvas = res.node
                const context = canvas.getContext('2d')
                lottie.setup(canvas)
                lottie.loadAnimation({
                    loop: true,
                    autoplay: true,
                    rendererSettings: {
                        context
                    },
                    path: this.pathData,//如果没有图片做动效,全是设计师用画的矢量图形
                    //animationData: animationData   //如果有图片做动效,二者填其一即可
                })
            }).exec()

            // console.log(uni.createCanvasContext('lottie'))




        },
    }
</script>

<style scoped>

</style>