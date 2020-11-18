<template>
  <div>
      <el-table
      :data='list'
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="分类编号"></el-table-column>
      <el-table-column prop="catename" label="分类名称"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
            <img class="pic" :src="'http://localhost:3000'+scope.row.img" alt="">
        </template>
      </el-table-column>
      
      <el-table-column label="状态">
        <el-button type="primary">启用</el-button>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {reqcateDel} from '../../../utils/http'
import {successAlert} from '../../../utils/alert'
import {mapActions,mapGetters} from "vuex"

export default {
  computed:{
    ...mapGetters({
      list:"cate/list"
    })
  },
  methods:{
    ...mapActions({
      reqList:"cate/reqList"
    }),
    del(id){
      reqcateDel(id).then(res=>{
        if(res.data.code == 200){
          successAlert("删除成功");
          this.reqList();
        }
      })
    },
    edit(id){
      this.$emit("edit",id)
    }
  },
  mounted(){
    this.reqList();
  }
};
</script>

<style scoped>
.pic{
  width: 100px;
  height: 100px;
  
}
</style>