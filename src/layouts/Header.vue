<template>
  <div class="header">
    <a-dropdown>
      <a
        class="ant-dropdown-link"
        @click="e => e.preventDefault()"
      >语言切换
        <a-icon type="global" />
      </a>
      <a-menu
        slot="overlay"
        :selectedKeys="localeSelectedKeys "
        @click="handleLocaleChange"
      >
        <a-menu-item key="zhCN">
          中文
        </a-menu-item>
        <a-menu-item key="enUS">
          English
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-dropdown class="user-drop-down">
      <a
        class="ant-dropdown-link"
        @click="e => e.preventDefault()"
      >
        <a-avatar
          style="backgroundColor:#87d068"
          icon="user"
        />
        {{user.account}}
      </a>
      <a-menu
        slot="overlay"
        @click="handleUserChange"
      >
        <a-menu-item
          key="userAccount"
          disabled
        >
          <a-icon type="user" />个人中心
        </a-menu-item>
        <a-menu-item
          key="userSetting"
          disabled
        >
          <a-icon type="setting" />账户设置
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="logout">
          <a-icon type="logout" />退出登录</a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import { getCurrentUser } from "@/utils/auth";
export default {
  computed: {
    localeSelectedKeys() {
      return [this.$route.query.locale || "zhCN"];
    },
    user() {
      return getCurrentUser();
    }
  },
  methods: {
    handleLocaleChange({ key }) {
      //语言切换更新到路由
      this.$router.push({ query: { ...this.$route.query, locale: key } });
      //i18n 语言的切换
      this.$i18n.locale = key;
    },
    handleUserChange({ key }) {
      if (key === "logout") {
        //清除缓存
        window.sessionStorage.clear();
        //语言切换更新到路由
        this.$router.push("/user/login");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  float: right;
  margin-right: 45px;
}
.user-drop-down {
  margin-left: 30px;
  height: 55px;
  display: inline-block;
  vertical-align: top;
}
</style>
