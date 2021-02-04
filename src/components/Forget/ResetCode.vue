<template>
  <div id="forget_code">
    <van-nav-bar title="修改密码" left-arrow @click-left="onClickLeft" fixed/>
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="account"
          name="account"
          label="登录账号"
          :placeholder="account"
          readonly
        />
        <van-field
          v-model="phone"
          name="phone"
          label="所绑定手机号"
          :placeholder="phone"
          readonly
        />
        <van-field
          v-model="newcode"
          name="newcode"
          label="新密码"
          type="password"
          placeholder="请输入登录密码"
          :rules="[{ required: true, message: '请输入登录密码' }]"
        />
        <van-field
          v-model="checkNewcode"
          name="checkNewcode"
          type="password"
          label="新密码确认"
          placeholder="请再次输入登录密码"
          :rules="[
            { required: true, message: '请再次输入密码' },
            {
              validator: this.checkcode,
              message: '两次密码不一样',
            },
          ]"
        />
        <van-field
          v-model="code"
          name="code"
          label="手机验证码"
          placeholder="请输入手机验证码"
          :rules="[{ required: true, message: '请填写验证码' },
          { validator: this.checkVerification, message: '验证码错误' },]"
        >
          <template #button>
            <van-button
            v-if="flag == 0"
              size="small"
              type="default"
              @click="getCode"
              native-type="button"
              >动态密码</van-button
            >
            <van-button
              v-else
              disabled
              size="small"
              type="default"
              native-type="button"
              >（{{ time }}）</van-button
            >
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button block type="info" native-type="submit">确定</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import router from "../../router/index";
import {getCodeByPhone} from '../../action/LoginAction';

export default {
  name: "ResetCode",
  data() {
    return {
      account: "",
      phone: "",
      newcode: "",//新密码
      checkNewcode: "",//第二次输入新密码
      code: "",//输入的手机验证码
      verifyCode: "",//后台返回的验证码
      flag: 0, //0: 可获取验证码 1：倒计时状态
      time: 60,//获取短信的倒计时
    };
  },
  methods: {
    /**左上角返回键 */
    onClickLeft() {
      router.push("/login/account");
    },
    /**得到验证码 */
    getCode() {
      getCodeByPhone(this.phone).then((res) => {
        console.log("---res", res);
        this.verifyCode = res.code;
        this.flag = 1;
        let intervId = setInterval(() => {
          this.time = this.time - 1;
          if (this.time == 0) {
            clearInterval(intervId);
            this.flag = 0;
            this.time = 60;
          }
        }, 1000);
      });
    },
    /**提交表单 */
    onSubmit(values) {
      console.log("submit", values);
      router.push("/login/account")
    },
    /**检查两次密码输入是否一样 */
    checkcode(value) {
      if(value != this.newcode){
        return false;
      }
    },
    /**检查验证码是否正确 */
    checkVerification(value){
      if (value != this.verifyCode) {
        return false;
      }
    },
  },
  mounted() {
    this.account = router.history.current.query.id;
    this.phone = router.history.current.query.phone;
  },
};
</script>

<style scoped>
a {
  text-align: center;
  display: block;
}
.van-nav-bar /deep/ .van-icon {
  color: #333333;
}
</style>