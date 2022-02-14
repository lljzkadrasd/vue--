<template>
  <!-- 箱子信息页面 -->
  <div class="boxManages2">
    <el-card>
      <el-form ref="boxForm" :model="boxForm" label-width="80px">
        <el-row>
          <!-- 箱子规格 -->
          <el-col :span="8">
            <el-form-item label="箱子规格" prop="boxStandard">
              <el-select v-model="boxForm.boxStandard" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.boxStandard"
                  :value="item.boxStandard"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8" class="btn">
            <el-button type="primary" @click="search()">查询</el-button>
            <el-button @click="resetForm('boxForm')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="isBtn">
      <el-button type="primary" @click="boxfadd()">新增</el-button>
      <el-button type="primary" @click="boxfDel()">删除</el-button>

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
    <BoxManagesadd2 ref="boxadd"></BoxManagesadd2>
  </div>
</template>
<script>
import BoxManagesadd2 from "./BoxManagesadd2.vue";

export default {
  components: {
    BoxManagesadd2,
  },
  data() {
    return {
      boxForm: {
        boxStandard: "",
      },
      page: {
        // 默认停在的页面为第一页
        pageNum: 1,
        pageSize: 0,
        total: 0,
      },
      options: [],

      columnList: [
        {
          label: "箱子规格",
          prop: "boxStandard",
          num: 1,
        },
        {
          label: "箱子编号",
          prop: "boxCode",
          num: 2,
        },
        {
          label: "所需积分",
          prop: "boxUnitPrice",
          num: 3,
        },
        {
          label: "使用状态",
          prop: "isUsed",
          num: 4,
        },
        {
          label: "使用人",
          prop: "usedBy",
          num: 5,
        },
        {
          label: "备注",
          prop: "remark",
          num: 6,
        },
      ],
      tableData: [],

      multipleSelection: [],
    };
  },
  //页面初始化时就能查询数据
  mounted() {
    this.getData();
    //箱子规格下拉列表方法调用
    this.standradDown();
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
    //箱子信息中的查询
    search() {
      // 箱子信息中的方法调用
      this.getData();
    },
    //箱子信息中的重置
    resetForm(boxForm) {
      this.$refs[boxForm].resetFields();
    },
    // 新增箱子
    boxfadd() {
      this.$refs.boxadd.openDialog(
        true,
        JSON.parse(JSON.stringify(this.multipleSelection))
      );
    },
    //箱子信息中的删除
    boxfDel() {
      if (this.multipleSelection.length >= 1) {
        this.$confirm("是否删除", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let params = {
              ids: [],
            };
            for (var i = 0; i < this.multipleSelection.length; i++) {
              params.ids.push(this.multipleSelection[i].id);
            }
            params.ids = params.ids.join(",");
            this.$axios
              .delete("prod-api/backend/box/info/delete/" + params.ids)
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
    //获取箱子信息查询信息列表接口
    getData() {
      this.$axios
        // 以下为调接口
        .get(
          "/prod-api/backend/box/info/list?" +
            "pageNum=" +
            this.page.pageNum +
            "&pageSize=" +
            this.page.pageSize +
            "&searchValue=" +
            this.boxForm.boxStandard
        )
        .then((res) => {
          if (res.data.code == 200) {
            // rows为后台返回的字段数据
            this.tableData = res.data.rows;
            //total为后台向前台返回的总条数
            this.page.total == res.data.total;

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
  },
};
</script>
<style scoped>
.boxManages2 {
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