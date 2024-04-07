<template>
  <div>
    <div ref="barChart" style="height: 400px"/>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { getBookAnalysis } from "@/api";

export default {
  data() {
    return {
    }
  },
  mounted() {
    getBookAnalysis().then(response => {
      const { data } = response.data
      const barChart = echarts.init(this.$refs.barChart)
      barChart.setOption({
        title: {
          text: '图书分类统计'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: data.map(item => item.category),
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: data.map(item => item.number),
          type: 'bar'
        }]
      })
    })
  },
}
</script>

<style scoped lang="less">

</style>
