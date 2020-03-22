<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <NotFound />
    </div>
    <div class="not-found-title">404</div>
    <div class="not-found-tips">抱歉，你访问的页面不存在。</div>
    <a-button
      type="primary"
      class="not-found-button"
      @click="handleGoHome"
    >返回首页</a-button>
  </div>
</template>

<script>
//是一个svg组件
import NotFound from "@/assets/404.svg";
export default {
  data() {
    return {};
  },
  components: {
    NotFound
  },
  methods: {
    handleGoHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.not-found-container {
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 100px;
}
.not-found-content {
  text-align: center;
  width: 250px;
  height: 295px;
  margin: auto;
  margin-bottom: 24px;
}
.not-found-title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 24px;
  line-height: 1.8;
  text-align: center;
}
.not-found-tips {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
}
.not-found-button {
  margin-top: 32px;
}
</style>
