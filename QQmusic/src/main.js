// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from 'axios'
import App from './App'
import router from './router'
import '@/assets/css/reset.css'
import jsonP from'@/assets/js/jsonP.js'

import store from '@/store'


Vue.config.productionTip = false
Vue.prototype.$jsonP     = jsonP;
Vue.prototype.$http      = Axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
