<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed">
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="100px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" label-width="100px">
          <el-select v-model="form.pid" placeholder="请选择" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" label-width="100px">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <!-- 只有选择菜单时显示，因为目录不需要图标 -->
        <el-form-item label="菜单图标" label-width="100px" v-if="form.type===1">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <!-- routes 只是用来循环菜单地址的 -->
        <el-form-item label="菜单地址" label-width="100px">
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              :label="item.name+'--/'+item.path"
              :value="'/'+item.path"
              v-for="item in routes"
              :key="item.path"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="clear()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.title==='添加菜单'">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { routes } from "../../../router";
import { reqMenuAdd, reqMenuDetail, reqMenuUpdate } from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";

export default {
  props: ["info", "list"],
  data() {
    return {
      routes: routes,
      form: {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1
      },
      icons: [
        "el-icon-user",
        "el-icon-s-flag",
        "el-icon-s-operation",
        "el-icon-menu"
      ]
    };
  },
  methods: {
    clear() {
      this.info.isShow = false;
    },
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1
      };
    },
    add() {
      reqMenuAdd(this.form).then(res => {
        if (res.data.code == 200) {
          //弹框、清空、消失
          successAlert("添加成功");
          this.empty();
          this.clear();

          //页面添加完成后 数据需要重新渲染 ，需要调用叫父元素重新请求
          this.$emit("init"); //自定义事件init  需要在父元素@init：“父元素调用自己的方法”
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
    changePid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    getOne(id) {
      reqMenuDetail(id).then(res => {
        //此时form上是没有id的
        this.form = res.data.list;
        //补id
        this.form.id = id;
      });
    },
    update() {
      reqMenuUpdate(this.form).then(res => {
        if (res.data.code === 200) {
          successAlert("修改成功");
          this.clear();
          this.empty();
          this.$emit("init");
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
    closed() {
      // 如果是编辑出现，点击了取消，此时，form置空
      if (this.info.title === "编辑菜单") {
        this.empty();
      }
    }
  }
};
</script>

<style>
</style>