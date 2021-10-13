<!--  -->
<template>
<div class='photograph'>
<div>
   <van-nav-bar
        title="票据上传"
        left-arrow
        @click-left="$router.go(-1)"
        :fixed="true"
      />
</div>
     <!-- pc端    -->
        <!-- <canvas ref="canvas" ></canvas> -->
        <!--图片展示-->
        <!-- <video ref="video"  autoplay></video> -->
        <!--确认-->
        <!-- <van-button type="primary" @click="photograph" class="tophotograph"></van-button> -->
        <!-- <van-button @click="closeCamera" class="tophotograph"></van-button> -->
        <!-- 移动端 -->
        <input ref="file" type="file" accept="image/*" capture="user">
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

};
},
//计算属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {


    compressImage (event) {
      let _this = this
      let file = event.target.files[0]
      let fileReader = new FileReader()
      let img = new Image()
      let imgWidth = ''
      let imgHeight = ''
      // 旋转角度
      let Orientation = null
      // 缩放图片需要的canvas
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d') // 图片大小  大于2MB 则压缩
      const isLt2MB = file.size < 2097152
      // 通过 EXIF 获取旋转角度 1 为正常  3 为 180°  6 顺时针90°  9 为 逆时针90°
      EXIF.getData(file, function () {
        EXIF.getAllTags(this)
        Orientation = EXIF.getTag(this, 'Orientation')
      })
      // 文件读取 成功执行
      fileReader.onload = function (ev) {
        // 文件base64化，以便获知图片原始尺寸
        img.src = ev.target.result
      }
      // 读取文件
      fileReader.readAsDataURL(file)
      // base64地址图片加载完毕后
      img.onload = function () {
        imgWidth = img.width
        imgHeight = img.height
        canvas.width = img.width
        canvas.height = img.height
        // 目标尺寸
        let targetWidth = imgWidth
        let targetHeight = imgHeight
        // 不需要压缩 不需要做旋转处理
        if (isLt2MB && imgWidth < 960 && imgHeight < 960 && !Orientation) return _this.XMLHttpRequest(file)
        if (isLt2MB && imgWidth < 960 && imgHeight < 960 && +Orientation === 1) return _this.XMLHttpRequest(file)
        // 大于2MB 、img宽高 > 960 则进行压缩
        if (!isLt2MB || imgWidth >= 960 || imgHeight >= 960) {
          // 最大尺寸
          let maxWidth = 850
          let maxHeight = 850
          // 图片尺寸超过 960 X 960 的限制
          if (imgWidth > maxWidth || imgHeight > maxHeight) {
            if (imgWidth / imgHeight > maxWidth / maxHeight) {
              // 更宽，按照宽度限定尺寸
              targetWidth = maxWidth
              targetHeight = Math.round(maxWidth * (imgHeight / imgWidth))
            } else {
              targetHeight = maxHeight
              targetWidth = Math.round(maxHeight * (imgWidth / imgHeight))
            }
          }
          // canvas对图片进行缩放
          canvas.width = targetWidth
          canvas.height = targetHeight
          // 图片大小超过 2Mb 但未旋转  则只需要进行图片压缩
          if (!Orientation || +Orientation === 1) {
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
          }
        }
        // 拍照旋转 需矫正图片
        if (Orientation && +Orientation !== 1) {
          switch (+Orientation) {
            case 6:     // 旋转90度
              canvas.width = targetHeight
              canvas.height = targetWidth
              ctx.rotate(Math.PI / 2)
              // 图片渲染
              ctx.drawImage(img, 0, -targetHeight, targetWidth, targetHeight)
              break
            case 3:     // 旋转180度
              ctx.rotate(Math.PI)
              // 图片渲染
              ctx.drawImage(img, -targetWidth, -targetHeight, targetWidth, targetHeight)
              break
            case 8:     // 旋转-90度
              canvas.width = targetHeight
              canvas.height = targetWidth
              ctx.rotate(3 * Math.PI / 2)
              // 图片渲染
              ctx.drawImage(img, -targetWidth, 0, targetWidth, targetHeight)
              break
          }
        }
        // base64 格式   我这是vuex 形式 重点是 canvas.toDataURL('image/jpeg', 1)
        // _this.$store.commit('SAVE_FACE_IMAGE_BASE64', canvas.toDataURL('image/jpeg', 1))
　　　　 // 调用接口上传
        // _this.upAppUserFaceByBase64()
        // 通过文件流格式上传
　　　　 canvas.toBlob(function (blob) {
          _this.XMLHttpRequest(blob)
        }, 'image/jpeg', 1)
      }
    },
    // 上传base64方式
    upAppUserFaceByBase64 () {
      this.$store.dispatch('upAppUserFaceByBase64', {
        baseFace: this.$store.state.faceImageBase64
      }).then(res => {
      // 上传成功
      }).catch(err => {
        console.log(err)
      })
    },


// // 调用摄像头
//     callCamera () {
//       // H5调用电脑摄像头API
//       navigator.mediaDevices.getUserMedia({
//         video: true
//       }).then(success => {
//         // 摄像头开启成功
//         this.$refs['video'].srcObject = success
//         // 实时拍照效果
//         this.$refs['video'].play()
//       }).catch(error => {
//         console.error('摄像头开启失败，请检查摄像头是否可用！')
//       })
//     },
//     // 拍照
//     photograph () {
//       let ctx = this.$refs['canvas'].getContext('2d')
//       // 把当前视频帧内容渲染到canvas上
//       ctx.drawImage(this.$refs['video'], 0, 0, 640, 480)
//       // 转base64格式、图片格式转换、图片质量压缩
//       let imgBase64 = this.$refs['canvas'].toDataURL('image/jpeg', 0.7)
      
// 　　　 // 由字节转换为KB 判断大小
//       let str = imgBase64.replace('data:image/jpeg;base64,', '')
//       let strLength = str.length
//       let fileLength = parseInt(strLength - (strLength / 8) * 2)
// 　　　 // 图片尺寸  用于判断
//       let size = (fileLength / 1024).toFixed(2)
//       console.log(size)

//  　　  // 上传拍照信息  调用接口上传图片 .........

//       // 保存到本地
//       this.dialogCamera = false
//       let ADOM = document.createElement('a')
//       ADOM.href = this.headImgSrc
//       ADOM.download = new Date().getTime() + '.jpeg'
//       ADOM.click()
//     },
//     // 关闭摄像头
//     closeCamera () {
//       if (!this.$refs['video'].srcObject) {
//         this.dialogCamera = false
//         return
//       }
//       let stream = this.$refs['video'].srcObject
//       let tracks = stream.getTracks()
//       tracks.forEach(track => {
//         track.stop()
//       })
//       this.$refs['video'].srcObject = null
//       this.$router.push('/home/uploadphoto')

//     },
  
},
beforeCreate() {}, //生命周期 - 创建之前
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
beforeMount() {}, //生命周期 - 挂载之前
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    // this.callCamera ()
    this.compressImage ()
},
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
canvas{
    width: 10rem;
    height: 10rem;
    position: fixed;
    border: 1px solid #ccc;
    bottom: 1rem;
    right: 1rem;
}
    video{
       width: 37.5rem;
       height:50rem ; 
    }
    .van-button{
        height: 5rem;
        width: 5rem;
        border-radius: 100%;
    }
    .tophotograph{
      position: fixed;
      width: 5rem;
      height: 5rem;
      border: 4px solid #ccc;
      background: #108EE9;
      left: 50%;
      margin-left:-2.5rem;
      bottom: 2rem;
    }
</style>