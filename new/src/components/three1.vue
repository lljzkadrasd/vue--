<template>
<ul>
    <li v-for="(data,index) in datalist" :key="index" @click="handleClick(index)">{{data}}</li>
  </ul>  
</template>
<script>
export default {
    name:'three1',
    data(){
        return{
            datalist:["我是天主","我是恶魔","我是阎罗","我是转轮"]
            
        };
    },
    methods:{
        //动态路由
        handleClick(index){
            // 1.js 实现路由跳转 ---> 编程式导航
            // 2.this.$router.push(`/detail/${index}`);
            // 通过路由名字来跳转，命名路由
            // this.$router.push({name:"detail",params:{id :index}});
            // 直接跳转到first页面
            // this.$router.push({path:"/first"});

            this.$router.go(-2);
        }
    }
    
}
</script>