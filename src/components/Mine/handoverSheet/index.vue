<template>
  <div class="handoverSheet">
    <van-nav-bar title="交接单管理" left-arrow @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-left" color="#666666" size="16" />
      </template>
    </van-nav-bar>

    <div class="page-content">
      <div class="search-bar">
        <!-- <van-cell title="" is-link arrow-direction="down" value="内容" /> -->
        <van-cell
          @click="popupShow = true"
          is-link
          center
          arrow-direction="down"
        >
          <van-field
            v-model="searchData"
            readonly
            label="快捷查询"
            name="searchData"
            placeholder="年/月/状态"
          />
        </van-cell>
        <van-popup
          v-model="popupShow"
          position="bottom"
          get-container="#app"
          :style="{ height: '50%' }"
          round
        >
          <van-picker
            title="年份/月份/状态"
            show-toolbar
            :columns="columns"
            @cancel="popupShow = false"
            @confirm="onConfirm"
          />
        </van-popup>
      </div>
      <div class="remark">
        注：已下载为下载图像票据，已签收为收到实物票据核对无误
      </div>
      <div>
        <div class="my-card" v-if="listI.length > 0">
          <div class="my-card-title">已下载</div>
          <div class="my-card-content">
            <div
              class="my-card-item"
              v-for="(item, index) in listI"
              :key="index"
              @click="showDetail(item)"
            >
              <div class="my-card-item-center">
                <div>
                  <div>{{ item.title }}</div>
                  <div class="title-explain">{{ item.declarant }}</div>
                </div>
                <div>时间：{{ item.updateTime }}</div>
                <div>票据数：{{ item.count }}张</div>
              </div>
            </div>
          </div>
        </div>
        <div class="my-card" v-if="listII.length > 0">
          <div class="my-card-title">票据缺失</div>
          <div class="my-card-content">
            <div
              class="my-card-item"
              v-for="(item, index) in listII"
              :key="index"
            >
              <div class="my-card-item-center">
                <div>
                  <div>{{ item.title }}</div>
                  <div class="title-explain">{{ item.declarant }}</div>
                </div>
                <div>时间：{{ item.updateTime }}</div>
                <div>票据数：{{ item.count }}张</div>
              </div>
            </div>
          </div>
        </div>
        <div class="my-card" v-if="listIII.length > 0">
          <div class="my-card-title">已签收</div>
          <div class="my-card-content">
            <div
              class="my-card-item"
              v-for="(item, index) in listIII"
              :key="index"
            >
              <div class="my-card-item-center">
                <div>
                  <div>{{ item.title }}</div>
                  <div class="title-explain">{{ item.declarant }}</div>
                </div>
                <div>时间：{{ item.updateTime }}</div>
                <div>票据数：{{ item.count }}张</div>
              </div>
            </div>
          </div>
        </div>
        <div class="my-card" v-if="listIV.length > 0">
          <div class="my-card-title">已完成</div>
          <div class="my-card-content">
            <div
              class="my-card-item"
              v-for="(item, index) in listIV"
              :key="index"
            >
              <div class="my-card-item-center">
                <div>
                  <div>{{ item.title }}</div>
                  <div class="title-explain">{{ item.declarant }}</div>
                </div>
                <div>时间：{{ item.updateTime }}</div>
                <div>票据数：{{ item.count }}张</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
const columns = [
  {
    text: "全部",
    children: [
      {
        text: "全部",
        children: stateBase,
      },
    ],
  },
  {
    text: "2018",
    children: [
      {
        text: "全部",
        children: stateBase,
      },
      {
        text: "1",
        children: stateBase,
      },
      {
        text: "3",
        children: stateBase,
      },
    ],
  },
  {
    text: "2020",
    children: [
      {
        text: "全部",
        children: stateBase,
      },
      {
        text: "2",
        children: stateBase,
      },
      {
        text: "4",
        children: stateBase,
      },
    ],
  },
];
export default {
  name: "handoverSheet",
  data() {
    return {
      stateBase,
      columns,
      dataList: [],
      listI: [], //已下载
      listII: [], //票据缺失
      listIII: [], //已签收
      listIV: [], //已完成
      popupShow: false,
      searchData: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //搜索
    onConfirm(value) {
      console.log(value);
      if (value[0] < 10) {
        value[0] = "0" + value[0];
      }
      if (value[1] < 10) {
        value[1] = "0" + value[1];
      }
      this.searchData = value.join("/");
      this.popupShow = false;
    },
    getData() {
      this.dataList = this.dataList.concat([
        {
          uuid: "asd6a5s464fs5d6as1",
          title: "2020年11月差旅报销",
          count: "1",
          organizationName: "机构名称",
          reviewer: "周大侠",
          reviewerId: "y4jf561hn3fd1g6s4f65",
          declarant: "张三",
          account: "111222",
          isValid: "1",
          updateTime: "2020/11/30",
          state: 1,
        },
        {
          uuid: "asd6a5s464fs5d6as1",
          title: "2020年11月差旅报销",
          count: "1",
          organizationName: "机构名称",
          reviewer: "周大侠",
          reviewerId: "y4jf561hn3fd1g6s4f65",
          declarant: "张三",
          account: "111222",
          isValid: "1",
          updateTime: "2020/11/30",
          state: 1,
        },
        {
          uuid: "asd6a5s464fs5d6as1",
          title: "2020年11月差旅报销",
          count: "1",
          organizationName: "机构名称",
          reviewer: "周大侠",
          reviewerId: "y4jf561hn3fd1g6s4f65",
          declarant: "张三",
          account: "111222",
          isValid: "1",
          updateTime: "2020/11/30",
          state: 1,
        },
        {
          uuid: "asd6a5s464fs5d6as1",
          title: "2020年11月差旅报销",
          count: "1",
          organizationName: "机构名称",
          reviewer: "周大侠",
          reviewerId: "y4jf561hn3fd1g6s4f65",
          declarant: "张三",
          account: "111222",
          isValid: "1",
          updateTime: "2020/11/30",
          state: 1,
        },
        {
          uuid: "asd6a5s464fs5d6as1",
          title: "2020年11月差旅报销",
          count: "1",
          organizationName: "机构名称",
          reviewer: "周大侠",
          reviewerId: "y4jf561hn3fd1g6s4f65",
          declarant: "张三",
          account: "111222",
          isValid: "1",
          updateTime: "2020/11/30",
          state: 1,
        },
        {
          uuid: "asd6a5s464fs5d6as1",
          title: "2020年11月差旅报销",
          count: "1",
          organizationName: "机构名称",
          reviewer: "周大侠",
          reviewerId: "y4jf561hn3fd1g6s4f65",
          declarant: "张三",
          account: "111222",
          isValid: "1",
          updateTime: "2020/11/30",
          state: 1,
        },
        {
          uuid: "asd6a5s464fs5d6as1",
          title: "2020年11月差旅报销",
          count: "1",
          organizationName: "机构名称",
          reviewer: "周大侠",
          reviewerId: "y4jf561hn3fd1g6s4f65",
          declarant: "张三",
          account: "111222",
          isValid: "1",
          updateTime: "2020/11/30",
          state: 1,
        },
        {
          uuid: "asd6a5s464fs5d6as1",
          title: "2020年11月差旅报销",
          count: "1",
          organizationName: "机构名称",
          reviewer: "周大侠",
          reviewerId: "y4jf561hn3fd1g6s4f65",
          declarant: "张三",
          account: "111222",
          isValid: "1",
          updateTime: "2020/11/30",
          state: 2,
        },
        {
          uuid: "asd6a5s464fs5d6as1",
          title: "2020年11月差旅报销",
          count: "1",
          organizationName: "机构名称",
          reviewer: "周大侠",
          reviewerId: "y4jf561hn3fd1g6s4f65",
          declarant: "张三",
          account: "111222",
          isValid: "1",
          updateTime: "2020/11/30",
          state: 3,
        },
        {
          uuid: "asd6a5s464fs5d6as1",
          title: "2020年11月差旅报销",
          count: "1",
          organizationName: "机构名称",
          reviewer: "周大侠",
          reviewerId: "y4jf561hn3fd1g6s4f65",
          declarant: "张三",
          account: "111222",
          isValid: "1",
          updateTime: "2020/11/30",
          state: 4,
        },
        {
          uuid: "asd6a5s464fs5d6as1",
          title: "2020年11月差旅报销",
          count: "1",
          organizationName: "机构名称",
          reviewer: "周大侠",
          reviewerId: "y4jf561hn3fd1g6s4f65",
          declarant: "张三",
          account: "111222",
          isValid: "1",
          updateTime: "2020/11/30",
          state: 4,
        },
      ]);
      this.dataCarding();
    },
    //数据梳理
    dataCarding() {
      this.listI = [];
      this.listII = [];
      this.listIII = [];
      this.listIV = [];
      this.dataList.forEach((item) => {
        var state = parseInt(item.state);
        switch (state) {
          case 1:
            this.listI.push(item);
            break;
          case 2:
            this.listII.push(item);
            break;
          case 3:
            this.listIII.push(item);
            break;
          case 4:
            this.listIV.push(item);
            break;
        }
      });
    },
    showDetail(item) {
      this.$router.push({
        name: "HandoverSheetDetail",
        query: { id: item.uuid },
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
  padding-bottom: 1rem;
}
.search-bar {
  background-color: #fff;
  display: flex;
  align-items: center;
}
.remark {
  padding: 0 1.6rem;
  line-height: 3.3rem;
  font-size: 1.4rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
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
.my-card-header {
  display: flex;
  justify-content: space-between;
}
.img-link {
  color: #108ee9;
  font-size: 1.6rem;
  text-decoration: underline;
  margin-right: 1.6rem;
}

.my-card-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px #eeeeee solid;
  padding: 1rem 0;
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
  min-height: 8rem;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  font-family: PingFangSC-Regular, PingFang SC;
}
.my-card-content .van-cell {
  padding: 0;
}
.my-card-item-center > div {
  width: 100%;
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
}
.my-card-item-center > div:first-child {
  font-size: 1.8rem;
  color: #333333;
  display: flex;
  justify-content: space-between;
}
.title-explain {
  font-size: 1.6rem;
  color: #666666;
  align-items: center;
}
.my-card-item-center > div:nth-child(2) {
  font-size: 1.5rem;
  color: #999999;
}
.my-card-item-center > div:last-child {
  font-size: 1.5rem;
  color: #999999;
}
.my-card-item-right {
  width: 100%;
  height: 4.8rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.my-card-item-right button {
  height: 3.6rem;
  width: 6rem;
}
.my-card-item-right > button {
  margin-right: 1.6rem;
}
</style>