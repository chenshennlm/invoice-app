<!-- 副管理员管理界面 -->
<template>
<div class='secondadmin'>
  <div class="secondadmin_header">
      <van-nav-bar
        title="组织人员管理"
        left-arrow
  @click-left="$router.go(-1)"
        :fixed="true"
      />
  </div>
   <div class="people_list">
      <van-list >
        <van-swipe-cell v-for="(item, index) in list" :key="index">
          <van-cell :border="false" :title="`${item.name}(${item.phone})`">
            <template #default>
              <span class="diy-content">{{ item.identity }}</span>
            </template>
          </van-cell>
          <template #right>
            <van-button
              square
              type="danger"
              text="删除"
              @click="deletepeople"
            />
          </template>
        </van-swipe-cell>
      </van-list>
    </div>
    <div class="footer">
      <van-button type="info" @click="addshowfn">人员新增</van-button>
    </div>
      <div class="addpeople">
      <van-dialog 
      v-model="addshow" title="人员新增" show-cancel-button>
      
        <div class="account_type">
          <label for="">账号类型：</label>
          <select ref="accounttypes">
            <option value="">请选择</option>
            <option
              value=""
              v-for="(item, index) in accountnumbers"
              :key="index"
            >
              {{ item.type }}
            </option>
          </select>
        </div>
        <div style="height:3rem">
<div class="account_num" v-if="showphone">
          <label for="">手机账号：</label>
          <select name="" id="" ref="phonecode">
            <option value="">请选择</option>
            <option value="">手机号</option>
            <option value="">手机号</option>
          </select>
        </div>
        <div class="account_num" v-if="showpt"> 
          <label for="">平台账号：</label>
          <select name="" id="" ref="ptcode">
            <option value="">请选择</option>
            <option value="">平台账号</option>
            <option value="">平台账号</option>
          </select>
        </div>
        </div>
        
      </van-dialog>
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
      addshow: false,

   changepelpleshow: false,
      showphone:false,
      showpt:false,
      accountnumbers: [
        {
          type: "手机账号",
        },
        {
          type: "平台账号",
        },
      ],
 list: [
        {
          name: "张三",
          phone: 18237296548,
          identity: "职员",
          level: 3,
        },
        {
          name: "王五",
          phone: 1235456454,
          identity: "职员",
          level: 3,
        },
      ],
};
},
//计算属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  addshowfn() {
      this.addshow = true;
    },
  // 删除人员
  deletepeople(index){
     this.$dialog
        .confirm({
          title: "确认删除",
          message: "是否删除该人员，删除后不可恢复",
        })
        .then(() => {
          // on confirm
          console.log(111);
          this.list.splice(index, 1);
          this.$toast.success("删除成功");
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

},
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
  .secondadmin_header{
    height: 7.2rem;
  }
  .people_list{
    margin-top: 1rem;
  }
  .footer{
    position: fixed;
    bottom: 0;
    padding: 1rem;
    background: #fff;
    width: 100%;
    .van-button--normal{
      width: calc(100% - 2rem);
    }
  }
  .account_type,.account_num {
  height: 3rem;
  text-align: center;
  padding: 1rem;
  select {
    padding: 0.5rem;
    width: 16rem;
  }
}
</style>