<template>
  <div id="invoiceEditRecord">
    <van-nav-bar title="修改记录" left-arrow @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-left" color="#666666" size="16" />
      </template>
    </van-nav-bar>
    <div class="list-box">
      <div class="my-card" v-for="(item, index) in recordList" :key="index">
        <div class="my-card-header">{{ item.createTime }}</div>
        <div class="my-card-center">
          <div class="me-cell-title-left" @click.stop="show(item)">
            <img :src="item.imgUrl" />
          </div>
          <div class="me-cell-title-center">
            <div>
              上传人：<span>{{ item.remarks }}</span>
            </div>
            <div>{{ item.uploader }}</div>
          </div>
          <div class="me-cell-title-right">{{ item.operation }}</div>
        </div>
        <!-- <van-cell
          center
          :to="'InvoiceEditRecord?id=' + item.uuid"
          value-class="compress-text"
        >
          <template #title>
            <div class="me-cell-title">
              <div class="me-cell-title-left" @click.stop="show(item)">
                <img :src="item.imgUrl" />
              </div>
              <div class="me-cell-title-right">
                <div>
                  上传人：<span>{{ item.remarks }}</span>
                </div>
                <div>{{ item.uploader }}</div>
              </div>
            </div>
          </template>
          <template #default> {{ item.operation }} </template>
        </van-cell> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  name: "InvoiceEditRecord",
  data() {
    return {
      recordList: [],
    };
  },

  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.recordList = [
        {
          uuid: "a4fa454d6as4d56",
          imgUrl:
            "https://img-baofun.zhhainiao.com/market/133/97ba6b60662ab4f31ef06cdf5a5f8e94_preview.jpg",
          createTime: "2021/09/29",
          remarks:
            "这个图片好不好看这个图片好不好看这个图片好不好看这个图片好不好看这个图片好不好看",
          uploader: "张三(1**11)",
          operation: "新增",
        },
        {
          uuid: "a4fa454d6as4d56",
          imgUrl:
            "https://img-baofun.zhhainiao.com/market/133/97ba6b60662ab4f31ef06cdf5a5f8e94_preview.jpg",
          createTime: "2021/09/29",
          remarks: "这个图片好不好看",
          uploader: "张三(1**11)",
          operation: "退回",
        },
        {
          uuid: "a4fa454d6as4d56",
          imgUrl:
            "https://img-baofun.zhhainiao.com/market/133/97ba6b60662ab4f31ef06cdf5a5f8e94_preview.jpg",
          createTime: "2021/09/29",
          remarks: "这个图片好不好看",
          uploader: "张三(1**11)",
          operation: "通过",
        },
      ];
    },
    show(param) {
      ImagePreview([param.imgUrl]);
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
.list-box .van-cell:first-child {
  margin-top: 1rem;
}
.my-card {
  margin: 1.5rem;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 0.5rem;
}
.my-card-header {
  line-height: 2.4rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  font-size: 1.5rem;
}
.my-card-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.my-card-center .me-cell-title-left {
  width: 8rem;
  height: 8rem;
  padding: 0.5rem;
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
  flex-grow: 1;
}
.me-cell-title-center {
  width: 50%;
  min-height: 8rem;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
.me-cell-title-right {
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  font-size: 1.5rem;
}
.me-cell-title-center > div:first-child {
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  font-size: 1.6rem;
}
.me-cell-title-center > div:last-child {
  width: 100%;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  font-size: 1.4rem;
  display: flex;
  align-items: flex-end;
}

.compress-text {
  max-width: 13%;
}
</style>