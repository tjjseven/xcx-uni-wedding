<template>
	<view class="t_content">
        <swiper/>
		<canvas id="lottie" type="2d"></canvas>
	</view>
</template>

<script>
    // import lottie from 'lottie-web'
    import lottie from 'lottie-miniprogram'
	export default {
		data() {
			return {
                pathData:'https://labs.nearpod.com/bodymovin/demo/al_boardman/articulation/rejection.json'
			}
		},
		mounted() {
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
                    loop: false,
                    autoplay: true,
                    rendererSettings: {
                        context
					},
                    path: this.pathData,//如果没有图片做动效,全是设计师用画的矢量图形
                    //animationData: animationData   //如果有图片做动效,二者填其一即可
                })
            }).exec()

            // console.log(uni.createCanvasContext('lottie'))

            // uni.login({//登陆接口
            //     provider:'weixin',
            //     scopes:'auth_base',
            //     timeout:20000,
            // }).then(data=> {//返回一系列登陆信息
            //     console.log(data)
            // })


		},
		methods: {

		}
	}
</script>

<style>
	#lottie{
		margin-top: 100px;
		width: 100%;
		height: 200px;
	}
</style>
