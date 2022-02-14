<template>
    <div>
    <router-link to="/three/three1" tag="li" active-class="jj">1</router-link>
    <router-link to="/three/three2" tag="li" active-class="jj">2</router-link>
    <router-view/>

    </div>
</template>
<script>
export default {
    name:'three',
    data(){
        return{
            
        }
    }
    
}
</script>
<style scoped>
.jj{
    background-color:blue;
}
</style>