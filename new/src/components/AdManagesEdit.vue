<template>
  <el-dialog
    title="广告修改"
    :visible.sync="dialogAdEdit"
    width="400px"
    style="top: -90px"
  >
    <!-- 表单区域 -->
    <el-form
      ref="adEditForm"
      :model="adEditForm"
      :rules="rules"
      label-width="80px"
    >
      <el-row>
        <el-form-item label="广告标题" prop="title">
          <el-input v-model="adEditForm.title"></el-input>
        </el-form-item>
        <el-form-item label="广告内容" prop="content">
          <el-input v-model="adEditForm.content"></el-input>
        </el-form-item>
        <el-form-item label="奖励积分" prop="points">
          <el-input v-model="adEditForm.points"></el-input>
        </el-form-item>
        <el-form-item label="原地址" prop="imgUrl">
          <el-image style="width: 100px; height: 100px" :src="beforeImgUrl">
          </el-image>
        </el-form-item>
        <el-form-item label="新地址" prop="imgUrl">
          <el-upload
            ref="uploads"
            :action="upLoadUrl"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :before-upload="beforeUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>

        <el-form-item label="广告排序" prop="sortNo">
          <el-select v-model="adEditForm.region" placeholder="请选择">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogAdEdit = false">取消</el-button>
      <el-button type="primary" @click="addData('adEditForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      upLoadUrl: "prod-api/common/upload",
      dialogImageUrl: "",
      dialogVisible: false,

      fileList: [],
      dialogImg: "",
      dialogAdEdit: false,
      beforeImgUrl: "",
      adEditForm: {
        title: "",
        content: "",
        points: "",
        imgUrl: "",
        sortNo: "",
        id: "",
      },
      rules: {
        title: [
          {
            required: true,
            pattern: /^([\w\@.]{1,14})$/g,
            message:
              "请输入正确的用户名：只能是数字，字母_@.区分大小写 ,1-14个字符",
            trigger: "blur",
          },
        ],
        content: [
          {
            required: true,
            pattern: /^([\u4e00-\u9fa5]){2,7}$/,
            message: "请输入正确的名字",
            trigger: "blur",
          },
        ],
        points: [
          {
            required: true,
            pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: "请输入正确的邮箱",
            trigger: "blur",
          },
        ],
        imgUrl: [
          {
            required: true,
            message: "插入图片",
            trigger: "blur",
          },
        ],
        sortNo: [{ required: true, message: "请选择", trigger: "blur" }],
      },
    };
  },
  methods: {
    openDialog(flag, val) {
      this.dialogAdEdit = flag;
      this.beforeImgUrl = val[0].imgUrl;
      console.log(val);
      // 用户修改把用户数据传到修改框中
      this.adEditForm.title = val[0].title;
      this.adEditForm.content = val[0].content;
      this.adEditForm.sortNo = val[0].sortNo;
      this.adEditForm.imgUrl = val[0].imgUrl;
      this.adEditForm.points = val[0].points;
    },
    // cancel(adEditForm){
    //     this.$refs[adEditForm].resetFields();
    //     this.dialogUserEdit=false;
    // }
    //上传图片之前
    beforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      console.log(testmsg);
      if (testmsg != "png" && testmsg != "jpg") {
        this.$message({
          message: "只能上传jpg、png格式",
          type: "error",
        });
        //延时器，清空
        setTimeout(() => this.$refs.uploads.clearFiles(), 1000);
      } else if (testmsg < 10) {
        this.$message({
          message: "上传文件不能超过10M",
          type: "error",
        });
        //延时器，清空
        setTimeout(() => this.$refs.uploads.clearFiles(), 1000);
      } else {
        let fd = new FormData();
        fd.append("file", file); //传文件
        console.log(fd);
        this.$axios({
          method: "post",
          url: this.upLoadUrl,
          data: fd,
        }).then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.dialogImageUrl = res.data.fileName;
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success",
            });
          }
        });
      }
    },
    //将文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 广告修改接口
    addData(adEditForm) {
      // 以下判断表单是否为空，若空则不能按确定
      this.$refs[adEditForm].validate((valid) => {
        if (valid) {
          var parmas = {
            title: this.adEditForm.title,
            content: this.adEditForm.content,
            imgUrl: this.adEditForm.imgUrl,
            points: this.adEditForm.points,
            sortNo: this.adEditForm.sortNo,
            id: this.adEditForm.id,
          };
          this.$axios
            .put("/prod-api/backend/advertisement/updata", parmas)
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