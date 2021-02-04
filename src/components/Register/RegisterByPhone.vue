<template>
  <div id="forget_code">
    <van-nav-bar title="用户注册" left-arrow @click-left="onClickLeft" fixed/>
    <div style="margin-top: 5rem;">
      <van-form @submit="onSubmit">
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请输入手机号' }]"
        />
        <van-field
          v-model="code"
          name="验证码"
          label="验证码"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
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
        <van-field
          v-model="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="checkNewcode"
          name="确认密码"
          label="确认密码"
          placeholder="请再次输入登录密码"
          :rules="[{ required: true, message: '请再次输入密码' }]"
        />
        <van-field
          v-model="code"
          name="机构编码"
          label="机构编码"
          placeholder="请输入机构编码"
          :rules="[{ required: true, message: '请填写机构编码' }]"
        />
        <van-field name="isRead" :border="false" :rules="[{ required: true, message: '请勾选' }]">
          <template #input>
            <van-radio-group
              v-model="radio"
              direction="horizontal"
              @change="radioChange"
            >
              <van-radio name="1">
                <span class="register_form_read">我已阅读</span>
                <span class="register_form_treaty" @click="$router.push('/treaty')">《会计APP用户协议》</span>
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button block type="info" native-type="submit">注册</van-button>
        </div>
      </van-form>
    </div>
    <a style="color: #108ee9" @click="$router.push('/register')"
      >账号注册</a
    >
  </div>
</template>

<script>
import router from "../../router/index";
import {getCodeByPhone} from '../../action/LoginAction';

export default {
  name: "RegisterByPhone",
  data() {
    return {
      username: "",
      phone: "",
      password: "",
      checkNewcode: "",
      code: "",
      radio: "",
      flag: 0, //0: 可获取验证码 1：倒计时状态
      time: 60, //倒计时
      verifyCode: "",
    };
  },
  methods: {
    /**单选框勾选 */
    radioChange(e) {
      console.log("--e", e);
    },
    /**左上角返回键 */
    onClickLeft() {
      router.push('/login/account')
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
    },
  },
};
</script>

<style scoped>
a {
  text-align: center;
  display: block;
}
.register_form_read {
  font-family: PingFangSC-Regular, PingFang SC;
  color: #cccccc;
}
.register_form_treaty {
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #108ee9;
}
.van-nav-bar /deep/ .van-icon {
  color: #333333;
}
</style>