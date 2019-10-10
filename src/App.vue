<script>
    import Vue from 'vue'
	export default {
		onLaunch: function() {
			// console.log('App Launch')
            uni.getSystemInfo({
                success: function(e) {
                    // #ifndef MP
                    Vue.prototype.StatusBar = e.statusBarHeight;
                    if (e.platform == 'android') {
                        Vue.prototype.CustomBar = e.statusBarHeight + 50;
                    } else {
                        Vue.prototype.CustomBar = e.statusBarHeight + 45;
                    };
                    // #endif
                    // #ifdef MP-WEIXIN
                    Vue.prototype.StatusBar = e.statusBarHeight;
                    let custom = wx.getMenuButtonBoundingClientRect();
                    Vue.prototype.Custom = custom;
                    Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
                    // #endif
                    // #ifdef MP-ALIPAY
                    Vue.prototype.StatusBar = e.statusBarHeight;
                    Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
                    // #endif
                }
            })
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
    @import "assets/colorui/main.css";
    @import "assets/colorui/icon.css";
    .t_nav{
        position: fixed;
        top: 0;
        z-index: 999999;
    }
    .t_content {
        text-align: center;
        height: 100vh;
        padding-top: 64px;
        overflow: auto;
        font-size: 12px;
        padding-bottom: 50px;
    }
</style>
