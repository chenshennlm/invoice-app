<template>
  <div>
    <van-nav-bar title="忘记密码" left-arrow @click-left="onClickLeft" fixed/>
    <van-form @submit="onSubmit" style="margin-top: 5rem;">
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
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          {
            pattern: /^[0-9]{11}$/,
            message: '请正确填写手机号',
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
        <van-button block type="info" native-type="submit">修改密码</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import router from "../../router/index";
import IdentifyTool from "../../tool/UseIdentify";

export default {
  name: "ForgetWithPhone",
  data() {
    return {
      account: "",
      phone: "",
      code: "",
      identifyCode: "",//生成的code
    };
  },
  components: {
    //设置标签名
    "s-identifyTool": IdentifyTool,
  },
  methods: {
    /**图片验证码验证 */
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
    /**提交 */
    onSubmit(values){
      router.push({name:"ResetCode", query:{id:values.account,phone:values.phone}})
    },
  },
  mounted() {
    this.account = router.history.current.query.id;
    this.identifyCode =  this.$refs.code.identifyCode;
  },
};
</script>

<style>
</style>