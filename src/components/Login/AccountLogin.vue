<template>
  <div id="account_login">
    <van-nav-bar title="账号登录" left-arrow @click-left="onClickLeft" />
    <div id="account_login_head">
      <van-image
        round
        width="10rem"
        height="10rem"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
        alt="头像"
      >
        <template v-slot:error>加载失败</template>
      </van-image>
    </div>
    <div id="account_login_form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="账号"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账号' }]"
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
            <van-radio-group v-model="radio" direction="horizontal" @change="radioChange">
              <van-radio name="1">
                  <span class="account_login_form_read">我已阅读</span>
                  <span class="account_login_form_treaty">《会计APP用户协议》</span>
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
    <a style="color: #108ee9" @click="$router.push('/login/phone')"
      >手机号登录</a
    >
    <div id="account_login_foot">
      <div><a>忘记密码？</a></div>
      <div><a>立即注册</a></div>
    </div>
  </div>
</template>

<script>
import router from "../../router/index";

export default {
  name: "AccountLogin",
  data() {
    return {
      username: "",
      password: "",
      code: "",
      radio: "",
    };
  },
  methods: {
      radioChange(e){
          console.log('--e', e);
      },
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
#account_login_head {
  margin: 0 auto;
  width: 10rem;
  margin-top: 2rem;
}
#account_login_form {
  margin-top: 5rem;
  padding: 0 1rem;
}
.account_login_form_code {
  display: flex;
  justify-content: space-between;
}
#account_login_foot {
  display: flex;
  justify-content: space-between;
  padding: 0 2.6rem;
  margin-top: 1rem;
  color: #666666;
}
.account_login_form_read{
    
font-family: PingFangSC-Regular, PingFang SC;
color: #CCCCCC;
}
.account_login_form_treaty{
    
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #108EE9;
}
.van-nav-bar /deep/ .van-icon {
  color: #333333;
}
</style>