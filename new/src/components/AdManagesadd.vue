<template>
  <el-dialog
    title="新增"
    :visible.sync="dialogAdd"
    width="400px"
    style="top: -50px"
  >
    <!-- 新增表单区域 -->
    <el-form ref="adForm" :model="adForm" :rules="rules" label-width="80px">
      <el-row>
        <el-form-item label="广告标题" prop="title">
          <el-input v-model="adForm.title"></el-input>
        </el-form-item>
        <el-form-item label="广告内容" prop="content">
          <el-input v-model="adForm.content"></el-input>
        </el-form-item>
        <el-form-item label="奖励积分" prop="points">
          <el-input v-model="adForm.points"></el-input>
        </el-form-item>
        <!-- 以下是图片区域 -->
        <el-form-item label="图片地址" prop="imgUrl">
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
          <el-select v-model="adForm.region" placeholder="请选择">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogAdd = false">取 消</el-button>
      <el-button type="primary" @click="addData('adForm')">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "AdManagesadd",
  data() {
    return {
      dialogVisible: false,
      upLoadUrl: "prod-api/common/upload",
      dialogImageUrl: "",
      dialogAdd: false,
      fileList: [],
      dialogImg: "",

      adForm: {
        title: "",
        content: "",
        imgUrl: "",
        //可获积分
        points: "",
        sortNo: "",
      },
      rules: {
        title: [{ required: true, message: "请输入广告标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入广告内容", trigger: "blur" },
        ],
        points: [
          { required: true, message: "请输入奖励积分", trigger: "blur" },
        ],
        imgUrl: [{ required: true, message: "请插入图片", trigger: "blur" }],
      },
    };
  },
  methods: {
    openDialog(flag, value) {
      this.dialogAdd = flag;
    },
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
    // 广告新增接口
    addData(adForm) {
      // 以下判断表单是否为空，若空则不能按确定
      this.$refs[adForm].validate((valid) => {
        if (valid) {
          var parmas = {
            title: this.adForm.title,
            content: this.adForm.content,
            imgUrl: this.adForm.imgUrl,
            points: this.adForm.points,
            sortNo: this.adForm.sortNo,
          };
          this.$axios
            .post("/prod-api/backend/advertisement/create", parmas)
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