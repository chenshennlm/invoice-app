<template>
  <div id="forget_code">
    <van-nav-bar title="用户注册" left-arrow @click-left="onClickLeft" fixed/>
    <div style="margin-top: 5rem;">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="登录账号"
          label="登录账号"
          placeholder="请输入登录账号"
          :rules="[{ required: true, message: '请输入登录账号' }]"
        />
        <van-field
          v-model="phone"
          name="登录密码"
          label="登录密码"
          placeholder="请输入登录密码"
          :rules="[{ required: true, message: '请输入登录密码' }]"
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
        <van-field
          name="isRead"
          :border="false"
          :rules="[{ required: true, message: '请勾选' }]"
        >
          <template #input>
            <van-radio-group
              v-model="radio"
              direction="horizontal"
              @change="radioChange"
            >
              <van-radio name="1">
                <span class="register_form_read">我已阅读</span>
                <span
                  class="register_form_treaty"
                  @click="$router.push('/treaty')"
                  >《会计APP用户协议》</span
                >
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button block type="info" native-type="submit">注册</van-button>
        </div>
      </van-form>
    </div>
    <a style="color: #108ee9" @click="$router.push('/register/phone')"
      >手机号注册</a
    >
  </div>
</template>

<script>
import router from "../../router/index";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      phone: "",
      newcode: "",
      checkNewcode: "",
      code: "",
      radio: "",
    };
  },
  methods: {
    /**单选框勾选 */
    radioChange(e) {
      console.log("--e", e);
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