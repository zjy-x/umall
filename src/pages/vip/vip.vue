<template>
  <div>
    <!-- list -->
    <v-list @edit="edit" :list="list"></v-list>

    <!-- form -->
    <v-form :info="info" ref="form" @init="init"></v-form>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import { reqvipList } from "../../utils/http";

export default {
  data() {
    return {
      info: {
        isshow: false
      },
      list: []
    };
  },
  methods: {
    edit(uid) {
      this.info.isshow = true;
      this.$refs.form.getOne(uid);
    },
    init() {
      reqvipList().then(res => {
        this.list = res.data.list;
      });
    }
  },
  components: {
    vList,
    vForm
  },
  mounted() {
    this.init()
  }
};
</script>

<style socped>
.el-button {
  margin-bottom: 10px;
}
</style>