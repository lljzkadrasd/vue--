<template>
  <el-dialog title="新增" :visible.sync="dialogAdd" width="400px">
    <!-- 表单区域 -->
    <el-form ref="custForm" :model="custForm" :rules="rules" label-width="80px">
      <el-row>
        <el-form-item label="客户名" prop="userName">
          <el-input v-model="custForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="custForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="custForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="photo">
          <el-input v-model="custForm.photo"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="custForm.region" placeholder="请选择">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogAdd = false">取 消</el-button>
      <el-button type="primary" @click="addData('custForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "custManagesadd",
  data() {
    return {
      dialogAdd: false,
      custForm: {
        userName: "",
        nickName: "",
        email: "",
        phonenumber: "",
        sex: "",
      },
      rules: {
        userName: [
          {
            required: true,
            pattern: /^([\w\@.]{1,14})$/g,
            message:
              "请输入正确的客户名：只能是数字，字母_@.区分大小写 ,1-14个字符",
            trigger: "blur",
          },
        ],
        nickName: [
          {
            required: true,
            pattern: /^([\u4e00-\u9fa5]){2,7}$/,
            message: "请输入正确的名字",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: "请输入正确的邮箱",
            trigger: "blur",
          },
        ],
        phonenumber: [
          {
            required: true,
            pattern:
              /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    openDialog(flag, value) {
      this.dialogAdd = flag;
    },
    // 客户新增接口
    addData(custForm) {
      // 以下判断表单是否为空，若空则不能按确定
      this.$refs[custForm].validate((valid) => {
        if (valid) {
          var parmas = {
            userName: this.custForm.userName,
            nickName: this.custForm.nickName,
            phonenumber: this.custForm.phonenumber,
            email: this.custForm.email,
            sex: this.custForm.sex,
          };
          this.$axios
            .post("/prod-api/backend/customer/create", parmas)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: "success",
                });
                // 成功则隐藏
                this.dialogAdd = false;
                // 成功了则在父页面显示新数据
                this.$parent.getData();
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: "error",
                });
              }
            });
        }
      });
    },
  },
};
</script>
<style scoped>
</style>