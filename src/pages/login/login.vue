<template>
  <div class="login">
      <div class="login_box">
        <h2>登录</h2>
        <div class="line">
          <el-input v-model="user.username" placeholder="请输入内容" clearable></el-input>
        </div>
        <div class="line">
          <el-input type="password" v-model="user.password" placeholder="请输入内容" show-password clearable></el-input>
        </div>
        <el-button type="primary" @click="login">登录</el-button>
      </div>
  </div>
</template>

<script>
import {reqLogin} from '../../utils/http'
import {successAlert} from '../../utils/alert'
import {mapActions} from 'vuex'

export default {
  
  data() {
    return {
      user:{
        username:'',
        password:''
      }
    }
  },
  methods: {
    ...mapActions({
      changeUser:"changeUser",
    }),
    login(){
      reqLogin(this.user).then(res=>{
        if(res.data.code ==200){
          successAlert("登录成功")

          //得到的数据存入vuex 和 sessionstorage
          this.changeUser(res.data.list) 
          
          this.$router.push('/')
        }
      })
    }
  },
}
</script>

<style socped>
.login{
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right,pink,orange);
}
.login_box{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 20px;
  text-align: center;
  width: 400px;
  background-color: #fff;
  border-radius: 10px;
}

.line,h2{
  margin-bottom: 15px;  
}
</style>