<template>
  <div id="myinvoice">
    <van-nav-bar
      title="我的凭证"
      left-arrow
      @click-left="$router.push('/mine')"
    />
    <div id="myinvoice_head">
      <van-cell @click="showPopup">
        <template #title> 查询月份 </template>
        <template #default>
          <van-tag type="primary" plain>{{ selectedDate }}</van-tag>
        </template>
      </van-cell>
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          title="选择年月"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="setDate"
          ref="date"
        />
      </van-popup>
    </div>
    <div id="myinvoice_tabs">
      <van-tabs v-model="active" @click="changeTab">
        <van-tab title="全部票据"></van-tab>
        <van-tab title="有效票据"></van-tab>
        <van-tab title="无效票据"> </van-tab>
      </van-tabs>
    </div>
    <div class="list-box">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <div style="overflow: hidden">
          <van-cell
            style="min-height: 1rem"
            v-for="(item, index) in listdata"
            :key="index"
            :title="item.title"
            size="large"
            :label="
              item.organizationName ? item.organizationName : '未关联机构'
            "
            is-link
            center
            :to="'MyInvoiceImg?id=' + item.uuid + '&title=' + item.title"
          >
            <template #default>
              <span class="diy-content">{{ item.count }}</span>
              张
            </template>
          </van-cell>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { getMonthThroughStr } from "../../../tool/GetDate";

const dataBase = [
  {
    uuid: "",
    title: "2021年9月差旅报销",
    count: "1",
    organizationName: "机构名称",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "张三",
    isValid: "1",
  },
  {
    uuid: "",
    title: "2021年9月招待报销",
    count: "2",
    organizationName: "",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "李四",
    isValid: "2",
  },
  {
    uuid: "",
    title: "2021年9月其它报销",
    count: "3",
    organizationName: "机构名称",
    reviewer: "",
    reviewerId: "",
    declarant: "周大侠",
    declarantId: "y4jf561hn3fd1g6s4f65",
    isValid: "1",
  },
  {
    uuid: "",
    title: "2021年9月差旅报销",
    count: "1",
    organizationName: "机构名称",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "张三",
    isValid: "2",
  },
  {
    uuid: "",
    title: "2021年9月招待报销",
    count: "2",
    organizationName: "",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "李四",
    isValid: "1",
  },
  {
    uuid: "",
    title: "2021年9月其它报销",
    count: "3",
    organizationName: "机构名称",
    reviewer: "",
    reviewerId: "",
    declarant: "周大侠",
    declarantId: "y4jf561hn3fd1g6s4f65",
    isValid: "2",
  },
  {
    uuid: "",
    title: "2021年9月差旅报销",
    count: "1",
    organizationName: "机构名称",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "张三",
    isValid: "1",
  },
  {
    title: "2021年9月招待报销",
    count: "2",
    organizationName: "",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "李四",
    isValid: "2",
  },
  {
    uuid: "",
    title: "2021年9月其它报销",
    count: "3",
    organizationName: "机构名称",
    reviewer: "",
    reviewerId: "",
    declarant: "周大侠",
    declarantId: "y4jf561hn3fd1g6s4f65",
    isValid: "1",
  },
  {
    uuid: "",
    title: "2021年9月差旅报销",
    count: "1",
    organizationName: "机构名称",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "张三",
    isValid: "2",
  },
  {
    title: "2021年9月招待报销",
    count: "2",
    organizationName: "",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "李四",
    isValid: "1",
  },
  {
    uuid: "",
    title: "2021年9月其它报销",
    count: "3",
    organizationName: "机构名称",
    reviewer: "",
    reviewerId: "",
    declarant: "周大侠",
    declarantId: "y4jf561hn3fd1g6s4f65",
    isValid: "2",
  },
  {
    uuid: "",
    title: "2021年9月差旅报销",
    count: "1",
    organizationName: "机构名称",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "张三",
    isValid: "1",
  },
  {
    uuid: "",
    title: "2021年9月招待报销",
    count: "2",
    organizationName: "",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "李四",
    isValid: "2",
  },
  {
    uuid: "",
    title: "2021年9月其它报销",
    count: "3",
    organizationName: "机构名称",
    reviewer: "",
    reviewerId: "",
    declarant: "周大侠",
    declarantId: "y4jf561hn3fd1g6s4f65",
    isValid: "1",
  },
];
export default {
  name: "MyInvoice",
  data() {
    return {
      account: "", //当前登录的账号
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      show: false, //是否展出弹框层
      selectedDate: "", //取年月，2021/9
      active: 0,
      year: "",
      month: "",
      listdata: [],
      start: 0,
      size: 8,
      finished: false,
      loading: false,
      total: 0,
    };
  },
  watch: {
    total: {
      handler: function (val, oldVal) {
        console.log("val---", val, "---oldval", oldVal);
      },
      deep: true,
    },
  },
  methods: {
    initData() {
      //取年月，2021/09
      var nowDate = new Date();
      this.selectedDate =
        nowDate.getFullYear() +
        "/" +
        getMonthThroughStr(nowDate.constructor().substr(4, 3));
    },
    /**跳转到票据查看页面 */
    gotoInvoiceImg(event) {
      console.log("event---", event);
    },

    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    showPopup() {
      this.show = true;
    },
    /**选择不同的日期 */
    setDate(value) {
      let temp = value.toString(); //转数据类型
      let year = temp.substr(10, 5);
      let month = getMonthThroughStr(temp.substr(4, 3));
      this.year = year;
      this.month = month;
      this.selectedDate = year + "/" + month;
      this.show = false;
      this.start = 0;
      this.finished = false;
      this.getData();
    },
    /**切换标签卡
     * key: active的值
     */
    changeTab(key = "") {
      this.start = 0;
      this.finished = false;
      this.loading = false;
      this.getData();
    },
    getData() {
      switch (this.active) {
        case 0:
          this.listdata = dataBase;
          break;
        case 1:
          this.listdata = dataBase.filter((item) => item.isValid == "1");
          break;
        case 2:
          this.listdata = dataBase.filter((item) => item.isValid == "2");
      }
      // getInvoiceList(
      //   start,
      //   this.size,
      //   this.account,
      //   this.year,
      //   this.month,
      //   key
      // ).then((res) => {
      //   this.loading = false;
      //   let total = res.total;
      //   if (listSize > 0 && listSize <= total) {
      //     //继续加载
      //     let temp = this.listdata;
      //     for (let i = 0; i < this.size; i++) {
      //       temp.push(res.data[i]);
      //     }
      //     this.listdata = temp;
      //     console.log("---temp---", temp.length);
      //     if (temp.length >= total) {
      //       this.finished = true;
      //     }
      //   } else {
      //     this.listdata = res.data;
      //   }
      //   this.start = start + 8;
      //   this.total = total;
      // });
    },
    onLoad() {
      let oldSize = this.listdata.length;
      //加载状态开始
      this.loading = true;
      // 异步更新数据
      this.getData();
      // // 加载状态结束
      // this.loading = false;
      console.log("---datalist", this.listdata);
      //数据全部加载完成
      // if (this.listdata.length >= this.total) {
      //   this.finished = true;
      // }
    },
  },
  mounted() {
    this.account = this.$route.query.id;
    this.initData();
    this.getData();
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
#myinvoice {
  background-color: #f7f8fa;
  height: 100vh;
}
#myinvoice_tabs {
  margin-top: 1rem;
  position: sticky;
  width: 100%;
  top: 4.8rem;
  z-index: 10;
}
#myinvoice >>> .van-tab--active {
  color: #108ee9;
}
#myinvoice >>> .van-tabs__line {
  background-color: #108ee9;
}
.list-box {
  position: relative;
  z-index: 9;
}
.list-box .van-cell:first-child {
  margin-top: 1rem;
}
.diy-content {
  color: #ff3b30;
  font-size: 2.5rem;
  margin-right: 0.5rem;
}
</style>