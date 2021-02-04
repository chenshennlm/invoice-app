<template>
  <div id="mine">
    <van-nav-bar title="我的" fixed>
        <template #right>
    <van-icon name="setting-o"  size="18"/>
  </template>
    </van-nav-bar>
  </div>
</template>

<script>
import router from '../../router/index';

export default {
    name: "Mine",
    data(){
        return {
            account: "",

        }
    },
    mounted(){
        this.account = router.history.current.query.id;
    },
}
</script>

<style scoped>

</style>