<template>
  <div>
    <el-button type="primary" @click="add()">添加</el-button>

    <!-- list -->
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>

    <!-- form -->
    <v-form :info="info" :list="list" @init="init" ref="form"></v-form>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import { reqMenuList } from "../../utils/http";

export default {
  data() {
    return {
      info: {
        isShow: false,
        title:"添加菜单"
      },
      list: []
    };
  },
  methods: {
    add() {
      this.info.isShow = true;
    },
    init() {
      reqMenuList().then(res => {
        this.list = res.data.list;
      });
    },
    edit(id) {
      this.info.isShow = true;
      this.info.title = "编辑菜单";
      this.$refs.form.getOne(id);
    }
  },
  components: {
    vList,
    vForm
  },
  //进来请求数据库数据渲染到 list 和form
  mounted() {
    this.init();
  }
};
</script>

<style socped>
.el-button {
  margin-bottom: 10px;
}
</style>