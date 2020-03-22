<template>
  <div class="user-footer-wrap">
    <div class="links">
      <a
        v-for="item in links"
        :key="item.id"
        :href="item.url"
      >{{item.text}}</a>
    </div>
    <div class="copy-right"> Copyright © 2020 Created By Metal </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          text: "帮助",
          id: 1,
          url: "/"
        },
        {
          text: "隐私",
          id: 2,
          url: "/"
        },
        {
          text: "条款",
          id: 3,
          url: "/"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.user-footer-wrap {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;
  .links {
    margin-bottom: 8px;
    font-size: 14px;
    a {
      margin-right: 40px;
      color: rgba(0, 0, 0, 0.45);
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
      text-decoration: none;
    }
  }
  .copy-right {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
