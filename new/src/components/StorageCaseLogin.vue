<template>
  <el-container>
    <el-main
      ><p class="logo">{{ logo }}</p>
      .
      <div class="left-div">
        <div
          class="left-div-topwenzi"
          style="font-weight: bold; font-size: 35px"
        >
          {{ lefttopwenzi }}
        </div>
        <div class="left-div-bottomwenzi">{{ leftbottomwenzi }}</div>
      </div>
      <div class="right-div">
        <div
          style="
            line-height: 35px;
            font-size: 25px;
            color: black;
            text-align: left;
            margin-left: 20px;
          "
        >
          欢迎登录
        </div>
        <div
          style="
            line-height: 50px;
            font-size: 15px;
            color: #696969;
            text-align: left;
            margin-left: 20px;
          "
        >
          储留箱后台管理系统
        </div>

        <el-form
          ref="form"
          :model="form"
          width="500px"
          height="130px"
          :rules="rules"
        >
          <el-form-item class="username" prop="username">
            <el-input
              v-model="form.username"
              style="top: 5px; width: 300px"
              placeholder="请输入用户名"
            >
              <template slot="prepend">
                <i class="el-icon-s-custom"></i>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item class="password" prop="password">
            <el-input
              v-model="form.password"
              style="top: 20px; width: 300px"
              placeholder="请输入密码"
            >
              <template slot="prepend">
                <i class="el-icon-s-goods"></i>
              </template>
            </el-input>
          </el-form-item>

          <el-row style="top: -10px; left: 20px" height="70px">
            <el-button
              type="primary"
              style="width: 200px; height: 40px"
              @click="submitForm('form')"
              >登录</el-button
            >
            <br />
            <el-link
              href="https://www.baidu.com"
              target="_blank"
              style="top: -70px; line-height: 30px"
              >忘记密码？寻求帮助</el-link
            >
          </el-row>
          <br />
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "storagecase-login",
  data() {
    var checkUserName = (rule, value, callback) => {
      var username = /^[a-zA-Z][a-zA-Z0-9]{2,15}$/;
      var idCard =
        /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      var phone = /^1[3456789]\d{9}$/;
      if (!value) {
        callback(new Error("请输入用户名/手机号/身份证号"));
      }
      setTimeout(() => {
        if (
          !idCard.test(value) &&
          !username.test(value) &&
          !phone.test(value)
        ) {
          callback(new Error("请输入正确的用户名/手机号/邮箱"));
        } else {
          callback();
        }
      }, 100);
    };
    return {
      userType: "01",
      logo: "LOGO",
      lefttopwenzi: "储留箱后台管理系统",
      leftbottomwenzi: "STORAGE BOX BACKGROUND MANAGEMENT SYSTEM",
      form: {
        username: "",
        password: "",
      },
      role: "",
      rules: {
        username: [
          { required: true, validator: checkUserName, trigger: "blur" },
        ],
        password: [
          {
            required: true,
            message: "请输入正确的密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 登录
    submitForm(form) {
      console.log(this.$refs[form].validate);
      this.$refs[form].validate((valid) => {
        if (valid) {
          // console.log(valid);
          let paramForm = {
            username: this.form.username,
            password: this.form.password,
            userType: this.userType,
          };
          this.$axios.post("/prod-api/common/login", paramForm).then((res) => {
            if (res.data.code == 200) {
              // this.loginPerson();
              console.log(res.data);
              localStorage.setItem("username", paramForm.username);
              localStorage.setItem("token", res.data.token); //存返回的token值
              this.$router.push("/goodsManages");
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: "success",
              });
            } else if (res.data.code == 500) {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: "error",
              });

              this.form.username = "";
              this.form.password = "";
            }
          });
        }
      });
    },
  },
  mounted() {
    //清除登录人员信息
    localStorage.clear();
  },
};
</script>
<style scoped>
.el-header {
  background-image: url("../assets/bg2.png");
  color: #333;
  text-align: center;
  line-height: 100px;
  height: 100px;
  position: relative;
}
.logo {
  color: white;
  text-align: left;
  font-size: 45px;
  font-family: "黑体";
  position: absolute;
  line-height: 50px;
  top: -20px;
}
.el-main {
  background-color: #e9eef3;
  color: white;
  text-align: center;
  line-height: 598px;
  height: 800px;
  position: relative;
  background-image: url("../assets/bg2.png");
}
.el-main .left-div {
  width: 500px;
  height: 350px;
  line-height: 110px;
  background: rgba(247, 247, 244, 0.1);
  margin-top: -450px;
  position: absolute;
  border-radius: 2%;
  margin-left: 350px;
  border: 1px solid black;
}
.el-main .left-div .lefttopwenzi {
  width: 200px;
  height: 50px;
  font-size: 55px;
}
.el-main .left-div .leftbottomwenzi {
  width: 200px;
  height: 115px;
}
.el-main .right-div {
  width: 500px;
  height: 350px;
  line-height: 110px;
  background: white;
  margin-top: -450px;
  position: absolute;
  border-radius: 2%;
  margin-left: 852px;
}

a:visited {
  color: red;
}
</style>
