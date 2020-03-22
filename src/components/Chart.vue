<template>
  <div ref="chartDom"></div>
</template>

<script>
// import echarts from "echarts";   //这样会把整个包打进去需要按需加载
import echarts from "echarts/lib/echarts"; //核心
import "echarts/lib/chart/bar"; //柱状图
import "echarts/lib/component/title"; //标题
//用于监听chart事件
import { addListener, removeListener } from "resize-detector";
import debounce from "lodash/debounce"; //防止抖动
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    //值改变了要重新设置chart
    option(val) {
      this.chart.setOption(val);
    }
    //需要深度监听,  但是耗性能
    // option: {
    //   handler(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true,
    // }
  },
  created() {
    //防抖动
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    //chart 渲染的时候，我们的容器还没渲染好，所以需要重新渲染chat, chart resize
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      console.log("resize", 32423);
      this.chart && this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chartDom);
      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(this.option);
    }
  }
};
</script>

<style>
</style>
