<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="标题" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="100px">
          <div class="img_box">
            <h3 class="img_add">+</h3>
            <img class="pic" v-if="imgUrl" :src="imgUrl" alt />
            <input class="img_input" type="file" @change="imgFile" />
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="clear()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.title=='添加轮播图'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqbannerAdd,
  reqbannerDetail,
  reqbannerUpdate
} from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
import { mapActions } from "vuex";

export default {
  props: ["info"],
  data() {
    return {
      user: {
        title: "",
        img: null,
        status: 1
      },
      imgUrl: ""
    };
  },
  methods: {
    ...mapActions({
      reqBList: "banner/reqBList"
    }),
    clear() {
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        title: "",
        img: null,
        status: 1
      },
      this.imgUrl = "";
    },
    imgFile(e) {
      let file = e.target.files[0];
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    add() {
      reqbannerAdd(this.user).then(res => {
        if (res.data.code === 200) {
          successAlert("添加成功");
          this.empty();
          this.clear();
          this.reqBList();
        }
      });
    },
    getOne(id) {
      reqbannerDetail(id).then(res => {
        this.user = res.data.list;
        this.imgUrl = "http://localhost:3000/" + this.user.img;
        this.user.id = id;
      });
    },
    update() {
      reqbannerUpdate(this.user).then(res => {
        if (res.data.code === 200) {
          successAlert("修改成功");
          this.clear();
          this.empty();
          this.reqBList();
        }
      });
    },
    closed() {
      if (this.info.title === "编辑轮播图") {
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