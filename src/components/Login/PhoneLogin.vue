<template>
  <div id="phone_login">
    <van-nav-bar title="账号登录" left-arrow @click-left="onClickLeft" />
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
          v-model="username"
          name="手机号"
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
          :rules="[{ required: true, message: '请填写验证码' }]"
        >
          <template #button>
            <van-button size="small" type="default" @click="getCode"
              >动态密码</van-button
            >
          </template>
        </van-field>
        <van-field name="isRead" :border="false">
          <template #input>
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio name="1"
                ><span>我已阅读</span
                ><span>《会计APP用户协议》</span></van-radio
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
    <a style="color: #108ee9" @click="$router.push('/login/phone')"
      >手机号登录</a
    >
    <a class="phone_login_to_code" @click="$router.push('/login/phone')"
      >验证码登录</a
    >
  </div>
</template>

<script>
export default {
  name: "PhoneLogin",
  data() {
    return {
      username: "",
      password: "",
      code: "",
      radio: "1",
    };
  },
  methods: {
    getCode() {
      console.log("eee");
    },
    /**登录提交 */
    onSubmit(values) {
      console.log("submit", values);
    },
    /**左上角返回键 */
    onClickLeft() {
      console.log("---fff");
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
  margin-top: 5rem;
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
.van-nav-bar /deep/ .van-icon {
  color: #333333;
}
</style>