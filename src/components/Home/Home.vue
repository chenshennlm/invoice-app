<template>
  <div class="home">
    <div class="home_header">
      <van-nav-bar>
        <template #right>
          <van-icon name="chat-o" dot />
        </template>
        <template #left>
          <span>会计做账APP</span>
        </template>
      </van-nav-bar>
      <div class="header_remind">
        <van-notice-bar
          left-icon="volume-o"
          text="票据收据提醒，你有几张票据需要上传"
          :scrollable="scrollable"
          color="#fff"
        />
      </div>
      <!-- 这里点击需要跳转到票据上传页面 -->
      <div class="header_upload">
        <div class="upload_main">
          <img
            class="pic1"
            referrerpolicy="no-referrer"
            src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngd311fc0c692e2712c89211b581433dcbbc46550827cea1b70c5ae23b36d70a77"
          />
          <span class="">票据上传</span>
        </div>
      </div>
    </div>
    <div class="home_pending">
      <div class="pending_main">
        <div class="pending_main_header">
          <span class="left">待处理</span>
          <span class="right">更多</span>
        </div>
        <div class="pending_list">
          <ul>
            <li>
              <div class="box1 flex-col">
                <div class="outer2 flex-col"></div>
              </div>
              <div class="company_bills">
                <span>衡信科技有限公司票据</span>
                <i>2020/11</i>
              </div>
             <div> <van-icon name="arrow" /></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      scrollable: false,
      //   upload_img:require("../../assets/")
    };
  },
};
</script>

<style scoped lang="less">
.home_header {
  background: #108ee9;
  height: 20rem;
}
.van-nav-bar {
  background: #108ee9;
  /* background-origin: border-box; */
}
.van-nav-bar__left span {
  color: #fff;
  font-size: 1.8rem;
  font-weight: 500;
}
.van-nav-bar .van-icon {
  font-size: 2.8rem;
  color: #fff;
}
.van-notice-bar {
  height: 2.5rem;
  width: 100%;
  background: rgba(255, 255, 255, 20%);
}
.header_remind {
  height: 4rem;
  display: flex;
  padding: 0 1rem;
  align-items: center;
}
.header_upload {
  width: calc(100% - 2rem);
  height: 15rem;
  margin-left: 1rem;
  background: #fff;
  position: relative;
  border-radius: 4px;
}
.upload_main {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  margin-left: -4rem;
  margin-top: -5rem;
  top: 50%;

  span {
    font-size: 2rem;
    color: rgba(16, 142, 233, 1);
    margin-top: 1rem;
  }
}
.pic1 {
  z-index: 33;

  width: 8rem;
  height: 8rem;
}
.home_pending {
  margin-top: 6rem;
  width: calc(100% - 2rem);
  margin-left: 1rem;

  .pending_main {
    .pending_main_header {
      display: flex;
      justify-content: space-between;
      .left {
        font-size: 1.6rem;
      }
      .right {
        color: rgba(16, 142, 233, 1);
        font-size: 1.6rem;
      }
    }
    .pending_list {
      margin-top: 1rem;
      background: #fff;
      ul {
        li {
          display: flex;
          padding: 1rem;
          align-items: center;
          .box1 {
            flex: 1;
            z-index: 132;
            height: 6rem;
            background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng65982b671b130a8e99c174bf1d8ac9e4f042122eb731426e4fbc8251d5f1219e) -0.054rem
              0rem no-repeat;
            background-size: 6rem 7rem;
            margin-top: 0.027rem;
            width: 6rem;
            justify-content: center;
            align-items: center;
            position: relative;
            .outer2 {
              z-index: 136;
              width: 4rem;
              height: 6rem;
              background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng6541d2e4894e94e4e6797f54cfeb34dbbc62caf33583c496efdfbfdad4f6429f) -0.24rem
                0.72rem no-repeat;
              background-size: 3rem 4rem;
              margin-left: 1.5rem;
            }
          }
          .company_bills {
            flex: 3;
            display: flex;
            flex-direction: column;
            margin-left: 1rem;
            
            span {
              font-size: 1.6rem;
            }
            i {
              font-size: 1.4rem;
            }
          }
          .van-icon-arrow{
            flex: 1;
            // margin-left: 8rem;
            font-size: 2.5rem;
            color: #cdcdcd;
          }
        }
      }
    }
  }
}
</style>