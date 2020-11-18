<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="一级分类" label-width="120px">
          <el-select v-model="user.first_cateid" placeholder="请选择" @change="changeFirst">
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="120px">
          <el-select v-model="user.second_cateid" placeholder="请选择">
            <el-option v-for="item in second_List" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="user.goodsname"  value="1"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px">
          <el-input v-model="user.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px">
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
          <el-select v-model="user.specsattr" placeholder="请选择">
            <el-option label="顶级分类" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" label-width="120px">
          <el-select v-model="user.specsid" placeholder="请选择" multiple="">
            <el-option label="顶级分类" value="1"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="是否新品" label-width="100px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item> -->

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <el-form-item label="商品描述" label-width="100px">
          <textarea  v-model="user.description" name="" id="" cols="30" rows="10"></textarea>
        </el-form-item>

        {{cateList}}

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
import { successAlert } from "../../../utils/alert";
import {
  reqcateList,
  reqspecsDetail,
  reqspecsUpdate,
} from "../../../utils/http";
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
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: "",
        status: 1
      },
      second_List:[],
      imgUrl:''
    };
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqCount: "specs/reqCount",
      reqCateList: "cate/reqList",
    }),
    clear() {
      this.info.isShow = false;
    },
    //清空工作
    empty() {
      this.user = {
        specsname: "",
        attrs: "",
        status: 1
      },
      this.attr = [{ value: "" }];
    },
    add() {
      
      console.log(this.user);
      // this.user.attrs = JSON.stringify(this.attr.map(item => item.value));
      // reqspecsAdd(this.user).then(res => {
      //   if (res.data.code == 200) {
      //     successAlert("添加成功");
      //     this.empty();
      //     this.clear();
      //     this.reqList();
      //     this.reqCount();
      //   }
      // });
    },
    getOne(id) {
      reqspecsDetail(id).then(res => {
        this.user = res.data.list[0];
         
        this.attr = JSON.parse(this.user.attrs).map(item => ({ value: item }));
      });
    },
    update() {
      this.user.attrs = JSON.stringify(this.attr.map(item => item.value));
      reqspecsUpdate(this.user).then(res => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          this.clear();
          this.empty();
          this.reqList();
        }
      });
    },
    closed() {
      if (this.info.title === "编辑商品") {
        this.empty();
      }
    },
    imgFile(e){
      let file = e.target.files[0];
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    changeFirst(){
      reqcateList({pid:this.user.first_cateid}).then(res=>{
        this.second_List = res.data.list;
      })  
    }
  },
  mounted() {
    this.reqCateList()
  },
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