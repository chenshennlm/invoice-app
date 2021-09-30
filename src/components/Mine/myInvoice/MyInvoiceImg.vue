<template>
  <div id="myInvoiceImg">
    <van-nav-bar title="我的票据" left-arrow @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-left" color="#666666" size="16" />
      </template>
    </van-nav-bar>
    <div class="page-content">
      <div class="pj-item">
        <span class="pj-item-label">业务名称</span>
        <span class="pj-item-content">{{ $route.query.title }}</span>
      </div>
      <div class="pj-item">
        <span class="box-title">票据合计（{{ total }}张）</span>
      </div>
      <div class="pictures">
        <div v-for="(item, index) in imgList" :key="index" @click="show(item)">
          <img :src="item.imgUrl" alt="" />
        </div>
        <!-- <div>
          <img
            src="https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto"
            alt=""
          />
        </div> -->
      </div>
    </div>
    <van-image-preview v-model="imageShow" :images="images">
      <template v-slot:index>
        <div>{{ imgInfo.state }}</div>
        <div>票据编号：{{ imgInfo.code }}</div>
      </template>
    </van-image-preview>
  </div>
</template>

<script>
export default {
  name: "MyInvoiceImg",
  data() {
    return {
      imgList: [],
      total: 0,
      imageShow: false,
      images: [],
      imgInfo: {},
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.imgList = [
        {
          uuid: "4asd4a5s4d6a",
          imgUrl:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx4.sinaimg.cn%2Fmw690%2F005DpuTtly1gtky0966rij60yi22owj602.jpg&refer=http%3A%2F%2Fwx4.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
          uploader: "张三(1**11)",
          state: "已报送",
          code: "202110011001",
        },
        {
          uuid: "af4s4a54d5a6s1a",
          imgUrl:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww4.sinaimg.cn%2Fmw690%2F001n08Pxly1gtjmgf9dzmj60nv16e0wv02.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
          uploader: "张三(1**11)",
          state: "未报送",
          code: "202110011002",
        },
        {
          uuid: "ed15sd165a4d65a",
          imgUrl:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww1.sinaimg.cn%2Fmw690%2F006ZKm8Ply1gtn6tyl713j30yi22o44m.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
          uploader: "张三(1**11)",
          state: "已报送",
          code: "202110011003",
        },
        {
          uuid: "ed15sd165a4d65a",
          imgUrl:
            "https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto",
          uploader: "张四(1**11)",
          state: "未报送",
          code: "202110011004",
        },
      ];
      this.total = this.imgList.length;
    },
    show(param) {
      this.imageShow = true;
      this.images = [param.imgUrl];
      this.imgInfo = param;
    },
  },
};
</script>

<style scoped>
.van-nav-bar {
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 10;
}
.page-content {
  padding: 1.5rem;
  background-color: #fff;
}
.pj-item {
  line-height: 4.8rem;
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
.box-title {
  font-size: 2rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.pictures {
  display: flex;
  flex-wrap: wrap;
}
.pictures > div {
  width: 7rem;
  height: 7rem;
  margin: 0.5rem;
  background-color: #000000a2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.3rem;
}
.pictures img {
  max-width: 6rem;
  max-height: 6rem;
}
#myInvoiceImg >>> .van-image-preview__index {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #0000005e;
  border-radius: 3px;
}
#myInvoiceImg >>> .van-image-preview__index > div {
  width: 100%;
  text-align: center;
}
</style>