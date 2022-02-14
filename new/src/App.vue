<template>
  <div id="app">
    

    <!-- 路由容器 -->
  <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 全局样式 */
 #app { 
   border:none;
   background-color: #eee;
  
 
}
.activeCss{
  background: yellow;
  

} 
</style>
