<template>
  <div class="viewManages">
    <el-card>
      <el-form ref="viewForm" :model="viewForm" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item>
              <el-input v-model="viewForm.user" placeholder="提交人/意见标题">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" class="btn">
            <el-button type="primary" @click="isClick()">查询</el-button>
            <el-button @click="resetForm('viewForm')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card>
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
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      viewForm: {
        user: "",
      },
      // 此为对象的形式
      page: {
        // 默认停在的页面为第一页
        pageNum: 1,
        pagePage: 0,
        total: 0,
      },

      columnList: [
        {
          label: "编号",
          prop: "id",
          num: 1,
        },
        {
          label: "提交人",
          prop: "createBy",
          num: 2,
        },
        {
          label: "意见标题",
          prop: "title",
          num: 3,
        },
        {
          label: "意见内容",
          prop: "content",
          num: 4,
        },
        {
          label: "提交时间",
          prop: "createTime",
          num: 5,
        },
        {
          label: "删除状态",
          prop: "delFlag",
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
    //查询表单重置
    resetForm(viewForm) {
      this.$refs[viewForm].resetFields();
    },
    //查询按钮，查询用户信息
    isClick() {
      this.getData();
    },
    //获取用户查询信息列表接口
    getData() {
      this.$axios
        // 以下为调接口
        .get(
          "/prod-api/backend/advice/list?" +
            "pageNum=" +
            this.page.pageNum +
            "&pageSize=" +
            this.page.pageSize +
            "&searchValue=" +
            this.viewForm.user
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
.viewManages {
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