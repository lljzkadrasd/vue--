import Vue from 'vue'
import Vuex from 'vuex'

//挂载vuex
Vue.use(Vuex)

//创建vuex对象
const store =new Vuex.Store({
    state:{
        //存放的键值对就是管理状态
        name:"heieheiehiehieheihihiehih",
        number:18,
    }
})

export default store