<template>
  <div id="invoiceEdit">
    <van-nav-bar title="待处理" left-arrow @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-left" color="#666666" size="16" />
      </template>
    </van-nav-bar>
    <div class="page-content">
      <div class="pj-item">
        <span class="pj-item-label">业务名称</span>
        <span class="pj-item-content">{{ $route.query.title }}</span>
      </div>

      <div class="my-card">
        <div class="my-card-title">未处理</div>
        <div class="my-card-content">
          <div class="my-card-item">
            <div class="my-card-item-left">
              <img
                src="https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto"
                alt=""
              />
            </div>
            <div class="my-card-item-center">
              <div>发票重开</div>
              <div>未处理</div>
            </div>
            <div class="my-card-item-right">
              <van-button type="danger">删除</van-button>
              <van-button type="info">替换</van-button>
            </div>
          </div>
          <div class="my-card-item">
            <div class="my-card-item-left">
              <img
                src="https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto"
                alt=""
              />
            </div>
            <div class="my-card-item-center">
              <div>发票重开</div>
              <div>未处理</div>
            </div>
            <div class="my-card-item-right">
              <van-button type="danger">删除</van-button>
              <van-button type="info">替换</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InvoiceEdit",
};
</script>

<style scoped>
.van-nav-bar {
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 10;
}

.pj-item {
  background-color: #f7f8fa;
  padding: 1.5rem;
}
.pj-item-label {
  font-size: 1.6rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.pj-item-content {
  font-size: 2rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.my-card {
  margin: 0 1.6rem 1.6rem 1.6rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #fff;
}
.my-card-title {
  font-size: 2rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 4.8rem;
  border-bottom: 1px #eeeeee solid;
}
.my-card-content {
  margin-top: 1rem;
}
.my-card-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
}
.my-card-item-left {
  width: 8rem;
  height: 8rem;
  background-color: #000000a2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.3rem;
}
.my-card-item-left img {
  max-width: 6rem;
  max-height: 6rem;
}
.my-card-item-center {
  width: 30%;
  min-height: 8rem;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  font-family: PingFangSC-Regular, PingFang SC;
}
.my-card-item-center > div {
  width: 100%;
}
.my-card-item-center > div:first-child {
  font-size: 1.8rem;
  color: #333333;
}
.my-card-item-center > div:last-child {
  font-size: 1.5rem;
  color: #999999;
}
.my-card-item-right button {
  height: 3.6rem;
}
</style>