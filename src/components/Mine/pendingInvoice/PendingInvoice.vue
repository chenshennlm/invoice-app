<template>
  <div id="pendingInvoice">
    <van-nav-bar
      title="待处理凭证"
      left-arrow
      @click-left="$router.push('/mine')"
    />
    <div class="list-box">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <div style="overflow: hidden">
          <van-swipe-cell
            v-for="(item, index) in listdata"
            :key="index"
            :before-close="beforeClose"
          >
            <van-cell
              style="min-height: 1rem"
              :title="item.title"
              size="large"
              :label="labelContent(item)"
              is-link
              center
              @click="goDetail(item)"
            >
              <template #default>
                <span class="diy-content">{{ item.count }}</span>
                张
              </template>
            </van-cell>
            <template #right>
              <van-button
                square
                type="danger"
                @click.stop="deleteInfo(item)"
                text="删除"
              />
              <van-button
                square
                type="info"
                @click="updataInfo(item)"
                text="信息修改"
              />
            </template>
          </van-swipe-cell>
        </div>
      </van-list>
    </div>
    <van-dialog
      v-model="show"
      title="信息修改"
      confirm-button-color="#1989fa"
      :show-confirm-button="false"
    >
      <van-form validate-first @submit="onSubmit">
        <!-- 通过 pattern 进行正则校验 -->

        <van-cell @click="calendarShow = true">
          <van-field
            v-model="businessDate"
            readonly
            label="业务日期"
            name="businessDate"
            placeholder="年/月/日"
            :rules="[{ required: true, message: '请选择日期' }]"
          />
        </van-cell>
        <van-calendar
          v-model="calendarShow"
          @confirm="onDateConfirm"
          :show-confirm="false"
          get-container="#app"
        />
        <van-cell is-link @click="popupShow = true" center>
          <van-field
            v-model="businessType"
            readonly
            label="业务类型"
            name="businessType"
            placeholder="请选择"
            :rules="[{ required: true, message: '请选择' }]"
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
            show-toolbar
            :columns="columns"
            @cancel="popupShow = false"
            @confirm="onConfirm"
          />
        </van-popup>
        <div class="my-dialog-footer">
          <van-button type="default" native-type="button" @click="dialogCancel">
            取消
          </van-button>
          <van-button type="info" native-type="submit"> 提交 </van-button>
        </div>
      </van-form>
    </van-dialog>
  </div>
</template>

<script>
import { Toast } from "vant";
import { getMonthThroughStr } from "../../../tool/GetDate";
import { dateFormat } from "../../../tool/tool";
const dataBase = [
  {
    uuid: "",
    title: "2021年9月差旅报销",
    count: "1",
    organizationName: "机构名称",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "张三",
    account: "123456",
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
    account: "123456",
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
    account: "123456",
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
    account: "123456",
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
    account: "123456",
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
    account: "111222",
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
    account: "111222",
    isValid: "1",
  },
  {
    title: "2021年9月招待报销",
    count: "2",
    organizationName: "",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "李四",
    account: "111222",
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
    account: "111222",
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
    account: "111222",
    isValid: "2",
  },
  {
    title: "2021年9月招待报销",
    count: "2",
    organizationName: "",
    reviewer: "周大侠",
    reviewerId: "y4jf561hn3fd1g6s4f65",
    declarant: "李四",
    account: "111222",
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
    account: "111222",
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
    account: "111222",
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
    account: "111222",
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
    account: "111222",
    isValid: "1",
  },
];
export default {
  name: "PendingInvoice",
  data() {
    return {
      account: "", //当前登录的账号
      show: false, //是否展出弹框层
      calendarShow: false, //是否弹出日期选择
      popupShow: false, //是否弹出业务类型选择
      listdata: [],
      start: 0,
      size: 8,
      finished: false,
      loading: false,
      total: 0,
      userInfo: undefined,
      businessDate: "",
      businessType: "",
      columns: [],
    };
  },
  computed: {
    labelContent() {
      return function (item) {
        if (this.userInfo.level != 3) {
          var account =
            item.account.length > 5
              ? item.account.slice(0, 2) + "***" + item.account.slice(-3)
              : item.account;
          return item.declarant + "(" + account + ")";
        } else {
          return "";
        }
      };
    },
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
      this.userInfo = {
        icon: "https://img01.yzcdn.cn/vant/cat.jpeg",
        nickname: "周大侠",
        level: "1",
        uuid: "4f5a4s5d4a5sdas4d564",
        account: "17766666665",
      };
      this.columns = ["差旅费", "招待费", "其他"];
    },
    /**跳转到凭证详情页面 */
    goDetail(param) {
      console.log("param---", param);
      if (this.userInfo.level != 3) {
        this.$router.push({
          name: "InvoiceExamine",
          query: { id: param.uuid, title: param.title },
        });
      } else {
        this.$router.push({
          name: "InvoiceEdit",
          query: { id: param.uuid, title: param.title },
        });
      }
    },

    getData() {
      this.listdata = dataBase;
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

    // position 为关闭时点击的位置
    // instance 为对应的 SwipeCell 实例
    beforeClose({ position, instance }) {
      console.log(position, "position-------");
      switch (position) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          break;
      }
    },
    deleteInfo(param) {
      this.$dialog
        .confirm({
          className: "dialog-add-class",
          confirmButtonColor: "#1989fa",
          message: "确定删除吗？",
        })
        .then(() => {
          Toast.success("删除成功");
        })
        .catch(() => {
          // on cancel
        });
    },
    updataInfo(param) {
      this.show = true;
    },

    onDateConfirm(date) {
      this.calendarShow = false;
      this.businessDate = dateFormat("YYYY/mm/dd", date);
    },
    dialogCancel() {
      this.show = false;
      this.resetForm();
    },
    onConfirm(value) {
      console.log(value);
      this.businessType = value;
      this.popupShow = false;
    },
    //弹窗提交
    onSubmit(values) {
      console.log("submit", values);
      this.show = false;
      this.resetForm();
    },
    //重置表单
    resetForm() {
      this.businessDate = "";
      this.businessType = "";
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
#pendingInvoice {
  background-color: #f7f8fa;
  height: 100vh;
}

.list-box {
  position: relative;
  z-index: 9;
}
.list-box .van-swipe-cell:first-child {
  margin-top: 1rem;
}
.diy-content {
  color: #ff3b30;
  font-size: 2.5rem;
  margin-right: 0.5rem;
}
.van-swipe-cell__right{
  padding: 0;
}
.van-swipe-cell__right button {
  height: 100%;
  font-size: 1.5rem;
}
.van-button--danger {
  background-color: #fc3950;
  border: 1px solid #fc3950;
}
.my-dialog-footer {
  margin: 1.6rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.my-dialog-footer button {
  width: 50%;
}
</style>