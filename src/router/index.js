import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import FirstLogin from '../components/Login/FirstLogin';
import AccountLogin from '../components/Login/AccountLogin';
import PhoneLogin from '../components/Login/PhoneLogin';

Vue.use(Router)

export default new Router({
  routes: [
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
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
