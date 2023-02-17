<template>
  <div class="main-page">
    <div
      id="main"
      style="height: 400px; width: 500px; border: 1px solid grey; padding: 10px"
    ></div>
    <div
      id="chartLine"
      style="height: 400px; width: 500px; border: 1px solid grey; padding: 10px"
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      data: [1,2,3,3,5,2,6],
    };
  },
  mounted() {
    this.init();
    this.drawChart();
  },
  methods: {
    init() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      myChart.setOption({
        title: { text: "TOY会员男女比例", x: "center" },
        tooltip: { trigger: "item", formatter: "{a},{b} : {c} ({d}%)" },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["男性数量", "女性数量"],
        },
        series: [
          {
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "男性数量" },
              { value: 310, name: "女性数量" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
    lineInit() {
      let data = [1, 2, 3, 4, 5, 6];
      this.data = data;
      this.drawChart();
    },
    drawChart() {
      let myChart = echarts.init(document.getElementById("chartLine"));
      let option = {
        xAxis: {
          type: "category",
          data: ['周一','周二','周三','周四','周五','周六','周日',],
        },
        yAxis: {
          type: "value",
        },
        title: [
          {
            left: 'center',
            text: '周内日活',
          }
        ],
        series: [
          {
            data: this.data,
            type: "line",
            smooth: true,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss">
.main-page {
  display: flex;
  justify-content: space-between;
}
</style>
