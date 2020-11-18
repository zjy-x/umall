<template>
  <div>
      <el-table
      :data='list'
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="角色编号"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"></el-table-column>
      
      <el-table-column label="状态">
        <el-button type="primary">启用</el-button>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {reqRoleDel} from '../../../utils/http'
import {successAlert} from '../../../utils/alert'

export default {
  props:['list'],
  methods:{
    del(id){
      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //删除
          reqRoleDel(id).then(res=>{
            if(res.data.code == 200){
              successAlert("删除成功");
              this.$emit("init");
            }
          })
        })
        .catch(() => {
        });
    },
    edit(id){
      this.$emit("edit",id)
    }
  }
};
</script>

<style>
</style>