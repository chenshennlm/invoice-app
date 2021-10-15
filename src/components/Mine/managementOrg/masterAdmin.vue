<!-- 主管理员界面 -->
<template>
<div class='masteradmin'>
    <div class="masteradmin-header">
 <van-nav-bar
        title="组织机构管理"
        left-arrow
  @click-left="$router.go(-1)"
        :fixed="true"
      />
    </div>
   <div class="masteradmin-main">
       <van-cell
       v-if="this.$route.query.level==1"
        title="代理记账机构编码" is-link value="112112" @click="$router.push('/mine/masteroutfit')" />
         <van-cell
       v-if="this.$route.query.level==2"
        title="代理记账机构编码"  value="112112" />

       <van-cell 
       @click="$router.push('/mine/companyname')"
       v-if="this.$route.query.level==1"
       
       title="组织机构名称管理"  is-link value="浙江衡信教育科技有限公司" />
       <van-cell 
       v-if="this.$route.query.level==2||this.$route.query.level==3"
       title="组织机构名称管理"   value="浙江衡信教育科技有限公司" />

       <van-cell
       v-if="this.$route.query.level==1||this.$route.query.level==2"
        title="组织机构人员管理" is-link value="10"
        @click="topeoplepage"
         />

   </div>
   <div class="sign-out"
       v-if="this.$route.query.level==2||this.$route.query.level==3"
   
   >
       <van-button type="danger" @click="signout">退出管理组织</van-button>
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
    show:true,
    level:''
};
},
//计算属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    signout(){
       this.$dialog.confirm({
  title: '确认',
  message: '确定要退出组织吗？',
})
  .then(() => {
    // on confirm
  })
  .catch(() => {
    // on cancel
  });
    },
    // 判定什么跳转页面
    topeoplepage(){
        console.log(this.level);
        if(this.level==1){
            this.$router.push({name:'masterchangepeople',query:{level:this.level}})
        }else if(this.level==2){
            this.$router.push({name:'secondadmin',query:{level:this.level}})
        }
    }

},
beforeCreate() {}, //生命周期 - 创建之前
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
beforeMount() {}, //生命周期 - 挂载之前
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    console.log(this.$route.query.level);
    this.level=this.$route.query.level
},
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  lang="less" scoped>
.masteradmin{
    position: relative;
}
/deep/.van-nav-bar__title{
    font-weight: 600;
    font-size: 1.8rem;
}
.van-nav-bar /deep/.van-icon {
    color: #333;
    font-size: 2rem;
}
.masteradmin-main{
   
    position: absolute;
    width: 100%;
    top: 7rem;
}
/deep/.van-cell__value{
    font-size: 1.3rem;
}
/deep/.van-cell__right-icon{
    font-size: 1.4rem;
}
.van-cell__value {
top:-0.2rem;
}
.sign-out{
    position: fixed;
    bottom: 1rem;
    width: calc(100% - 2rem);
    margin-left: 1rem;
    .van-button--danger{
        width: 100%;
    }
}
</style>