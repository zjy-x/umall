<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow"  @closed="closed">
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" label-width="120px">
          <el-tree
            :data="data"
            show-checkbox
            ref = "tree"
            node-key="id"
            :props='{children: "children",label: "title"}'
          ></el-tree>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clear()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.title=='添加角色'">确 定</el-button>
        <el-button type="primary" @click="update()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert";
import { reqMenuList, reqRoleAdd ,reqRoleDetail,reqRoleUpdate} from "../../../utils/http";

export default {
  props: ["info"],
  data() {
    return {
      user: {
        menus: '',
        rolename: "",
        status: 1
      },
      data: []
    };
  },
  methods: {
    clear() {
      this.info.isShow = false;
    },
    //清空工作
    empty(){
      this.user={
        menus: '',//不与表格绑定，只是用来存储用去请求的数据
        rolename: "",
        status: 1
      }
      this.$refs.tree.setCheckedKeys([])
    },
    add() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.user).then(res=>{
        if(res.data.code == 200){
          successAlert("添加成功");
          this.empty();
          this.clear();
          //添加完成 让父组件重新请求 rolelist 的数据给到list 重新渲染页面
          this.$emit("init")
        }
      })
    },
    getOne(id){
      reqRoleDetail(id).then(res=>{
        this.user = res.data.list;
        this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
        //因为点击确定时需要用user数据去请求接口，但请求修改接口还需要id，但是此时的user没有id所以需要自行添加id以便修改操作
        //为什么不在进行点击编辑的操纵的函数中做添加id的操作呢？因为点击编辑时list模块已经把id传到role再传到这里，如果此时不把id绑定到user，则到update时就获取不到id
        this.user.id = id;
      })
    },
    update(){
        // 如果只是修改角色名称、状态则不需要下面这局代码 ，  下面这句代码只是重新获取树形结构选择的节点id，
        // 因为此时存储的user.menus只是刚才获取信息时得到的，并不是我需要修改的menus
        // 写了下面的这句代码 无论修改或没修改menus 都不会有影响，因为它获取的是此时的tree选中的节点
        this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleUpdate(this.user).then(res=>{
        if(res.data.code ==200){
          successAlert("编辑成功");
          this.clear();
          this.empty();//此时应该清空user，防止再次进行点击添加的时候数据存在
          this.$emit("init");
        }
      })
    },
    closed(){
      if (this.info.title === "角色信息") {
        this.empty();
      }
    }
  },
  mounted() {
    //进来请求tree控件的数据
    reqMenuList().then(res => {
      this.data = res.data.list
    });
  }
};
</script>

<style>
</style>