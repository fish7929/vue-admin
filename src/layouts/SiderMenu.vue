<template>
    <div style="width: 256px">
        <a-menu
            :selectedKeys="selectedKeys"
            :openKeys.sync="openKeys"
            mode="inline"
            :theme="theme"
        >
            <template v-for="item in menuData">
                <a-menu-item
                    v-if="!item.children"
                    :key="item.path"
                    @click="() => $router.push({path: item.path, query: $route.query})"
                >
                    <a-icon
                        v-if="item.meta.icon"
                        :type="item.meta.title"
                    />
                    <span>{{item.meta.title}}</span>
                </a-menu-item>
                <sub-menu
                    v-else
                    :menu-info="item"
                    :key="item.path"
                />
            </template>
        </a-menu>
    </div>
</template>

<script>
import SubMenu from "./SubMenu";
import { check } from "../utils/auth";
export default {
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    // console.log(this.selectedKeysMap, this.openKeysMap, 666);
    return {
      collapsed: false,
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  components: {
    SubMenu
  },
  watch: {
    //监听路由的改变，重置值
    "$route.path": function(val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    }
  },
  methods: {
    /**
     * 获取菜单数据
     * @param {Array} routes 路由的配置信息
     * @param {Array} parentKeys 父级的一些路由
     * @param {String} selectedKey 当前选择的路由
     */
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      for (let item of routes) {
        //判断需要权限的页面，但是没有权限的，不显示菜单按钮
        if (item.meta && item.meta.authority && !check(item.meta.authority)) {
          break;
        }
        if (item.name && !item.hideInMenu) {
          //缓存
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKey || item.path];
          //重新拷贝一个对象
          const newItem = { ...item };
          //先删除children
          delete newItem.children;
          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path
            ]);
          } else {
            this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            );
          }
          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.children
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      }
      return menuData;
    }
  }
};
</script>
 