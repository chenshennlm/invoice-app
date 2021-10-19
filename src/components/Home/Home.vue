<template>
  <div class="home">
    <div class="home_header">
      <!-- <div class="mobile-status-bar"></div> -->
      <van-nav-bar>
        <template #right>
          <van-badge :dot="redmessage">
          <van-icon name="chat-o"  @click="tomessage" />

  <!-- <div class="child" /> -->
</van-badge>
        </template>
        <template #left>
          <span>会计做账APP</span>
        </template>
      </van-nav-bar>
      <div class="header_remind" @click="$router.push('/mine/messageDetail')">
        <van-notice-bar
          left-icon="volume-o"
          text="票据收据提醒，你有几张票据需要上传"
          :scrollable="scrollable"
          color="#fff"
        />
      </div>
      <!-- 这里点击需要跳转到票据上传页面 -->
      <div class="header_upload">
        <div class="upload_main" @click="$router.push('/home/upload')">
          <img
            class="pic1"
            referrerpolicy="no-referrer"
            src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngd311fc0c692e2712c89211b581433dcbbc46550827cea1b70c5ae23b36d70a77"
          />
          <span class="">票据上传</span>
        </div>
      </div>
    </div>
    <div class="home_pending">
      <div class="pending_main">
        <div class="pending_main_header">
          <span class="left">待处理</span>
          <span class="right" @click="morepjlist">更多</span>
        </div>
        <div class="pending_list">
          <ul>
            <li v-for="(item,index) in businessdata" :key="index"
            >
              <div class="box1 flex-col">
                <div class="outer2 flex-col"></div>
              </div>
              <div class="company_bills">
                <span class="pending_company">{{item.companyname}}</span>
                <span class="pendign_date">{{item.time}}</span>
              </div>
              <div><van-icon name="arrow"  @click="toinvoiceExamine" /></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="home_statistics">
      <div class="statistics_header">
        <span class="left"> 票据统计 </span>
        <span class="right" @click="changeshowdate">{{selectedDate }}</span>
      </div>
      <div class="Statistical_chart">
        <div id="Statistical_chart_main"></div>
      </div>
      <div class="date" v-if="showdate">
        <div id="Statistical_chart_main"></div>
      </div>
      
    </div>
    <div class="dates" v-if="showdate">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          title="统计时间设置"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="chickconfirm"
          @cancel="chickcancel"
        />
      </div>
  </div>
</template>

<script>
import { time } from 'echarts';
import { getMonthThroughStr } from "../../tool/GetDate";
import { plusReady } from "../../tool/tool";
//引入 echarts图表插件
const echarts = require("echarts");
export default {
  name: "Home",
  data() {
    return {
      redmessage:true,
      info:{},
      showdate: false,
      scrollable: false,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2021, 10, 1),
      currentDate: new Date(),
      selectedDate: "2020/10",
businessdata:[
    {
        companyname:'衡信教育科技有限公司',
        time:'2021/01',

          },
           {
        companyname:'衡信教育科技有限公司',
        time:'2021/10',
        
          },
           {
        companyname:'衡信教育科技有限公司',
        time:'2021/02',
          }
]
    };
  },
  methods: {
    toinvoiceExamine(){
    console.log(this.info.level);
      console.log(111);
      if(this.info.level==1||this.info.level==2){
        this.$router.push('/mine/invoiceExamine')
      }else{
        // this.$router.push('')
      }
    },
    //更多
     getMineDetail(account = "") {
      this.info = {
        icon: "https://img01.yzcdn.cn/vant/cat.jpeg",
        nickname: "周大侠",
        level: "1",
        uuid: "4f5a4s5d4a5sdas4d564",
        account: "17766666665",
      };
      // getMineDetail(account).then((res) => {
      //   console.log("---res", res);
      //   this.info = res.data;
      // });
    },
      // getbusinessdata(){
      //   this.businessdata=[
        
      //   ]
      // },
    morepjlist(){
      console.log(this.info.level);
if (this.info.level == "1") {
        this.$router.push({
          name: "PendingInvoice",
          query: { id: this.info.account },
        });
      } else {
        this.$router.push({
          name: "PendingInvoice",
          query: { id: this.info.account },
        });
      }
    },
    tomessage() {
      this.$router.push("/mine/message");
    },
    // 点击确定触发事件
    chickconfirm(value) {
      console.log(value);
      this.showdate = false;
      let temp = value.toString();
      let year = temp.substr(10, 5);
      let month = getMonthThroughStr(temp.substr(4, 3));
      this.selectedDate = year + "/" + month;
    },
    //点击取消触发事件
    chickcancel() {
      this.showdate = false;
    },
    // 显示日期框
    changeshowdate() {
      this.showdate = true;
    },

    formatter(type, val) {
      
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    //票据统计图
    Statisticalchart() {
      var myChart = echarts.init(
        document.getElementById("Statistical_chart_main")
      );
      var option = {
        // title: {
        //     text: ''
        // },
        tooltip: {},
        legend: {
          data: [""],
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#000",
              // backgroundColor: '#999',
              borderRadius: 3,
              fontSize: 10,
              // padding: [3, 5]
            },
          },
          indicator: [
            { name: "待审核", max: 100 },
            { name: "待核对", max: 100 },
            { name: "待修改", max: 100 },
            { name: "已记账", max: 100 },
            { name: "已完成", max: 100 },
            { name: "已作废", max: 100 },
          ],
          radius: 30,
          splitNumber: 4,
        },
        series: [
          {
            type: "radar",
            symbol: "none",
            // lineStyle: {normal: {color:'#005AAF',width:4}},
            areaStyle: { normal: {} },
            data: [
              {
                value: [80, 80, 80, 80, 80, 80],
                name: "票据状态",
              },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
  },

  mounted() {
    this. getMineDetail()
    this.Statisticalchart();
    if (window.plus) {
      plusReady("light");
    } else {
      document.addEventListener("plusready", plusReady, false);
    }
  },
};
</script>

<style lang="less"  scoped>
.home_header {
  background: #108ee9;
  height: 16rem;
}
.van-nav-bar {
  background: #108ee9;
  /* background-origin: border-box; */
}
.van-nav-bar__left span {
  color: #fff;
  font-size: 1.8rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 500;
}
.van-nav-bar .van-icon {
  font-size: 2.8rem;
  color: #fff;
}
.van-notice-bar {
  height: 2.5rem;
  width: 100%;
  background: rgba(255, 255, 255, 20%);
}
.header_remind {
  height: 4rem;
  display: flex;
  padding: 0 1rem;
  align-items: center;
}
.header_upload {
  width: calc(100% - 2rem);
  height: 12rem;
  margin-left: 1rem;
  background: #fff;
  position: relative;
  border-radius: 4px;
}
.upload_main {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  margin-left: -3rem;
  margin-top: -4rem;
  top: 50%;

  span {
    font-size: 1.4rem;
    color: rgba(16, 142, 233, 1);
    margin-top: 1rem;
  }
}
.pic1 {
  z-index: 33;

  width: 5rem;
  height: 5rem;
}
.home_pending {
  margin-top: 8.4rem;
  width: calc(100% - 2rem);
  margin-left: 1rem;

  .pending_main {
    .pending_main_header {
      display: flex;
      justify-content: space-between;
      .left {
        font-size: 1.6rem;
      }
      .right {
        color: rgba(16, 142, 233, 1);
        font-size: 1.6rem;
      }
    }
    .pending_list {
      margin-top: 1rem;
      background: #fff;
      ul {
        li {
          display: flex;
          padding: 0.5rem 0.5rem;
          align-items: center;
          .box1 {
            flex: 1;
            z-index: 132;
            height: 4.5rem;
            background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng65982b671b130a8e99c174bf1d8ac9e4f042122eb731426e4fbc8251d5f1219e) -0.054rem
              0rem no-repeat;
            background-size: 4rem 5rem;
            margin-top: 0.027rem;
            width: 6rem;
            justify-content: center;
            align-items: center;
            position: relative;
            .outer2 {
              z-index: 136;
              width: 4rem;
              height: 4rem;
              background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng6541d2e4894e94e4e6797f54cfeb34dbbc62caf33583c496efdfbfdad4f6429f)
                0.1rem 0.72rem no-repeat;
              background-size: 2rem 3rem;
              margin-left: 0.9em;
            }
          }
          .company_bills {
            flex: 4;
            display: flex;
            flex-direction: column;
            // margin-left: rem;

            .pending_company {
              font-size: 1.6rem;
            }
            .pendign_date {
              font-size: 1.4rem;
            }
          }
          .van-icon-arrow {
            flex: 1;
            // margin-left: 8rem;
            font-size: 2.5rem;
            color: #cdcdcd;
          }
        }
      }
    }
  }
}
.home_statistics {
  width: calc(100% - 2rem);
  margin-left: 1rem;
  margin-top: 1.5rem;

  .statistics_header {
    display: flex;
    justify-content: space-between;
    .left {
      font-size: 1.6rem;
      font-family: PingFangSC-Regular, PingFang SC;
    }
    .right {
      border: 1px solid #108ee9;
      font-size: 1.2rem;
      color: #108ee9;
      padding: 0.5rem;
    }
  }
 
  .Statistical_chart {
    background: #fff;
    margin-top: 1rem;
    height: 14rem;
    padding-bottom:1rem ;
    position: relative;
    #Statistical_chart_main {
      width: 14rem;
      height: 14rem;
      position: absolute;
      left: 50%;
      margin-left: -7rem;
    }
  }
}
 .dates {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 999;
  }
</style>