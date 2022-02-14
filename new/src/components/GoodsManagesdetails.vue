<template>
  <el-dialog title="详情" :visible.sync="dialogdetails" width="400px">
    <!-- 表单区域 -->
    <el-form ref="goodsForm" :model="goodsForm" label-width="80px">
      <el-row>
        <el-form-item label="订单编号" prop="orderCode">
          <el-input
            v-model="goodsForm.orderCode"
            autocomplete="off"
            class="secPass"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-input
            v-model="goodsForm.status"
            autocomplete="off"
            class="secPass"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="goodsForm.email"
            autocomplete="off"
            class="secPass"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="箱子id" prop="boxId">
          <el-input
            v-model="goodsForm.boxId"
            autocomplete="off"
            class="secPass"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="所需积分" prop="boxUnitPrice">
          <el-input
            v-model="goodsForm.boxUnitPrice"
            autocomplete="off"
            class="secPass"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="实付积分" prop="totalPrice">
          <el-input
            v-model="goodsForm.totalPrice"
            autocomplete="off"
            class="secPass"
            readonly
          ></el-input>
        </el-form-item>
        <div v-if="emptyShow">
          <el-form-item label="空箱上门姓名" prop="emptyBoxCallName">
            <el-input
              v-model="goodsForm.emptyBoxCallName"
              autocomplete="off"
              class="secPass"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="空箱上门地址" prop="emptyBoxCallAddress">
            <el-input
              v-model="goodsForm.emptyBoxCallAddress"
              autocomplete="off"
              class="secPass"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="空箱上门时段" prop="emptyBoxCallInterval">
            <el-input
              v-model="goodsForm.boxtiem"
              autocomplete="off"
              class="secPass"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="空箱上门下单时间" prop="emptyBoxOrderTime">
            <el-input
              v-model="goodsForm.emptyBoxOrderTime"
              autocomplete="off"
              class="secPass"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="空箱上门电话" prop="emptyBoxCallPhone">
            <el-input
              v-model="goodsForm.emptyBoxCallPhone"
              autocomplete="off"
              class="secPass"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="空箱上门时间" prop="emptyBoxCallTime">
            <el-input
              v-model="goodsForm.emptyBoxCallTime"
              autocomplete="off"
              class="secPass"
              readonly
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item label="订单名称" prop="orderName">
          <el-input
            v-model="goodsForm.orderName"
            autocomplete="off"
            class="secPass"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="nickName">
          <el-input
            v-model="goodsForm.nickName"
            autocomplete="off"
            class="secPass"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="箱子规格" prop="boxStandard">
          <el-input
            v-model="goodsForm.boxStandard"
            autocomplete="off"
            class="secPass"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="租赁时长" prop="leaseDuration">
          <el-input
            v-model="goodsForm.leaseDuration"
            autocomplete="off"
            class="secPass"
            readonly
          ></el-input>
        </el-form-item>

        <div v-if="heavyShow">
          <el-form-item label="重箱上门下单时间" prop="heavyBoxCallTime">
            <el-input
              v-model="goodsForm.heavyBoxCallTime"
              autocomplete="off"
              class="secPass"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="重箱提取姓名" prop="heavyBoxCallName">
            <el-input
              v-model="goodsForm.heavyBoxCallName"
              autocomplete="off"
              class="secPass"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="重箱提取电话" prop="heavyBoxCallPhone">
            <el-input
              v-model="goodsForm.heavyBoxCallPhone"
              autocomplete="off"
              class="secPass"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="重箱提取地址" prop="heavyBoxCallAddress">
            <el-input
              v-model="goodsForm.heavyBoxCallAddress"
              autocomplete="off"
              class="secPass"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="重箱提取时间" prop="heavyBoxCallTime">
            <el-input
              v-model="goodsForm.heavyBoxCallTime"
              autocomplete="off"
              class="secPass"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="重箱提取时段" prop="heavyBoxCallInterval">
            <el-input
              v-model="goodsForm.heavyBoxCallInterval"
              autocomplete="off"
              class="secPass"
              readonly
            ></el-input>
          </el-form-item>
        </div>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogdetails = false">返回</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "goodsManagesdetails",
  data() {
    return {
      dialogdetails: false,
      heavyShow: false,
      emptyShow: false,

      goodsForm: {
        orderCode: "",
        status: "",
        email: "",
        boxId: "",
        boxUnitPrice: "",
        totalPrice: "",
        emptyBoxCallName: "",
        emptyBoxCallAddress: "",
        emptyBoxCallInterval: "",
        orderName: "",
        nickName: "",
        boxStandard: "",
        leaseDuration: "",
        emptyBoxOrderTime: "",
        emptyBoxCallPhone: "",
        emptyBoxCallTime: "",
        heavyBoxCallTime: "",
        heavyBoxCallName: "",
        heavyBoxCallPhone: "",
        heavyBoxCallAddress: "",
        heavyBoxCallTime: "",
        heavyBoxCallInterval: "",
      },
      rules: {
        orderCode: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        status: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        boxId: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        boxUnitPrice: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        totalPrice: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        emptyBoxCallName: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        emptyBoxCallAddress: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        emptyBoxCallInterval: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        orderName: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        custName: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        boxStandard: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        leaseDuration: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        emptyBoxOrderTime: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        emptyBoxCallPhone: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        emptyBoxCallTime: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        heavyBoxCallTime: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        heavyBoxCallName: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        heavyBoxphone: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        heavyBoxCallAddress: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        heavyBoxCallTime: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        heavyBoxtimeto: [
          {
            required: true,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    openDialog(flag, val) {
      this.dialogdetails = flag;
      console.log(val);
      // 把父页面的数据传到子页面上
      if (val[0].status >= 1 && val[0].status <= 5) {
        this.heavyShow = false;
        this.emptyShow = true;
      } else if (val[0].status > 5 && val[0].status <= 10) {
        this.heavyShow = true;
      }

      this.goodsForm.orderName = val[0].orderName;
      this.goodsForm.orderCode = val[0].orderCode;
      this.goodsForm.status = val[0].status;
      this.goodsForm.email = val[0].email;
      this.goodsForm.boxId = val[0].boxId;
      this.goodsForm.boxUnitPrice = val[0].boxUnitPrice;
      this.goodsForm.totalPrice = val[0].totalPrice;
      this.goodsForm.emptyBoxCallName = val[0].emptyBoxCallName;
      this.goodsForm.emptyBoxCallAddress = val[0].emptyBoxCallAddress;
      this.goodsForm.emptyBoxCallInterval = val[0].emptyBoxCallInterval;
      this.goodsForm.nickName = val[0].nickName;
      this.goodsForm.boxStandard = val[0].boxStandard;
      this.goodsForm.leaseDuration = val[0].leaseDuration;
      this.goodsForm.emptyBoxOrderTime = val[0].emptyBoxOrderTime;
      this.goodsForm.emptyBoxCallPhone = val[0].emptyBoxCallPhone;
      this.goodsForm.emptyBoxCallTime = val[0].emptyBoxCallTime;
      this.goodsForm.heavyBoxCallTime = val[0].heavyBoxCallTime;
      this.goodsForm.heavyBoxCallName = val[0].heavyBoxCallName;
      this.goodsForm.heavyBoxCallPhone = val[0].heavyBoxCallPhone;
      this.goodsForm.heavyBoxCallAddress = val[0].heavyBoxCallAddress;
      this.goodsForm.heavyBoxCallInterval = val[0].heavyBoxCallInterval;
    },
  },
};
</script>
<style scoped>
</style>