<template>
  <div id="phone_login">
    <van-nav-bar title="账号登录" left-arrow @click-left="onClickLeft" fixed />
    <div id="phone_login_head">
      <van-image
        round
        width="10rem"
        height="10rem"
        src="https://img01.yzcdn.cn/vant/leaf.jpg"
        alt="头像"
      >
        <template v-slot:error>加载失败</template>
      </van-image>
    </div>
    <div id="phone_login_form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="code"
          name="验证码"
          label="验证码"
          placeholder="请输入验证码"
          :rules="[
            { required: true, message: '请填写验证码' },
            { validator: this.checkVerification, message: '验证码错误' },
          ]"
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
          name="isRead"
          :border="false"
          :rules="[{ required: true, message: '请勾选' }]"
        >
          <template #input>
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio name="1"
                ><span class="phone_login_form_read">我已阅读</span
                ><span
                  class="phone_login_form_treaty"
                  @click="$router.push('/treaty')"
                  >《会计APP用户协议》</span
                ></van-radio
              >
            </van-radio-group>
          </template>
        </van-field>
        <!-- <vant-radio name='1'></vant-radio> -->
        <div style="margin: 16px">
          <van-button block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
    <a style="color: #108ee9" @click="$router.push('/login/account')"
      >账号登录</a
    >
    <a class="phone_login_to_code" @click="$router.push('/login/phone')"
      >密码登录</a
    >
  </div>
</template>

<script>
import { getCodeByPhone } from "../../action/LoginAction";
import router from '../../router/index';

export default {
  name: "PhoneCodeLogin",
  data() {
    return {
      phone: "",
      password: "",
      code: "",
      radio: "",
      verifyCode: "",
      flag: 0, //0: 可获取验证码 1：倒计时状态
      time: 60, //倒计时
    };
  },
  methods: {
    /**根据手机号得到验证码 */
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
    /**检查验证码是否正确 */
    checkVerification(values) {
      if (values != this.verifyCode) {
        return false;
      }
    },
    /**登录提交 */
    onSubmit(values) {
      console.log("submit", values);
      router.push({ name: "Mine", query: { id: values.phone } });
    },
    /**左上角返回键 */
    onClickLeft() {
      router.push("/mine");
    },
  },
};
</script>

<style scope>
a {
  text-align: center;
  display: block;
}
#phone_login_head {
  margin: 0 auto;
  width: 10rem;
  margin-top: 2rem;
}
#phone_login_form {
  margin-top: 3rem;
  padding: 0 1rem;
}
.phone_login_form_code {
  display: flex;
  justify-content: space-between;
}
.phone_login_to_code {
  color: #666666;
  text-align: end;
  padding-right: 2.6rem;
}
.phone_login_form_read {
  font-family: PingFangSC-Regular, PingFang SC;
  color: #cccccc;
}
.phone_login_form_treaty {
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #108ee9;
}
.van-nav-bar /deep/ .van-icon {
  color: #333333;
}
</style>