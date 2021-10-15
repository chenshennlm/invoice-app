<template>
  <div id="invoiceEdit">
    <van-nav-bar
      title="票据审核"
      left-arrow
      right-text=""
      @click-left="$router.go(-1)"
    >
      <template #left>
        <van-icon name="arrow-left" color="#666666" size="16" />
      </template>
      <template #right>

      </template>
    </van-nav-bar>
    <div class="page-content">
      <div class="my-card first-card">
        <div>
          <span class="pj-item-label">业务名称</span>
          <span class="pj-item-content">{{ businessInfo.title }}</span>
        </div>
        <div>
          <span class="pj-item-label">上传人</span>
          <span class="pj-item-content">{{ businessInfo.declarant }}</span>
        </div>
      </div>
      <div class="pj-item">
        <div
          :class="active == 0 ? 'is-active' : 'no-active'"
          @click="active = 0"
        >
          待审核
        </div>
        <div
          :class="active == 1 ? 'is-active' : 'no-active'"
          @click="active = 1"
        >
          审核记录（未报送）
        </div>
      </div>
      <div v-if="active == 0">
        <van-checkbox-group
          v-model="checkboxGroup"
          ref="checkboxGroup"
          direction="horizontal"
        >
          <div class="my-card" v-if="noHandleDatas.length > 0">
            <div class="my-card-title">未处理</div>
            <div class="my-card-content">
              <div
                class="my-card-item"
                v-for="(item, index) in noHandleDatas"
                :key="index"
              >
                <van-checkbox :name="item.uuid" shape="square">
                  <div
                    class="my-card-item-left"
                    @click.stop="showPhoto(item.imgUrl)"
                  >
                    <img :src="item.imgUrl" alt="" />
                  </div>
                </van-checkbox>
                <div class="my-card-item-center">
                  <div>{{ item.remark }}</div>
                  <div>编号：{{ item.code }}</div>
                  <div>时间：{{ item.time }}</div>
                </div>
                <div class="my-card-item-right">
                  <van-button type="default" @click="returnInfo(item, index)">
                    退回
                  </van-button>
                  <van-button type="danger" @click="deleteInfo(item)">
                    删除
                  </van-button>
                  <van-button type="info" @click="passInfo(item)"
                    >通过</van-button
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="my-card" v-if="noExamineDatas.length > 0">
            <div class="my-card-title">待审核</div>
            <div class="my-card-content">
              <div
                class="my-card-item"
                v-for="(item, index) in noExamineDatas"
                :key="index"
              >
                <van-checkbox :name="item.uuid" shape="square">
                  <div
                    class="my-card-item-left"
                    @click.stop="showPhoto(item.imgUrl)"
                  >
                    <img :src="item.imgUrl" alt="" />
                  </div>
                </van-checkbox>
                <div class="my-card-item-center">
                  <div>{{ item.remark }}</div>
                  <div>编号：{{ item.code }}</div>
                  <div>时间：{{ item.time }}</div>
                </div>
                <div class="my-card-item-right">
                  <van-button type="default" @click="returnInfo(item, index)">
                    退回
                  </van-button>
                  <van-button type="danger" @click="deleteInfo(item)">
                    删除
                  </van-button>
                  <van-button type="info" @click="passInfo(item)"
                    >通过</van-button
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="my-card" v-if="replacedDatas.length > 0">
            <div class="my-card-title my-card-header">
              <span>已替换</span>
            </div>
            <div class="my-card-content">
              <div
                class="my-card-item"
                v-for="(item, index) in replacedDatas"
                :key="index"
              >
                <van-checkbox :name="item.uuid" shape="square">
                  <div
                    class="my-card-item-left"
                    @click.stop="showPhoto(item.imgUrl)"
                  >
                    <img :src="item.imgUrl" alt="" />
                  </div>
                </van-checkbox>
                <div class="my-card-item-center">
                  <div>{{ item.remark }}</div>
                  <div>编号：{{ item.code }}</div>
                  <div>时间：{{ item.time }}</div>
                </div>
                <div class="my-card-item-right">
                  <span class="img-link" @click.stop="showPhoto(item.oldImgUrl)"
                    >原始凭证</span
                  >

                  <van-button type="default" @click="returnInfo(item, index)">
                    退回
                  </van-button>
                  <van-button type="danger" @click="deleteInfo(item)">
                    删除
                  </van-button>
                  <van-button type="info" @click="passInfo(item)">
                    通过
                  </van-button>
                </div>
              </div>
            </div>
          </div>
          <div class="my-card" v-if="deletedDatas.length > 0">
            <div class="my-card-title">已删除</div>
            <div class="my-card-content">
              <div
                class="my-card-item"
                v-for="(item, index) in deletedDatas"
                :key="index"
              >
                <van-checkbox :name="item.uuid" shape="square">
                  <div
                    class="my-card-item-left"
                    @click.stop="showPhoto(item.imgUrl)"
                  >
                    <img :src="item.imgUrl" alt="" />
                  </div>
                </van-checkbox>
                <div class="my-card-item-center">
                  <div>{{ item.remark }}</div>
                  <div>编号：{{ item.code }}</div>
                  <div>时间：{{ item.time }}</div>
                </div>
                <div class="my-card-item-right">
                  <van-button type="default" @click="returnInfo(item, index)">
                    退回
                  </van-button>
                  <van-button type="danger" disabled @click="deleteInfo(item)">
                    删除
                  </van-button>
                  <van-button type="info" @click="passInfo(item)"
                    >通过</van-button
                  >
                </div>
              </div>
            </div>
          </div>
        </van-checkbox-group>
        <div class="page-footer">
          <div class="button-group">
            <van-checkbox v-model="checked" @click="handleClick" shape="square">
              全选
            </van-checkbox>
          </div>
          <div class="button-group" @click="deleteMore">
            <van-icon name="delete-o" size="22" />
            <span>批量删除</span>
          </div>
          <div class="button-group" @click="returnMore">
            <img src="../../../assets/return.png" alt="" />
            <span>批量退回</span>
          </div>
          <div class="submit-botton" @click="passMore">
            <van-button type="info">批量通过</van-button>
          </div>
        </div>
      </div>
      <div v-if="active == 1">
        <div class="my-card" v-if="noSubmittedDatas.length > 0">
          <div class="my-card-title">未报送</div>
          <div class="my-card-content">
            <div
              class="my-card-item"
              v-for="(item, index) in noSubmittedDatas"
              :key="index"
            >
              <div
                class="my-card-item-left"
                @click.stop="showPhoto(item.imgUrl)"
              >
                <img :src="item.imgUrl" alt="" />
              </div>
              <div class="my-card-item-center my-card-item-centerII">
                <div>{{ item.remark }}</div>
                <div>{{stateBase[item.state]}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="my-card" v-if="submittedDatas.length > 0">
          <div class="my-card-title">已报送</div>
          <div class="my-card-content">
            <div
              class="my-card-item"
              v-for="(item, index) in submittedDatas"
              :key="index"
            >
              <div
                class="my-card-item-left"
                @click.stop="showPhoto(item.imgUrl)"
              >
                <img :src="item.imgUrl" alt="" />
              </div>
              <div class="my-card-item-center my-card-item-centerII">
                <div>{{ item.remark }}</div>
                <div>{{stateBase[item.state]}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="page-footer">
          <div class="submit-botton" @click="handleSubmitted">
            <van-button type="info">报送</van-button>
          </div>
        </div>
      </div>
    </div>

    <van-dialog
      v-model="show"
      title="退回备注"
      confirm-button-color="#1989fa"
      :show-confirm-button="false"
    >
      <van-form ref="form" validate-first @submit="onSubmit">
        <van-cell is-link @click="popupShow = true" center>
          <van-field
            v-model="reason"
            readonly
            label="退回原因"
            name="reason"
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
        <van-cell v-if="reason == '其他'">
          <van-field
            v-model="otherReason"
            label="其它原因"
            name="otherReason"
            placeholder="请输入其它退回原因"
            :rules="[{ required: true, message: '' }]"
          />
        </van-cell>
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

const stateBase = ["未处理", "新增", "已替换", "已删除", "未报送", "已报送"];
export default {
  name: "InvoiceExamine",
  data() {
    return {
      active: 0,
      dataList: [],
      noHandleDatas: [], //未处理
      noExamineDatas: [], //新增
      replacedDatas: [], //已替换
      deletedDatas: [], //已删除
      noSubmittedDatas: [], //未报送
      submittedDatas: [], //已报送
      stateBase,
      maxSize: 1024 * 1024 * 5,
      show: false, //是否展出弹框层
      calendarShow: false, //是否弹出日期选择
      popupShow: false, //是否弹出业务类型选择
      reason: "",
      otherReason: "",
      columns: [],
      businessInfo: undefined,
      checkboxGroup: [],
      checked: false,
      batchProcessing: [], //退回的数据id
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
        uuid: "",
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
      //state, 0 未处理， 1 待审核， 2 已替换， 3 已删除
      this.dataList = [
        {
          uuid: "a34sda3s1d5as4d5a3sda",
          remark: "发票重开",
          state: "0",
          imgUrl:
            "https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto",
          code: "15454556",
          time: "2021/10/01",
        },
        {
          uuid: "as564df5sd4f6s4d5as",
          remark: "新增票据",
          state: "1",
          imgUrl:
            "https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto",
          code: "15454556",
          time: "2021/10/01",
        },
        {
          uuid: "d4f35s4d6fws4f5sd4f",
          remark: "发票重开",
          state: "2",
          imgUrl:
            "https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto",
          oldImgUrl:
            "https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto",
          code: "15454556",
          time: "2021/10/01",
        },
        {
          uuid: "wt46s5415sd64fsdf",
          remark: "发票重开",
          state: "2",
          imgUrl:
            "https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto",
          oldImgUrl:
            "https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto",
          code: "15454556",
          time: "2021/10/01",
        },
        {
          uuid: "dgs6zdfg6+5s5f6+sf",
          remark: "发票重开",
          state: "3",
          imgUrl:
            "https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto",
          code: "15454556",
          time: "2021/10/01",
        },
      ];
      this.dataCarding();
    },
    //数据梳理
    dataCarding() {
      this.noHandleDatas = [];
      this.noExamineDatas = [];
      this.replacedDatas = [];
      this.deletedDatas = [];
      this.noSubmittedDatas = [];
      this.submittedDatas = [];
      this.dataList.forEach((item) => {
        var state = parseInt(item.state);
        switch (state) {
          case 0:
            this.noHandleDatas.push(item);
            break;
          case 1:
            this.noExamineDatas.push(item);
            break;
          case 2:
            this.replacedDatas.push(item);
            break;
          case 3:
            this.deletedDatas.push(item);
            break;
          case 4:
            this.noSubmittedDatas.push(item);
            break;
          case 5:
            this.submittedDatas.push(item);
            break;
        }
      });
    },
    //单个退回
    returnInfo(param, index = -1) {
      this.batchProcessing = [param.uuid];
      this.show = true;
    },
    //单个状态改为已删除
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

    //通过
    passInfo(param) {
      var _this = this;
      this.$dialog
        .confirm({
          className: "dialog-add-class",
          confirmButtonColor: "#1989fa",
          message: "是否确认通过？",
        })
        .then(() => {
          console.log("通过", param);
          param.state = 4;

          _this.dataCarding();

          Toast.success("已通过");
        })
        .catch(() => {
          // on cancel
        });
    },
    //图片展示
    showPhoto(imgUrl) {
      ImagePreview([imgUrl]);
    },

    //全选/取消全选
    handleClick() {
      this.$refs.checkboxGroup.toggleAll({
        checked: this.checked,
        skipDisabled: true, //跳过禁用
      });
    },

    //新增
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
    //批量删除
    deleteMore() {
      if (this.checkboxGroup.length > 0) {
        var _this = this;
        this.$dialog
          .confirm({
            className: "dialog-add-class",
            confirmButtonColor: "#1989fa",
            message: `是否确认删除${this.checkboxGroup.length}张票据，删除后不可恢复。`,
          })
          .then(() => {
            // console.log("删除", param.uuid);
            _this.dataList.forEach((item) => {
              if (this.checkboxGroup.includes(item.uuid)) {
                item.state = 3;
              }
            });
            _this.dataCarding();

            Toast.success("删除成功");
            this.checkboxGroup = [];
            this.checked = false;
          })
          .catch(() => {
            // on cancel
          });
      } else {
        Toast("至少选中一条数据");
      }
    },
    //批量退回
    returnMore() {
      if (this.checkboxGroup.length > 0) {
        this.batchProcessing = JSON.parse(JSON.stringify(this.checkboxGroup));
        this.show = true;
      } else {
        Toast("至少选中一条数据");
      }
    },
    passMore() {
      if (this.checkboxGroup.length > 0) {
        var _this = this;
        this.$dialog
          .confirm({
            className: "dialog-add-class",
            confirmButtonColor: "#1989fa",
            message: `是否确认通过${this.checkboxGroup.length}张票据，通过后请尽快报送。`,
          })
          .then(() => {
            _this.dataList.forEach((item) => {
              if (this.checkboxGroup.includes(item.uuid)) {
                item.state = 4;
              }
            });
            _this.dataCarding();

            Toast.success("已通过");
            this.checkboxGroup = [];
            this.checked = false;
          })
          .catch(() => {
            // on cancel
          });
      } else {
        Toast("至少选中一条数据");
      }
    },
    //表单取消
    dialogCancel() {
      this.show = false;
      this.resetForm();
    },
    //picker选中
    onConfirm(value) {
      console.log(value);
      this.reason = value;
      this.popupShow = false;
      if (value == "其他") {
      }
    },
    //退回弹窗提交
    onSubmit(values) {
      this.show = false;
      console.log(values, "88888888888");
      this.dataList.forEach((item) => {
        if (this.batchProcessing.includes(item.uuid)) {
          item.state = 0; //退回之后数据状态变为未处理（只上传人可见）
        }
      });

      this.dataCarding();
      this.checkboxGroup = [];
      this.batchProcessing = [];
      this.checked = false;
      this.resetForm();
    },
    //重置表单
    resetForm() {
      this.otherReason = "";
      this.reason = "";
      this.$refs.form.resetValidation(); //重置表单验证
    },

    //报送
    handleSubmitted() {
      this.dataList.forEach((item) => {
        if (item.state == 4) {
          item.state = 5;
        }
      });
      this.dataCarding();
      Toast.success("报送成功");
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
.nav-right-style {
  font-size: 1.6rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #108ee9;
}
.first-card {
  margin: 1.6rem 1.6rem 0 1.6rem !important;
}
.pj-item {
  padding: 1.6rem;
  background-color: #f7f8fa;
  display: flex;
  align-items: flex-end;
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
  width: calc(100% - 12rem);
  min-height: 8rem;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  font-family: PingFangSC-Regular, PingFang SC;
}
.my-card-item-centerII {
  flex-grow: 1;
  margin-left: 1rem;
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
  /* width: calc(100% - 21rem); */
  flex-grow: 1;
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
.is-active {
  font-size: 2rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #108ee9;
  margin-right: 1.6rem;
}
.no-active {
  font-size: 1.6rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  margin-right: 1.6rem;
}
</style>