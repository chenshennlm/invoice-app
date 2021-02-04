<template>
  <div id="forget_code">
    <van-nav-bar title="忘记密码" left-arrow @click-left="onClickLeft" fixed/>
    <div>
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
          :rules="[{ required: true, message: '请填写验证码' }]"
        >
          <template #button>
            <van-button
              size="small"
              type="default"
              @click="getCode"
              native-type="button"
              >动态密码</van-button
            >
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button block type="info" native-type="submit"
            >修改密码</van-button
          >
        </div>
      </van-form>
    </div>
    <a style="color: #108ee9" @click="$router.push('/forget')">账号找回</a>
  </div>
</template>

<script>
import router from "../../router/index";

export default {
  name: "ForgetByPhone",
  data() {
    return {
      phone: "",
      code: "",
    };
  },
  methods: {
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
      router.push("/forget/reset");
    },
  },
  mounted(){
    this.username = router.history.current.query.id;
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