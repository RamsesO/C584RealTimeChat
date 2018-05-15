// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io'
import VueSession from 'vue-session'

Vue.config.productionTip = false
Vue.use(VueSocketio, 'http://localhost:3000')
Vue.use(VueSession);

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router: router,
  components: {App},
  template: '<App/>',
})
