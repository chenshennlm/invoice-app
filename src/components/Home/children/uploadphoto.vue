<!-- 上传照片 -->
<template>
  <div class="uploadphoto">
    <div class="upload_header">
      <van-nav-bar
        title="票据上传"
        left-arrow
        @click-left="onClickLeft"
        :fixed="true"
      />
      <div class="checkedAll" @click="checkedAll" v-if="checkedall">
        <span>全选</span>
      </div>
      <div class="cancleall" v-if="cancleall" @click="cancleAll">
        <span>取消全选</span>
      </div>
    </div>
    <div class="upload_header_main">
      <div class="main_header">
        <span class="business_title">业务名称：</span>
        <span class="businessname">{{ businessName }}</span>
      </div>
      <div class="upload_img">
        
        <van-checkbox-group v-model="checkboxGroup" ref="checkboxGroup">
          <!-- 未发送 -->
  
          <div class=" lists">
            <van-uploader :before-read="addInfo">
              <div class="upload_show" @click="showTypes">
                <van-icon name="plus" />
              </div>
              <!-- <van-button type="info" @click.stop="tophoto">拍照</van-button> -->
            </van-uploader>
          </div>
          <div
            class="paper-lists lists"
            v-for="item in noSentdata"
            :key="item.uuid"
          >
           <div class="imag">
            <van-checkbox :name="item.uuid">
              <img :src="item.imgUrl" alt="" @click.stop="toview" />
            </van-checkbox>
             </div>
          </div>
          <!-- 待审核 -->
          <div
            class="paper-lists lists"
            v-for="toBerevieweddata in toBerevieweddata"
            :key="toBerevieweddata.uuid"
          >
            <div class="imag">
            <van-checkbox :name="toBerevieweddata.uuid">
            
              <img :src="toBerevieweddata.imgUrl" alt="" @click.stop="toview" />

            </van-checkbox>
              </div>

          </div>
          <!-- 已发送 -->
          <div
            class="paper-lists lists"
            v-for="hasBeensentdata in hasBeensentdata"
            :key="hasBeensentdata.uuid"
          >
            <div class="imag">

            <van-checkbox :name="hasBeensentdata.uuid">
              <img :src="hasBeensentdata.imgUrl" alt="" @click.stop="toview" />
            </van-checkbox>
             </div>
          </div>
        </van-checkbox-group>
      </div>
    </div>
    <div class="upload_page" v-if="showupload"></div>
    <div class="upload_types"></div>
    <div class="upload_footer">
      <div class="left">
        <div class="upload_delete" @click="clickDelete">
          <van-icon name="delete-o" />
          <span>票据删除</span>
        </div>
        <div class="upload_change" @click="clickChange">
          <van-icon name="edit" />
          <span>信息更正</span>
        </div>
      </div>
      <div class="right" @click="clicksend">
        <van-button type="info">票据发送</van-button>
      </div>
    </div>
    <div class="Popup" v-if="changemsgshow">
      <div class="Popup_main">
        <div class="Popup_header">
          <span>新增业务</span>
        </div>
        <div class="Popup_list">
          <van-cell-group>
      
            <div class="Popup_form">
              <div class="business_date">
                <span>*</span>
                <label for="">业务日期：</label>
                <input
                  type="month"
                  format="yyyy-MM"
                  required
                  ref="dates"
                  v-model="popuptime"
                />
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
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到components对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      businessName: "2021年10月差旅费",
      showupload: true,
      showtypes: false,
      cancleall: false,
      checkedall: true,
      noSentdata: [], //未发送
      toBerevieweddata: [], //待审核
      hasBeensentdata: [], //已发送
      checkboxGroup: [],
      checked: true,
      changemsgshow: false,
      showothers: false,
      popuptime: "2021年01月", //业务时间
      selectvalue: "请选择",
      optionlist: [
        { text: "请选择" },
        { text: "差旅费" },
        { text: "招待费" },
        { text: "其他" },
      ],
    };
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    toview() {
      this.$router.push("/home/toview");
    },

    checkedAll() {
      this.cancleall = true;
      this.checkedall = false;
      this.$refs.checkboxGroup.toggleAll(true);
    },
    // 取消全选
    cancleAll() {
      this.cancleall = false;
      this.checkedall = true;
      this.$refs.checkboxGroup.toggleAll(false);
    },
    clickDelete() {
      if (this.checkboxGroup.length > 0) {
        var _this = this;
        this.$dialog
          .confirm({
            className: "dialog-add-class",
            confirmButtonColor: "#1989fa",
            message: `是否确认删除${this.checkboxGroup.length}张票据，删除后不可恢复。`,
          })
          .then(() => {
            for (let i = 0; i < _this.dataList.length; i++) {
              console.log(_this.dataList[i].uuid);
              if (this.checkboxGroup.includes(_this.dataList[i].uuid)) {
                _this.dataList.splice(i, 1);
                i--;
              }
            }

            _this.dataSorting();
            this.$toast.success("删除成功");
          })
          .catch(() => {
            // on cancel
          });
      } else {
        this.$toast("至少选中一条数据");
      }
    },
    // 信息更正
    clickChange() {
       this.showothers=false
      if (this.checkboxGroup.length == 1) {
        var _this = this;
        this.changemsgshow = true;
        for (let i = 0; i < _this.dataList.length; i++) {
          if (this.checkboxGroup.includes(_this.dataList[i].uuid)) {
            this.selectvalue = _this.dataList[i].type;
           
          }
        }
         if( this.selectvalue=='其他'){
              this.showothers=true
            }
      } else {
        this.$toast("请选择一条数据");
      }
    },
    // 选择其他时输入框出现
    changshowothers() {
      console.log(this.selectvalue);
      if (this.selectvalue == "其他") {
        this.showothers = true;
      } else {
        this.showothers = false;
      }
    },
    //点击取消关闭更改窗口

    popupclickcanle() {
      this.changemsgshow = false;
    },
    //点击确定提交更改的数据
    popupclicksure() {
      this.changemsgshow = false;
     
      if(this.$refs.dates.value!=''){
        console.log(this.selectvalue);
        if(this.selectvalue!='请选择'){

        }else{
           this.$toast.fail("请选择业务类型");
        }
      }else{
         
           this.$toast.fail("请选择日期");
        }
      console.log(this.$refs.dates.value);
    },
    // 发送票据
    clicksend() {
      if (this.checkboxGroup.length > 0) {
        this.$dialog
          .confirm({
            title: "票据发送",
            message: "是否确认发送已选择的票据",
          })
          .then(() => {
            // on confirm
            var _this = this;

            for (var i = 0; i < _this.dataList.length; i++) {
              console.log(222);
              if (this.checkboxGroup.includes(_this.dataList[i].uuid)) {
                _this.dataList[i].state = 2;
              }
            }

            _this.dataSorting();

            this.$toast.success("发送成功");
          })
          .catch(() => {
            // on cancel
          });
      } else {
        this.$toast("至少选择一条数据");
      }
    },
    onClickLeft() {
      this.$router.push("/home/upload");
    },
    showTypes() {
      this.showtypes = true;
    },
    canclephoto() {
      this.showtypes = false;
    },
    // 票据数据
    getData() {
      //state, 0 未发送， 1 待审核， 2 已发送
      this.dataList = [
        {
          uuid: "a34sda3s1d5as4d5a3sda",
          remark: "未发送",
          state: "0",
          imgUrl:
            "https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto",
          code: "15454556",
          time: "2021/10/01",
          type: "差旅费",
        },

        {
          uuid: "as564df5sd4f6s4d5as",
          remark: "待审核",
          state: "0",
          imgUrl:
            "https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto",
          code: "15454552",
          time: "2021/10/01",
          type: "差旅费",
        },
        {
          uuid: "as564df5sd4f6s4d5a6",
          remark: "待审核",
          state: "0",
          imgUrl:
            "https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto",
          code: "15454582",
          time: "2021/10/01",
          type: "其他",
        },
        {
          uuid: "d4f35s4d6fws4f5sd4f",
          remark: "已发送",
          state: "2",
          imgUrl:
            "https://img1.baidu.com/it/u=3902954602,1199377877&fm=26&fmt=auto",
          code: "15454559",
          time: "2021/10/01",
          type: "差旅费",
        },
        
      ];

      this.dataSorting();
    },
    // 数据整理
    dataSorting() {
      this.noSentdata = [];
      this.toBerevieweddata = [];
      this.hasBeensentdata = [];
      this.dataList.forEach((item) => {
        var state = parseInt(item.state);
        switch (state) {
          case 0:
            this.noSentdata.push(item);
            // this.$set(item, checked, false)
            break;
          case 1:
            // this.$set(item, checked, false)

            this.toBerevieweddata.push(item);
            break;
          case 2:
            // this.$set(item, checked, false)
            this.hasBeensentdata.push(item);
            break;
        }
      });
    },

    // 上传票据照片
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
              state: 0,
              imgUrl: data,
            };
            _this.dataList.push(item);
            _this.dataSorting();
          };
          reader.readAsDataURL(file);
        }
      }
      return false;
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.dataSorting()
  },
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getData();
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less'  scoped>
.uploadphoto {
  min-height: 621px;
  background: #fff;
}
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
.van-nav-bar__text {
  font-size: 1.6rem;
  font-weight: 600;
}
.main_header {
  height: 4rem;
  line-height: 4rem;
  width: (100% - 2rem);
  margin-left: 1rem;
  .business_title {
    font-size: 1.2rem;
    color: #999;
  }
  .businessname {
    font-size: 1.6rem;
    color: #333;
  }
}
.upload_show {
  width: 10rem;
  height: 10rem;
  background: #f7f7f7;
  position: relative;
  margin-top: 1rem;
  .van-icon {
    position: absolute;
    font-size: 3rem;
    top: 50%;
    left: 50%;
    margin-top: -1.5rem;
    margin-left: -1.5rem;
  }
}
.upload_img {
  
  .lists {
    display: inline-block;
    margin-left: 1.7rem;
  }
}
.paper-lists {
  width: 10rem;
  height: 10rem;
  // background: #f7f7f7;
  background: url('../../../assets/woodiness.png');
  margin-top: 1rem;
  position: relative;
  .van-icon {
    font-size: 3rem;
    color: #108ee9;
  }
 
  
}
.van-checkbox{
   height: 10rem;
    width: 10rem;
display: inline-block;
    
}
 .imag{
    height: 10rem;
    width: 10rem;
  position: relative;

  }
img {
    width: 8rem;
    height: 5rem;
position: absolute;
top: 50%;
left: 50%;
margin-top: -2.5rem;
margin-left: -4rem;
  }
.upload_footer {
  height: 6rem;
  width: 100%;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  background: #fff;
  .right {
    flex: 2;
    padding: 0 0.5rem;
    margin-top: 1rem;

    .van-button {
      width: 23rem;
    }
  }
  .left {
    flex: 1;
    display: flex;
    text-align: center;
    .upload_delete {
      margin-top: 1rem;

      display: flex;
      flex-direction: column;
      color: #666;

      padding: 0 1rem;
      i {
        font-size: 2rem;
      }
      span {
        font-size: 1.2rem;
      }
    }
    .upload_change {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      color: #666;

      i {
        font-size: 2rem;
      }
      span {
        font-size: 1.2rem;
      }
    }
  }
}
/deep/ .van-notify {
  height: 16rem;
  width: 30rem;
  left: 50%;
  margin-left: -15rem;
  position: absolute;
  top: 50%;
  margin-top: -8rem;
  color: #666;
  border: 1px solid #666;
  z-index: 9999;
}
.slected {
  width: 2rem;
  height: 2rem;
  background: #fff;
  border: 1px solid #999;
  overflow: hidden;
  position: absolute;
  top: 0;
}
.paper-lists .van-icon {
  border-radius: 0;
  font-size: 3.2rem;
  position: relative;
  top: -0.5rem;
  left: -0.7rem;
}
.cancleall,
.checkedAll {
  position: absolute;
  z-index: 999;
  font-size: 1.6rem;
  font-weight: 600;
  color: #1989fa;
  top: 3.4rem;
  right: 1rem;
}
.uploadimg-msk {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.uploadimg-typesmain {
  padding: 1rem;
  width: 30rem;
  height: 20rem;
  background: #fff;
  border: 1px solid #ccc;
  position: fixed;
  top: 50%;
  margin-top: -10rem;
  left: 50%;
  margin-left: -15rem;
  z-index: 999;
  .uploadimg-header {
    span {
      font-size: 1.6rem;
      font-weight: 600;
    }
  }
}
.uploadimg-types {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  .van-button--info {
    width: 14rem;
  }
}
.cancle {
  width: calc(100% - 2rem);
  margin-left: 1rem;
  margin-top: 2rem;
  .van-button--default {
    width: 100%;
  }
}
.upload_header_main {
  margin-top: 2.4rem;
}
/deep/.van-checkbox__icon {
  position: absolute;
  top: 0;
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
</style>