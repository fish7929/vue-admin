<template>
    <div class="fobidden-container">
        <div class="fobidden-content">
            <Fobidden />
        </div>
        <div class="fobidden-title">403</div>
        <div class="fobidden-tips">抱歉，你无权访问该页面。</div>
        <a-button
            type="primary"
            class="fobidden-button"
            @click="handleGoHome"
        >返回首页</a-button>
    </div>
</template>

<script>
//是一个svg组件
import Fobidden from "@/assets/403.svg";
export default {
  data() {
    return {};
  },
  components: {
    Fobidden
  },
  methods: {
    handleGoHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.fobidden-container {
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 100px;
}
.fobidden-content {
  text-align: center;
  width: 250px;
  height: 295px;
  margin: auto;
  margin-bottom: 24px;
}
.fobidden-title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 24px;
  line-height: 1.8;
  text-align: center;
}
.fobidden-tips {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
}
.fobidden-button {
  margin-top: 32px;
}
</style>
