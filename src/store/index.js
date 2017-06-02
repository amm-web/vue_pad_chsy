import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//单个模块状态
import login from './modules/login'

Vue.use(Vuex);
const state = {
        'loadingRequest': 0,
        'loadingMsg': '数据加载中...',
        'pushMsg': '',
        'isClassover':false,
    };

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        login,
    },
    strict: debug
})
