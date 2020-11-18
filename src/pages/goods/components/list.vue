<template>
  <div>
      <el-table
      :data='list'
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="商品编号"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="market_price" label="市场价格"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
            <img class="pic" :src="$imgPre+scope.row.img" alt="">
          </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.isnew===1">是</el-button>
            <el-button type="danger" v-else>否</el-button>
          </template>
      </el-table-column>
      
      <el-table-column label="状态">
        <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.ishot===1">是</el-button>
            <el-button type="danger" v-else>否</el-button>
          </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
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
import {reqgoodsDel} from '../../../utils/http'
import {successAlert} from '../../../utils/alert'
import {mapActions,mapGetters} from "vuex"

export default {
  computed:{
    ...mapGetters({
      list:"goods/list",
      total:"goods/total",
      size:"goods/size",
    })
  },
  methods:{
    ...mapActions({
      reqgoodsList:"goods/reqList",
      reqgoodsCount:"goods/reqCount",
      reqgoodsPage:"goods/reqPage"
    }),
    del(id){
      reqgoodsDel(id).then(res=>{
        if(res.data.code == 200){
          successAlert("删除成功");
          this.reqgoodsList();
          this.reqgoodsCount();
        }
      })
    },
    edit(id){
      this.$emit("edit",id)
    },
    changePage(page){
      this.reqgoodsPage(page)
    }
  },
  mounted(){
    this.reqgoodsList();
    this.reqgoodsCount();
  }
};
</script>

<style scoped>

.pic{
  width: 100px;
  height: 100px;
}
</style>