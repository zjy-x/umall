<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed">
      <el-form :model="user" :rules="rules">
        <el-form-item label="活动名称" label-width="120px" prop="goodsname">
          <el-input v-model="user.title" value="1"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" label-width="120px" prop="goodsname">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <!-- value-format="timestamp" -->
        </el-form-item>

        <el-form-item label="一级分类" label-width="120px" prop="first_cateid">
          <el-select
            v-model="user.first_cateid"
            placeholder="请选择"
            @change="changeFirst"
            prop="first_cateid"
          >
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="120px">
          <el-select
            v-model="user.second_cateid"
            placeholder="请选择"
            prop="second_cateid"
            @change="changeFirst2"
          >
            <el-option
              v-for="item in second_List"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" label-width="120px">
          <el-select v-model="user.goodsid" placeholder="请选择" prop="goodsid">
            <el-option
              v-for="item in threeArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clear()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.title=='添加秒杀'">确 定</el-button>
        <el-button type="primary" @click="update()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert";
import {
  reqcateList,
  reqgoodsList,
  reqseckillAdd,
  reqseckillDetail,
  reqseckillUpdate
} from "../../../utils/http";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      spList: "specs/list",
      goodsList: "goods/list"
    })
  },

  data() {
    return {
      value1: [],
      rules: {
        title: [
          { required: true, message: "请输入一级分类", trigeer: "change" }
        ]
      },
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      },
      //二级分类
      second_List: [],
      //三级分类
      threeArr: []
    };
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList", //一级
      specsList: "specs/reqList", //商品规格列表
      reqseckillList: "seckill/reqList" //请求goodslist，刷新页面
    }),
    clear() {
      this.info.isShow = false;
    },
    //清空工作
    empty() {
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      };
    },
    closed() {
      if (this.info.title === "编辑秒杀") {
        this.empty();
      }
    },
    //请二级
    reqerji() {
      reqcateList({ pid: this.user.first_cateid }).then(res => {
        this.second_List = res.data.list;
      });
    },
    //请三级
    reqsanji(){
      reqgoodsList({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid
      }).then(res => {
        this.threeArr = res.data.list;
      });
    },
    changeFirst() {
      //二级分类
      this.reqerji();
      this.user.second_cateid = "";
    },
    changeFirst2() {
      //三级分类
      this.reqsanji();
      this.user.goodsid = "";
    },

    check() {
      return new Promise((resolve, reject) => {
        //验证
        if (this.user.title === "") {
          errorAlert("标题不能为空");
          return;
        }
        resolve();
      });
    },
    add() {
      this.user.begintime = this.value1[0].getTime();
      this.user.endtime = this.value1[1].getTime();

      // this.user.begintime = this.value1[0];
      // this.user.endtime = this.value1[1];
      this.check().then(() => {
        reqseckillAdd(this.user).then(res => {
          if (res.data.code == 200) {
            successAlert("添加成功");
            this.empty();
            this.clear();
            this.reqseckillList();
          }
        });
      });
    },
    getOne(id) {
      this.value1 = [];
      reqseckillDetail(id).then(res => {
        this.user = res.data.list;
        this.user.id = id;
        this.value1.push(
          new Date(parseInt(this.user.begintime)),
          new Date(parseInt(this.user.endtime))
        );

        // this.value1.push(this.user.begintime, this.user.endtime);

        reqcateList({ pid: this.user.first_cateid }).then(res => {
          this.second_List = res.data.list;
        });

        reqgoodsList({
          fid: this.user.first_cateid,
          sid: this.user.second_cateid
        }).then(res => {
          this.threeArr = res.data.list;
        });
      });
    },
    update() {
      this.check().then(() => {
        this.user.begintime = this.value1[0].getTime();
        this.user.endtime = this.value1[1].getTime();

        // this.user.begintime = this.value1[0];
        // this.user.endtime = this.value1[1];
        reqseckillUpdate(this.user).then(res => {
          if (res.data.code == 200) {
            successAlert("修改成功");
            this.clear();
            this.empty();
            this.reqseckillList();
          }
        });
      });
    }
  },
  mounted() {
    //一级分类
    this.reqCateList();
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

.line {
  display: flex;
}
</style>