<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow"  @closed="closed">
      <el-form>
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="user.roleid" placeholder="请选择">
            <el-option v-for="item in data" :key="item.id" :value="item.id" :label="item.rolename"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="user.password"></el-input>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clear()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.title=='添加管理员'">确 定</el-button>
        <el-button type="primary" @click="update()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert";
import { reqRoleList ,reqUserAdd ,reqUserDetail ,reqUserUpdate} from "../../../utils/http";


export default {
  props: ["info"],
  data() {
    return {
      user: {
        roleid: "",
        username: "",
        password:"",
        status: 1
      },
      data: []
    };
  },
  methods:{
    clear(){
      this.info.isShow = false;
    },
    add(){
      reqUserAdd(this.user).then(res=>{
        if(res.data.code == 200){   
          successAlert("添加成功");
          this.empty();
          this.clear();
          this.$emit("init")
        }
      })
    },
    empty(){
      this.user={
        roleid: "",
        username: "",
        password:"",
        status: 1
      }
    },
    getOne(uid){
      reqUserDetail(uid).then(res=>{
        this.info.isShow=true
        this.user = res.data.list;
        this.user.password = '';
      })
    },
    update(){
      reqUserUpdate(this.user).then(res=>{
        if(res.data.code ==200){
          successAlert("编辑成功");
          this.clear();
          this.empty();
          this.$emit("init");
        }
      })
    },
    closed(){
      if (this.info.title === "修改信息") {
        this.empty();
      }
    }
  },
  mounted() {
    //初始化form下拉列表数据
    reqRoleList().then(res => {
      this.data = res.data.list;
    });
  }
};
</script>

<style>
</style>