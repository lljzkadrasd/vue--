<template>
  <div class="all">
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="bg2"><img src="../assets/logo1.png" /></div>
    <div class="title" style="top: -100px">
      <h2 style="text-align: center; color: blue; top: -100px; margin: 0">
        CHU&nbsp;&nbsp;&nbsp;LIU &nbsp;&nbsp;&nbsp;XIANG&nbsp;&nbsp;
      </h2>
    </div>
    <div class="form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          left-icon="smile-o"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请确认密码' }]"
        />
        <van-field
          v-model="userphone"
          name="手机"
          label="手机"
          placeholder="手机"
          :rules="[{ required: true, message: '请填写手机号码' }]"
        />
        <van-field
          v-model="nickName"
          name="姓名"
          label="姓名"
          placeholder="姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          v-model="email"
          name="邮箱"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ required: true, message: '请填写邮箱' }]"
        />
        <van-field name="性别" label="性别">
          <template #input>
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio name="1">男</van-radio>
              <van-radio name="2">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      userphone: "",
      nickName: "",
      radio: "1",
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
  },
};
</script>
<style  scoped>
.all {
  width: 100%;
  height: 633px;
  background: white;
}
.bg2 {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>