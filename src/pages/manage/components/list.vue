<template>
  <div>
      <el-table
      :data="data"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="用户编号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      
      <el-table-column label="状态">
        <el-button type="primary">启用</el-button>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {reqUserDel} from '../../../utils/http'
import {successAlert} from '../../../utils/alert'

export default {
  props:['data'],
  methods:{
    del(uid){
      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //删除
          reqUserDel(uid).then(res=>{
            if(res.data.code == 200){
              successAlert("删除成功");
              this.$emit("init");
            }
          })
        })
        .catch(() => {
        });
    },
    edit(uid){
      this.$emit("edit",uid)
    }
  }
};
</script>

<style>
</style>