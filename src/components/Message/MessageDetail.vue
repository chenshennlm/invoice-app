<template>
  <div>
    <van-nav-bar title="系统公告" left-arrow @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-left" color="#666666" size="16" />
      </template>
    </van-nav-bar>
    <div
      class="content"
      v-html="messageDatail ? messageDatail.content : ''"
    ></div>
  </div>
</template>

<script>
const messageBase = [
  {
    uuid: "sad456s435da4s5d4a5",
    title: "国家卫健委：昨日新增确诊病例35例，其中本土病例13例",
    content: `国家卫健委网站消息，9月26日0—24时，31个省（自治区、直辖市）和新疆生产建设兵团报告新增确诊病例35例。其中境外输入病例22例（云南12例，北京3例，天津1例，辽宁1例，上海1例，江苏1例，浙江1例，山东1例，广东1例），含3例由无症状感染者转为确诊病例（天津1例，浙江1例，广东1例）；本土病例13例（黑龙江11例，均在哈尔滨市；福建2例，均在厦门市）。无新增死亡病例。无新增疑似病例。

当日新增治愈出院病例36例，解除医学观察的密切接触者958人，重症病例较前一日减少1例。

境外输入现有确诊病例526例（其中重症病例3例），现有疑似病例2例。累计确诊病例8977例，累计治愈出院病例8451例，无死亡病例。

截至9月26日24时，据31个省（自治区、直辖市）和新疆生产建设兵团报告，现有确诊病例1012例（其中重症病例11例），累计治愈出院病例90402例，累计死亡病例4636例，累计报告确诊病例96050例，现有疑似病例2例。累计追踪到密切接触者1188820人，尚在医学观察的密切接触者20176人。

31个省（自治区、直辖市）和新疆生产建设兵团报告新增无症状感染者20例，其中境外输入17例，本土3例（均在黑龙江，其中哈尔滨市2例、绥化市1例）；当日转为确诊病例3例（均为境外输入）；当日解除医学观察23例（境外输入20例）；尚在医学观察的无症状感染者344例（境外输入334例）。

累计收到港澳台地区通报确诊病例28448例。其中，香港特别行政区12193例（出院11892例，死亡213例），澳门特别行政区66例（出院63例），台湾地区16189例（出院13742例，死亡841例）。`,
    time: "2021/09/27",
    isRead: false,
  },
  {
    uuid: "h546df4135d4g6s4f65",
    title: "国庆节去哪玩",
    content:
      "想去哪玩就去哪玩，想去哪玩就去哪玩，想去哪玩就去哪玩，想去哪玩就去哪玩，想去哪玩就去哪玩，想去哪玩就去哪玩，",
    time: "2021/09/26",
    isRead: false,
  },
  {
    uuid: "re4fgs534fq65w1as",
    title: "国庆节放假通知",
    content: "国庆节放假从10.1到10.7号，放七天",
    time: "2021/09/12",
    isRead: true,
  },
];
export default {
  name: "MessageDetail",
  data() {
    return {
      messageDatail: null,
    };
  },
  mounted() {
    this.geData();
  },
  methods: {
    geData() {
      this.messageDatail = messageBase.find(
        (item) => item.uuid == this.$route.query.id
      );
    },
  },
};
</script>

<style scoped>
.van-nav-bar {
  position: fixed;
  width: 100%;
  top: 0;
}
.content {
  margin-top: 46px;
  padding: 16px;
  font-size: 1.5rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 2.5rem;
  background-color: #fff;
}
</style>