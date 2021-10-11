<!--  -->
<template>
<div class='toview'>
    <div class="toview-main">
              <van-nav-bar
        title="票据查看"
        left-arrow
        @click-left="onClickLeft"
        :fixed="true"
      />
      <span>票据编码：516131654164</span>
    </div>
    <div class="toview-img">
        <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.66lc.com%2Fbmkx%2F202004%2FW020200411516791522426.jpg&refer=http%3A%2F%2Fwww.66lc.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636254922&t=3fd42b88ab112891efaeba339e32dd0e" alt="">
    </div>
    <div class="toview-foot">
<van-button @click="deletebill" type="danger">票据删除</van-button>
<van-button type="default">票据发送</van-button>
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

};
},
//计算属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    
onClickLeft() {
      this.$router.push("/home/uploadphoto");
    },
    // 点击删除该票据
    deletebill(){
      this.$dialog
        .confirm({
          title: "删除确认",
          message: "是否删除该票据，删除后不能恢复",
        })
        .then(() => {
          // on confirm
          console.log("删除成功");
          this.$notify({
            message: "删除成功",
            background: "#fff",
            duration: 10000,
          });
        })
        .catch(() => {
          // on cancel
          console.log("取消删除");
        });
    }
},
beforeCreate() {}, //生命周期 - 创建之前
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
beforeMount() {}, //生命周期 - 挂载之前
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less'  scoped>
/deep/.van-notify {
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
.toview-main{
  span{
    color: #fff;
     position: fixed;
    z-index: 9999;
    top: 3rem;
    left: 50%;
     transform: translate(-50%);
  }
}
.van-nav-bar{
  background: #000;  
}
.van-nav-bar /deep/.van-icon{
  color: #fff;
  font-size: 2rem;
}
/deep/.van-nav-bar__title{
  color: #fff;
}

.toview-img{
  margin-top: 4.5rem;
  background:#000;
  padding: 2rem 0;
  min-height: 58rem;
  img{
    height: 52rem;
    width: 100%;
  }
}
.toview-foot{
  width: 100%;
  padding: 1rem 0;
  position: fixed;
  bottom: 0;
  background: #000;
  display: flex;
  justify-content: space-around;
  .van-button--default,.van-button--danger  {
    height: 4rem;
    width: 15rem;
  }
}
</style>