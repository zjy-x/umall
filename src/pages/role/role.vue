<template>
  <div>
    <el-button type="primary" @click="tag()">添加</el-button>
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
    <v-form :info="info" ref="form" @init="init"></v-form>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import { reqRoleList  } from "../../utils/http";

export default {
  data() {
    return {
      user:{},
      info: {
        title: "添加角色",
        isShow: false
      },
      list: []
    };
  },
  components: {
    vList,
    vForm
  },
  methods: {
    tag() {
      this.info={
        isShow:true,
        title:"添加角色"
      }
    },
    init() {
      reqRoleList().then(res => {
        this.list = res.data.list;
      });
    },
    edit(id){
      this.info.isShow= true;
      this.info.title = '角色信息';
      this.$refs.form.getOne(id)
    }
  },
  mounted() {
    reqRoleList().then(res => {
      this.list = res.data.list;
    });
  }
};
</script>

<style scoped>
.el-button {
  margin-bottom: 15px;
}
</style>