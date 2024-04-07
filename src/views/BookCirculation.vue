<template>
  <div>
    <div ref="barChart" style="height: 500px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { getBookCirculation } from '@/api';

export default {
  mounted() {
    getBookCirculation().then(response => {
      console.log(response)
      const { data, categories } = response.data.data

      const series = [];
      data.forEach(item => {
        series.push({
          name: item.name,
          type: 'bar',
          label: item.name,
          emphasis: { focus: 'series'},
          data: item.values
        })
      })

      const barChart = echarts.init(this.$refs.barChart)
      barChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: data.map(item => item.name)
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: categories
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: series
      })
    })
  }
}
</script>

<style scoped lang="less">

</style>
