<template>
  <div>
    <van-nav-bar
      title="消息通知"
      left-arrow
      @click-left="$router.push('/mine')"
      @click-right="readAll"
    >
      <template #left>
        <van-icon name="arrow-left" color="#666666" size="16" />
      </template>
      <template #right>
        <svg
          t="1632711655792"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2213"
          width="16"
          height="16"
        >
          <path
            d="M701 564v195c0 11-9 20-20 20H343c-11 0-20-9-20-20V564c0-8.3-6.7-15-15-15s-15 6.7-15 15v205c0 22.1 17.9 40 40 40h358c22.1 0 40-17.9 40-40V564c0-8.3-6.7-15-15-15s-15 6.7-15 15z"
            fill="#666666"
            p-id="2214"
          ></path>
          <path
            d="M393 792v-80c0-8.3 6.7-15 15-15s15 6.7 15 15v80c0 8.3-6.7 15-15 15s-15-6.7-15-15zM497 791V671c0-8.3 6.7-15 15-15s15 6.7 15 15v120c0 8.3-6.7 15-15 15s-15-6.7-15-15zM601 791V631c0-8.3 6.7-15 15-15s15 6.7 15 15v160c0 8.3-6.7 15-15 15s-15-6.7-15-15zM514.1 195c-32.9 0.5-59.1 28-59.1 60.9v211h30V255.7c0-16.3 12.8-30.2 29.1-30.7 16.9-0.5 30.9 13.2 30.9 30v212h30V255c0-33.4-27.4-60.5-60.9-60z"
            fill="#666666"
            p-id="2215"
          ></path>
          <path
            d="M731 467.5c5.5 0 10 4.5 10 10v48c0 5.5-4.5 10-10 10H293c-5.5 0-10-4.5-10-10v-48c0-5.5 4.5-10 10-10h438m0-30H293c-22.1 0-40 17.9-40 40v48c0 22.1 17.9 40 40 40h438c22.1 0 40-17.9 40-40v-48c0-22.1-17.9-40-40-40z"
            fill="#666666"
            p-id="2216"
          ></path></svg
        >全部已读
      </template>
    </van-nav-bar>
    <div class="center">
      <van-cell
        v-for="(item, index) in messageList"
        :key="index"
        is-link
        :title-class="
          'custom-title ' +
          (item.isRead ? 'custom-title-read' : 'custom-title-unread')
        "
        :value-class="
          'custom-left ' +
          (item.isRead ? 'custom-left-read' : 'custom-left-unread')
        "
        :title="item.title"
        :value="item.time"
        :to="'MessageDetail?id=' + item.uuid"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      messageList: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.messageList = [
        {
          uuid: "sad456s435da4s5d4a5",
          title: "国家卫健委：昨日新增确诊病例35例，其中本土病例13例",
          time: "2021/09/27",
          isRead: false,
        },
        {
          uuid: "h546df4135d4g6s4f65",
          title: "国庆节去哪玩",
          time: "2021/09/26",
          isRead: false,
        },
        {
          uuid: "re4fgs534fq65w1as",
          title: "国庆节放假通知",
          time: "2021/09/12",
          isRead: true,
        },
      ];
    },
    readAll() {
      this.messageList.forEach((item) => {
        item.isRead = true;
      });
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
.center{
    margin-top: 46px;
}
.van-nav-bar__left {
  color: #666666;
}
.van-nav-bar__right {
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.custom-title {
  font-size: 1.5rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  max-width: calc((100% - 24px) / 2);
}
.custom-title span {
  max-width: 100%;
  line-height: initial;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.custom-left {
  font-size: 1.5rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.custom-title-unread {
  color: #333333;
}
.custom-left-unread {
  color: #999999;
}
.custom-title-read {
  color: #cccccc;
}
.custom-left-read {
  color: #cccccc;
}
</style>