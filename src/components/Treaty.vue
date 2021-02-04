<template>
  <div id="treaty">
    <van-nav-bar title="用户协议" left-arrow @click-left="onClickLeft" fixed/>
    <div id="treaty_content">
    <van-field
      v-model="message"
      rows="1"
      autosize
      type="textarea"
      readonly
    />
    </div>
  </div>
</template>

<script>
import router from "../router/index";
import {getFile} from "../tool/GetFile"; 

export default {
  name: "Treaty",
  data() {
    return {
        message: ""
    };
  },
  methods: {
    /**左上角返回键 */
    onClickLeft() {
      router.go(-1);
    },
    /**获得协议的文本内容 */
    getTready(){
        let filePath = '/static/treaty.txt';
        this.message = getFile(filePath);
    }
  },
  mounted(){
      this.getTready();
  }
};
</script>

<style>
#treaty_content{
  margin-top: 5rem;
}
</style>