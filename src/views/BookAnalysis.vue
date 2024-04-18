<template>
  <div class="top">
    <div ref="pieChart" style="height: 350px"/>
    <div ref="barChart" style="height: 350px"/>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import {getBookAnalysis, getCategoryAnalyse} from "@/api";

export default {
  data() {
    return {
      chartData: []
    }
  },
  methods: {
    getCategoryAnalyse() {
      getCategoryAnalyse().then(({data}) => {
        console.log(data)
        this.chartData = data.data.map(item => ({
          category: item.category,
          number: item.number
        }))
        console.log(this.chartData)
      }).catch(() => {
        this.$message.error('获取图书分类分析失败')
      })
    },
  },
  mounted() {
    this.getCategoryAnalyse()
    getBookAnalysis().then(response => {
      const {data} = response.data
      const barChart = echarts.init(this.$refs.barChart)
      const pieChart = echarts.init(this.$refs.pieChart)
      barChart.setOption({
        title: {
          text: '图书分类统计',
          left: 'center'
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
          data: this.chartData.map(item => item.category),
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.chartData.map(item => item.number),
          type: 'bar'
        }]
      })
      pieChart.setOption({
        title: {
          text: '图书分类占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.chartData.map(item => item.category)
        },
        series: [
          {
            name: '图书分类',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.chartData.map(item => ({name: item.category, value: item.number})),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    })
  },
}
</script>

<style scoped lang="less">

</style>
