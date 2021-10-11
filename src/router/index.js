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
import MyInvoice from '../components/Mine/myInvoice/MyInvoice';
import MyInvoiceImg from '../components/Mine/myInvoice/MyInvoiceImg';
import Message from '../components/Message/Message';
import MessageDetail from '../components/Message/MessageDetail';
import SetUp from '../components/Mine/SetUp';
import Agreement from '../components/Mine/Agreement';
import AboutUs from '../components/Mine/AboutUs';
import EditInfo from '../components/Mine/EditInfo';
import Upload from "../components/Home/children/upload"
import AdminInvoice from "../components/Mine/myInvoice/AdminInvoice"
import AdminInvoiceDetail from "../components/Mine/myInvoice/AdminInvoiceDetail"
import InvoiceEditRecord from "../components/Mine/myInvoice/InvoiceEditRecord"
import PendingInvoice from "../components/Mine/pendingInvoice/PendingInvoice"
import InvoiceExamine from "../components/Mine/pendingInvoice/InvoiceExamine"
import InvoiceEdit from "../components/Mine/pendingInvoice/InvoiceEdit"
import HandoverSheet from "../components/Mine/handoverSheet/index"
import HandoverSheetDetail from "../components/Mine/handoverSheet/HandoverSheetDetail"
import BillDetail from "../components/Mine/handoverSheet/BillDetail"

import Uploadphoto from "../components/Home/children/uploadphoto"
import Toview from "../components/Home/children/toviewphoto"
import Photograph from "../components/Home/children/photograph"


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
      path: '/mine/adminInvoice',
      name: 'AdminInvoice',
      component: AdminInvoice
    },
    {
      path: '/mine/adminInvoiceDetail',
      name: 'AdminInvoiceDetail',
      component: AdminInvoiceDetail
    },
    {
      path: '/mine/invoiceEditRecord',
      name: 'InvoiceEditRecord',
      component: InvoiceEditRecord
    },
    {
      path: '/mine/pendingInvoice',
      name: 'PendingInvoice',
      component: PendingInvoice
    },
    {
      path: '/mine/invoiceExamine',
      name: 'InvoiceExamine',
      component: InvoiceExamine
    },
    {
      path: '/mine/invoiceEdit',
      name: 'InvoiceEdit',
      component: InvoiceEdit
    },
    {
      path: '/mine/handoverSheet',
      name: 'HandoverSheet',
      component: HandoverSheet
    },
    {
      path: '/mine/handoverSheetDetail',
      name: 'HandoverSheetDetail',
      component: HandoverSheetDetail
    },
    {
      path: '/mine/billDetail',
      name: 'BillDetail',
      component: BillDetail
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
      path: '/home/upload',
      name: "Upload",
      component: Upload
    },
    {
      path: '/home/uploadphoto',
      name: "Uploadphoto",
      component: Uploadphoto
    },
    {
      path: '/home/toview',
      name: 'Toview',
      component: Toview
    },
    {
      path: '/home/photograph',
      name: 'photograph',
      component: Photograph
    }
  ]
})
