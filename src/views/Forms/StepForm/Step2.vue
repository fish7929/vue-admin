<template>
  <div>
    <a-form
      :layout="formLayout"
      :form="form"
    >
      <a-form-item
        label="付款账户"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        {{step.payAccount}}
      </a-form-item>
      <a-form-item
        label="收款方式"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        {{step.receiveAccount.type}}
      </a-form-item>
      <a-form-item
        label="收款账户"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        {{step.receiveAccount.number}}
      </a-form-item>
      <a-form-item
        label="密码"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        <a-input
          type="password"
          v-decorator="['password', {initialValue: step.password || '', rules: rules}]"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          @click="handleSubmit"
        >提交</a-button>
        <a-button
          style="margin-left: 10px;"
          @click="handlePrev"
        >上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
//有命名空间的导入
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("form");
export default {
  data() {
    this.form = this.$form.createForm(this);
    return {
      formLayout: "horizontal",
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      },
      rules: [
        {
          required: true,
          min: 6,
          message: "请输入6位密码"
        }
      ]
    };
  },
  computed: {
    ...mapState(["step"])
  },
  methods: {
    ...mapActions(["submitStepForm"]),
    handleSubmit() {
      const { step, form } = this;
      form.validateFields((err, values) => {
        if (!err) {
          //提交数据并保存
          this.submitStepForm({ payload: { ...step, ...values } });
        }
      });
    },
    handlePrev() {
      this.$router.push("/form/step-form/info");
    }
  }
};
</script>

<style>
</style>
