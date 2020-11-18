<template>
  <div>
      <el-table
      :data='list'
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="规格编号"></el-table-column>
      <el-table-column prop="specsname" label="规格名称"></el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="scope">
            <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
          </template>
      </el-table-column>
      
      <el-table-column label="状态">
        <el-button type="primary" >启用</el-button>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" 
      :total="total"
      :page-size="size"
      @current-change="changePage"
      ></el-pagination>
  </div>
</template>

<script>
import {reqspecsDel} from '../../../utils/http'
import {successAlert} from '../../../utils/alert'
import {mapActions,mapGetters} from "vuex"

export default {
  computed:{
    ...mapGetters({
      list:"specs/list",
      total:"specs/total",
      size:"specs/size",
      page:"specs/page"
    })
  },
  methods:{
    ...mapActions({
      reqList:"specs/reqList",
      reqCount:"specs/reqCount",
      reqPage:"specs/reqPage"
    }),
    del(id){
      reqspecsDel(id).then(res=>{
        if(res.data.code == 200){
          successAlert("删除成功");
          this.reqList();
          this.reqCount();
        }
      })
    },
    edit(id){
      this.$emit("edit",id)
    },
    changePage(id){
      this.reqPage(id)
    }
  },
  mounted(){
    this.reqList();
    this.reqCount();
  }
};
</script>

<style scoped>
.pic{
  width: 100px;
  height: 100px;
  
}
</style>