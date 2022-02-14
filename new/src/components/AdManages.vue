<template>
  <!-- 广告主页 -->
  <div class="adManages">
    <el-card>
      <el-form ref="adForm" :model="adForm" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item>
              <el-input
                v-model="adForm.ad"
                placeholder="广告标题/奖励积分/图片地址"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" class="btn">
            <el-button type="primary" @click="isClick()">查询</el-button>
            <el-button @click="resetForm('adForm')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card class="isBtn">
      <el-button type="primary" @click="adadd()">新增</el-button>
      <el-button type="primary" @click="adedit()">编辑</el-button>
      <el-button type="primary" @click="userDel()">删除</el-button>
      <el-button type="primary" @click="userQiyong()">启用</el-button>
      <el-button type="primary" @click="userStop()">停用</el-button>

      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="300"
        @selection-change="handleSelectionChange"
      >
        <!-- 以下为选择页 -->
        <el-table-column type="selection" width="130"></el-table-column>
        <el-table-column
          class="advert-table"
          prop="id"
          label="广告编号"
          width="100"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          class="advert-table"
          prop="title"
          label="广告标题"
          width="130"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          class="advert-table"
          prop="content"
          label="广告内容"
          width="130"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          class="advert-table"
          prop="imgUrl"
          label="图片地址"
          width="130"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            <el-image
              :src="scope.row.imgUrl"
              style="width: 130px; height: 130px"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          class="advert-table"
          prop="points"
          label="奖励积DE"
          width="130"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          class="advert-table"
          prop="isEnable"
          label="广告状态"
          width="130"
          :show-overflow-tooltip="true"
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
    <AdManagesadd ref="adadd"></AdManagesadd>
    <AdManagesEdit ref="adedit"></AdManagesEdit>
  </div>
</template>
<script>
import AdManagesadd from "./AdManagesadd.vue";
import AdManagesEdit from "./AdManagesEdit.vue";
export default {
  name: "admanages",
  components: {
    AdManagesadd,
    AdManagesEdit,
  },
  data() {
    return {
      adForm: {
        ad: "",
      },
      // 此为对象的形式
      page: {
        // 默认停在的页面为第一页
        pageNum: 1,
        pagePage: 0,
        total: 0,
      },

      tableData: [
        {
          id: "3",
          title: "我是广告标题",
          content: "我是广告内容",
          points: "我是奖励积分",
          isEnable: "我是广告状态",
          delFlag: "我是删除状态",
          sortNo: "1",
          imgUrl: require("../assets/bg2.png"),
        },
      ],

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

    adadd() {
      this.$refs.adadd.openDialog(
        true,
        JSON.parse(JSON.stringify(this.multipleSelection))
      );
    },
    adedit() {
      if (this.multipleSelection.length == 1) {
        this.$refs.adedit.openDialog(
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
    //启用
    userQiyong() {
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
                .put("prod-api/backend/advertisement/" + params.userIds)
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
    //停用
    userStop() {
      if (this.multipleSelection.length >= 1) {
        this.$confirm("是否停用", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let params = {
              ids: [],
              operate: "disable",
            };
            for (var i = 0; i < this.multipleSelection.length; i++) {
              params.ids.push(this.multipleSelection[i].id);
              this.multipleSelection[i].status = 1;
            }
            params.ids = params.ids.join(",");
            this.$axios
              .put("prod-api/backend/advertisement/" + params.ids)
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
    //删除
    userDel() {
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
              .delete("prod-api/backend/advertisement/delete/" + params.userIds)
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
    //获取广告积分查询信息列表接口
    getData() {
      this.$axios
        // 以下为调接口
        .get(
          "/prod-api/backend/advertisement/list?" +
            "pageNum=" +
            this.page.pageNum +
            "&pageSize=" +
            this.page.pageSize +
            "&searchValue=" +
            this.adForm.ad
        )
        .then((res) => {
          if (res.data.code == 200) {
            // rows为后台返回的字段数据
            this.tableData = res.data.rows;
            //total为后台向前台返回的总条数
            this.page.total == res.data.total;
            // 以下为广告的拼接
            for (var i = 0; i < this.tableData.length; i++) {
              this.tableData[i].imgUrl = "/prod-api" + this.tableData[i].imgUrl;
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
    resetForm(adForm) {
      this.$refs[adForm].resetFields();
    },
  },
};
</script>
<style scoped>
.adManages {
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