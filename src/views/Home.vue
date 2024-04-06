<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/disdain.jpg" alt="">
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-01-01</span></p>
          <p>上次登录地点：<span>上海</span></p>
        </div>
      </el-card>
      <el-card class="left-table">
        <el-table
            :data="tableData"
            border
            style="width: 100%">
          <el-table-column
              v-for="(val, key) in tableLabel"
              :prop="key"
              :label="val"/>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
      <div class="today-content">
        <el-card v-for="item in countData" :key="item.name" :body-style="{display: 'flex', padding: 0}">
          <i class="icon" :class="`el-icon-${item.icon}`"></i>
          <div class="num-content">
            <p class="num">{{ item.value }}</p>
            <p class="describe">{{ item.name }}</p>
          </div>
        </el-card>
      </div>

      <!--      折线图-->
      <el-card style="height: 280px">
        <div ref="echarts1" style="height: 280px;"></div>
      </el-card>

      <div class="graph">
        <el-card style="height: 260px">
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
        <el-card style="height: 260px">
          <div ref="echarts3" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {getStatisticalData} from "@/api";
import * as echarts from 'echarts'

export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      tableLabel: {
        bookName: '图书名称',
        borrowNum: '总借阅数量',
        returnNum: '总归还数量'
      },
      countData: [
        {
          name: '今日进货图书',
          value: 12,
          icon: 'success',
          "color": "#67c23a"
        },
        {
          name: '今日借阅图书',
          value: 12,
          icon: 'success',
          "color": "#67c23a"
        },
        {
          name: '今日归还图书',
          value: 12,
          icon: 'success',
          "color": "#67c23a"
        },
        {
          name: '今日预定图书',
          value: 12,
          icon: 'success',
          "color": "#67c23a"
        },
        {
          name: '今日逾期图书',
          value: 12,
          icon: 'success',
          "color": "#67c23a"
        },
        {
          name: '今日新增用户',
          value: 12,
          icon: 'success',
          "color": "#67c23a"
        },
      ]
    }
  },
  mounted() {
    getStatisticalData().then(({data}) => {
      console.log(data)
      const {tableData} = data.data
      this.tableData = tableData

      // 折线图
      const echarts1 = echarts.init(this.$refs.echarts1)
      var echarts1Option = {}
      const {orderData, userData, videoData} = data.data
      console.log(orderData)
      const xAxis = Object.keys(orderData.data[0])
      const xAxisData = {
        data: xAxis
      }
      echarts1Option.xAxis = xAxisData
      echarts1Option.legend = xAxisData
      echarts1Option.yAxis = {}
      echarts1Option.series = []
      xAxis.forEach(key => {
        echarts1Option.series.push({
          name: key,
          type: 'line',
          data: orderData.data.map(item => item[key])
        })
      })
      echarts1.setOption(echarts1Option)

      // 柱状图
      const echarts2 = echarts.init(this.$refs.echarts2)
      const echarts2Option = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: '#333'
          }
        },
        grid: {
          left: "20%"
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: "category",
          data: userData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          },
          axisLabel: {
            interval: 0,
            color: '#333'
          }
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
          }
        ],
        color: ['#37a2da', '#67e0e3'],
        series: [
          {
            name: '借阅数量',
            type: 'bar',
            data: userData.map(item => item.borrowNum)
          },
          {
            name: '归还数量',
            type: 'bar',
            data: userData.map(item => item.returnNum)
          }
        ]
      }
      echarts2.setOption(echarts2Option)

      // 饼状图
      const echarts3 = echarts.init(this.$refs.echarts3)
      const echarts3Option = {
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            data: videoData,
          }
        ]
      }
      echarts3.setOption(echarts3Option)
    }).catch((error) => {
      console.log(error)
    })


  }
}
</script>

<style scoped lang="less">
.left-table {
  margin-top: 20px;
}

.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;

  img {
    margin-right: 40px;
    width: 135px;
    height: 135px;
    border-radius: 50%;
  }

  .userinfo {
    text-align: left;

    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999999;
    }
  }
}

.login-info {
  text-align: left;

  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;

    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}

.today-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: white;
  }

  i {
    background-color: #42b983;
  }

  .num-content {
    margin-left: 15px;
    display: flex;
    text-align: left;
    flex-direction: column;
    justify-content: center;

    .num {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
    }

    .describe {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }

  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }

}

.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  .el-card {
    width: 48%;
    height: 260px;
  }
}
</style>
