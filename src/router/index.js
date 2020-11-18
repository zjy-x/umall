import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import store from '../store';

function Enter(path,next){
  if(store.state.userInfo.menus_url.includes(path)){
    next();
  }else{
    next('/');
  }
}

export let routes = [{
  path: 'cate',name:'商品分类',
  component: () => import('../pages/cate/cate'),
  beforeEnter(to, from, next){
    Enter("/cate",next);
  }
},
{
  path: 'goods',name:'商品管理',
  component: () => import('../pages/goods/goods'),
  beforeEnter(to, from, next){
    Enter("/goods",next);
  }
},
{
  path: 'manage',name:'管理员管理',
  component: () => import('../pages/manage/manage'),
  beforeEnter(to, from, next){
    Enter("/manage",next);
  }
},
{
  path: 'menu',name:'菜单列表',
  component: () => import('../pages/menu/menu'),
  beforeEnter(to, from, next){
    Enter("/menu",next);
  }
},
{
  path: 'role',name:'角色管理',
  component: () => import('../pages/role/role'),
  beforeEnter(to, from, next){
    Enter("/role",next);
  }
},
{
  path: 'vip',name:'会员管理',
  component: () => import('../pages/vip/vip'),
  beforeEnter(to, from, next){
    Enter("/vip",next);
  }
},
{
  path: 'seckill',name:'秒杀活动',
  component: () => import('../pages/seckill/seckill'),
  beforeEnter(to, from, next){
    Enter("/seckill",next);
  }
},
{
  path: 'specs',name:'商品规格',
  component: () => import('../pages/specs/specs'),
  beforeEnter(to, from, next){
    Enter("/specs",next);
  }
},
{
  path: 'banner',name:'轮播图',
  component: () => import('../pages/banner/banner'),
  beforeEnter(to, from, next){
    Enter("/banner",next);
  }
}]

let router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('../pages/login/login')
    },
    {
      path: '/',
      component: () => import('../pages/index/index'),
      children: [
        {
          path: '',
          component: () => import('../pages/home/home')
        },
        ...routes
      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){
    next()
    return;
  }

  if(sessionStorage.getItem("userInfo")){
    next();
    return;
  }

  next('/login');
})

export default router;