<template>
<div class="wrapper">
    
    <div class="content-box">
        <StorageCaseSecond></StorageCaseSecond>

        <div class="app-wrap">
            <div class="content">
             <router-view></router-view>   
            </div>
            

        </div>
    </div>
</div>
    
</template>
<script>
import StorageCaseSecond from "@/components/StorageCaseSecond.vue";
export default {
    name:"home",
    components:{
            StorageCaseSecond
    }
}
</script>
<style scoped>
.content{
    position:absolute;
    width: 1278.5px;
    height: 800px;
    left:200px;
    top:60px;
    background: #eee;
}
</style>