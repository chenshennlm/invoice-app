<template>
  <div id="first_login">
    <div id="first_login_head">
      <span>欢迎来到会计做账APP</span>
      <span class="first_login_subhead">我的身份</span>
    </div>
    <div id="first_login_body">
      <div id="first_login_body_admin">
        <div class="first_login_body_title">
          <span>我是管理员</span>
          <p>ADMINISTRATORS</p>
        </div>
        <div>
          <img :src="require('../../assets/admin.png')" />
        </div>
      </div>
      <div id="first_login_body_staff">
        <div class="first_login_body_title">
          <span>我是职员</span>
          <p>STAFF</p>
        </div>
        <div>
          <img :src="require('../../assets/staff.png')" />
        </div>
      </div>
      <div id="first_login_body_button">
        <van-button type="info" style="width: 100%">保 存</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FirstLogin",
};
</script>

<style>
#first_login {
  padding-left: 4%;
  padding-right: 4%;
  height: 100vh;
}
#first_login_head {
  font-size: 2.5rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  margin-top: 20%;
}
.first_login_subhead {
  display: block;
  margin-top: 15px;
}
#first_login_body {
  height: 100%;
  margin-top: 1.5rem;
}
#first_login_body img {
  width: 10rem;
  margin-top: 1rem;
}
#first_login_body_admin {
  height: 12rem;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background: #ffffff;
  box-shadow: 0px 2px 10px 0px rgba(105, 141, 188, 0.15);
  border-radius: 4px;
}
#first_login_body_admin :nth-last-child() {
  width: 10rem;
  height: 10rem;
  margin-top: 1rem;
}
.first_login_body_title {
  margin-top: 3rem;
  width: 20rem;
}
.first_login_body_title :nth-child(1) {
  font-size: 2.5rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 3.2rem;
}
.first_login_body_title p {
font-family: ArialMT;
color: #999999;
}
#first_login_body_staff {
  height: 12rem;
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background: #ffffff;
  box-shadow: 0px 2px 10px 0px rgba(105, 141, 188, 0.15);
  border-radius: 4px;
}
#first_login_body_button {
  margin-top: 1.5rem;
}
</style>