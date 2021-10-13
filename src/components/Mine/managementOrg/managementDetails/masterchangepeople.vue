<!-- 组织机构人员管理 -->
<template>
  <div class="peson_management">
    <div class="management_header">
      <van-nav-bar
        title="组织机构人员管理"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <div class="dissolution">
        <span>解散</span>
      </div>
    </div>
    <div class="people_list">
      <van-list :finished="finished" finished-text="没有更多了">
        <van-swipe-cell v-for="(item, index) in list" :key="index">
          <van-cell :border="false" :title="`${item.name}(${item.phone})`">
            <template #default>
              <span class="diy-content">{{ item.identity }}</span>
            </template>
          </van-cell>
          <template #right>
            <van-button square type="danger" text="删除" @click="deletepeople" />
            <van-button
              v-if="item.level == 3&&level==1"
              square
              type="info"
              text="设为管理员"
              @click="setadmin(index)"
            />
            <van-button
              v-if="item.level == 2&&level==1"
              square
              type="info"
              text="取消管理员"
              @click="cancleadmin(index)"
            />
          </template>
        </van-swipe-cell>
      </van-list>
    </div>
    <div class="buttom">
     <div  class="buttom_main">
          <van-button>更换企业管理员</van-button>
      <van-button type="primary">人员新增</van-button>
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
      list: [
        {
          name: "张三",
          phone: 18237296548,
          identity: "管理员",
          level: 2,
        },
        {
          name: "王五",
          phone: 1235456454,
          identity: "职员",
          level: 3,
        },
      ],
      loading: false,
      finished: false,
      level:""
    };
  },
  //计算属性 类似于data概念
  computed: {
      
  },
  //监控data中的数据变化
  watch: {
      
  },
  //方法集合
  methods: {
    //    设为管理员
    setadmin(index) {
      console.log(index);
      this.list[index].level = 2;
      this.list[index].identity = "管理员";
    },
    cancleadmin(index) {
      this.list[index].level = 3;
      this.list[index].identity = "职员";
    },
    // 删除人员
    deletepeople(index){
      this.$dialog.confirm({
  title: '确认删除',
  message: '是否删除该人员，删除后不可恢复',

})
  .then(() => {
    // on confirm
    this.list.splice(index,1)
    this.$toast.success('删除成功')
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
      this.level=this.$route.query.level

  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.management_header {
  position: relative;
}
/deep/.van-nav-bar .van-icon {
  font-size: 1.6rem;
  color: #333;
}
/deep/.van-nav-bar__title {
  font-size: 1.8rem;
  font-weight: 600;
}
.dissolution {
  position: absolute;
  right: 2rem;
  top: 3.9rem;
  z-index: 999;
  span {
    font-size: 1.6rem;
    color: #108ee9;
    font-weight: 600;
  }
}
.people_list {
  margin-top: 2rem;
}
.buttom {
  padding: 1rem ;
  position: fixed;
  bottom: 0;
  background: #fff;
  width: calc(100% - 2rem);
  
  .buttom_main{
      display: flex;
  justify-content: space-around;
      width: 100%;
button{
    width: calc(100% - 18.5rem);
    

  }
  .van-button--default {
    
    background-color: rgba(16, 142, 233, 0.15);
    color: rgba(16, 142, 233, 1);
  }
  .van-button--primary {
    background-color: rgba(16, 142, 233, 1);
    color: rgba(255, 255, 255, 1);
    border: none;
  }
  }
}
</style>