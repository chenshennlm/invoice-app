<template>
  <div id="billDetail">
    <van-nav-bar title="详情" left-arrow @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-left" color="#666666" size="16" />
      </template>
    </van-nav-bar>
    <!-- <div id="myinvoice_head">
      <div id="myinvoice_tags">
        <div :class="[{ activedBox: typeActive == 1 }]" @click="selectType(1)">
          已签收
        </div>
        <div :class="[{ activedBox: typeActive == 2 }]" @click="selectType(2)">
          票据缺失
        </div>
        <div :class="[{ activedBox: typeActive == 3 }]" @click="selectType(3)">
          已下载
        </div>
        <div :class="[{ activedBox: typeActive == 4 }]" @click="selectType(4)">
          已完成
        </div>
      </div>
    </div> -->
    <div class="list-box">
      <van-cell center v-for="(item, index) in invoiceList" :key="index">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="me-cell-title">
            <div class="me-cell-title-left" @click.stop="show(index)">
              <img :src="item.imgurl" />
            </div>
            <div class="me-cell-title-right">
              <div>
                上传人：<span>{{ item.uploader }}</span>
              </div>
              <div>{{ stateBase[item.state].text }}</div>
            </div>
          </div>
        </template>
      </van-cell>
    </div>
    <van-image-preview
      v-model="imageShow"
      :images="images"
      @change="onChange"
      :startPosition="index"
    >
      <template v-slot:index>
        <div>{{ stateBase[invoiceList[index].state].text }}</div>
        <div>票据编号：{{ invoiceList[index].code }}</div>
      </template>
      <template v-slot:cover>
        <div class="cover-footer">
          <div
            :class="index == i ? 'img-tag__active img-tag' : 'img-tag'"
            v-for="(item, i) in images"
            :key="i"
            @click="selectImg(i)"
          >
            <img :src="item" alt="" />
          </div>
        </div>
      </template>
    </van-image-preview>
  </div>
</template>

<script>
const stateBase = [
  { text: "全部" },
  { text: "已下载" },
  { text: "票据缺失" },
  { text: "已签收" },
  { text: "已完成" },
];
export default {
  name: "BillDetail",
  data() {
    return {
      stateBase,
      invoiceList: [],
      typeActive: 1,
      imageShow: false,
      images: [],
      index: 1,
      timer: true,
      setTimer: undefined,
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.invoiceList = [
        {
          uuid: "4asd4a5s4d6a",
          imgurl:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx4.sinaimg.cn%2Fmw690%2F005DpuTtly1gtky0966rij60yi22owj602.jpg&refer=http%3A%2F%2Fwx4.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
          uploader: "张三(1**11)",
          state: "1",
          code: "202110011001",
        },
        {
          uuid: "af4s4a54d5a6s1a",
          imgurl:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww4.sinaimg.cn%2Fmw690%2F001n08Pxly1gtjmgf9dzmj60nv16e0wv02.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
          uploader: "张三(1**11)",
          state: "1",
          code: "202110011002",
        },
        {
          uuid: "ed15sd165a4d65a",
          imgurl:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww1.sinaimg.cn%2Fmw690%2F006ZKm8Ply1gtn6tyl713j30yi22o44m.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
          uploader: "张三(1**11)",
          state: "2",
          code: "202110011003",
        },
        {
          uuid: "4asd4a5s4d6a",
          imgurl:
            "https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto",
          uploader: "张三(1**11)",
          state: "1",
          code: "202110011001",
        },
        {
          uuid: "af4s4a54d5a6s1a",
          imgurl:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww4.sinaimg.cn%2Fmw690%2F001n08Pxly1gtjmgf9dzmj60nv16e0wv02.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
          uploader: "张三(1**11)",
          state: "1",
          code: "202110011002",
        },
        {
          uuid: "ed15sd165a4d65a",
          imgurl:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww1.sinaimg.cn%2Fmw690%2F006ZKm8Ply1gtn6tyl713j30yi22o44m.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
          uploader: "张三(1**11)",
          state: "2",
          code: "202110011003",
        },
        {
          uuid: "4asd4a5s4d6a",
          imgurl:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx4.sinaimg.cn%2Fmw690%2F005DpuTtly1gtky0966rij60yi22owj602.jpg&refer=http%3A%2F%2Fwx4.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
          uploader: "张三(1**11)",
          state: "1",
          code: "202110011001",
        },
        {
          uuid: "af4s4a54d5a6s1a",
          imgurl:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww4.sinaimg.cn%2Fmw690%2F001n08Pxly1gtjmgf9dzmj60nv16e0wv02.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
          uploader: "张三(1**11)",
          state: "1",
          code: "202110011002",
        },
        {
          uuid: "ed15sd165a4d65a",
          imgurl:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww1.sinaimg.cn%2Fmw690%2F006ZKm8Ply1gtn6tyl713j30yi22o44m.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
          uploader: "张三(1**11)",
          state: "2",
          code: "202110011003",
        },
        {
          uuid: "4asd4a5s4d6a",
          imgurl:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx4.sinaimg.cn%2Fmw690%2F005DpuTtly1gtky0966rij60yi22owj602.jpg&refer=http%3A%2F%2Fwx4.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
          uploader: "张三(1**11)",
          state: "1",
          code: "202110011001",
        },
        {
          uuid: "af4s4a54d5a6s1a",
          imgurl:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww4.sinaimg.cn%2Fmw690%2F001n08Pxly1gtjmgf9dzmj60nv16e0wv02.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
          uploader: "张三(1**11)",
          state: "1",
          code: "202110011002",
        },
        {
          uuid: "ed15sd165a4d65a",
          imgurl:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww1.sinaimg.cn%2Fmw690%2F006ZKm8Ply1gtn6tyl713j30yi22o44m.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
          uploader: "张三(1**11)",
          state: "2",
          code: "202110011003",
        },
      ];
    },
    selectType(type) {
      this.typeActive = type;
    },
    show(index) {
      this.index = index;
      this.imageShow = true;
      this.images = [];
      this.invoiceList.forEach((item) => {
        this.images.push(item.imgurl);
      });
    },
    onChange(index) {
      var _this = this;
      //动画结束后再更换index
      clearTimeout(this.setTimer);
      this.setTimer = setTimeout(() => {
        _this.index = index;
      }, 300);
    },
    selectImg(index) {
      if (this.timer) {
        this.timer = false;
        this.index = index;

        setTimeout(() => {
          this.timer = true;
        }, 300);
      }
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
#billDetail {
  background-color: #f7f8fa;
  height: 100vh;
  font-size: 1.5rem;
}
#myinvoice_head {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 10;
  background-color: #f7f8fa;
}

#myinvoice_tags {
  display: flex;
  align-items: center;
  height: 4.8rem;
  background-color: #fff;
  padding: 0 1.5rem;
}
#myinvoice_tags > div {
  width: 8rem;
  border: 1px #eeeeee solid;
  border-radius: 4rem;
  line-height: 3rem;
  height: auto;
  text-align: center;
  margin-right: 1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.activedBox {
  border-color: #108ee9 !important;
  background-color: #108ee9;
  color: #fff !important;
}

.list-box .van-cell:first-child {
  margin-top: 1rem;
}
.me-cell-title {
  display: flex;
}
.me-cell-title-left {
  width: 6rem;
  height: 6rem;
  padding: 0.8rem;
  background-color: #000000be;
  display: flex;
  justify-content: center;
  align-items: center;
}
.me-cell-title-left img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.me-cell-title-right {
  display: flex;
  flex-wrap: wrap;
  margin-left: 1rem;
}
.me-cell-title-right > div:first-child {
  width: 100%;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  font-size: 1.6rem;
}
.me-cell-title-right > div:last-child {
  width: 100%;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  font-size: 1.4rem;
  display: flex;
  align-items: flex-end;
}
#billDetail >>> .van-image-preview__index {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #0000005e;
  border-radius: 3px;
}
#billDetail >>> .van-image-preview__index > div {
  width: 100%;
  text-align: center;
}
#billDetail >>> .van-image-preview__image {
  height: calc(100% - 12rem);
}
#billDetail >>> .van-image-preview__cover {
  position: fixed;
  top: calc(100vh - 6rem);
  width: 100%;
  height: 6rem;
  background-color: rgba(0, 0, 0, 0.9);
}
#billDetail >>> .van-image-preview__cover .img-tag {
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
}
#billDetail >>> .van-image-preview__cover .img-tag__active {
  box-shadow: 0 0 0 2px #b8d1ff;
}
#billDetail >>> .van-image-preview__cover img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
#billDetail >>> .van-image-preview__cover .cover-footer {
  display: -webkit-box;
  width: calc(100vw - 2rem);
  height: 6rem;
  align-items: center;
  overflow: auto;
  padding: 0 1rem;
}
</style>