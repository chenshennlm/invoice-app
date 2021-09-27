<template>
  <div>
    <van-nav-bar title="设置" left-arrow @click-left="$router.push('/mine')">
      <template #left>
        <van-icon name="arrow-left" color="#666666" size="16" />
      </template>
    </van-nav-bar>
    <div v-if="userInfo">
      <van-cell-group>
        <van-cell
          is-link
          title="昵称"
          :value="userInfo.nickname"
          @click="edit('nickname')"
        />
        <van-cell
          is-link
          title="我的角色身份"
          :value="userInfo.roleName"
          @click="edit('roleName')"
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell
          is-link
          title="绑定手机号"
          :value="userInfo.phoneNum"
          @click="edit('phoneNum')"
        />
        <van-cell
          is-link
          title="绑定邮箱"
          value-class="compress-text"
          :value="userInfo.Email"
          @click="edit('Email')"
        />
        <van-cell is-link title="修改密码" @click="edit('password')" />
      </van-cell-group>
      <van-cell is-link title="用户协议" @click="openPage('/mine/agreement')" />
      <van-cell is-link title="关于" @click="openPage('/mine/aboutUs')" />
    </div>
    <div class="box-in-bottom">
      <van-button color="#FF3B30" size="large">退出登录</van-button>
    </div>
  </div>
</template>

<script>
const titleBase = [
  "昵称",
  "我的角色身份",
  "绑定手机号",
  "邮箱绑定",
  "修改密码",
  "关于",
];
export default {
  name: "Message",
  data() {
    return {
      userInfo: undefined,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.userInfo = {
        uuid: "a4fsa64f6a3d6a5",
        nickname: "周大侠",
        roleName: "管理员",
        phoneNum: "17766665555",
        Email: "123456789@caidao8.com",
      };
    },
    edit(type) {
      this.$router.push({
        name: "EditInfo",
        query: { EDIT_USER_INFO: type, EDIT_VALUE: escape(this.userInfo[type]) },
      });
    },
    openPage(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.van-nav-bar__left {
  color: #666666;
}
.van-nav-bar__right {
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.van-cell-group {
  margin-bottom: 1rem;
}
.box-in-bottom {
  position: fixed;
  width: calc(100% - 32px);
  bottom: 0;
  padding: 8px 16px;
  background-color: #fff;
}
.compress-text {
  min-width: 70%;
}
.compress-text span {
  display: inline-block;
  word-break: break-all;
}
</style>