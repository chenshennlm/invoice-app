<template>
  <div id="index">
    <router-view />
    <div>
      <van-tabbar route v-model="active">
        <van-tabbar-item replace to="/home">
          <span>้ฆ้กต</span>
          <template #icon="props">
            <img :src="props.active ? icon.home.active : icon.home.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/mine" icon="user-o">
        <span>ๆ็</span>
          <template #icon="props">
            <img :src="props.active ? icon.mine.active : icon.mine.inactive" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      active: 0,
      icon: {
        home: {
          active: require("./assets/home-active.png"),
          inactive: require("./assets/home-inactive.png"),
        },
        mine: {
          active: require("./assets/mine-active.png"),
          inactive: require("./assets/mine-inactive.png"),
        },
      },
    };
  },
};
</script>

<style scoped>
#index{
  background-color: #F7F8FA;
  height: 100vh;
}
</style>