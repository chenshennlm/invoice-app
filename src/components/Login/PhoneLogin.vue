<template>
  <div id="phone_login">
    <van-nav-bar title="账号登录" left-arrow @click-left="onClickLeft" fixed/>
    <div id="phone_login_head">
      <van-image
        round
        width="10rem"
        height="10rem"
        src="https://img01.yzcdn.cn/vant/leaf.jpeg"
        alt="头像"
      >
        <template v-slot:error>加载失败</template>
      </van-image>
    </div>
    <div id="phone_login_form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="phone"
          name="phone"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
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
            <s-identifyTool ref="code" />
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
      >手机号登录</a
    >
    <a class="phone_login_to_code" @click="$router.push('/login/phoneCode')"
      >验证码登录</a
    >
  </div>
</template>

<script>
import IdentifyTool from "../../tool/UseIdentify";
import { verifyAccount } from "../../action/LoginAction";
import router from '../../router/index';

export default {
  name: "PhoneLogin",
  data() {
    return {
      phone: "",
      password: "",
      code: "",
      radio: "",
      identifyCode: "",
    };
  },
  components: {
    //设置标签名
    "s-identifyTool": IdentifyTool,
  },
  methods: {
    //图片验证码验证
    checkVerification(values) {
      if (this.identifyCode != values) {
        this.$refs.code.refreshCode();
        return false;
      }
    },
    /**登录提交 */
    onSubmit(values) {
      console.log("submit", values);
     verifyAccount(values.phone, values.password).then((res) => {
        console.log(res);
        if(res.data.password != values.password) {
          Toast.fail({message:'密码错误', position: 'top'});
        } else {
          router.push({name: "Mine", query:{id:values.phone}});
        }
      });
    },
    /**左上角返回键 */
    onClickLeft() {
      router.push('/mine');
    },
  },
  mounted(){
    this.identifyCode = this.$refs.code.identifyCode;
  }
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
  margin-top: 5rem;
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