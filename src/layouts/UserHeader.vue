<template>
  <div class="user-header-wrap">
    <div class="logo-wrap">
      <a href="/">
        <Logo class="logo" />
      </a>
      <span class="title">Metal Admin</span>
    </div>
    <div class="desc-wrap">这里是Admin的介绍描述</div>
  </div>
</template>

<script>
import Logo from "@/assets/logo.svg";
export default {
  components: {
    Logo
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.user-header-wrap {
  text-align: center;
  .logo-wrap {
    height: 44px;
    line-height: 44px;
    a {
      text-decoration: none;
      display: inline-block;
      height: 44px;
      vertical-align: top;
    }
    .logo {
      width: 44px;
      height: 44px;
      display: inline-block;
      margin-right: 16px;
      border-style: none;
    }
    .title {
      font-size: 33px;
      color: rgba(0, 0, 0, 0.85);
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      font-weight: 600;
      position: relative;
      top: 2px;
    }
  }
}
</style>
