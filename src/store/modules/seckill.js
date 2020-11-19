import { reqseckillList } from '../../utils/http'

const state = {
    list: []
}

const mutations = {
    changeList(state, arr) {
        state.list = arr;
    }
}

const actions = {
    reqList(context,bool) {
        reqseckillList({page:context.state.page,size:context.state.size}).then(res => {
            let list = res.data.list?res.data.list:[];
            context.commit("changeList",list);
        });
    }
}

const getters = {
    list(state) {
        return state.list;
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}