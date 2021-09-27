<template>
  <div>
    <van-nav-bar title="关于" left-arrow @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-left" color="#666666" size="16" />
      </template>
    </van-nav-bar>
    <div class="center">
      <van-cell title="APP名称" value="会计做账APP" />
      <van-cell title="版本号" value="1.0.0" />
      <van-cell title="技术支持" value="浙江衡信教育科技有限公司" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
  data() {
    return {
      content: "",
    };
  },
  mounted() {},
  methods: {},
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
  padding: 16px;
  font-size: 1.5rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 2.5rem;
  background-color: #fff;
}
.van-cell__value {
  min-width: 70%;
}
</style>