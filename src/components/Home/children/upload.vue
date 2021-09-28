<!-- 票据上传页面 -->
<template>
<div class='upload'>
   <div class="upload_header">
       <van-nav-bar
  title="票据上传"
  left-arrow
  @click-left="onClickLeft"
  :fixed="true"
  :placeholder='true'
/>
   </div>
   <div style="height:4rem ">2222222</div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到components对象中才能使用
name:"Upload",
components: {},
data() {
//这里存放数据
return {

};
},

//方法集合
methods: {
    //返回首页
onClickLeft() {
    this.$router.push("/home")
    }
},

created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},

}
</script>
<style lang="less">
    .upload{
        
    }
</style>