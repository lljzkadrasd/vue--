<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link"
        >{{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="updataPw">修改密码</el-dropdown-item>
        <el-dropdown-item command="quiteLogin">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: "example",
  data() {
    return {
      userName: "我是传奇",
    };
  },
};
</script>
<style scoped>
</style>