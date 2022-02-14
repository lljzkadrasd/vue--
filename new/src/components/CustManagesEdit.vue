<template>
  <el-dialog title="用户修改" :visible.sync="dialogcustEdit" width="400px">
    <!-- 表单区域 -->
    <el-form
      ref="custEditForm"
      :model="custEditForm"
      :rules="rules"
      label-width="80px"
    >
      <el-row>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="custEditForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="nickName">
          <el-input v-model="custEditForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="custEditForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phonenumber">
          <el-input v-model="custEditForm.phonenumber"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="custEditForm.region" placeholder="请选择">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogUserEdit = false">取消</el-button>
      <el-button type="primary" @click="editData('custEditForm')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      dialogcustEdit: false,
      custEditForm: {
        userName: "",
        nickName: "",
        email: "",
        phonenumber: "",
        sex: "",
        version: "",
        userId: "",
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
        sex: [{ required: true, message: "请选择", trigger: "blur" }],
      },
    };
  },
  methods: {
    openDialog(flag, val) {
      this.dialogcustEdit = flag;
      console.log(val);
      // 用户修改把用户数据传到修改框中
      this.custEditForm.userName = val[0].userName;
      this.custEditForm.name = val[0].name;
      this.custEditForm.sex = val[0].sex;
      this.custEditForm.photo = val[0].photo;
      this.custEditForm.email = val[0].email;
    },
    // cancel(custEditForm){
    //     this.$refs[custEditForm].resetFields();
    //     this.dialogUserEdit=false;
    // }
  },
  editData(custEditForm) {
    this.$refs[custEditForm].validate((valid) => {
      if (valid) {
        this.dialogcustEdit = false;
        let params = {
          userId: this.custEditForm.userId,
          nickName: this.custEditForm.nickName,
          phonenumber: this.custEditForm.phonenumber,
          email: this.custEditForm.email,
          sex: this.custEditForm.sex,
          version: this.custEditForm.version,
        };
        this.$axios
          .put("prod-api/backend/customer/update", params)
          .then((res) => {
            if (200 == res.data.code) {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: "success",
              });
              //删除成功之后在父页面显示新数据
              this.$parent.getData();
              this.dialogcustEdit = false;
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
};
</script>
<style scoped>
</style>