import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  Select,
  LocaleProvider,
  Dropdown,
  DatePicker,
  Checkbox,
  Tooltip,
  Avatar
} from "ant-design-vue";
//权限验证组件
import Authorized from "./components/Authorized";
//权限校验指令
import Auth from "./directives/auth";
//挂载到原型上，这样就不用每次都去import
import request from "./utils/request";
Vue.prototype.$request = request;


//语言包
import VueI18n from "vue-i18n";
import zhCN from "./locale/zhCN.js";
import enUS from "./locale/enUS.js";
//路由参数解析
import querySring from "query-string";
//代码在文件中显示高亮
import VueHighlightJS from "vue-highlightjs";
import "highlight.js/styles/github.css";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(LocaleProvider);
Vue.use(Dropdown);
Vue.use(DatePicker);
Vue.use(Checkbox);
Vue.use(Tooltip);
Vue.use(Avatar);
//字符串高亮的插件
Vue.use(VueHighlightJS);
//校验组件，注册为全局组件，很多地方需要用到 
Vue.component("Authorized", Authorized);
//注册权限校验指令
Vue.use(Auth);

//语言包插件
Vue.use(VueI18n);

//业务代码的国际化配置
const i18n = new VueI18n({
  locale: querySring.parse(location.search).locale || 'zhCN',
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS },
  }
});

//自定义ICON组件，这里是404图标
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1705368_1hh9iwoo2se.js',
});
Vue.component("IconFont", IconFont);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
