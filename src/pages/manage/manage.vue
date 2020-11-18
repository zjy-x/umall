<template>
  <div>
    <el-button type="primary" @click="tag()">添加</el-button>
    <v-list :data="data" @init="newInit" @edit="edit($event)"></v-list>

    <el-pagination background
    @current-change="changePage"  
     layout="prev, pager, next" :total="total" :page-size="size"></el-pagination>




    <v-form :info="info" @init="newInit" ref="form"></v-form>



  </div>
</template>

<script>
import vList from "./components/list";
import vForm from "./components/form";
import { reqUserList ,reqUserCount} from "../../utils/http";

export default {
  data() {
    return {
      info: {
        isShow: false,
        title: "添加用户"
      },
        size: 2,
        page: 1,
      data: [],
      total:0
    };
  },
  components: {
    vList,
    vForm
  },
  methods: {
    tag() {
      this.info = {
        isShow: true,
        title: "添加管理员"
      };
    },
    init() {
       
      reqUserList({page:this.page,size:this.size}).then(res => {
        //取的页码书有数据则添加数据，没有则添加一个空数组，防止报错
        let list = res.data.list ?res.data.list:[]
        
        //如果取到的list为[],page就减少1，然后重新请求数据
        //若list为[],page=1，则不进入，直接把list 赋值给data
        if(list.length == 0&& this.page>1){
          this.page--;
          this.init();
          return;
        }
        this.data = list;
      });
    },
    newInit(){
      this.init();
      this.getCount();
    },
    edit(uid) {
      this.info.title = "修改信息";
      this.$refs.form.getOne(uid);
    },
    //第一个参数就是点击的页码数
    changePage(page){
      this.page=page;
      this.init()
    },
    getCount(){
      reqUserCount().then(res=>{
        this.total = res.data.list[0].total;
      })
    }
  },
  mounted() {
    //用户列表
    this.init();

    //用户总数
    this.getCount();
  }
};
</script>

<style scoped>
.el-button {
  margin-bottom: 15px;
}
</style>