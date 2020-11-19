import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import actions from './actions'
import {state,mutations,getters} from './mutations'
import cate from './modules/cate'
import specs from './modules/specs'
import banner from './modules/banner'
import goods from './modules/goods'
import seckill from './modules/seckill'

let store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        cate,
        specs,
        banner,
        goods,
        seckill
    }
})

export default store
