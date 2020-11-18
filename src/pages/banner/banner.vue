<template>
  <div>
    <el-button @click="tag()">添加</el-button>
    <!-- list -->
    <v-list @edit="edit"></v-list>

    <!-- form -->
    <v-form :info="info" ref="form" ></v-form>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import {mapActions,mapGetters} from "vuex"

export default {
  computed:{
    ...mapGetters({
      list:"banner/list"
    })
  },
  data() {
    return {
      info: {
        isshow: false,
        title:"添加轮播图"
      }
    };
  },
  methods: {
    ...mapActions({
      reqBList:"banner/reqBList"
    }),
    edit(id) {
      this.info = {
        isshow:true,
        title:"编辑轮播图"
      }
      this.$refs.form.getOne(id);
    },
    tag(){
      this.info={
        isshow: true,
        title:"添加轮播图"
      }
    }
  },
  components: {
    vList,
    vForm
  },
  mounted() {
    this.reqBList()
  }
};
</script>

<style socped>
.el-button {
  margin-bottom: 10px;
}
</style>