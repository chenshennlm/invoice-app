<template>
  <div>
    <router-view />
    <div>
      <van-tabbar route v-model="active">
        <van-tabbar-item replace to="/home">
          <span>首页</span>
          <template #icon="props">
            <img :src="props.active ? icon.home.active : icon.home.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/mine" icon="user-o">
        <span>我的</span>
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
          active: "/static/home-active.png",
          inactive: "/static/home-inactive.png",
        },
        mine: {
          active: "/static/mine-active.png",
          inactive: "/static/mine-inactive.png",
        },
      },
    };
  },
};
</script>

<style scoped>
</style>