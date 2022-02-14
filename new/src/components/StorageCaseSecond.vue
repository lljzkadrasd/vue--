<template>
  <div class="all">
    <!-- 导航栏部分 -->
    <div class="nav">
      <!-- 左侧导航栏部分 -->
      <div class="nav-left">
        <p class="p1">储留箱后台管理系统</p>
      </div>
      <!-- 右侧导航栏部分 -->
      <div class="nav-right">
        <!-- 右侧圆框图片部分 -->
        <img src="../assets/ys.png" alt="" class="img1" />
        <!-- 右侧导航栏中的右边区域部分 -->
        <div class="nav-right-yonghu">
          <!-- dropdown部分 -->
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link"
              >{{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="updataPw">修改密码</el-dropdown-item>
              <el-dropdown-item command="quiteLogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 修改密码弹窗部分 -->
          <el-dialog
            title="修改密码"
            :visible.sync="dialogVisible"
            width="350px"
          >
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="原密码" prop="oldPsw">
                <el-input v-model="ruleForm.oldPsw" type="password"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPsw">
                <el-input v-model="ruleForm.newPsw" type="password"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancel('ruleForm')">取 消</el-button>
              <el-button type="primary" @click="sure('ruleForm')"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
    <el-row>
      <!-- 左侧导航栏部分 -->
      <el-col :span="20" style="width: 900px">
        <el-menu
          default-active="$router.path"
          class="el-menu-vertical-demo"
          background-color="#04294b"
          text-color="rgba(182, 167, 167, 0.596)"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/userManages">
            <i class="el-icon-user-solid"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>

          <el-menu-item index="/custManages">
            <i class="el-icon-s-home"></i>
            <span slot="title">客户管理</span>
          </el-menu-item>

          <el-submenu index="/boxManages">
            <template slot="title">
              <i class="el-icon-box"></i>
              <span>箱子管理</span>
            </template>
            <el-menu-item index="/boxManages">
              <template slot="title">箱子规格</template>
            </el-menu-item>
            <el-menu-item index="/boxManages2">
              <template slot="title">箱子信息</template>
            </el-menu-item>
          </el-submenu>

          <el-menu-item index="/goodsManages">
            <i class="el-icon-shopping-cart-1"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>

          <el-menu-item index="/adManages">
            <i class="el-icon-adver"></i>
            <span slot="title">广告管理</span>
          </el-menu-item>
          <el-menu-item index="/viewManages">
            <i class="el-icon-s-marketing"></i>
            <span slot="title">意见管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "storagecasesecond",
  data() {
    return {
      userName: "",
      dialogVisible: false,
      ruleForm: {
        oldPsw: "",
        newPsw: "",
      },
      rules: {
        oldPsw: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        newPsw: [{ required: true, message: "请输入新密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleCommand(command) {
      if (command == "updataPw") {
        this.dialogVisible = true;
      }
      if (command == "quiteLogin") {
        this.$router.push("/storagecaselogin");
      }
    },
    cancel(ruleForm) {
      this.dialogVisible = false;
      this.$refs[ruleForm].resetFields();
    },
    sure(ruleForm) {
      this.dialogVisible = false;
      this.$refs[ruleForm].resetFields();
    },
  },
  mounted() {
    this.userName = localStorage.getItem("username");
  },
};
</script>
<style scoped>
/* *{
    padding:0;
    margin: 0;
} */
.all {
  width: 100%;
  height: 800px;
  background-color: white;
}
.all .nav {
  width: 100%;
  height: 50px;
  margin: 0;
  position: relative;
  background-color: white;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
}
.all .nav .nav-left {
  width: 50%;
  height: 50px;
  margin: 0;
  position: absolute;

  background-color: white;
  float: left;
}
.p1 {
  width: 250px;
  height: 50px;
  line-height: 50px;
  font-size: 25px;
  color: blue;
  margin: 0;
}
.all .nav .nav-right {
  width: 50%;
  height: 50px;
  margin: 0;
  position: absolute;
  background-color: white;
  left: 731.6px;
}
.img1 {
  width: 37px;
  height: 37px;
  border-radius: 35px;
  margin-top: 8px;
  margin-left: 500px;
}
.nav-right-yonghu {
  width: 180px;
  height: 50px;
  margin: 0;
  background-color: white;
  float: right;
}
.el-dropdown {
  top: 15px;
}
.el-menu {
  width: 200px;
  height: 750px;
}
</style>