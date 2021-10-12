<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
import { Toast } from "vant";
import { plusReady } from "./tool/tool";

export default {
  name: "App",
  data() {
    return {};
  },
  create() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  mounted() {
    console.log(window.plus, "-----------------");
    if (window.plus) {
      plusReady("dark");
    } else {
      document.addEventListener("plusready", plusReady, false);
    }
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f7f8fa;
  min-height: calc(100vh - 4.6rem);
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
.van-nav-bar {
  padding-top: 2.4rem;
}
.van-nav-bar__content {
  height: 4.8rem;
}
.van-cell {
  font-size: 1.6rem;
  line-height: 2.8rem;
}
</style>
