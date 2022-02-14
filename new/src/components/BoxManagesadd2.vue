<template>
  <el-dialog title="新增" :visible.sync="dialogAdd" width="400px">
    <!-- 表单区域 -->
    <el-form ref="boxForm" :model="boxForm" :rules="rules" label-width="80px">
      <el-row>
        <el-form-item label="箱子规格" prop="boxStandard">
          <el-select
            v-model="boxForm.boxStandard"
            @change="jifen()"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.boxStandard"
              :value="item.boxStandard"
            >
            </el-option>
          </el-select>
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
      <el-button type="primary" @click="dialogAdd = false">确 定</el-button>
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

        boxUnitPrice: [
          { required: true, message: "所需积分不能为空", trigger: "blur" },
        ],
        remark: [{ required: true, message: "备注不能为空", trigger: "blur" }],
      },
    };
  },

  methods: {
    openDialog(flag, value) {
      this.dialogAdd = flag;
    },
    // 箱子信息新增
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let pamars = {
            boxStandard: this.boxForm.boxStandard,
            boxUnitPrice: this.boxForm.boxUnitPrice,
            inventoryNumber: this.boxForm.inventoryNumber,
            remark: this.boxForm.remark,
          };
          this.$axios
            .post("prod-api/backend/box/info/create", pamars)
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
    //箱子规格下拉列表
    standradDown() {
      this.$axios.get("prod-api/backend/box/standard/select").then((res) => {
        if (res.data.code == 200) {
          this.options = res.data.data;
          //console.log(this.options);
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    //积分
    jifen() {
      for (var i in this.options) {
        if (this.options[i].boxStandard == this.boxForm.boxStandard) {
          this.boxForm.boxUnitPrice = this.options[i].boxUnitPrice;
        }
      }
    },
    //查询中的表单重置
    resetForm(boxForm) {
      this.$refs[boxForm].resetFields();
    },
  },
};
</script>
<style scoped>
</style>