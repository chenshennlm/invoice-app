<!-- 票据上传页面 -->
<template>
  <div class="upload">
    <div class="upload_header">
      <van-nav-bar
        title="票据上传"
        left-arrow
        @click-left="onClickLeft"
        :fixed="true"
      />
    </div>
    <div class="home_statistics">
      <div class="statistics_header">
        <span class="left"> 票据统计 </span>
        <span class="right" @click="changeshowdate">{{ selectedDate }}</span>
      </div>
      <div></div>
      <div
      
        class="business_main"
        v-for="(item, index) in businessList"
        :key="index"
        @click="$router.push('/home/uploadphoto')"
      >
        <div class="business_header">{{ item.title }}</div>
        <div class="main">
          <van-swipe-cell >
             <template #default>
               <div class="business_pj">
            <div class="left">
              <div class="section5 flex-col">
                <div class="group1 flex-col"></div>
              </div>
            </div>
            <div class="center">
              <span>2021年11月差旅报销</span>
              <span>{{ item.title }}</span>
            </div>
            <div class="right">
              <span>{{ businessnum }}张</span>

              <van-icon name="arrow" />
            </div>
          </div>
              </template>
         
          <template #right>
            <van-button

              square
              type="danger"
              text="删除"
              @click="deletelist(index)"
            />
            <van-button
              square
              type="info"
              text="信息更改"
              @click="changelistmsg"
            />
          </template>
        </van-swipe-cell>
        </div>

        <div id="Statistical_chart_main"></div>
      </div>
    </div>
    <div class="addbusiness" @click="showPopup">
      <van-button type="info">新增业务</van-button>
    </div>
    <div class="Popup" v-if="showpopup">
      <div class="Popup_main">
        <div class="Popup_header">
          <span>新增业务</span>
        </div>
        <div class="Popup_list">
          <van-cell-group>
            <!-- <van-field
            required
              v-model="popupdate"
              label="业务日期:"
              type="date"
            /> -->
            <form action="" method="post"></form>
            <div class="Popup_form">
              <div class="business_date">
                <span>*</span>
                <label for="">业务日期：</label>
                <input type="month" required ref="dates" />
              </div>
              <div class="business_type">
                <span>*</span>
                <label for="">业务类型：</label>
                <select
                  ref="types"
                  @change="changshowothers"
                  v-model="selectvalue"
                >
                  <option
                    ref="bsiness-type"
                    v-for="(item, index) in optionlist"
                    :key="index"
                  >
                    {{ item.text }}
                  </option>
                </select>
              </div>
              <div class="business_others" v-if="showothers">
                <span>*</span>
                <label for="">其他说明：</label>
                <input
                  type="text"
                  required
                  maxlength="20"
                  placeholder="不多于20个字符"
                  ref="others"
                />
              </div>
              <div class="business_button">
                <van-button
                  type="default"
                  @click="popupclickcanle"
                  size="normal"
                  >取消</van-button
                >
                <van-button type="info" @click="popupclicksure"
                  >确定</van-button
                >
              </div>
            </div>
          </van-cell-group>
        </div>
      </div>
    </div>
    <div class="date" v-if="showdate">
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
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getMonthThroughStr } from "../../../tool/GetDate";

export default {
  //import引入的组件需要注入到components对象中才能使用
  name: "Upload",
  components: {},
  data() {
    //这里存放数据
    return {
      check: true,
      showothers: false,
      popupdate: "", //新建业务时间
      popuptype: "", //业务类型
      showpopup: false,
      businessnum: 0,
      selectedDate: "2021/11",
      showdate: false,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2021, 10, 1),
      currentDate: new Date(),
      businessList: [
        {
          title: "未上传",
        },
        {
          title: "待审核",
        },
        {
          title: "未发送",
        },
        {
          title: "已发送",
        },
      ],
      selectvalue: "请选择",
      optionlist: [
        { text: "请选择" },
        { text: "差旅费" },
        { text: "招待费" },
        { text: "其他" },
      ],
    };
  },

  //方法集合
  methods: {
    showPopup() {
      this.showpopup = true;
    },
    // 增加业务页面点击取消
    popupclickcanle() {
      this.showpopup = false;
    },
    //增加业务页面点击确定按钮
    popupclicksure() {
      console.log("点击确定按钮");
      this.showpopup = false;
      if (this.$refs.types.value == "其他") {
        if (this.$refs.others.value == "" || this.$refs.dates.value == "") {
          if (this.$refs.dates.value == "") {
            this.$toast.fail("请输入日期");
          } else if (this.$refs.others.value == "") {
            this.$toast.fail("请输入日期");
          }
        } else {
          console.log("验证通过");
        }
      } else {
        if (
          this.$refs.dates.value == "" ||
          this.$refs.types.value == "请选择"
        ) {
          if (this.$refs.dates.value == "") {
            this.$toast.fail("请输入日期");
          } else if (this.$refs.types.value == "请选择") {
            this.$toast.fail("请输入日期");
          }
        } else {
          console.log("验证通过");
        }
      }
    },
    //返回首页
    onClickLeft() {
      this.$router.push("/home");
    },
    chickconfirm(value) {
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
    changelistmsg() {
      console.log("修改按钮");
    },
    // 删除

    deletelist(index) {
      console.log(index);
      this.$dialog
        .confirm({
          message: "确定删除吗？",
        })
        .then(() => {
          console.log("点击确定之后执行的操作");
        });
    },

    changshowothers() {
      console.log(this.selectvalue);
      if (this.selectvalue == "其他") {
        this.showothers = true;
      } else {
        this.showothers = false;
      }
    },
  },

  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）

  mounted() {},
};
</script>
<style lang="less" scoped>
.upload_header {
  height: 5rem;
}
.van-nav-bar /deep/.van-icon {
  color: #979797;
  font-size: 2rem;
}
.van-nav-bar__title {
  font-size: 1.6rem;
  font-weight: 600;
  font-family: Microsoft YaHei;
}

.home_statistics {
  width: calc(100% - 2rem);
  margin-left: 1rem;
  margin-top: 3.4rem;
  .statistics_header {
    display: flex;
    justify-content: space-between;
    .left {
      font-size: 1.6rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 600;
    }
    .right {
      border: 1px solid #108ee9;
      font-size: 1.2rem;
      color: #108ee9;
      padding: 0.5rem;
    }
  }
}
.business_main {
  background: #fff;
  margin-top: 1.5rem;
  // width: 100%;
  .business_header {
    font-size: 1.6rem;
    color: #666;
    height: 4rem;
    border-bottom: 1px solid #f2f2f2;
    line-height: 4rem;
  }
  .main{
    width: 363px;
  }
  .business_pj {
    padding: 1rem;
    display: flex;
    .left {
      .section5 {
        z-index: 18;
        height: 4rem;
        background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng65982b671b130a8e99c174bf1d8ac9e4f042122eb731426e4fbc8251d5f1219e) -0.054rem
          0rem no-repeat;
        background-size: 4rem 5rem;
        margin-top: 0.08rem;
        width: 5rem;
        justify-content: flex-start;
        padding-top: 0.507rem;
        align-items: center;
      }
      .group1 {
        flex: 1;
        z-index: 62;
        width: 3.5rem;
        height: 3.5rem;
        margin-left: 0.5rem;
        margin-top: 0.25rem;
        background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngf315d80de147d8236ae6497319e1ab5b6dda23b5394d2bd5a975ddcf51681da4) -0.24rem -0.24rem
          no-repeat;
        background-size: 3.2rem 2.6rem;
      }
    }
    .center {
      flex: 4;
      display: flex;
      flex-direction: column;
      span:nth-child(1) {
        font-size: 1.6rem;
        color: #333333;
      }
      span:nth-child(2) {
        font-size: 1.6rem;
        color: #999;
      }
    }
    .right {
      flex: 1;
      font-size: 2rem;
      color: #999;
      line-height: 4rem;
      position: relative;
      .van-icon {
        font-size: 2.4rem;
        position: absolute;
        top: 9px;
      }
    }
  }
}
.addbusiness {
  position: fixed;
  bottom: 0;
  width: calc(100% - 2rem);
  margin-left: 1rem;
  padding: 1rem 0;
  background: #fff;
  button {
    width: 100%;
  }
}

.Popup {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;

  .Popup_main {
    background: #fff;
    width: 27rem;
    height: 24rem;
    padding: 1rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
.Popup_header {
  font-size: 1.6rem;
  font-weight: 600;
  padding: 0.5rem 0;
  border-bottom: 1px solid #dedede;
}
.business_date,
.business_others,
.business_type {
  margin-top: 1rem;
  span {
    color: red;
  }
  label {
    font-size: 1.4rem;
  }
  input {
    height: 3rem;
    border: 1px solid #dedede;
    width: 16rem;
  }
}
.business_type {
  select {
    height: 3rem;
    border: 1px solid #dedede;
    width: 16rem;
  }
}
.business_button {
  width: calc(100% - 2rem);
  margin-left: 1rem;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  .van-button--normal {
    padding: 0 4rem;
  }
}
.Popup_form {
  height: 17rem;
}
.date {
  width: 100%;
  position: fixed;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  .van-picker {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
.van-swipe-cell__right{
  padding: 0;
}
.van-swipe-cell__right button {
  height: 100%;
  font-size: 1.5rem;
}
</style>