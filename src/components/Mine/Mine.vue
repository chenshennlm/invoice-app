<template>
  <div id="mine">
    <van-nav-bar :border="false" safe-area-inset-top>
      <template #right>
        <van-icon
          v-if="newMessageSize > 0"
          name="chat-o"
          dot
          @click="
            $router.push({ name: 'Message', query: { id: info.account } })
          "
          size="24"
          color="#666666"
        />
        <van-icon
          v-else
          name="chat-o"
          @click="
            $router.push({ name: 'Message', query: { id: info.account } })
          "
          size="24"
          color="#666666"
        />
        <van-icon
          name="setting-o"
          size="24"
          color="#666666"
          @click="$router.push({ name: 'SetUp', query: { id: info.account } })"
        />
      </template>
    </van-nav-bar>
    <div id="mine_info">
      <van-image
        round
        width="8rem"
        height="8rem"
        style="margin-bottom: 1.5rem"
        :src="
          info.level
            ? info.level == 1
              ? headPhoto[0]
              : info.level == 2
              ? headPhoto[1]
              : headPhoto[2]
            : ''
        "
      />
      <div id="mine_info_detail">
        <div class="user-name">
          {{ info.nickname ? info.nickname : "未登录" }}
        </div>
        <van-tag plain type="primary">
          {{
            info.level
              ? info.level == 1
                ? "主管理员"
                : info.level == 2
                ? "辅管理员"
                : "职员"
              : "未知"
          }}
        </van-tag>
      </div>
    </div>
    <div id="mine_action">
      <div id="mine_action_invoice">
        <img :src="icon.invoice" @click="goMyInvoice" />
        <p>我的凭证</p>
      </div>
      <div id="mine_action_undealed" @click="goPendingInvoice">
        <img :src="icon.undealed" />
        <p>待{{ info.level ? (info.level == 2 ? "审核" : "处理") : "" }}凭证</p>
      </div>
    </div>
    <div id="mine_actionlist">
      <van-cell-group>
        <van-cell
          v-if="info.level == 1 || info.level == 2"
          title="交接单管理"
          is-link
          to="/mine/handoverSheet"
        />
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
// import { getMineDetail } from "../../action/MineAction";

export default {
  name: "Mine",
  data() {
    return {
      info: {},
      headPhoto: [
        require("../../assets/photo1.png"),
        require("../../assets/photo2.png"),
        require("../../assets/photo3.png"),
      ],
      icon: {
        invoice: require("../../assets/invoice.png"),
        undealed: require("../../assets/undealed.png"),
      },
      newMessageSize: 2,
    };
  },
  methods: {
    getMineDetail(account = "") {
      this.info = {
        icon: "https://img01.yzcdn.cn/vant/cat.jpeg",
        nickname: "周大侠",
        level: "1",
        uuid: "4f5a4s5d4a5sdas4d564",
        account: "17766666665",
      };
      // getMineDetail(account).then((res) => {
      //   console.log("---res", res);
      //   this.info = res.data;
      // });
    },

    goMyInvoice() {
      if (this.info.level == "1") {
        this.$router.push({
          name: "AdminInvoice",
          query: { id: this.info.account },
        });
      } else {
        this.$router.push({
          name: "MyInvoice",
          query: { id: this.info.account },
        });
      }
    },
    goPendingInvoice() {
      this.$router.push({
        name: "PendingInvoice",
        query: { id: this.info.account },
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
#mine >>> .van-nav-bar__right {
  width: 6.5rem;
  display: flex;
  justify-content: space-between;
}
#mine_info {
  background-color: #ffffff;
  display: flex;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
#mine_info_detail {
  margin: auto 1.5rem;
}
#mine_info_detail .user-name {
  font-size: 2rem;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333333;
  margin-bottom: 0.8rem;
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