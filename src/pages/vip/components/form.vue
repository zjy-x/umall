<template>
  <div>
    <el-dialog title="编辑会员信息" :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="clear()">取 消</el-button>
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqvipDetail, reqvipUpdate } from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";

export default {
  props:["info"],
  data() {
    return {
      user:{
        uid:'',
        nickname:'',
        phone:'',
        password:'',
        status:'',
      }
    };
  },
  methods: {
    clear() {
      this.info.isshow = false;
    },
    getOne(uid) {
      reqvipDetail(uid).then(res => {
        //此时form上是没有id的
        this.user = res.data.list;
      });
    },
    update() {
      reqvipUpdate(this.user).then(res => {
        if (res.data.code === 200) {
          successAlert("修改成功");
          this.clear();
          // this.empty();
          this.$emit("init");
        }
      });
    },
  }
};
</script>

<style>
</style>