<template>
  <div>
    <van-nav-bar
      :title="title"
      left-text="取消"
      right-text="完成"
      @click-left="$router.go(-1)"
      @click-right="saveEdit"
    >
    </van-nav-bar>
    <div class="center">
      <van-field
        v-if="editType == 'nickname'"
        v-model="userInfo.nickname"
        placeholder="请输入昵称"
      />
      <div class="my-radio">
        <van-radio-group
          v-model="userInfo.roleId"
          v-if="editType == 'roleName'"
        >
          <van-cell-group>
            <van-cell title="职员" clickable @click="userInfo.roleId = '1'">
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell title="管理员" clickable @click="userInfo.roleId = '2'">
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </div>
    <div v-if="editType == 'phoneNum'">
      <van-field
        v-model="userInfo.phoneNum"
        label="手机号"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="verificationCode"
        center
        clearable
        label="验证码"
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button size="small" type="primary">动态密码</van-button>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
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
      verificationCode: "",
    };
  },
  mounted() {
    this.geData();
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
.my-radio .van-cell {
  margin-bottom: 1rem;
}
</style>