<template>
    <a-input-group compact>
        <a-select
            v-model="type"
            style="width: 130px"
            @change="handleTypeChange"
        >
            <a-select-option value="alipay">支付宝</a-select-option>
            <a-select-option value="bank">银行账户</a-select-option>
        </a-select>
        <a-input
            style="width: calc(100% - 130px)"
            v-model="number"
            @change="handleNumberChange"
        />
    </a-input-group>
</template>

<script>
export default {
  props: {
    value: {
      type: Object
    }
  },
  data() {
    //从属性中获取
    const { type, number } = this.value || {};
    return {
      type: type || "alipay",
      number: number || ""
    };
  },
  watch: {
    //修改的时候同步属性
    value(val) {
      Object.assign(this, val);
    }
  },
  methods: {
    handleTypeChange(val) {
      this.$emit("change", { ...this.value, type: val });
    },
    handleNumberChange(e) {
      const val = e.target.value;
      this.$emit("change", { ...this.value, number: val });
    }
  }
};
</script>

<style>
</style>
