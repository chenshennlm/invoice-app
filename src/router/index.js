import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '../index';
import FirstLogin from '../components/Login/FirstLogin';
import AccountLogin from '../components/Login/AccountLogin';
import PhoneLogin from '../components/Login/PhoneLogin';
import Treaty from '../components/Treaty';
import PhoneCodeLogin from '../components/Login/PhoneCodeLogin';
import ForgetCode from '../components/Forget/ForgetCode';
import ForgetByPhone from '../components/Forget/ForgetByPhone';
import ResetCode from '../components/Forget/ResetCode';
import Register from '../components/Register/Register';
import RegisterByPhone from '../components/Register/RegisterByPhone';
import ForgetWithPhone from '../components/Forget/ForgetWithPhone';
import Home from '../components/Home/Home';
import Mine from '../components/Mine/Mine';
import MyInvoice from '../components/Mine/MyInvoice';
import MyInvoiceImg from '../components/Mine/MyInvoiceImg';
import Message from '../components/Message/Message';
import MessageDetail from '../components/Message/MessageDetail';
import SetUp from '../components/Mine/SetUp';
import Agreement from '../components/Mine/Agreement';
import AboutUs from '../components/Mine/AboutUs';
import EditInfo from '../components/Mine/EditInfo';
import Upload from "../components/Home/children/upload"
Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/mine',
          name: 'Mine',
          component: Mine
        },
      ],
    },
    {
      path: '/mine/myinvoice',
      name: 'MyInvoice',
      component: MyInvoice
    },
    {
      path: '/mine/myinvoiceimg',
      name: 'MyInvoiceImg',
      component: MyInvoiceImg
    },
    {
      path: '/mine/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/mine/messageDetail',
      name: 'MessageDetail',
      component: MessageDetail
    },
    {
      path: '/mine/agreement',
      name: 'Agreement',
      component: Agreement
    },
    {
      path: '/mine/aboutUs',
      name: 'AboutUs',
      component: AboutUs
    },
    
    {
      path: '/mine/setUp',
      name: 'SetUp',
      component: SetUp
    },
    {
      path: '/mine/editInfo',
      name: 'EditInfo',
      component: EditInfo
    },
    {
      path: '/login/first',
      name: 'FirstLogin',
      component: FirstLogin
    },
    {
      path: '/login/account',
      name: 'AccountLogin',
      component: AccountLogin
    },
    {
      path: '/login/phone',
      name: 'PhoneLogin',
      component: PhoneLogin
    },
    {
      path: '/login/phoneCode',
      name: 'PhoneCodeLogin',
      component: PhoneCodeLogin
    },
    {
      path: '/forget',
      name: 'ForgetCode',
      component: ForgetCode
    },
    {
      path: '/forget/phone',
      name: 'ForgetByPhone',
      component: ForgetByPhone
    },
    {
      path: '/forget/bindphone',
      name: 'ForgetWithPhone',
      component: ForgetWithPhone
    },
    {
      path: '/forget/reset',
      name: 'ResetCode',
      component: ResetCode
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/register/phone',
      name: 'RegisterByPhone',
      component: RegisterByPhone
    },
    {
      path: '/treaty',
      name: 'Treaty',
      component: Treaty
    },

    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/upload',
      name:"Upload",
      component:Upload
    }
  ]
})
