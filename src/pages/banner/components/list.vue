<template>
  <div>
    <el-table
      :data='list'
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="title" label="轮播图标题"></el-table-column>
      <el-table-column prop="phone" label="图片">
        <template slot-scope="scope">
            <img class="pic" :src="'http://localhost:3000'+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
import {reqbannerDel} from '../../../utils/http'
import { successAlert } from '../../../utils/alert';
export default {
  props:["info"],
  computed:{
    ...mapGetters({
      list:"banner/list"
    })
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapActions({
      reqBList:"banner/reqBList"
    }),
    edit(id) {
      this.$emit("edit",id);
    },
    del(id){
      console.log(id);
      reqbannerDel(id).then(res=>{
        if(res.data.code === 200){
          successAlert("删除成功");
          this.reqBList()
        }
      })
    }
  }
};
</script>

<style scoped>
.pic{
  width: 100px;
  height: 100px;
  
}
</style>