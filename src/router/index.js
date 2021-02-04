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
      children:[
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
    }
  ]
})
