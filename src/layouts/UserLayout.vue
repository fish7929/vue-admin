<template>
  <div class="user-container">
    <user-header />
    <div class="user-main">
      <router-view></router-view>
    </div>
    <user-footer />
  </div>
</template>

<script>
import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";
export default {
  components: {
    UserHeader,
    UserFooter
  }
};
</script>

<style lang="less" scoped>
.user-container {
  width: 100%;
  min-height: 100%;
  background: #fff url("~@/assets/background.png") no-repeat 50%;
  background-size: 100%;
  padding: 110px 0 144px;
  position: relative;
  .user-main {
    min-width: 260px;
    width: 368px;
    margin: 0 auto;
    margin-top: 40px;
  }
}
</style>
