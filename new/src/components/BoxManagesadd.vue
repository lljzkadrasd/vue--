<template>
  <el-dialog title="新增" :visible.sync="dialogAdd" width="400px">
    <!-- 表单区域 -->
    <el-form ref="boxForm" :model="boxForm" :rules="rules" label-width="80px">
      <el-row>
        <el-form-item label="箱子规格" prop="boxStandard">
          <el-input v-model="boxForm.boxStandard"></el-input>
        </el-form-item>
        <el-form-item label="总数量" prop="inventoryNumber">
          <el-input v-model="boxForm.inventoryNumber"></el-input>
        </el-form-item>
        <el-form-item label="所需积分" prop="boxUnitPrice">
          <el-input v-model="boxForm.boxUnitPrice"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="boxForm.remark"></el-input>
        </el-form-item>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogAdd = false">取 消</el-button>
      <el-button type="primary" @click="addData('boxForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "boxManagesadd",
  data() {
    return {
      dialogAdd: false,
      options: [
        { id: 5, boxStandard: "2*2*2", boxUnitPrice: 2 },
        { id: 6, boxStandard: "3*3*3", boxUnitPrice: 3 },
        { id: 7, boxStandard: "4*4*4", boxUnitPrice: 4 },
        { id: 1, boxStandard: "40*30*20", boxUnitPrice: 10 },
        { id: 2, boxStandard: "21*12*13", boxUnitPrice: 12 },
        { id: 3, boxStandard: "30*20*80", boxUnitPrice: 12 },
      ],
      boxForm: {
        boxStandard: "",
        inventoryNumber: "",
        boxUnitPrice: "",
        remark: "",
      },
      rules: {
        boxStandard: [
          {
            required: true,
            pattern: /\d+\*\d+\*\d+/,
            message: "箱子规格格式错误",
            trigger: "blur",
          },
        ],
        inventoryNumber: [
          {
            required: true,
            pattern: /^([0-9]\d*(\.\d+)?)$/g,
            message: "数量不能小于0或为空",
            trigger: "blur",
          },
        ],
        boxUnitPrice: [
          { required: true, message: "所需积分不能为空", trigger: "blur" },
        ],
        remark: [
          {
            required: true,
            message: "备注不能为空",
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
    // 箱子规格新增
    addData(boxForm) {
      this.$refs[boxForm].validate((valid) => {
        if (valid) {
          let pamars = {
            boxStandard: this.boxForm.boxStandard,
            boxUnitPrice: this.boxForm.boxUnitPrice,
            inventoryNumber: this.boxForm.inventoryNumber,
            remark: this.boxForm.remark,
          };
          this.$axios
            .post("prod-api/backend/box/standard/create", pamars)
            .then((res) => {
              if (200 == res.data.code) {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: "success",
                });

                this.$parent.getData();
                this.dialogadd = false;
                this.resetForm();
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: "error",
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
</style>