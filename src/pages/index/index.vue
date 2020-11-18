<template>
  <div>
    <el-container class="box">
      <!-- 侧边栏 -->
      <el-aside width="201px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!-- 动态侧边栏 -->
          <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 目录 -->
                        <!-- index 需要一个字符串 -->
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 菜单 -->
            <el-menu-item v-else :index="item.url">{{item.title}}</el-menu-item>
          </div>
          
        </el-menu>
      </el-aside>

      <!-- right -->
      <el-container>
        <!-- header -->
        <el-header>
          <template>
            <div class="header">
              {{userInfo.username}}
              <el-button type="primary">退出登录</el-button>
            </div>
              
          </template>
        </el-header>
        <!-- main -->
        <el-main>

          <!-- 面包屑导航 -->
          <el-breadcrumb separator="/" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
              <a href="/">{{$route.name}}</a>
            </el-breadcrumb-item>
          </el-breadcrumb>


          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters({
      userInfo:'userInfo'
    })
  },
  mounted(){
    // console.log(this.$store);
  }
};
</script>

<style scoped>
.box {
  height: 100vh;
}
.el-aside {
  color: #fff;
  background-color: #20222a;
}
.el-header {
  height: 40px;
  background-color: skyblue;
}
.el-breadcrumb{
  margin-bottom: 20px;
}
.header{
  float: right;
  margin-top: 10px;
}
</style>