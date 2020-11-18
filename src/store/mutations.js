export const state = {
    //因为页面刷新后vuex的userInfo会置空，所以将存在浏览器上的userInfo存储到vuex中
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):{}
}
export const mutations = {
    changeUserInfo(state,obj){
        state.userInfo = obj;
        sessionStorage.setItem("userInfo",JSON.stringify(obj))
    }
}
export const getters = {
    userInfo(state){
        return state.userInfo;
    }
}