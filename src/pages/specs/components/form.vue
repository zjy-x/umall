<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="规格名称" label-width="120px">
         <el-input v-model="user.specsname" placeholder="请填写"></el-input>
        </el-form-item>

        <el-form-item label="规格属性" label-width="120px" v-for="(item,index) in attr" :key="index">
          <div class="line">
            <el-input v-model="item.value" placeholder="请填写"></el-input>
            <el-button type="primary" @click="addSpecs" v-if="index===0">添加商品规格</el-button>
            <el-button type="danger" v-else @click="delSpecs(index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clear()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.title=='添加规格'">确 定</el-button>
        <el-button type="primary" @click="update()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert";
import { reqspecsAdd, reqspecsDetail, reqspecsUpdate } from "../../../utils/http";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    })
  },

  data() {
    return {
      user: {
        specsname: "",
        attrs: "",
        status: 1
      },
      attr: [{value:''}]
    };
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqCount:"specs/reqCount",
    }),
    clear() {
      this.info.isShow = false;
    },
    //清空工作
    empty() {
      this.user={
        specsname: "",
        attrs: "",
        status: 1
      },
      this.attr= [{value:''}]
    },
    add() {
      this.user.attrs  = JSON.stringify(this.attr.map(item=>item.value))
      reqspecsAdd(this.user).then(res => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          this.empty();
          this.clear();
          this.reqList();
          this.reqCount();
        }
      });
    },
    getOne(id) {
      reqspecsDetail(id).then(res => {
        this.user = res.data.list[0];
        // this.user.id = id;
        this.attr=JSON.parse(this.user.attrs).map(item=>({value:item}))
      });
    },
    update() {
      this.user.attrs  = JSON.stringify(this.attr.map(item=>item.value))
      reqspecsUpdate(this.user).then(res => {
        if (res.data.code == 200) {
          successAlert("编辑成功");
          this.clear();
          this.empty();
          this.reqList();
        }
      });
    },
    closed() {
      if (this.info.title === "编辑规格") {
        this.empty();
      }
    },
    addSpecs(){
      this.attr.push({
        value: ""
      });
    },
    delSpecs(index){
      this.attr.splice(index,1);
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



.line{
  display: flex;
}
</style>