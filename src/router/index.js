import Vue from "vue";
import VueRouter from "vue-router";
import findLast from "lodash/findLast";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from '../views/404';
import Forbidden from '../views/403';
import { notification } from "ant-design-vue";
import { check, isLogin } from "../utils/auth";
/**
 * 重写路由的push方法
 */
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideInMenu: true,  //路由不在menu中显示
    component: () => import(/* webpackChunkName: "layout" */ "../layouts/UserLayout.vue"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",   //有name的 路由才在菜单里面显示
        component: () => import(/* webpackChunkName: "user" */ "../views/User/Login.vue"),
      },
      {
        path: "/user/register",
        name: "register",
        component: () => import(/* webpackChunkName: "user" */ "../views/User/Register.vue"),
      }
    ]
  },
  {
    path: "/",
    meta: { authority: ["admin", "user", "guest"] },
    component: () => import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout"),
    children: [
      //dashboard
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },  //给菜单增加logo  只有一级菜单才有logo， 和名称，
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () => import(/* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis"),
          }
        ]
      },
      //form
      {
        path: "/form",
        name: "form",
        meta: { icon: "form", title: "表单", authority: ["admin"] },
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/form/basic-form",
            name: "basicForm",
            meta: { title: "基础表单" },
            component: () => import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm"),
          },
          {
            path: "/form/step-form",
            name: "stepForm",
            meta: { title: "分布表单" },
            hideChildrenInMenu: true,   //子路由不在menu中显示
            component: () => import(/* webpackChunkName: "form" */ "../views/Forms/StepForm"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () => import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/Step1"),
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () => import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2"),
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () => import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/Step3"),
              },
            ]
          }
        ]
      },
    ]
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden,
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFound,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});


router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority);  //findLast  从右到左遍历
  console.log(to.matched, 777, record);
  if (record && !check(record.meta.authority)) {  //权限验证校验
    if (!isLogin() && to.path !== "/user/login") {  //没登录的 ，去登录
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {  //登录了的 ，去403页面
      notification.error({    //增加一个友好的提示框 错误消息提示
        message: "403",
        description: "你没有权限，请联系管理员咨询。",
      });
      next({
        path: "/403"
      });
    }
    //不会走下面的afterEach  所以需要手动去去掉进度条
    NProgress.done();
  }
  next();
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
