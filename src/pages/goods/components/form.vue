<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed" @opened="opened">
      <el-form :model="user" :rules="rules">
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
          <el-select v-model="user.second_cateid" placeholder="请选择" prop="second_cateid">
            <el-option
              v-for="item in second_List"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="120px" prop="goodsname">
          <el-input v-model="user.goodsname" value="1"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px" prop="price">
          <el-input v-model="user.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px" prop="market_price">
          <el-input v-model="user.market_price"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="120px">
          <div class="img_box">
            <h3 class="img_add">+</h3>
            <img class="pic" v-if="imgUrl" :src="imgUrl" alt />
            <input class="img_input" type="file" @change="imgFile" />
          </div>
        </el-form-item>

        <el-form-item label="商品规格" label-width="120px">
          <el-select v-model="user.specsid" placeholder="请选择" @change="changeFirst2" prop="specsid">
            <el-option
              v-for="item in spList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
              prop="specsattr"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" label-width="120px">
          <el-select v-model="user.specsattr" placeholder="请选择" multiple>
            <el-option v-for="item in specsArr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="100px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" label-width="100px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <el-form-item label="商品描述" label-width="100px">
          <div v-if="info.isShow" id="edit"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clear()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.title=='添加商品'">确 定</el-button>
        <el-button type="primary" @click="update()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
import { successAlert } from "../../../utils/alert";
import {
  reqcateList,
  reqgoodsAdd,
  reqgoodsDetail,
  reqgoodsUpdate
} from "../../../utils/http";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      spList: "specs/list"
    })
  },

  data() {
    return {
      rules: {
        first_cateid: [
          { required: true, message: "请输入一级分类", trigeer: "change" }
        ],
        second_cateid: [
          { required: true, message: "请输入二级分类", trigeer: "change" }
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigeer: "blur" }
        ],
        price: [{ required: true, message: "请输入商品价格", trigeer: "blur" }],
        market_price: [
          { required: true, message: "请输入商品市场价格", trigeer: "blur" }
        ],
        specsid: [
          { required: true, message: "请输入商品规格", trigeer: "change" }
        ],
        specsattr: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个规格属性",
            trigeer: "change"
          }
        ]
      },
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: "",
        ishot: "",
        status: 1
      },
      //二级分类
      second_List: [],
      //商品规格
      specsArr: [],
      imgUrl: ""
    };
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList", //一级
      specsList: "specs/reqList", //商品规格列表
      reqgoodsList: "goods/reqList", //请求goodslist，刷新页面
      reqgoodsCount: "goods/reqCount" //总数
    }),
    clear() {
      this.info.isShow = false;
    },
    //清空工作
    empty() {
      this.user = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: "",
        ishot: "",
        status: 1
      };
      this.imgUrl = "";
    },
    closed() {
      if (this.info.title === "编辑商品") {
        this.empty();
      }
    },
    imgFile(e) {
      let file = e.target.files[0];
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    changeFirst() {
      reqcateList({ pid: this.user.first_cateid }).then(res => {
        this.second_List = res.data.list;
      });
      this.user.second_cateid = "";
    },
    changeFirst2() {
      let obj = this.spList.find(item => item.id === this.user.specsid);
      this.specsArr = obj.attrs;
    },
    opened() {
      //创建editor实例
      this.editor = new E("#edit");
      this.editor.create();
      //
      this.editor.txt.html(this.user.description);
    },
    check() {
      return new Promise((resolve, reject) => {
        //验证
        if (this.user.first_cateid === "") {
          errorAlert("一级分类不能为空");
          return;
        }
        if (this.user.second_cateid === "") {
          errorAlert("二级分类不能为空");
          return;
        }
        if (this.user.goodsname === "") {
          errorAlert("商品名称为空");
          return;
        }
        if (this.user.price === "") {
          errorAlert("商品价格为空");
          return;
        }
        if (this.user.market_price === "") {
          errorAlert("商品市场价格为空");
          return;
        }
        if (!this.user.img) {
          errorAlert("请选择图片");
          return;
        }
        if (this.user.specsid === "") {
          errorAlert("请选择商品规格");
          return;
        }
        if (this.user.specsattr.length === 0) {
          errorAlert("请选择商品属性");
          return;
        }
        if (this.editor.txt.html() === "") {
          errorAlert("请输入商品描述");
          return;
        }
        resolve();
      });
    },
    add() {
      this.check().then(() => {
        this.user.description = this.editor.txt.html();
        let d = { ...this.user };
        d.specsattr = JSON.stringify(d.specsattr);

        reqgoodsAdd(d).then(res => {
          if (res.data.code == 200) {
            successAlert("添加成功");
            this.empty();
            this.clear();
            this.reqgoodsList();
            this.reqgoodsCount();
          }
        });
      });
    },
    getOne(id) {
      reqgoodsDetail(id).then(res => {
        this.user = res.data.list;
        this.user.id = id;

        this.imgUrl = this.$imgPre + this.user.img;

        reqcateList({ pid: this.user.first_cateid }).then(res => {
          this.second_List = res.data.list;
        });

        this.user.specsattr = JSON.parse(this.user.specsattr);

        if (this.editor) {
          this.editor.txt.html(this.user.description);
        }
      });
    },
    update() {
      this.check().then(() => {
        let d = { ...this.user };
        d.specsattr = JSON.stringify(d.specsattr);
        d.description = this.editor.txt.html();
        console.log(d);
        reqgoodsUpdate(d).then(res => {
          if (res.data.code == 200) {
            successAlert("修改成功");
            this.clear();
            this.empty();
            this.reqCateList();
          }
        });
      });
    }
  },
  mounted() {
    //一级分类
    this.reqCateList();
    //商品规格列表
    this.specsList(true);
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