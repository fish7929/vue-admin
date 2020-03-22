<template>
  <div>
    <a-drawer
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      width="300px"
    >
      <template v-slot:handle>
        <div
          class="setting-drawer-handle"
          @click=" visible = !visible"
        >
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <div>
        <h2>整体风格定制</h2>
        <a-radio-group
          :value="navTheme"
          @change="(e) => handleSettingChange('navTheme',e.target.value)"
        >
          <a-radio value="dark">黑色</a-radio>
          <a-radio value="light">白色</a-radio>
        </a-radio-group>
        <h2>导航模式</h2>
        <a-radio-group
          :value="navLayout"
          @change="(e) => handleSettingChange('navLayout',e.target.value)"
        >
          <a-radio value="left">左侧</a-radio>
          <a-radio value="top">顶部</a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  },
  methods: {
    handleSettingChange(type, value) {
      //把改变的值通过路由的 参数传递回去 $router   $route
      this.$router.push({ query: { ...this.$route.query, [type]: value } });
    },
    onClose() {
      this.visible = false;
    }
  }
};
</script>
<style lang="less" src="./index.less">
</style>

