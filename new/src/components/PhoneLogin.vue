<template>
<div class="all">
  <div class="bg1">
    <img src="../assets/logo2.png"/>
  </div>
  <div class="form">
  <van-form @submit="onSubmit()">
  <van-field
    v-model="username"
    name="用户名"
    label="用户名"
    placeholder="用户名"
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
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">登录</van-button>
  </div>
  <div style="margin: 16px;height:100px;">
      <div style="width:50%;height:100px;float:left;"><p style="position:absolute;"><a >忘记密码</a></p></div>
      <div style="width:50%;height:100px;float:right;"><p style="position:absolute;"><a style="left:80px;">注册</a></p></div>      
 </div>

</van-form>
</div>
</div>
</template>
<script>
export default {
  data() {
    return {
        username: '',
        password: '',
    };
  },
  methos:{
      onSubmit(values) {
      console.log('submit', values);
    },

  },
};
</script>
<style  scoped>
.all{
    width: 100%;
    height: 633px;
    background:white;
}
.bg1 {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../assets/bg1.png);
}
.form{
    width: 100%;
    height: 50%;
    margin-top:100px;
}
</style>