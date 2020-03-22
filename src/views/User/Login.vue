<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit.prevent="handleSubmit"
  >
    <div class="login-title">账号密码登录</div>
    <a-form-item>
      <a-input
        v-decorator="[
          'account',
          { rules: [{ required: true, message: '请输入你的账号!' }] },
        ]"
        placeholder="请输入账号"
      >
        <a-icon
          slot="prefix"
          type="user"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入你的密码!' }] },
        ]"
        type="password"
        placeholder="请输入密码"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]">
        记住
      </a-checkbox>
      <!-- <a
        class="login-form-forgot"
        href=""
      >
        忘记密码
      </a> -->
      <a-button
        type="primary"
        html-type="submit"
        class="login-form-button"
      >
        登录
      </a-button>
      <a
        href="/user/register"
        class="login-form-forgot"
      >
        注册账户
      </a>
    </a-form-item>
  </a-form>
</template>

<script>
import { notification } from "ant-design-vue";
import { setStorageObject } from "@/utils/tools";
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      const { form, $router } = this;
      form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          //此处处理需要调用后端接口判断。
          const { account, password } = values;
          const currentUser = {
            account
          };
          let isOk = false;
          if (account === "guest" && password === "guest") {
            currentUser.authority = "guest";
            currentUser.token = "guesttoken";
            isOk = true;
          } else if (account === "user" && password === "user") {
            currentUser.authority = "user";
            currentUser.token = "usertoken";
            isOk = true;
          } else if (account === "admin" && password === "admin") {
            currentUser.authority = "admin";
            currentUser.token = "admintoken";
            isOk = true;
          } else {
            isOk = false;
            notification.error({
              message: "温馨提示",
              description: "账号或密码不正确"
            });
          }
          if (isOk) {
            //保存信息并跳转
            setStorageObject(
              "CURRENT_USER",
              currentUser,
              window.sessionStorage
            );
            $router.push("/");
          }
        }
      });
    }
  }
};
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.login-title {
  height: 45px;
  margin-bottom: 10px;
  font-size: 14px;
  color: rgb(24, 144, 255);
  line-height: 45px;
  text-align: center;
  box-sizing: border-box;
  font-weight: 500;
}
</style>