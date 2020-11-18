<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="user.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="user.catename" placeholder="请填写"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="120px">
          <div class="img_box">
            <h3 class="img_add">+</h3>
            <img class="pic" v-if="imgUrl" :src="imgUrl" alt />
            <input class="img_input" type="file" @change="imgFile" />
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clear()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.title=='添加分类'">确 定</el-button>
        <el-button type="primary" @click="update()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert";
import { reqcateAdd, reqcateDetail, reqcateUpdate } from "../../../utils/http";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/list"
    })
  },

  data() {
    return {
      user: {
        pid: "",
        catename: "",
        img: null,
        status: 1
      },
      data: [],
      imgUrl: ""
    };
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList"
    }),
    imgFile(e) {
      let file = e.target.files[0];
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    clear() {
      this.info.isShow = false;
    },
    //清空工作
    empty() {
      this.user = {
        pid: "",
        catename: "",
        img: null,
        status: 1
      };
      this.imgUrl = "";
    },
    add() {
      reqcateAdd(this.user).then(res => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          this.empty();
          this.clear();
          //添加完成 让父组件重新请求 rolelist 的数据给到list 重新渲染页面
          this.reqList();
        }
      });
    },
    getOne(id) {
      reqcateDetail(id).then(res => {
        this.user = res.data.list;
        this.imgUrl = "http://localhost:3000" + this.user.img;
        this.user.id = id;
      });
    },
    update() {
      console.log(11111);
      reqcateUpdate(this.user).then(res => {
        if (res.data.code == 200) {
          successAlert("编辑成功");
          this.clear();
          this.empty();
          this.reqList();
        }
      });
    },
    closed() {
      if (this.info.title === "角色信息") {
        this.empty();
      }
    }
  }
};
</script>

<style scoped>
.img_box {
  position: relative;

  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  border-radius: 5px;
}
.img_add {
  width: 100px;
  height: 100px;
  line-height: 100px;
  color: #ccc;
  text-align: center;
  font-size: 30px;
  font-weight: 100;
}
.img_input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100px;
  height: 100px;
  opacity: 0;
}
.pic {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100px;
  height: 100px;
  vertical-align: middle;
}
</style>