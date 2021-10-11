// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import less from 'less';
import 'vant/lib/index.css';

import {
  Button,
  NavBar,
  Image,
  Form,
  Field,
  Radio,
  RadioGroup,
  Icon,
  Tab,
  Tabs,
  List,
  Toast,
  Tabbar,
  TabbarItem,
  Tag,
  Cell,
  CellGroup,
  DatetimePicker,
  Popup,
  Empty,
  Dialog,
  NoticeBar,
  Uploader,
  SwipeCell,
<<<<<<< Updated upstream
  DropdownMenu, DropdownItem,
  Card,
  ImagePreview,
  Calendar,
=======
  DropdownMenu,
   DropdownItem,
   Checkbox, 
   CheckboxGroup,
  Card,
  ImagePreview,
  Notify

>>>>>>> Stashed changes
} from 'vant';
import store from 'tool/store.js'


Vue.config.productionTip = false

Vue.use(Calendar)
Vue.use(ImagePreview)
Vue.use(Card)
Vue.use(Dialog)
Vue.use(less)
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Image);
Vue.use(Form);
Vue.use(Field);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Icon);
Vue.use(Toast);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Tag);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(DatetimePicker);
Vue.use(Popup);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
Vue.use(Empty);
Vue.use(NoticeBar);
Vue.use(Uploader);
Vue.use(SwipeCell);
Vue.use(DropdownMenu);
Vue.use( DropdownItem);
Vue.use( Checkbox);
Vue.use( CheckboxGroup);
Vue.use(Notify);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})
