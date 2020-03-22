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
        <a-input
          v-decorator="['payAccount', {initialValue: step.payAccount, rules: rules}]"
          placeholder="请输入付款账户"
        />
      </a-form-item>
      <a-form-item
        label="收款账户"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        <ReceiveAccount v-decorator="['receiveAccount', {initialValue: step.receiveAccount, rules: [
        {
          required: true,
          message: '请输入收款账号',
          validator: (rule, value, callback) => {
            //只是做非空校验
            if(value && value.number){
              callback();
            }else{
              callback(false);
            }
          }
          }
          ]}]" />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          @click="handleSubmit"
        >下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
//有命名空间的导入
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("form");
import ReceiveAccount from "@/components/ReceiveAccount";
export default {
  components: {
    ReceiveAccount
  },
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
          message: "请输入付款账号"
        }
      ]
    };
  },
  computed: {
    ...mapState(["step"])
  },
  methods: {
    ...mapMutations(["saveStepFormData"]),
    handleSubmit() {
      const { $router, form } = this;
      form.validateFields((err, values) => {
        if (!err) {
          //保存数据
          this.saveStepFormData({ payload: values });
          $router.push("/form/step-form/confirm");
        }
      });
    }
  }
};
</script>

<style>
</style>
