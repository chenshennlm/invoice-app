// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import less from 'less';
import 'vant/lib/index.css';
import { Button, NavBar, Image, Form, Field, Radio, RadioGroup } from 'vant';

Vue.config.productionTip = false
Vue.use(less)

Vue.use(Button);
Vue.use(NavBar);
Vue.use(Image);
Vue.use(Form);
Vue.use(Field);
Vue.use(Radio);
Vue.use(RadioGroup);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
