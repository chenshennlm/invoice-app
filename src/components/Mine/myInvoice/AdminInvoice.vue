<template>
  <div id="myinvoice">
    <van-nav-bar
      title="我的凭证"
      left-arrow
      @click-left="$router.push('/mine')"
    >
      <template #left>
        <van-icon name="arrow-left" color="#666666" size="16" />
      </template>
    </van-nav-bar>
    <div id="myinvoice_head">
      <div>
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
          <van-tab title="我审核的"></van-tab>
          <van-tab title="我的票据"></van-tab>
        </van-tabs>
      </div>
      <div id="myinvoice_tags">
        <div :class="[{ activedBox: typeActive == 1 }]" @click="selectType(1)">
          全部
        </div>
        <div :class="[{ activedBox: typeActive == 2 }]" @click="selectType(2)">
          有效
        </div>
        <div :class="[{ activedBox: typeActive == 3 }]" @click="selectType(3)">
          无效
        </div>
      </div>
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
            :to="'AdminInvoiceDetail?id=' + item.uuid"
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
import router from "../../../router/index";
import { getMonthThroughStr } from "../../../tool/GetDate";
import { getData } from "../../../action/MineAction";

const dataBase = [
  {
    uuid: "",
    title: "2021年9月差旅报销",
    count: "1",
    organizationName: "机构名称",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "张三",
  },
  {
    uuid: "",
    title: "2021年9月招待报销",
    count: "2",
    organizationName: "",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "李四",
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
  },
  {
    uuid: "",
    title: "2021年9月差旅报销",
    count: "1",
    organizationName: "机构名称",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "张三",
  },
  {
    uuid: "",
    title: "2021年9月招待报销",
    count: "2",
    organizationName: "",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "李四",
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
  },
  {
    uuid: "",
    title: "2021年9月差旅报销",
    count: "1",
    organizationName: "机构名称",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "张三",
  },
  {
    title: "2021年9月招待报销",
    count: "2",
    organizationName: "",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "李四",
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
  },
  {
    uuid: "",
    title: "2021年9月差旅报销",
    count: "1",
    organizationName: "机构名称",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "张三",
  },
  {
    title: "2021年9月招待报销",
    count: "2",
    organizationName: "",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "李四",
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
  },
  {
    uuid: "",
    title: "2021年9月差旅报销",
    count: "1",
    organizationName: "机构名称",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "张三",
  },
  {
    uuid: "",
    title: "2021年9月招待报销",
    count: "2",
    organizationName: "",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "李四",
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
  },
];
export default {
  name: "AdminInvoice",
  data() {
    return {
      account: "", //当前登录的账号
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      show: false, //是否展出弹框层
      selectedDate: "", //取年月，2021/9
      active: 0,
      typeActive: 1,
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
      this.typeActive = 1;
      this.finished = false;
      this.loading = false;
      console.log(key);
      this.getData();
    },
    getData() {
      switch (this.active) {
        case 0:
          this.listdata = dataBase;
          break;
        case 1:
          this.listdata = dataBase.filter(
            (item) => item.reviewerId == "y4jf561hn3fd1g6s4f65"
          );
          break;
        case 2:
          this.listdata = dataBase.filter(
            (item) => item.declarantId == "y4jf561hn3fd1g6s4f65"
          );
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
    selectType(type) {
      this.typeActive = type;
    },
  },
  mounted() {
    this.account = router.history.current.query.id;
    this.initData();
    this.getData();
  },
};
</script>

<style scoped>
/* .van-nav-bar {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
} */
#myinvoice {
  background-color: #f7f8fa;
  height: 100vh;
  font-size: 1.5rem;
}
#myinvoice_head {
  background-color: #f7f8fa;
  position: sticky;
  top: 0;
  z-index: 10;
}
#myinvoice_tabs {
  margin-top: 1rem;
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
.list-box {
  position: relative;
  z-index: 9;
}
.list-box .van-cell:first-child {
  margin-top: 1rem;
}
#myinvoice >>> .van-tab--active {
  color: #108ee9;
}
#myinvoice >>> .van-tabs__line {
  background-color: #108ee9;
}
.diy-content {
  color: #ff3b30;
  font-size: 2.5rem;
  margin-right: 0.5rem;
}
</style>