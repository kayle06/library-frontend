<template>
  <div>
    <div ref="barChart" style="height: 500px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { getBookCirculation } from '@/api';

export default {
  data() {
    return {
      chartData: {}
    }
  },
  methods: {
    getBookCirculation() {
      getBookCirculation().then(({ data}) => {
        console.log(data)
        this.chartData = data.data
      }).catch(error => {
        this.$message.error('获取图书流通信息失败')
      })
    },
  },
  mounted() {
    getBookCirculation().then(response => {
      console.log(response)
      const { items, years } = response.data.data

      const series = [];
      items.forEach(item => {
        series.push({
          name: item.name,
          type: 'bar',
          label: item.name,
          emphasis: { focus: 'series'},
          data: item.value
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
          data: items.map(item => item.name)
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
            data: years
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
