<template>
  <div class="goods">
    <el-card>
      <el-form
        :model="goodsForm"
        ref="goodsForm"
        label-width="110px"
        class="demo-ruleForm"
      >
        <el-col :span="6">
          <el-form-item label="客户名称" prop="nickName">
            <el-input v-model="goodsForm.nickName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单状态" prop="status">
            <el-select v-model="goodsForm.status" placeholder="请选择订单状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-button type="primary" @click="isClick()">查询</el-button>
          <el-button @click="resetForm('goodsForm')">重置</el-button>
        </el-col>

        <el-col :span="12">
          <el-form-item label="空箱下单时间" prop="emptyDate" required>
            <el-date-picker
              v-model="goodsForm.emptyDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :clearable="false"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="重箱下单时间" prop="heavyDate" required>
            <el-date-picker
              v-model="goodsForm.heavyDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :clearable="false"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>

    <!-- 下面是表格区域 -->
    <el-card>
      <el-button type="primary" @click="goodsdetails()">详情</el-button>
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column prop="orderCode" label="订单编号" width="120">
        </el-table-column>

        <el-table-column
          prop="orderName"
          label="订单名称"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column prop="status" label="订单状态" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="nickName" label="客户名称" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="boxId" label="箱子id" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="boxCode" label="箱子编号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="boxStandard"
          label="箱子规格"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="boxsorce" label="所需积分" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="leaseDuration"
          label="租赁时长"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="totalPrice"
          label="实付积分"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="emptyBoxOrderTime"
          label="空箱上门下单时间"
          show-overflow-tooltip
          v-if="emptyShow"
        >
        </el-table-column>
        <el-table-column
          prop="emptyBoxOrderTime"
          label="重箱上门下单时间"
          show-overflow-tooltip
          v-if="heavyShow"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              style="color: yellow"
              @click="sendNull(scope.row)"
              v-if="scope.row.status === 1"
              >发送空箱
            </el-button>
            <el-button
              size="mini"
              style="color: blue"
              @click="sendNull(scope.row)"
              v-if="scope.row.status === 4"
              >收取重箱
            </el-button>
            <el-button
              size="mini"
              style="color: pink"
              @click="sendNull(scope.row)"
              v-if="scope.row.status === 6"
              >发送重箱
            </el-button>
            <el-button
              size="mini"
              style="color: green"
              @click="sendNull(scope.row)"
              v-if="scope.row.status === 9"
              >收取空箱
            </el-button>
            <el-button
              size="mini"
              style="color: black"
              @click="deleteOrder(scope.row)"
              v-if="scope.row.status === 10"
              >删除订单
            </el-button>
          </template>
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
    <GoodsManagesdetails ref="goodsdetails"></GoodsManagesdetails>
  </div>
</template>
<script>
import GoodsManagesdetails from "./GoodsManagesdetails";
export default {
  components: {
    GoodsManagesdetails,
  },
  data() {
    return {
      emptyShow: true,
      heavyShow: true,
      goodsForm: {
        nickName: "",
        status: "",
        emptyDate: ["", ""],
        heavyDate: ["", ""],
      },
      page: {
        pages: 0,
        total: 0,
        pageSize: 10,
        pageNum: 1,
      },

      multipleSelection: [],
      operate: "",
      options: [
        {
          label: "待发空箱",
          value: 1,
        },
        {
          label: "已发空箱",
          value: 2,
        },
        {
          label: "送达空箱",
          value: 3,
        },
        {
          label: "待收重箱",
          value: 4,
        },
        {
          label: "已储存",
          value: 5,
        },
        {
          label: "待发重箱",
          value: 6,
        },
        {
          label: "已发重箱",
          value: 7,
        },
        {
          label: "送达空箱",
          value: 8,
        },
        {
          label: "待收空箱",
          value: 9,
        },
        {
          label: "已完成",
          value: 10,
        },
      ],
      tableData: [],
    };
  },
  //页面初始化时就能查询数据
  mounted() {
    this.getData();
  },
  methods: {
    // 选中触发事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.getData();
    },
    //第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.pageNum = val;
      this.getData();
    },
    //发送空箱

    sendNull(row) {
      if (row.status == 1) {
        this.operate = 2;
      } else if (row.status == 2) {
        this.operate = 3;
      } else if (row.status == 3) {
        this.operate = 4;
      } else if (row.status == 4) {
        this.operate = 5;
      } else if (row.status == 5) {
        this.operate = 6;
      } else if (row.status == 6) {
        this.operate = 7;
      } else if (row.status == 7) {
        this.operate = 8;
      } else if (row.status == 7) {
        this.operate = 8;
      } else if (row.status == 8) {
        this.operate = 9;
      } else if (row.status == 9) {
        this.operate = 10;
      }
      let params = {};
      this.$axios

        .put(
          "prod-api/backend/order/operate/" +
            row.id +
            "/" +
            this.operate +
            "/" +
            row.version,
          params
        )

        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });

            this.getData();
          } else {
            this.$message({
              type: "error",
              message: res.data.msg,
            });
          }
        });
    },
    // 删除订单

    deleteOrder(item) {
      // console.log(item);

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })

        .then(() => {
          this.$axios
            .delete("prod-api/backend/order/delete/" + item.id)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: res.data.msg,
                });
                this.getData();
              } else {
                this.$message({
                  type: "error",
                  message: res.data.msg,
                });
              }
            });

          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })

        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //详情页面
    goodsdetails() {
      if (1 == this.multipleSelection.length) {
        this.$refs.goodsdetails.openDialog(
          true,
          JSON.parse(JSON.stringify(this.multipleSelection))
        );
      } else if (this.multipleSelection.length < 1) {
        this.$message({
          type: "info",
          message: "请选择一条数据进行操作",
        });
      } else {
        this.$message({
          type: "info",
          message: "请选择数据进行操作",
        });
      }
    },

    //查询按钮，查询用户信息
    isClick() {
      this.getData();
    },
    //查询表单重置
    resetForm(goodsForm) {
      if (this.$refs[goodsForm] != undefined) {
        this.$refs[goodsForm].resetFields();
        this.getData();
      }
    },
    //查询数据列表
    getData() {
      this.$axios
        .get(
          "prod-api/backend/order/list?" +
            "pageNum=" +
            this.page.pageNum +
            "&pageSize=" +
            this.page.pageSize +
            "&nickName=" +
            this.goodsForm.nickName +
            "&status=" +
            this.goodsForm.status +
            "&emptyBoxOrderTimeStart=" +
            this.goodsForm.emptyDate[0] +
            "&emptyBoxOrderTimeEnd=" +
            this.goodsForm.emptyDate[1] +
            "&heavyBoxOrderTimeStart=" +
            this.goodsForm.heavyDate[0] +
            "&heavyBoxOrderTimeEnd=" +
            this.goodsForm.heavyDate[1]
        )

        .then((res) => {
          if (200 == res.data.code) {
            this.tableData = res.data.rows;
            this.page.total = res.data.total;
            this.$message({
              showClose: true,
              message: "查询成功",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error",
            });
          }
        });
    },
  },
};
</script>
<style scoped>
.goods {
  margin-top: 10px;
}
</style>