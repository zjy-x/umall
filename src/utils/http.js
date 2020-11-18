import axios from 'axios'
import qs from 'qs'
import {errorAlert} from '../utils/alert'

import store from '../store'
import router from '../router'

let baseUrl = '/aa';

// 请求拦截
axios.interceptors.request.use(req=>{
    //如果请求的不是登录页面，则在请求头中的authorization
    if(req.url !== baseUrl+"/api/userlogin"){
        req.headers.authorization = store.state.userInfo.token;
    }

    return req
});


//响应拦截
axios.interceptors.response.use(res=>{
    console.log("本次请求地址是："+res.config.url);
    console.log(res);
    //请求失败自动提示
    if(res.data.code !== 200){
        errorAlert(res.data.msg)
    }

    if(res.data.msg ==="登录已过期或访问权限受限"){
        store.commit('changeUser', {})
        router.push('/login')
    }

    return res;
})

// =====================菜单管理======================
//添加
export const reqMenuAdd = (form) =>{
    return axios({
        url:baseUrl+"/api/menuadd",
        method:'post',
        data:qs.stringify(form)
    })
}

// 查询列表
export const reqMenuList=()=>{
    return axios({
        url:baseUrl+"/api/menulist",
        method:"get",
        params:{
            istree:true
        }
    })
}


//查询一条数据
export const reqMenuDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        method:"get",
        params:{
            id:id
        }
    })
}

//修改
export const reqMenuUpdate=(form)=>{
    return axios({
        url:baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(form)
    })
}


//删除
export const reqMenuDel=(id)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}


// =====================角色管理======================

//添加
export const reqRoleAdd = (user) =>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:'post',
        data:qs.stringify(user)
    })
}

//获取列表
export const reqRoleList=()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
        method:"get",
    })
}

//查询一条数据
export const reqRoleDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/roleinfo",
        method:"get",
        params:{
            id:id
        }
    })
}

//修改
export const reqRoleUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/roleedit",
        method:"post",
        data:qs.stringify(user)
    })
}

//删除
export const reqRoleDel=(id)=>{
    return axios({
        url:baseUrl+"/api/roledelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}

// =====================管理员管理======================


//添加
export const reqUserAdd = (user) =>{
    return axios({
        url:baseUrl+"/api/useradd",
        method:'post',
        data:qs.stringify(user)
    })
}

//获取列表 form={page:1,size:10}
export const reqUserList=(form)=>{
    return axios({
        url:baseUrl+"/api/userlist",
        method:"get",
        params:form
    })
}

//查询一条数据
export const reqUserDetail=(uid)=>{
    return axios({
        url:baseUrl+"/api/userinfo",
        method:"get",
        params:{
            uid:uid
        }
    })
}

//修改
export const reqUserUpdate=(form)=>{
    return axios({
        url:baseUrl+"/api/useredit",
        method:"post",
        data:qs.stringify(form)
    })
}

//删除
export const reqUserDel=(uid)=>{
    return axios({
        url:baseUrl+"/api/userdelete",
        method:"post",
        data:qs.stringify({
            uid:uid
        })
    })
}

//总数
export const reqUserCount=(id)=>{
    return axios({
        url:baseUrl+"/api/usercount",
        method:"get",
    })
}

//1.登录
export const reqLogin = (user) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(user)
    })
}



// =====================商品分类管理======================


//添加
export const reqcateAdd = (user) =>{
    let d=new FormData()
    for(let i in user){
        d.append(i,user[i])
    }

    return axios({
        url:baseUrl+"/api/cateadd",
        method:'post',
        data:d
    })
}

//获取列表 form={istree:true,pid:__}
export const reqcateList=(form)=>{
    return axios({
        url:baseUrl+"/api/catelist",
        method:"get",
        params:form
    })
}

//查询一条数据
export const reqcateDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/cateinfo",
        method:"get",
        params:{
            id:id
        }
    })
}

//修改
export const reqcateUpdate=(form)=>{
    let d=new FormData()
    for(let i in form){
        d.append(i,form[i])
    }

    return axios({
        url:baseUrl+"/api/cateedit",
        method:"post",
        data:d
    })
}

//删除
export const reqcateDel=(id)=>{
    return axios({
        url:baseUrl+"/api/catedelete",
        method:"post",
        data:{
            id:id
        }
    })
}



// =====================商品规格管理======================

// 添加
export const reqspecsAdd = (user) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data:qs.stringify(user)
    })
}

//列表 p={page:1,size:10}
export const reqspecsList = (p) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: p
    })
}

//删除
export const reqspecsDel = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 详情
export const reqspecsDetail = id => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}



// 修改
export const reqspecsUpdate = (user) => {
   
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(user)
    })
}

//总数
export const reqspecsCount = () => {
   
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get",
    })
}




// =====================商品规格管理======================

// 添加 文件
export const reqgoodsAdd = (user) => {
    let d=new FormData()
    for(let i in user){
        d.append(i,user[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data:d
    })
}

//列表 p={page:1,size:10}
export const reqgoodsList = (p) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: p
    })
}

//删除
export const reqgoodsDel = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 详情
export const reqgoodsDetail = id => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}



// 修改 文件
export const reqgoodsUpdate = (user) => {
    let d=new FormData()
    for(let i in user){
        d.append(i,user[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: d
    })
}

//总数 
export const reqgoodsCount = () => {
   
    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get",
    })
}














// =====================菜单管理======================
//获取一条
export const reqvipDetail = (uid) =>{
    return axios({
        url:baseUrl+"/api/memberinfo",
        method:'get',
        params:{
            uid:uid
        }
    })
}

// 查询列表
export const reqvipList=()=>{
    return axios({
        url:baseUrl+"/api/memberlist",
        method:"get"
    })
}


//修改
export const reqvipUpdate=(form)=>{
    return axios({
        url:baseUrl+"/api/memberedit",
        method:"post",
        data:qs.stringify(form)
    })
}


