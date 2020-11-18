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

export default {
  data(){
    return {
      info:{
        isShow:false,
        title:"添加规格"
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
      this.info.title = "添加规格"
    },
    edit(id){
      this.info={
        isShow:true,
        title:"编辑规格"
      }
      this.$refs.form.getOne(id);
    }
  }
}
</script>

<style>

</style>