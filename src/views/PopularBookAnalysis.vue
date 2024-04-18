<template>
  <div id="app">
    <div ref="sortBarChart" style="height: 500px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { getPopularBookAnalysis, getPopularBooks } from "@/api";

export default {
  data() {
    return {
      barChart: []
    }
  },
  methods: {
    getPopularBooks() {
      getPopularBooks().then(({data}) => {
        console.log(data)
        this.barChart = data.data
      }).catch(() => {
        this.$message.error('获取热门图书失败')
      })
    }
  },
  mounted() {
    this.getPopularBooks()
    getPopularBookAnalysis().then(response => {
      echarts.init(this.$refs.sortBarChart).setOption({
        title: {
          text: '热门图书排行榜'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var bookName = params[0].data.title;
            var borrowCount = params[0].data.borrowCount;
            return bookName + '<br/>' + borrowCount;
          }
        },
        dataset: [
          {
            dimensions: ['title', 'borrowCount'],
            source: this.barChart
          },
          {
            transform: {
              type: 'sort',
              config: {dimension: 'borrowCount', order: 'desc'}
            }
          }
        ],
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 25,
            formatter: function (value) {
              return value.length > 6 ? value.substr(0, 6) + '...' : value;
            }
          }
        },
        yAxis: {},
        series: {
          type: 'bar',
          encode: {x: 'name', y: 'score'},
          datasetIndex: 1
        }
      })
    })
  },
}
</script>

<style scoped lang="less">

</style>
