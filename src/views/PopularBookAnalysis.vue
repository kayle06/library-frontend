<template>
  <div id="app">
    <div ref="sortBarChart" style="height: 500px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import {getPopularBookAnalysis} from "@/api";

export default {
  mounted() {
    getPopularBookAnalysis().then(response => {
      console.log(response)
      const {data, dimensions} = response.data.data
      echarts.init(this.$refs.sortBarChart).setOption({
        title: {
          text: '热门图书排行榜'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            console.log(params)
            var dataIndex = params[0].dataIndex;
            var borrowNum = params[0].value[1];
            var bookName = params[0].axisValue;
            return bookName + '<br/>' + borrowNum;
          }
        },
        dataset: [
          {
            dimensions: dimensions,
            source: data
          },
          {
            transform: {
              type: 'sort',
              config: {dimension: 'borrowNum', order: 'desc'}
            }
          }
        ],
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 25,
            formatter: function (value) {
              // 在这里可以自定义文字的显示方式，比如截取前几个字符或者添加省略号
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
  }
}
</script>

<style scoped lang="less">

</style>
