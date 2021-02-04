<template>
  <div id="forget_code">
    <van-nav-bar title="忘记密码" left-arrow @click-left="onClickLeft" fixed />
    <div style="margin-top: 5rem;">
      <van-form @submit="onSubmit">
        <van-field
          v-model="account"
          name="account"
          label="登录账号"
          placeholder="请输入登录账号"
          :rules="[
            { required: true, message: '请填写登录账号' },
            {
              pattern: /^[0-9a-zA-Z]{6,18}$/,
              message: '限定位数6-18位，仅可输入数字、字母(区分大小写)',
            },
          ]"
        />
        <van-field
          v-model="code"
          name="code"
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
        <div style="margin: 16px">
          <van-button block type="info" native-type="submit"
            >密码重置</van-button
          >
        </div>
      </van-form>
    </div>
    <a style="color: #108ee9" @click="$router.push('/forget/phone')"
      >手机号找回</a
    >
    <div id="forget_code_foot">
      <van-icon color="#F5A70C" name="info-o" />
      <span
        >若登录账号未绑定手机号，则联系您的记账机构管理员或拨打
        XXXXX重置密码</span
      >
    </div>
  </div>
</template>

<script>
import router from "../../router/index";
import IdentifyTool from "../../tool/UseIdentify";
import { checkAccount } from "../../action/ForgetAction";
import { Toast } from "vant";

export default {
  name: "ForgetCode",
  data() {
    return {
      account: "",
      code: "",
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
    /**左上角返回键 */
    onClickLeft() {
      router.push("/login/account");
    },
    /**得到验证码 */
    getCode() {
      console.log("eee");
    },
    /**提交表单 */
    onSubmit(values) {
      console.log("submit", values);
      checkAccount(values.account).then((res) => {
        console.log("---res", res);
        if (res.state != 1) {
          Toast.fail("账号不存在");
        } else {
          router.push({
            name: "ForgetWithPhone",
            query: { id: values.account },
          });
        }
      });
    },
  },
  mounted() {
    this.identifyCode = this.$refs.code.identifyCode;
  },
};
</script>

<style scoped>
a {
  text-align: center;
  display: block;
}
#forget_code_foot {
  padding: 1rem;
}
#forget_code_foot span {
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 36px;
}
.van-nav-bar /deep/ .van-icon {
  color: #333333;
}
</style>