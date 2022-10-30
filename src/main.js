import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { Button } from 'vant';
import getVant from "./plugins"
import VueRollingMarquee from "vue-rolling-marquee";
Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
getVant(app)
// app.use(Button);
Vue.use(VueRollingMarquee);