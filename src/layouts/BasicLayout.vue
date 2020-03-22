<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout
      id="components-layout-demo-side"
      style="min-height: 100vh"
    >
      <a-layout-sider
        v-if="navLayout === 'left'"
        :trigger="null"
        collapsible
        v-model="collapsed"
        :theme="navTheme"
        width="256px"
      >
        <div class="logo">Metal Admin</div>
        <SiderMenu :theme="navTheme" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            v-auth="['admin']"
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header />
        </a-layout-header>
        <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <Authorized :authority="['admin']">
      <SettingDrawer />
    </Authorized>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SiderMenu from "./SiderMenu";
import SettingDrawer from "../components/SettingDrawer";
export default {
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    navTheme() {
      //从路由query中获取并给默认值
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      //从路由query中获取并给默认值
      return this.$route.query.navLayout || "left";
    }
  },
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer
  }
};
</script>

<style scoped>
.trigger {
  padding: 0 28px;
  line-height: 64px;
  font-size: 20px;
}
.trigger:hover {
  background: #eeeeee;
}
.logo {
  height: 64px;
  line-height: 64px;
  /* text-align: center; */
  overflow: hidden;
  padding-left: 60px;
  background: url("~@/assets/logo.png") no-repeat 20px center #002140;
  background-size: 32px;
}
/**** >>> 表示深度选择*/
.nav-theme-dark >>> .logo {
  color: #fff;
}
</style>
