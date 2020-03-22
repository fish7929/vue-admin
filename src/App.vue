<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view></router-view>
    </a-locale-provider>
  </div>
</template>
<script>
//组件的国际化配置 语言包
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import enUS from "ant-design-vue/lib/locale-provider/en_US";
import moment from "moment"; //需要去适配moment的语言包
import "moment/locale/zh-cn"; //只打包中文语言包，  它默认是英文的
export default {
  data() {
    return {
      locale: zhCN
    };
  },
  watch: {
    //监听路由的query 来改变国际化
    "$route.query.locale": function(val) {
      this.locale = val === "enUS" ? enUS : zhCN;
      moment.locale(val === "enUS" ? "en" : "zh-cn");
    }
  }
};
</script>

<style lang="less" scoped>
#app {
  height: 100%;
  overflow: auto;
}
</style>
