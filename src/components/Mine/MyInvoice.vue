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
        <van-tab title="全部票据">
          <div style="margin-top: 1rem">
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
                  :title="
                    item.time.year +
                    '年' +
                    item.time.month +
                    '月' +
                    item.invioceType +
                    '报销'
                  "
                  :value="item.count + '张'"
                  size="large"
                  :label="
                    item.organization.name
                      ? item.organization.name
                      : '未关联机构'
                  "
                  is-link
                  @click="gotoInvoiceImg"
                />
              </div>
            </van-list>
          </div>
        </van-tab>
        <van-tab title="有效票据">
          <div style="margin-top: 1rem">
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
                  :title="
                    item.time.year +
                    '年' +
                    item.time.month +
                    '月' +
                    item.invioceType +
                    '报销'
                  "
                  :value="item.count + '张'"
                  size="large"
                  :label="
                    item.organization.name
                      ? item.organization.name
                      : '未关联机构'
                  "
                  is-link
                />
              </div>
            </van-list>
          </div>
        </van-tab>
        <van-tab title="无效票据">
          <div style="margin-top: 1rem">
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
                  :title="
                    item.time.year +
                    '年' +
                    item.time.month +
                    '月' +
                    item.invioceType +
                    '报销'
                  "
                  :value="item.count + '张'"
                  size="large"
                  :label="
                    item.organization.name
                      ? item.organization.name
                      : '未关联机构'
                  "
                  is-link
                />
              </div>
            </van-list>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import router from "../../router/index";
import { getMonthThroughStr } from "../../tool/GetDate";
import { getInvoiceList } from "../../action/MineAction";
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
    // listdata: {
    //   handler: function (val, oldVal) {
    //     console.log("val---", val, "---oldval", oldVal);
    //   },
    //   deep: true,
    // },
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
      this.getInvoiceList(this.active, 0, 0);
    },
    /**切换标签卡
     * key: active的值
     */
    changeTab(key = "") {
      this.start = 0;
      this.finished = false;
      this.loading = false;
      this.getInvoiceList(key, 0, 0);
    },
    getInvoiceList(key = "", start = 0, listSize = this.listdata.length) {
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
      this.getInvoiceList(this.active, this.start, oldSize);
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
    this.account = router.history.current.query.id;
    this.initData();
    this.getInvoiceList();
  },
};
</script>

<style scoped>
#myinvoice {
  background-color: #f7f8fa;
  height: 100vh;
}
#myinvoice_tabs {
  margin-top: 1rem;
}
</style>