<template>
  <div>
    <van-form validate-first @submit="onSubmit">
      <van-nav-bar
        :title="title"
        left-text="取消"
        right-text="完成"
        @click-left="goBack"
        @click-right="saveEdit"
      >
        <template #right>
          <van-button class="form-submit" plain type="info" native-type="submit"
            >完成</van-button
          >
        </template>
      </van-nav-bar>
      <div class="center">
        <van-field
          v-if="editType == 'nickname'"
          v-model="value"
          name="nickname"
          placeholder="请输入昵称"
          maxlength="8"
          :rules="[
            {
              required: true,
            },
            {
              pattern: patterns[0],
              message: '仅可输入数字、字母（区分大小写）、中文。',
            },
          ]"
        />
        <div class="my-radio" v-if="editType == 'roleName'">
          <van-field
            v-model="value"
            name="roleId"
            placeholder="请选择角色"
            :rules="[{ required: true }]"
          >
            <template #input>
              <van-radio-group v-model="value">
                <van-cell-group>
                  <van-cell
                    title="职员"
                    clickable
                    @click="userInfo.roleId = '1'"
                  >
                    <template #right-icon>
                      <van-radio name="1" />
                    </template>
                  </van-cell>
                  <van-cell
                    title="管理员"
                    clickable
                    @click="userInfo.roleId = '2'"
                  >
                    <template #right-icon>
                      <van-radio name="2" />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-radio-group>
            </template>
          </van-field>
        </div>
      </div>
      <div v-if="editType == 'phoneNum'">
        <van-field
          v-model="value"
          name="phoneNum"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[
            { required: true },
            {
              validator: phoneNumValidator,
              message: '请输入正确的手机号',
            },
          ]"
          :disabled="isPassed"
          type="tel"
          @keyup.delete="clearContent"
          @paste="pasting"
          maxlength="11"
        />
        <van-field
          v-model="verificationCode"
          name="verificationCode"
          center
          clearable
          label="验证码"
          placeholder="请输入验证码"
          v-if="!isPassed"
          :rules="[
            { required: true },
            { validator, message: '验证码输入错误' },
          ]"
        >
          <template #extra>
            <s-identifyTool ref="code" />
          </template>
        </van-field>
        <van-field
          v-else
          v-model="sms"
          name="sms"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
          type="number"
          maxlength="4"
          :rules="[
            { required: true },
            {
              pattern: patterns[2],
              message: '请正确输入4位的短信验证码',
            },
          ]"
        >
          <template #button>
            <van-button
              v-if="!isSend"
              size="small"
              class="sms-button"
              type="primary"
              native-type="button"
              @click="sendSMS"
            >
              发送验证码
            </van-button>
            <van-button
              disabled
              v-else
              size="small"
              class="sms-button"
              type="default"
            >
              （{{ countdown }}）
            </van-button>
          </template>
        </van-field>
      </div>
      <div v-if="editType == 'Email'">
        <van-field
          v-model="value"
          name="Email"
          label="邮箱"
          placeholder="请输入邮箱"
          :rules="[
            { required: true },
            {
              validator: emailValidator,
              message: '请输入正确的邮箱',
            },
          ]"
          :disabled="isPassed"
          type="email"
          @keyup.delete="clearContent"
          @paste="pasting"
          maxlength="28"
        />
        <van-field
          v-model="verificationCode"
          name="verificationCode"
          center
          clearable
          v-if="!isPassed"
          label="验证码"
          placeholder="请输入验证码"
          :rules="[
            { required: true },
            { validator, message: '验证码输入错误' },
          ]"
        >
          <template #extra>
            <s-identifyTool ref="code" />
          </template>
        </van-field>
        <van-field
          v-else
          v-model="sms"
          center
          clearable
          label="邮箱验证码"
          placeholder="请输入邮箱验证码"
          type="number"
          maxlength="4"
          :rules="[
            { required: true },
            {
              pattern: patterns[2],
              message: '请正确输入4位的短信验证码',
            },
          ]"
        >
          <template #button>
            <van-button
              v-if="!isSend"
              size="small"
              class="sms-button"
              type="primary"
              native-type="button"
              @click="sendEmail"
            >
              发送验证码
            </van-button>
            <van-button
              disabled
              v-else
              size="small"
              class="sms-button"
              type="default"
            >
              （{{ countdown }}）
            </van-button>
          </template>
        </van-field>
      </div>
      <div v-if="editType == 'password'">
        <van-field
          label="原密码"
          v-model="oldPassword"
          name="oldPassword"
          placeholder="请输入原密码"
          maxlength="18"
          :rules="[
            {
              required: true,
            },
            {
              pattern: patterns[4],
              message: '输入6至18位的数字、大小写英文字母及特殊符号',
            },
          ]"
          type="password"
        />
        <van-field
          label="新密码"
          v-model="newPassword"
          name="newPassword"
          placeholder="请输入新密码"
          maxlength="18"
          :rules="[
            {
              required: true,
            },
            {
              pattern: patterns[4],
              message: '输入6至18位的数字、大小写英文字母及特殊符号',
            },
          ]"
          type="password"
        />
        <van-field
          label="新密码确认"
          v-model="confirmPassword"
          name="confirmPassword"
          placeholder="请输入"
          maxlength="18"
          :rules="[
            {
              required: true,
            },
            {
              pattern: patterns[4],
              message: '输入6至18位的数字、大小写英文字母及特殊符号',
            },
          ]"
          type="password"
        />
        <div class="a-link">
          <a href="123">忘记原密码，请点击</a>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
import IdentifyTool from "tool/UseIdentify";
import { Toast } from "vant";

const dataBase = [
  {
    title: "设置昵称",
    name: "nickname",
  },
  {
    title: "角色身份",
    name: "roleName",
  },
  {
    title: "绑定手机号",
    name: "phoneNum",
  },
  {
    title: "绑定邮箱",
    name: "Email",
  },
  {
    title: "修改密码",
    name: "password",
  },
];
const patterns = [
  /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, //昵称
  /1\d{10}/, //手机号
  /\d{4}/, //短信验证
  /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, //邮箱
  /[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,18}$/,//密码
];
export default {
  name: "EditInfo",
  data() {
    return {
      title: "",
      editType: -1,
      value: "",
      userInfo: {
        nickname: "",
        roleId: "",
        phoneNum: "",
      },
      roleId: "",
      verificationCode: "", //动态验证码
      sms: "", //短信/邮箱验证码
      isPassed: false, //动态验证是否通过
      isSend: false, //是否已发送短信/邮箱
      countdown: 0, //倒计时
      timer: undefined, //定时器
      patterns,

      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  },
  components: {
    "s-identifyTool": IdentifyTool,
  },
  mounted() {
    this.geData();
    console.log(this.$store.state, "state--------------");
  },

  methods: {
    geData() {
      var item = dataBase.find(
        (item) => item.name == this.$route.query.EDIT_USER_INFO
      );
      console.log(item, "item-------");
      if (item) {
        this.title = item.title;
      }
      this.editType = this.$route.query.EDIT_USER_INFO;
      this.value = unescape(this.$route.query.EDIT_VALUE);
    },
    saveEdit() {},
    onSubmit(values) {
      if (values) {
        switch (this.editType) {
          case "nickname":
            Toast.success("修改成功");
            this.$router.go(-1);
            break;
          case "roleName":
            Toast.success("修改成功");
            this.$router.go(-1);
            break;
          case "phoneNum":
            if (!this.isPassed) {
              this.isPassed = true;
              this.sendSMS();
            } else {
              Toast.success("修改成功");
              this.goBack();
            }
            break;
          case "Email":
            if (!this.isPassed) {
              this.isPassed = true;
            } else {
              Toast.success("修改成功");
              this.goBack();
            }
            break;
          case "password":
            if (this.oldPassword === "123456") {
              if (this.newPassword === this.confirmPassword) {
                Toast.success("修改成功");
                this.$router.go(-1);
              }else{
              Toast('两次密码不一致')
              }
            }else{
              Toast('原密码不正确')
            }

            break;
        }
      }
      console.log("submit", values);
    },
    //发送短信验证码
    sendSMS() {
      this.setTimer(60);
    },
    //发送邮箱验证码
    sendEmail() {
      this.setTimer(180);
    },
    setTimer(time) {
      clearInterval(this.timer);
      this.isSend = true;
      this.$store.commit("setCountdown", time);
      this.countdown = this.$store.state.countdown;
      var _this = this;
      this.timer = setInterval(function () {
        if (_this.countdown > 1) {
          _this.countdown = _this.$store.state.countdown;
        } else {
          clearInterval(_this.timer);
          _this.isSend = false;
        }
        console.log(_this.countdown, "_this.countdown--------");
      }, 1000);
    },
    //手机号输入验证
    phoneNumValidator(val) {
      return new Promise((resolve) => {
        Toast.loading("验证中...");

        setTimeout(() => {
          Toast.clear();
          resolve(
            val === unescape(this.$route.query.EDIT_VALUE) ||
              patterns[1].test(val)
          );
        }, 100);
      });
    },
    //清除手机号/邮箱输入内容
    clearContent() {
      this.value = "";
    },
    //输入框粘贴事件
    pasting(e) {
      setTimeout(() => {
        console.log(e.target.value);
        //如果粘贴的格式不正确，清除粘贴内容
        switch (this.$route.query.EDIT_USER_INFO) {
          case "phoneNum":
            if (!patterns[1].test(e.target.value)) {
              this.value = "";
            }
            break;
          case "Email":
            if (!patterns[3].test(e.target.value)) {
              this.value = "";
            }
            break;
        }
      }, 100);
    },
    //邮箱输入验证
    emailValidator(val) {
      return new Promise((resolve) => {
        Toast.loading("验证中...");

        setTimeout(() => {
          Toast.clear();
          resolve(
            val === unescape(this.$route.query.EDIT_VALUE) ||
              patterns[3].test(val)
          );
        }, 100);
      });
    },
    //异步验证
    validator(val) {
      return new Promise((resolve) => {
        Toast.loading("验证中...");

        setTimeout(() => {
          Toast.clear();
          resolve(val === this.$store.state.identifyCode);
        }, 100);
      });
    },
    //取消
    goBack() {
      clearInterval(this.timer);
      this.$store.commit("clearTimer");
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.van-nav-bar {
  position: fixed;
  width: 100%;
  top: 0;
}
.center {
  margin-top: 46px;
  padding: 16px 0;
  font-size: 1.5rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 2.5rem;
}
.my-radio .van-cell-group {
  background-color: #f7f8fa;
}
.my-radio > .van-cell {
  margin: 0 1rem;
  padding: 0;
  width: calc(100% - 2rem);
}
.my-radio .van-cell-group .van-cell:first-child {
  margin-bottom: 1rem;
}
.my-radio .van-radio-group {
  width: 100%;
}
.form-submit {
  border: 0;
}
.sms-button {
  width: 80px;
}
.a-link {
  line-height: 48px;
  padding: 0 1.5rem;
  font-size: 16px;
}
.a-link a {
  color: #108ee9;
}
</style>