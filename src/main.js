import Vue from 'vue'
import App from './App'

/*注册vuex*/
import store from './vuex/store'
Vue.prototype.$store = store;
/*组件*/
import MyPlugin from './utils/plugin'
Vue.use(MyPlugin)

import cuCustom from 'assets/colorui/components/cu-custom'
Vue.component('cu-custom',cuCustom)





Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
