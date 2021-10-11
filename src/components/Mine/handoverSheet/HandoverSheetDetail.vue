<template>
  <div class="handoverSheet">
    <van-nav-bar title="交接单详情" left-arrow @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-left" color="#666666" size="16" />
      </template>
    </van-nav-bar>
    <div class="page-content">
      <div class="my-card first-card">
        <div>
          <span class="pj-item-label">业务名称</span>
          <span class="pj-item-content">{{ businessInfo.title }}</span>
        </div>
      </div>
      <van-steps direction="vertical" :active="0">
        <van-step v-for="(item, index) in dataList" :key="index">
          <h3>【{{ stateBase[item.state].text }}】</h3>
          <p v-if="item.state == 2" @click="showDefect(item.defectImgs)">
            备注：实收{{ item.actuallyCount }}张，缺失<span
              style="color: #0099ff"
            >
              {{ item.defectCount }}
            </span>
            张
          </p>
          <p>{{ item.createTime }}</p>
        </van-step>
        <!-- <van-step>
          <h3>【城市】物流状态2</h3>
          <p>2016-07-11 10:00</p>
        </van-step>
        <van-step>
          <h3>快件已发货</h3>
          <p>2016-07-10 09:30</p>
        </van-step> -->
      </van-steps>
    </div>
    <div class="page-footer">
      <div class="submit-botton" @click="showBill">
        <van-button type="info">查看票据</van-button>
      </div>
    </div>
    <van-image-preview v-model="imageShow" :images="images" @change="onChange">
      <template v-slot:index>
        <div>缺失票据</div>
        <div>第{{ index + 1 }}张</div>
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
  name: "handoverSheet",
  data() {
    return {
      stateBase,
      dataList: [],
      imageShow: false,
      images: [],
      index: 0,
      businessInfo: undefined,
    };
  },
  created() {
    this.initData();
  },
  mounted() {
    this.getData();
  },
  methods: {
    initData() {
      this.columns = ["票据重开", "图片模糊", "其他"];
      this.businessInfo = {
        uuid: "4d6a54a564fa56s",
        title: "2021年9月差旅报销",
        count: "1",
        organizationName: "机构名称",
        reviewer: "周大侠",
        reviewerId: "y4jf561hn3fd1g6s4f65",
        declarant: "张三",
        account: "123456",
        isValid: "1",
        businessDate: "2080/10/01",
        reason: "差旅费",
      };
    },
    getData() {
      this.dataList = [
        {
          uuid: "t4r6gs564fse56f",
          createTime: "2020/11/29 15:30",
          state: 4,
          actuallyCount: 12, //实收
          defectCount: 0, //缺失
          defectImgs: [],
        },
        {
          uuid: "t4r6gs564fse56f",
          createTime: "2020/11/29 15:30",
          state: 3,
          actuallyCount: 12, //实收
          defectCount: 0, //缺失
          defectImgs: [],
        },
        {
          uuid: "t4r6gs564fse56f",
          createTime: "2020/11/29 15:30",
          state: 2,
          actuallyCount: 10, //实收
          defectCount: 2, //缺失
          defectImgs: [
            "https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto",
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2015%2F676%2F826%2F2357628676_1625918498.jpg",
          ],
        },
        {
          uuid: "s5s1d5as1d5as1",
          createTime: "2020/11/28 15:30",
          state: 1,
          actuallyCount: 12, //实收
          defectCount: 0, //缺失
          defectImgs: [],
        },
        {
          uuid: "t4r6gs564fse56f",
          createTime: "2020/11/29 15:30",
          state: 4,
          actuallyCount: 12, //实收
          defectCount: 0, //缺失
          defectImgs: [],
        },
        {
          uuid: "t4r6gs564fse56f",
          createTime: "2020/11/29 15:30",
          state: 3,
          actuallyCount: 12, //实收
          defectCount: 0, //缺失
          defectImgs: [],
        },
        {
          uuid: "t4r6gs564fse56f",
          createTime: "2020/11/29 15:30",
          state: 2,
          actuallyCount: 10, //实收
          defectCount: 2, //缺失
          defectImgs: [
            "https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto",
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2015%2F676%2F826%2F2357628676_1625918498.jpg",
          ],
        },
        {
          uuid: "s5s1d5as1d5as1",
          createTime: "2020/11/28 15:30",
          state: 1,
          actuallyCount: 12, //实收
          defectCount: 0, //缺失
          defectImgs: [],
        },
      ];
    },
    showDefect(param) {
      this.imageShow = true;
      this.images = param;
    },
    onChange(index) {
      this.index = index;
    },
    showBill() {
      this.$router.push({
        name: "BillDetail",
        query: { id: this.businessInfo.uuid },
      });
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
  margin-bottom: 6rem;
}
.page-content h3 {
  margin: 0;
}
.page-footer {
  padding: 0 1rem;
  position: fixed;
  bottom: 0;
  width: calc(100% - 2rem);
  height: 5.8rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 -1px 4px #d8d8d8;
  z-index: 5;
}
.submit-botton {
  /* width: calc(100% - 21rem); */
  flex-grow: 1;
}
.submit-botton button {
  width: 100%;
}
.handoverSheet >>> .van-image-preview__index {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #0000005e;
  border-radius: 3px;
}
.handoverSheet >>> .van-image-preview__index > div {
  width: 100%;
  text-align: center;
}
.my-card {
  margin-bottom: 1.6rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #fff;
}
.pj-item-label {
  display: inline-block;
  font-size: 1.6rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  margin-right: 1rem;
  width: 7rem;
  text-align: end;
}
.pj-item-content {
  font-size: 2rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
</style>