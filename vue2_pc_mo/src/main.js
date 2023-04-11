import Vue from 'vue'
import App from './App.vue'
import {request} from 'network/request'
Vue.config.productionTip = false
Vue.prototype.$request=request
import store from '@/store/index'
import router from '@/router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')

