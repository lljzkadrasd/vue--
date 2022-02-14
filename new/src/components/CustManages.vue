<template>
  <div class="custManages">
    <el-card>
      <el-form ref="custForm" :model="custForm" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item>
              <el-input
                v-model="custForm.cust"
                placeholder="姓名/客户名/手机号"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="btn">
            <el-button type="primary" @click="isClick()">查询</el-button>
            <el-button @click="resetForm('custForm')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="isBtn">
      <el-button type="primary" @click="custadd()">新增</el-button>
      <el-button type="primary" @click="custEdit()">编辑</el-button>
      <el-button type="primary" @click="custQiyong()">启用</el-button>
      <el-button type="primary" @click="custStop()">停用</el-button>
      <el-button type="primary" @click="custDel()">删除</el-button>
      <el-button type="primary" @click="custReset()">重置密码</el-button>
      <!-- </el-card>

    <el-card> -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="300"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          v-for="item in columnList"
          :key="item.num"
          :label="item.label"
          :prop="item.prop"
        >
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageNum"
          :page-sizes="[5, 10, 50, 100]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </div>
    </el-card>
    <CustManagesadd ref="custadd"></CustManagesadd>
    <CustManagesEdit ref="custedit"></CustManagesEdit>
  </div>
</template>
<script>
import CustManagesadd from "./CustManagesadd.vue";
import CustManagesEdit from "./CustManagesEdit.vue";
export default {
  components: {
    CustManagesadd,
    CustManagesEdit,
  },
  data() {
    return {
      custForm: {
        cust: "",
      },
      page: {
        // 默认停在的页面为第一页
        pageNum: 1,
        pagePage: 0,
        total: 0,
      },

      columnList: [
        {
          label: "客户名",
          prop: "userName",
          num: 1,
        },
        {
          label: "姓名",
          prop: "nickName",
          num: 2,
        },
        {
          label: "性别",
          prop: "sex",
          num: 3,
        },
        {
          label: "手机号",
          prop: "phonenumber",
          num: 4,
        },
      ],
      tableData: [],
      multipleSelection: [],
    };
  },
  //页面初始化时就能查询数据
  mounted() {
    this.getData();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.pageNum = val;
      this.getData();
    },
    // 新增用户
    custadd() {
      this.$refs.custadd.openDialog(
        true,
        JSON.parse(JSON.stringify(this.multipleSelection))
      );
    },
    //编辑用户
    custEdit() {
      if (this.multipleSelection.length == 1) {
        this.$refs.custedit.openDialog(
          true,
          JSON.parse(JSON.stringify(this.multipleSelection))
        );
      } else if (this.multipleSelection.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择数据进行修改",
        });
      }
    },
    //启用用户
    custQiyong() {
      if (this.multipleSelection.length == 1) {
        this.$confirm("是否启用", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let params = {
              userIds: [],
              operate: "enable",
            };
            for (var i = 0; i < this.multipleSelection.length; i++) {
              params.userIds.push(this.multipleSelection[i].userId);
              this.Ostatus = this.multipleSelection[i].status;
            }
            params.userIds = params.userIds.join(",");
            if (this.Ostatus == 0) {
              this.$message({
                type: "error",
                message: "状态为启用的用户，不能启用",
              });
            } else {
              this.$axios
                .put("prod-api/backend/customer/" + params.userIds)
                .then((res) => {
                  if (res.data.code == 200) {
                    this.$message({
                      message: res.data.msg,
                      type: "success",
                    });
                    this.getData();
                  } else {
                    this.$message({
                      message: res.data.msg,
                      type: "error",
                    });
                  }
                });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消启用",
            });
          });
      } else {
        this.$message({
          showClose: true,
          message: "请选择数据进行启用",
        });
      }
    },
    //停用用户
    custStop() {
      if (this.multipleSelection.length >= 1) {
        this.$confirm("是否停用", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let params = {
              userIds: [],
              operate: "disable",
            };
            for (var i = 0; i < this.multipleSelection.length; i++) {
              params.userIds.push(this.multipleSelection[i].userId);
              this.multipleSelection[i].status = 1;
            }
            params.userIds = params.userIds.join(",");
            this.$axios
              .put(
                "prod-api/backend/customer/" +
                  params.operate +
                  "/" +
                  params.userIds
              )
              .then((res) => {
                if (res.data.code == 200) {
                  this.$message({
                    message: res.data.msg,
                    type: "success",
                  });
                  this.getData();
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: "error",
                  });
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消停用",
            });
          });
      } else {
        this.$message({
          showClose: true,
          message: "请选择数据进行停用",
        });
      }
    },
    //删除用户
    custDel() {
      if (this.multipleSelection.length >= 1) {
        this.$confirm("是否删除", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let params = {
              userIds: [],
            };
            for (var i = 0; i < this.multipleSelection.length; i++) {
              params.userIds.push(this.multipleSelection[i].userId);
            }
            params.userIds = params.userIds.join(",");
            this.$axios
              .delete("prod-api/backend/customer/delete/" + params.userIds)
              .then((res) => {
                if (res.data.code == 200) {
                  this.$message({
                    message: res.data.msg,
                    type: "success",
                  });
                  this.getData();
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: "error",
                  });
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$message({
          showClose: true,
          message: "请选择数据进行删除",
        });
      }
    },
    //重置密码
    custReset() {
      if (this.multipleSelection.length >= 1) {
        this.$confirm("是否重置", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let params = {
              userIds: [],
            };
            for (var i = 0; i < this.multipleSelection.length; i++) {
              params.userIds.push(this.multipleSelection[i].userId);
            }
            params.userIds = params.userIds.join(",");
            this.$axios
              .put("prod-api/backend/customer/reset/" + params.userIds)
              .then((res) => {
                if (res.data.code == 200) {
                  this.$message({
                    message: res.data.msg,
                    type: "success",
                  });
                  this.getData();
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: "error",
                  });
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消重置",
            });
          });
      } else {
        this.$message({
          showClose: true,
          message: "请选择数据进行重置",
        });
      }
    },
    //获取客户查询信息列表接口
    getData() {
      this.$axios
        // 以下为调接口
        .get(
          "/prod-api/backend/customer/list?" +
            "pageNum=" +
            this.page.pageNum +
            "&pageSize=" +
            this.page.pageSize +
            "&searchValue=" +
            this.custForm.cust
        )
        .then((res) => {
          if (res.data.code == 200) {
            // rows为后台返回的字段数据
            this.tableData = res.data.rows;
            //total为后台向前台返回的总条数
            this.page.total == res.data.total;
            //以下为加判断，把男女显示在性别上
            for (var i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].sex == "0") {
                this.tableData[i].sex = "男";
              } else if (this.tableData[i].sex == "1") {
                this.tableData[i].sex = "女";
              } else {
                this.tableData[i].sex = "未知";
              }
            }
            this.$message({
              showClose: true,
              message: "查询成功",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: "查询失败",
              type: "error",
            });
          }
        });
    },
    //查询按钮，查询用户信息
    isClick() {
      this.getData();
    },
    //查询表单重置
    resetForm(custForm) {
      this.$refs[custForm].resetFields();
    },
  },
};
</script>
<style scoped>
.custManages {
  margin-top: 20px;
  border: 1px;
}
.btn {
  margin-left: 20px;
}
.isBtn {
  margin-top: 10px;
}
.el-pagination {
  width: 800px;
  float: right;
}
</style>