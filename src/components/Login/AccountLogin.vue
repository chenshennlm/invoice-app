<template>
  <div id="account_login">
    <van-nav-bar title="账号登录" left-arrow @click-left="onClickLeft" fixed/>
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
          name="username"
          label="账号"
          placeholder="请输入账号"
          :rules="[
            { required: true, message: '请填写密码' },
            {
              pattern: /^[0-9a-zA-Z]{6,18}$/,
              message: '限定位数6-18位，仅可输入数字、字母(区分大小写)',
            },
          ]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="code"
          name="code"
          label="验证码"
          placeholder="请输入验证码"
          :rules="[
            { required: true, message: '请填写验证码' },
            { validator: this.checkVerification, message:'验证码错误' },
          ]"
        >
          <template #button>
            <s-identifyTool ref="code" />
          </template>
        </van-field>
        <van-field name="isRead" :border="false"
          :rules="[{required: true, message: '请勾选' }]"
        >
          <template #input>
            <van-radio-group
              v-model="radio"
              direction="horizontal"
              @change="radioChange"
            >
              <van-radio name="1" @click="radioClick">
                <span class="account_login_form_read">我已阅读</span>
                <span
                  class="account_login_form_treaty"
                  @click="$router.push('/treaty')"
                  >《会计APP用户协议》</span
                >
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
      <div><a @click="$router.push('/forget')">忘记密码？</a></div>
      <div><a @click="$router.push('/register')">立即注册</a></div>
    </div>
  </div>
</template>

<script>
import router from "../../router/index";
import { verifyAccount } from "../../action/LoginAction";
import IdentifyTool from "../../tool/UseIdentify";
import  {Toast} from 'vant';

export default {
  name: "AccountLogin",
  data() {
    return {
      username: "",
      password: "",
      code: "",
      radio: "",
      radioState: 0, //0:初始未选中 1：选中了
      identifyCode: "",
    };
  },
  components: {
    //设置标签名
    "s-identifyTool": IdentifyTool,
  },
  methods: {
    radioClick(e) {
      console.log("e--", e);
      //this.radioState = this.radioState == 0 ? 1 : 0;
      //this.radio = this.radioState + "";
    },
    radioChange(e) {
      console.log("--e", e);
    },
    //图片验证码验证
    checkVerification(values, rule) {
      if (this.identifyCode != values) {
           this.$refs.code.refreshCode();
           return false;
        }
    },
    /**登录提交 */
    onSubmit(values) {
      verifyAccount(values.username, values.password).then((res) => {
        console.log(res);
        if(res.data.password != values.password) {
          Toast.fail({message:'密码错误', position: 'top'});
        } else {
          router.push({name: "Mine", query:{id:values.username}});
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
#account_login_head {
  margin: 0 auto;
  width: 10rem;
  margin-top: 5rem;
}
#account_login_form {
  margin-top: 3rem;
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
.account_login_form_read {
  font-family: PingFangSC-Regular, PingFang SC;
  color: #cccccc;
}
.account_login_form_treaty {
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #108ee9;
}
.van-nav-bar /deep/ .van-icon {
  color: #333333;
}
</style>