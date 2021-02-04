<template>
  <div id="mine">
    <van-nav-bar :border="false" safe-area-inset-top>
      <template #right>
        <img :src="icon.message" />
        <img :src="icon.setting" style="margin-left: 2rem" />
      </template>
    </van-nav-bar>
    <div id="mine_info">
      <van-image round width="8rem" height="8rem" style="margin-bottom:1rem;" :src="info.icon ? info.icon : icon.head" />
      <div id="mine_info_detail">
        <p>{{ info.username ? info.username : "未登录" }}</p>
        <van-tag plain type="primary">
          {{info.level ? (info.level == 1 ? '主管理员' : (info.level == 2?'辅管理员': '职员')):'未知'}}
        </van-tag>
      </div>
    </div>
    <div id="mine_action">
      <div id="mine_action_invoice">
        <img :src="icon.invoice" @click="$router.push({name:'MyInvoice', query:{id:info.account}})"/>
        <p>我的凭证</p>
      </div>
      <div id="mine_action_undealed"> 
        <img :src="icon.undealed" />
        <p>待{{info.level ? (info.level == 2 ? '审核' : '处理') : ''}}凭证</p>
      </div>
    </div>
    <div id="mine_actionlist">
      <van-cell-group>
        <van-cell v-if="info.level == 1 || info.level == 2" title="交接单管理" is-link url="/" />
        <van-cell
          title="组织机构管理"
          is-link
          :value="info.company ? info.company.name : ''"
          url="/"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import router from "../../router/index";
import { getMineDetail } from "../../action/MineAction";

export default {
  name: "Mine",
  data() {
    return {
      info: {},
      icon: {
        setting: "/static/setting.png",
        message: "/static/message.png",
        head: "/static/icon-default.png",
        invoice: "/static/invoice.png",
        undealed: "/static/undealed.png",
      },
    };
  },
  methods: {
    getMineDetail(account = "") {
      getMineDetail(account).then((res) => {
        console.log("---res", res);
        this.info = res.data;
      });
    },
  },
  mounted() {
    let account = router.history.current.query.id;
    this.getMineDetail(account);
  },
};
</script>

<style scoped>
#mine {
}
#mine_info {
  background-color: #ffffff;
  display: flex;
  padding-left: 1rem;
  margin-bottom: 1rem;
}
#mine_info_detail {
  margin: auto 1rem;
}
#mine_action {
  background-color: #ffffff;
  height: 10rem;
  display: flex;
  text-align: center;
  margin-top: 3rem;
  padding-top: 1rem;
}
#mine_action img {
  width: 6rem;
}
#mine_action_invoice {
  /* border:green 1px solid; */
  width: 50%;
}
#mine_action_undealed {
  width: 50%;
}
#mine_actionlist {
  /* border: blue 1px solid; */
  margin-top: 3rem;
}
</style>