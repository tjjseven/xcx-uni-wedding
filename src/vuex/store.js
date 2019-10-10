// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import comMethods from './comMethods'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        loadState: true, // 加载图标状态
        PageCur: 'index'
    },
    mutations: {
        loading (state, loading) {
            state.loadState = loading
        }
    },
    getters: {
        comMethods(state){
            return comMethods
        }
    },
})

export default store
