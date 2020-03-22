<template>
  <div>
    {{$t("message")["app.dashboard.analysis.timelLabel"]}} :
    <a-date-picker></a-date-picker>
    <chart
      :option="chartOption"
      style="height: 400px;"
    />
    <!-- If you want to highlight hardcoded source-code -->
    <pre v-highlightjs="chartCode"><code class="html"></code></pre>
  </div>
</template>

<script>
import Chart from "@/components/Chart";
//这种就是不会走vue-loader 强制用raw-loader  加载处理
import chartCode from "!!raw-loader!@/components/Chart";
export default {
  data() {
    return {
      chartOption: {},
      chartCode
    };
  },
  components: {
    Chart
  },
  mounted() {
    this.getChartData();
    this.timer = setInterval(() => {
      this.getChartData();
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    getChartData() {
      this.$request({
        url: "/api/dashboard/chart",
        method: "get",
        params: { id: 12345 }
      }).then(response => {
        const data = response.data;
        this.chartOption = {
          title: {
            text: "ECharts 入门示例"
          },
          tooltip: {},
          legend: {
            data: ["销量"]
          },
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: data
            }
          ]
        };
      });
    }
  }
};
</script>

<style>
</style>
