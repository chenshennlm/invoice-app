<!-- 组织机构名称 -->
<template>
<div class='companyname'>
    <div class="companyname_header">
        <van-nav-bar
        title="组织机构人员管理"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </div>
    <div class="companymsg">
        <van-cell-group>
  <van-field
    v-model="companyName"
    maxlength="30"
    required
    label="组织机构名称"
    placeholder="请输入组织机构名称"
  />
  <van-field
    v-model="companyCode"
    required
    readonly
    label="组织机构编码"
  />
</van-cell-group>
    </div>
    <div class="button">
    <van-button type="info" @click="keepFn">保存</van-button>

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
    companyName:"浙江衡信教育科技有限公司",
    companyCode:"666",
    
};
},
//计算属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
 keepFn(){
         this.$dialog
        .confirm({
          title: "保存确认",
          message: "是否保存组织机构基本信息",
        })
        .then(() => {
          // on confirm
        
        })
        .catch(() => {
          // on cancel
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
    // 保存
   
},
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
.companymsg{
    margin-top: 1rem;
}
.button{
    width: 100%;
    margin-top: 2rem;
    button{
        width: calc(100% - 2rem);
        margin-left: 1rem;
    }
}
</style>