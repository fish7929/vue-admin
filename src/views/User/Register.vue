<template>
    <a-form
        :form="form"
        @submit="handleSubmit"
    >
        <div class="register-title">注册</div>
        <a-form-item>
            <a-input
                v-decorator="[
                'account',
                {
                    rules: [
                    {
                        required: true,
                        message: '请输入你账号！',
                    },
                    ],
                },
            ]"
                placeholder="请输入你账号"
            />
        </a-form-item>
        <a-form-item has-feedback>
            <a-input
                v-decorator="[
                    'password',
                    {
                        rules: [
                        {
                            required: true,
                            message: '请输入的密码',
                        },
                        {
                            validator: validateToNextPassword,
                        },
                        ],
                    },
                ]"
                type="password"
                placeholder="请输入密码"
            />
        </a-form-item>
        <a-form-item has-feedback>
            <a-input
                v-decorator="[
                    'confirm',
                    {
                        rules: [
                        {
                            required: true,
                            message: '请确认你的密码',
                        },
                        {
                            validator: compareToFirstPassword,
                        },
                        ],
                    },
                ]"
                type="password"
                @blur="handleConfirmBlur"
                placeholder="确认密码"
            />
        </a-form-item>
        <a-form-item>
            <a-input
                v-decorator="[
                    'phone',
                    {
                        rules: [{ required: true, message: '请输入你的手机号！' }],
                    },
                ]"
                style="width: 100%"
                placeholder="请输入手机号"
            >
                <a-select
                    slot="addonBefore"
                    v-decorator="['prefix', { initialValue: '86' }]"
                    style="width: 70px"
                >
                    <a-select-option value="86">
                        +86
                    </a-select-option>
                    <a-select-option value="87">
                        +87
                    </a-select-option>
                </a-select>
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-button
                type="primary"
                html-type="submit"
                class="register-form-button"
            >
                注册
            </a-button>
            <a
                href="/user/login"
                class="register-form-login"
            >
                使用已有账号登录
            </a>
        </a-form-item>
    </a-form>
</template>

<script>
export default {
  data() {
    return {
      confirmDirty: false,
      autoCompleteResult: []
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("从form中接收的参数: ", values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("两次输入的密码不一致!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    }
  }
};
</script>

<style lang="less" scoped>
.register-title {
  height: 45px;
  margin-bottom: 10px;
  font-size: 14px;
  color: rgb(24, 144, 255);
  line-height: 45px;
  box-sizing: border-box;
  font-weight: 500;
}
.register-form-button {
  width: 50%;
}
.register-form-login {
  float: right;
}
</style>
