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
        <div class="upload_show" @click=" showTypes">
          <van-icon name="plus" />
        </div>
        <div
          class="paper-lists"
          v-for="(item, index) in paperlists"
          :key="index"
          @click="toview"
        >
        <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.66lc.com%2Fbmkx%2F202004%2FW020200411516791522426.jpg&refer=http%3A%2F%2Fwww.66lc.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636254922&t=3fd42b88ab112891efaeba339e32dd0e" alt="">
        <div class="slected" 
          @click.stop="changechecked(index)"
        >
          <van-icon name="checked" v-if="item.checked" />
        </div>
        </div>
        <!-- <div class="paper-lists">
            <van-icon name="checked" />
        </div> -->
        <!-- <div class="paper-lists"></div>
        <div class="paper-lists"></div>
        <div class="paper-lists"></div> -->
        <!-- <div class="paper-lists"></div> -->
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
   <div class="uploadimg-msk" v-if="showtypes">
      <div class="uploadimg-typesmain">
        <div class="uploadimg-header">
          <span>上传方式</span>
        </div>
        <div class="uploadimg-types">
          <van-button type="info"  @click.stop="tophoto">拍照</van-button>
          <van-button type="info">手机相册上传</van-button>
        </div>
        <div class="cancle" @click=" canclephoto">
          <van-button type="default">取消</van-button>
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
      paperlists: [
        {
          checked: true,
        },
        {
          checked: true,
        },
      ],
      showtypes: false,
      cancleall:false,
      checkedall:true
    };
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    toview(){
      this.$router.push('/home/toview')
    },
    // 拍照
    tophoto(){
      this.$router.push("/home/photograph")
    },
     checkedAll(){
      this.cancleall=true
      this.checkedall=false
      this. paperlists.forEach(item=>{
       item.checked=true
     })
    },
    // 取消全选
    cancleAll(){
      this.cancleall=false
      this.checkedall=true
      this. paperlists.forEach(item=>{
       item.checked=false
     })
    },
    changechecked(index) {
      this.paperlists[index].checked = !this.paperlists[index].checked;
      console.log(this.paperlists[index].checked);
    },
    clickDelete() {
      this.$dialog
        .confirm({
          title: "删除确认",
          message: "是否确认删除选中的票据，删除后不能恢复",
        })
        .then(() => {
          // on confirm
          console.log("删除成功");
                              this.$toast.success("删除成功");

        })
        .catch(() => {
          // on cancel
          console.log("取消删除");
        });
    },
    clickChange() {
          
      console.log("点击修改按钮");
    },
    clicksend(){
        this.$dialog
        .confirm({
          title: "票据发送",
          message: "是否确认发送已选择的票据",
        })
        .then(() => {
          // on confirm
          console.log("删除成功");
         this.$toast.success("发送成功");
        })
        .catch(() => {
          // on cancel
        });
    },
    onClickLeft(){
      this.$router.push('/home/upload')
    },
    showTypes(){
      this.showtypes=true
    },
    canclephoto(){
      this.showtypes=false
    }
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less'  scoped>
.uploadphoto{
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
  display: flex;
  flex-wrap: wrap;
  width: (100% - 2rem);

  justify-content: space-around;
}
.paper-lists {
  width: 10rem;
  height: 10rem;
  background: #f7f7f7;
  margin-top: 1rem;
  position: relative;
  .van-icon {
    font-size: 3rem;
    color: #108ee9;
  }
  img{
    width: 10rem;
    height: 10rem;
  }
}
// #app {
//   background: #fff;
// }
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
.slected{
  width: 2rem;
  height: 2rem;
  background: #fff;
  border: 1px solid #999;
  overflow: hidden;
  position: absolute;
  top: 0;
}
.paper-lists .van-icon {
  border-radius:0 ;
  font-size: 3.2rem; ;
  position: relative;
  top: -0.5rem;
  left: -0.7rem;
}
.cancleall,.checkedAll{
  position: absolute;
  z-index: 999;
  font-size: 1.6rem;
  font-weight:600 ;
  color: #1989fa;
  top: 3.4rem;
  right: 1rem;
}
.uploadimg-msk{
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.uploadimg-typesmain{
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
  .uploadimg-header{
    span{
      font-size: 1.6rem;
      font-weight: 600;
    }
  }
}
.uploadimg-types{
  display: flex;
  justify-content: space-around;
 margin-top: 2rem;
  .van-button--info{
    width: 14rem;
  }
}
.cancle{
  width: calc(100% - 2rem);
  margin-left: 1rem;
  margin-top: 2rem;
  .van-button--default{
     width: 100%; 
   }
}
.upload_header_main{
  margin-top: 2.4rem;
}
</style>