<!-- 代账机构管理 -->
<template>
  <div class="agentaccount">
    <div class="agentaccount_header">
      <van-nav-bar
        title="代理记账机构编码"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </div>
    <div class="companycode">
      <span>代理记账机构编码</span>
      <span>123456789</span>
    </div>
    <div class="applys">
      <div class="apply_main">
        <div class="apply_header">
          <span>待确认</span>
        </div>
        <div class="applyname">
          <span class="nametext">代理记账机构名称</span>
          <div class="apply_but">
            <van-button type="danger" @click="clickrefuse">拒绝</van-button>
            <van-button type="info" @click="clickconfirm">同意</van-button>
          </div>
        </div>
      </div>
    </div>
    <div class="foot"></div>
    <div class="agent_foot">
      <van-button @click="disassociate">取消编码</van-button>
      <van-button @click="changecode">修改编码</van-button>
    </div>
    <van-dialog
  :before-close="beforeclose"
     v-model="show" title="代理记账机构编码" show-cancel-button>
   <div class="dialog_main">
      <label for="">代理记账机构编码：</label>
    <input type="text" placeholder="请输入机构编码">
   </div>
</van-dialog>
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
      show:false,
      agentcode:""
    };
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {

    // 取消关联记账机构
    disassociate() {
        this.$dialog
        .confirm({
          title: "取消编码",
          message: "是否确认取消与该机构的关联，取消后将不能发送票据",
        })
        .then(() => {
          // on confirm
         this.$toast.success("取消关联成功")
        })
        .catch(() => {
          // on cancel
        });
    },

    clickrefuse() {
      this.$dialog
        .confirm({
          title: "拒绝确认",
          message: "是否拒绝该机构的关联请求",
        })
        .then(() => {
          // on confirm
         this.$toast.success("已拒绝")
        })
        .catch(() => {
          // on cancel
        });
    },
    clickconfirm() {
      this.$dialog
        .confirm({
          title: "同意确认",
          message: "是否确认与该机构进行关联，关联后票据可直接报送",
        })
        .then(() => {
         this.$toast.success("关联成功")
        })
        .catch(() => {
          // on cancel
        });
    },
    // 修改代理记账机构编码
    changecode(){
      this.show=true
    },
    beforeclose(e,f){
      if(e==="confirm"){
        this.$toast.success("修改成功")
        f()
      }
      else if(e==="cancel"){
f()
    }
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
<style lang="less" scoped>
.van-nav-bar /deep/.van-icon {
  color: #333;
  font-size: 2rem;
}
/deep/.van-nav-bar__title {
  font-size: 1.6rem;
  font-weight: 600;
}
.companycode {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  width: calc(100% - 4rem);
  margin-left: 1rem;
  background: #fff;
  margin-top: 1.5rem;
  span:nth-child(1) {
    font-size: 1.6rem;
  }
  span:nth-child(2) {
    font-size: 1.4rem;
    color: #999;
  }
}
.applys {
  background: #fff;
  width: calc(100% - 4rem);
  margin-left: 1rem;
  margin-top: 1.5rem;
  padding: 1rem;
  .apply_main {
    .apply_header {
      padding-bottom: 1rem;
      font-size: 1.8rem;
      border-bottom: 1px solid #f7f8fa;
      font-weight: 600;
    }
    .applyname {
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      font-size: 1.6rem;
      color: #666;
      .nametext {
        margin-top: 1rem;
      }
    }
  }
}
.agent_foot {
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: #fff;
  padding: 1rem 0; 
  position: fixed;
  bottom: 0;
  .van-button--normal:nth-child(1) {
    background: rgba(192, 221, 252, 0.8);
    color: #108ee9;
    width: 16rem;
  }
  .van-button--normal:nth-child(2) {
    background: #108ee9;
    color: #fff;
    width: 16rem;
  }
}

.van-notify {
  width: 30rem;
  height: 20rem;
  position: fixed;
  top: 50%;
  margin-top: -10rem;
  left: 50%;
  margin-left: -15rem;
}
.dialog_main{
  display: flex;
  padding: 1rem;
  height: 4rem;
  label{
    font-size: 1.6rem;
    line-height: 4rem;
  }
  input{
    width: 14rem;
    height: 2rem;
    outline: none;
    border: 1px solid #ccc;
    color: #666;
    padding: 0.5rem 0;
    margin-top: 0.5rem;
  }
}
input::-webkit-input-placeholder { 
        color: #ccc;
        font-size: 1.4rem;
}
</style>