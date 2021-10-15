<!-- 组织机构人员管理 -->
<template>
  <div class="peson_management">
    <div class="management_header">
      <van-nav-bar
        title="组织机构人员管理"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <div class="dissolution" @click="disbandteam">
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
            <van-button
              square
              type="danger"
              text="删除"
              @click="deletepeople"
            />
            <van-button
              v-if="item.level == 3 && level == 1"
              square
              type="info"
              text="设为管理员"
              @click="setadmin(index)"
            />
            <van-button
              v-if="item.level == 2 && level == 1"
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
      <div class="buttom_main">
        <van-button @click="replaceadmin">更换企业管理员</van-button>
        <van-button type="primary" @click="addshowfn">人员新增</van-button>
      </div>
    </div>
    <div class="msk" v-if="changepelpleshow">
      <div class="changeadmin">
        <div class="changeamin_header">
          <span>更换企业管理员</span>
        </div>
        <div class="change_list">
          <label for="">更换企业管理员：</label>
          <select ref="peoples">
            <option>请选择</option>
            <option v-for="(item, index) in list" :key="index">
              {{ item.name }}{{ item.phone }}
            </option>
          </select>
        </div>
        <div class="button">
          <van-button type="default" @click="clickcancle">取消</van-button>
          <van-button type="info" @click="clickconfirmbut">确认</van-button>
        </div>
      </div>
    </div>
    <div class="addpeople">
      <van-dialog 
      v-model="addshow" title="人员新增" show-cancel-button>
                  
        <div class="account_type">
          <label for="">账号类型：</label>
                         <select
                  
                  @change="showaccounttype"
                  v-model="selectvalue"
                >
                  <option
                    
                    v-for="(item, index) in  accountnumbers"
                    :key="index"
                  >
                    {{ item.type }}
                  </option>
                </select>
        </div>
        <div style="height:5rem">
<div class="account_num" v-if="showphone">
          <label for="">手机账号：</label>
          <select ref="phonecode">
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
      selectvalue: "",
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
      accountnumbers: [
        {
          type: "手机账号",
        },
        {
          type: "平台账号",
        },
      ],
      addshow: false,

      loading: false,
      finished: false,
      level: "",
      changepelpleshow: false,
      showphone:false,
      showpt:false,
  

    };
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
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
    deletepeople(index) {
      this.$dialog
        .confirm({
          title: "确认删除",
          message: "是否删除该人员，删除后不可恢复",
        })
        .then(() => {
          // on confirm
          this.list.splice(index, 1);
          this.$toast.success("删除成功");
        })
        .catch(() => {
          // on cancel
        });
    },
    // 解散组织
    disbandteam() {
      this.$dialog
        .confirm({
          title: "解散确认",
          message: "是否解散该组织,解散后将删除所有数据",
        })
        .then(() => {
          this.$router.push("/login/first");
        })
        .catch(() => {
          console.log("取消");
        });
    },
    // 更换企业管理员
    replaceadmin() {
      this.changepelpleshow = true;
    },
    // 点击更换页面确认按钮
    clickconfirmbut() {
      this.changepelpleshow = false;
      console.log(this.$refs.peoples.value);
      if (this.$refs.peoples.value != "请选择") {
        this.$toast.success("已保存");
      } else {
        this.$toast.fail("请选择需要更改的企业管理员");
      }
    },
    // 点击更换页面取消按钮
    clickcancle() {
      this.changepelpleshow = false;
    },
    // 添加人员
    addshowfn() {
      this.addshow = true;
    },
    showaccounttype(){
     if(this.selectvalue=='手机账号'){
       console.log(222);
      this. showphone=true
       this.showpt=false
     }else if(this.selectvalue=='平台账号'){
       console.log(111);
       this.showpt=true
      this. showphone=false
     }
      console.log(this.selectvalue);
    }
  // beforeclose(e){
  //   console.log(111);
  //   console.log(this.$refs.accounttype.value);

  // }
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.level = this.$route.query.level;
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
  padding: 1rem;
  position: fixed;
  bottom: 0;
  background: #fff;
  width: calc(100% - 2rem);

  .buttom_main {
    display: flex;
    justify-content: space-around;
    width: 100%;
    button {
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
.msk {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  .changeadmin {
    width: 30rem;
    height: 20rem;
    background: #fff;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -10rem;
    margin-left: -16rem;
    padding: 1rem;
    .changeamin_header {
      span {
        font-size: 1.6rem;
        font-weight: 600;
      }
    }
    .change_list {
      margin-top: 2rem;
      label {
        font-size: 1.6rem;
      }
      select {
        outline: none;
        border: 1px solid #ccc;
        background: #fff;
        padding: 0.5rem;
      }
    }
    .button {
      width: calc(100% - 2rem);
      position: absolute;

      bottom: 2rem;
      display: flex;
      justify-content: space-around;
      .van-button {
        width: 10rem;
      }
    }
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