<template>
  <div id="invoiceEdit">
    <van-nav-bar title="待处理" left-arrow @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-left" color="#666666" size="16" />
      </template>
    </van-nav-bar>
    <div class="page-content">
      <div class="pj-item">
        <span class="pj-item-label">业务名称</span>
        <span class="pj-item-content">{{ $route.query.title }}</span>
      </div>

      <div class="my-card" v-if="noHandle.length > 0">
        <div class="my-card-title">未处理</div>
        <div class="my-card-content">
          <div
            class="my-card-item"
            v-for="(item, index) in noHandle"
            :key="index"
          >
            <div class="my-card-item-left" @click.stop="showPhoto(item)">
              <img :src="item.imgUrl" alt="" />
            </div>
            <div class="my-card-item-center">
              <div>{{ item.title }}</div>
              <div>{{ stateBase[item.state] }}</div>
            </div>
            <div class="my-card-item-right">
              <van-button type="danger" @click="deleteInfo(item)">
                删除
              </van-button>
              <van-uploader :before-read="(file) => beforeRead(file, item)">
                <van-button type="info">替换</van-button>
              </van-uploader>
            </div>
          </div>
        </div>
      </div>
      <div class="my-card" v-if="addData.length > 0">
        <div class="my-card-title">新增</div>
        <div class="my-card-content">
          <div
            class="my-card-item"
            v-for="(item, index) in addData"
            :key="index"
          >
            <div class="my-card-item-left" @click.stop="showPhoto(item)">
              <img :src="item.imgUrl" alt="" />
            </div>
            <div class="my-card-item-center">
              <div>{{ item.title }}</div>
              <div>{{ stateBase[item.state] }}</div>
            </div>
            <div class="my-card-item-right">
              <van-button type="danger" @click="deleteInfo(item, index)">
                删除
              </van-button>
              <van-uploader :before-read="(file) => beforeRead(file, item)">
                <van-button type="info">替换</van-button>
              </van-uploader>
            </div>
          </div>
        </div>
      </div>
      <div class="my-card" v-if="replacedData.length > 0">
        <div class="my-card-title">已替换</div>
        <div class="my-card-content">
          <div
            class="my-card-item"
            v-for="(item, index) in replacedData"
            :key="index"
          >
            <div class="my-card-item-left" @click.stop="showPhoto(item)">
              <img :src="item.imgUrl" alt="" />
            </div>
            <div class="my-card-item-center">
              <div>{{ item.title }}</div>
              <div>{{ stateBase[item.state] }}</div>
            </div>
            <div class="my-card-item-right">
              <van-button type="danger" @click="deleteInfo(item)">
                删除
              </van-button>
              <van-uploader :before-read="(file) => beforeRead(file, item)">
                <van-button type="info">替换</van-button>
              </van-uploader>
            </div>
          </div>
        </div>
      </div>
      <div class="my-card" v-if="deletedData.length > 0">
        <div class="my-card-title">已删除</div>
        <div class="my-card-content">
          <div
            class="my-card-item"
            v-for="(item, index) in deletedData"
            :key="index"
          >
            <div class="my-card-item-left" @click.stop="showPhoto(item)">
              <img :src="item.imgUrl" alt="" />
            </div>
            <div class="my-card-item-center">
              <div>{{ item.title }}</div>
              <div>{{ stateBase[item.state] }}</div>
            </div>
            <div class="my-card-item-right">
              <van-button type="danger" disabled @click="deleteInfo(item)">
                删除
              </van-button>
              <van-uploader :before-read="(file) => beforeRead(file, item)">
                <van-button type="info">替换</van-button>
              </van-uploader>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <van-uploader :before-read="addInfo">
        <div class="button-group">
          <img src="../../../assets/add.png" alt="" />
          <span>新增票据</span>
        </div>
      </van-uploader>
      <div class="button-group" @click="editInfo">
        <img src="../../../assets/edit.png" alt="" />
        <span>信息更正</span>
      </div>
      <div class="submit-botton">
        <van-button type="info">票据发送</van-button>
      </div>
    </div>
    <van-dialog
      v-model="show"
      title="信息修改"
      confirm-button-color="#1989fa"
      :show-confirm-button="false"
    >
      <van-form ref="form" validate-first @submit="onSubmit">
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
import { Toast, ImagePreview } from "vant";
import { dateFormat } from "../../../tool/tool";

const stateBase = ["未处理", "新增", "已替换", "已删除"];
export default {
  name: "InvoiceEdit",
  data() {
    return {
      dataList: [],
      noHandle: [], //未处理
      addData: [], //新增
      replacedData: [], //已替换
      deletedData: [], //已删除
      stateBase,
      maxSize: 1024 * 1024 * 5,
      show: false, //是否展出弹框层
      calendarShow: false, //是否弹出日期选择
      popupShow: false, //是否弹出业务类型选择
      businessDate: "",
      businessType: "",
      columns: [],
      businessInfo:undefined,
    };
  },
  mounted() {
    this.getData();
    this.initData();
  },
  methods: {
    initData() {
      this.columns = ["差旅费", "招待费", "其他"];
      this.businessInfo = {
        uuid: "f65s4df5s31d5a4s",
        title: "2021年9月招待报销",
        businessDate: "2080/10/01",
        businessType: "差旅费",
      };
    },
    getData() {
      this.dataList = [
        {
          uuid: "a34sda3s1d5as4d5a3sda",
          title: "发票重开",
          state: "0",
          imgUrl:
            "https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto",
        },
        {
          uuid: "as564df5sd4f6s4d5as",
          title: "发票重开",
          state: "0",
          imgUrl:
            "https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto",
        },
        {
          uuid: "d4f35s4d6fws4f5sd4f",
          title: "发票重开",
          state: "2",
          imgUrl:
            "https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto",
        },
        {
          uuid: "wt46s5415sd64fsdf",
          title: "发票重开",
          state: "2",
          imgUrl:
            "https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto",
        },
        {
          uuid: "dgs6zdfg6+5s5f6+sf",
          title: "发票重开",
          state: "3",
          imgUrl:
            "https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto",
        },
      ];
      this.dataCarding();
    },
    //数据梳理
    dataCarding() {
      this.noHandle = [];
      this.addData = [];
      this.replacedData = [];
      this.deletedData = [];
      this.dataList.forEach((item) => {
        var state = parseInt(item.state);
        switch (state) {
          case 0:
            this.noHandle.push(item);
            break;
          case 1:
            this.addData.push(item);
            break;
          case 2:
            this.replacedData.push(item);
            break;
          case 3:
            this.deletedData.push(item);
            break;
        }
      });
    },
    //状态改为已删除
    deleteInfo(param, index = -1) {
      var _this = this;
      this.$dialog
        .confirm({
          className: "dialog-add-class",
          confirmButtonColor: "#1989fa",
          message: "确定删除吗？",
        })
        .then(() => {
          console.log("删除", param.uuid);
          param.state = 3;

          _this.dataCarding();

          Toast.success("删除成功");
        })
        .catch(() => {
          // on cancel
        });
    },

    //图片上传
    beforeRead(file, item) {
      console.log(file, "beforeRead");
      console.log(item, "item");
      if (file.type.includes("image")) {
        if (file.size > this.maxSize) {
          Toast(`文件大小不能超过 ${this.maxSize / 1024}kb`);
        } else {
          var _this = this;
          var rawFile = file; //初始图片
          item.file = file;
          var reader = new FileReader(rawFile);
          reader.onload = function (e) {
            let data;

            if (typeof e.target.result === "object") {
              // 把Array Buffer转化为blob 如果是base64不需要
              data = window.URL.createObjectURL(new Blob([e.target.result]));
            } else {
              data = e.target.result;
            }
            item.imgUrl = data;
            item.state = 2;
            _this.dataCarding();
          };
          reader.readAsDataURL(file);
        }
      }
      return false;
    },
    //图片展示
    showPhoto(param) {
      ImagePreview([param.imgUrl]);
    },

    //信息更正
    editInfo() {
      this.show = true;
      this.businessDate = this.businessInfo.businessDate;
      this.businessType = this.businessInfo.businessType;
    },
    //新增票据
    addInfo(file) {
      if (file.type.includes("image")) {
        if (file.size > this.maxSize) {
          Toast(`文件大小不能超过 ${this.maxSize / 1024}kb`);
        } else {
          var _this = this;
          var rawFile = file; //初始图片
          var reader = new FileReader(rawFile);
          reader.onload = function (e) {
            let data;
            if (typeof e.target.result === "object") {
              // 把Array Buffer转化为blob 如果是base64不需要
              data = window.URL.createObjectURL(new Blob([e.target.result]));
            } else {
              data = e.target.result;
            }
            var item = {
              file,
              title: "企业自行新增票据",
              state: 1,
              imgUrl: data,
            };
            _this.dataList.push(item);
            _this.dataCarding();
          };
          reader.readAsDataURL(file);
        }
      }
      return false;
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
      this.$refs.form.resetValidation();
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

.pj-item {
  background-color: #f7f8fa;
  padding: 1.5rem;
}
.pj-item-label {
  font-size: 1.6rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  margin-right: 1rem;
}
.pj-item-content {
  font-size: 2rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
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
.my-card-content {
  margin-top: 1rem;
}
.my-card-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
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
  width: 30%;
  min-height: 8rem;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  font-family: PingFangSC-Regular, PingFang SC;
}
.my-card-item-center > div {
  width: 100%;
}
.my-card-item-center > div:first-child {
  font-size: 1.8rem;
  color: #333333;
}
.my-card-item-center > div:last-child {
  font-size: 1.5rem;
  color: #999999;
}
.my-card-item-right button {
  height: 3.6rem;
}
.page-content {
  margin-bottom: 6rem;
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
}
.button-group {
  width: 7rem;
  height: 4.4rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.button-group img {
  width: 2.4rem;
  height: 2.4rem;
}
.button-group span {
  width: 100%;
  text-align: center;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.submit-botton {
  width: 60%;
}
.submit-botton button {
  width: 100%;
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