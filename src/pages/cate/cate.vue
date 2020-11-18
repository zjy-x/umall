<template>
  <div>
    <el-button type="primary" @click="tag">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import { reqRoleList  } from "../../utils/http";

export default {
  data(){
    return {
      info:{
        isShow:false,
        title:"添加分类"
      }
    }
  },
  components:{
    vList,
    vForm
  },
  methods:{
    tag(){
      this.info.isShow = true;
      this.info.title = "添加分类"
    },
    edit(id){
      this.info={
        isShow:true,
        title:"编辑分类"
      }
      this.$refs.form.getOne(id);
    }
  }
}
</script>

<style>

</style>