// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

//1.导入axios
import axios from 'axios'
//2.导入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 3.导入Vant
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(ElementUI);
Vue.use(Vant);
Vue.config.productionTip = false
Vue.prototype.$axios=axios

Vue.config.productionTip=false
// 请求拦截
axios.interceptors.request.use(config => {
  if ("/prod-api/common/login" != config.url) {
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] =
        " Bearer " + localStorage.getItem("token");
      console.log(localStorage.getItem("token"));
      // 让每个请求携带自定义token 根据实际情况自行修改
    }
  }
  return config
}, err => {
  //todo待完善接口拦截
  return Promise.reject(err);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
