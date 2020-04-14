<!--  -->
<template>
  <div class="add-box">
    <div class="block">
      <div>
        北京总计：{{total}},山西总计：{{sxTotal}}
      </div>
      <vchart :options="bjOption"
              :auto-resize="true"
              class="chart"></vchart>
      <vchart :options="sxOption"
              :auto-resize="true"
              class="chart">
      </vchart>
      <!-- <span class="demonstration">默认</span>
      <el-date-picker v-model="dateRange"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始月份"
                      end-placeholder="结束月份">
      </el-date-picker> -->
      <el-checkbox-group v-model="checkList"
                         @change="changeLineCheck">
        <el-checkbox label="new"></el-checkbox>
        <el-checkbox label="current"></el-checkbox>
        <el-checkbox label="all"></el-checkbox>
      </el-checkbox-group>
    </div>

    <vchart :options="lineOption"
            :auto-resize="true"
            class="line-box"></vchart>
    <vchart v-loading="pieLoading"
            :options="pieOption"
            class="pie-box"></vchart>
    <vchart v-loading="scatterLoading"
            :options="scatterOption"></vchart>
    <!-- <breadLow></breadLow> -->
    <!-- <breadcrumb></breadcrumb> -->
  </div>

</template>

<script>
import utils from '@/utils/index'
import vchart from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
// import breadLow from '@/components/bread/breadLow'
// import breadcrumb from '@/components/bread/breadcrumb'
export default {
  name: 'chart',
  components: { vchart },
  data () {
    return {
      total: 0,
      allData: [
        ['2020-01-22', 15],
        ['2020-01-23', 15],
        ['2020-01-24', 15],
        ['2020-01-25', 20],
        ['2020-01-26', 4],
        ['2020-01-27', 19],
        ['2020-01-28', 11],
        ['2020-01-29', 12],
        ['2020-01-30', 18],
        ['2020-01-31', 24],
        ['2020-02-01', 27],
        ['2020-02-02', 32],
        ['2020-02-03', 16],
        ['2020-02-04', 25],
        ['2020-02-05', 21],
        ['2020-02-06', 23],
        ['2020-02-07', 18],
        ['2020-02-08', 11],
        ['2020-02-09', 11],
        ['2020-02-10', 5],
        ['2020-02-11', 10],
        ['2020-02-12', 14],
        ['2020-02-13', 6],
        ['2020-02-14', 3],
        ['2020-02-15', 5],
        ['2020-02-16', 1],
        ['2020-02-17', 6],
        ['2020-02-18', 6],
        ['2020-02-19', 2],
        ['2020-02-20', 1],
        ['2020-02-21', 3],
        ['2020-02-22', 0],
        ['2020-02-23', 0],
        ['2020-02-24', 0]

      ],
      bjOption: {
        title: {
          text: '北京疫情数据',
          left: 'center',
          top: 0
        },
        tooltip: {},
        xAxis: {
          data: []
        },
        yAxis: {
        },
        series: {
          name: '销量',
          type: 'line',
          smooth: true,
          data: []
        }
      },
      sxTotal: 0,
      sxAllData: [
        ['2020-01-25', 8],
        ['2020-01-26', 4],
        ['2020-01-27', 7],
        ['2020-01-28', 7],
        ['2020-01-29', 8],
        ['2020-01-30', 4],
        ['2020-01-31', 8],
        ['2020-02-01', 9],
        ['2020-02-02', 10],
        ['2020-02-03', 8],
        ['2020-02-04', 7],
        ['2020-02-05', 9],
        ['2020-02-06', 6],
        ['2020-02-07', 8],
        ['2020-02-08', 12],
        ['2020-02-09', 4],
        ['2020-02-10', 3],
        ['2020-02-11', 2],
        ['2020-02-12', 2],
        ['2020-02-13', 0],
        ['2020-02-14', 1],
        ['2020-02-15', 1],
        ['2020-02-16', 1],
        ['2020-02-17', 1],
        ['2020-02-18', 1],
        ['2020-02-19', 0],
        ['2020-02-20', 1],
        ['2020-02-21', 0],
        ['2020-02-22', 0],
        ['2020-02-23', 0]
      ],
      sxOption: {
        title: {
          text: '山西疫情数据',
          left: 'center',
          top: 0
        },
        tooltip: {},
        xAxis: {
          data: []
        },
        yAxis: {
        },
        series: {
          name: '销量',
          type: 'line',
          smooth: true,
          data: []
        }
      },
      dateRange: ['2020-01-01', '2020-01-10'],
      checkList: ['new', 'current'],
      pieOption: {
        tooltip: {
          trigger: 'item',
          confine: true,
          formatter: params => {
            let res =
              '<div style="display:inline-block;margin-right:3px;width:5px;height:5px;border-radius:50%;background:' +
              params.color +
              '"></div>'
            return res + params.name + '<br/>' + params.value + '<br/>' + params.percent + '%'
          }
        },
        series: {
          name: '比例',
          hoverAnimation: false,
          type: 'pie',
          radius: ['45%', '85%'],
          avoidLabelOverlap: false,
          label: {
            show: false
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: []
        }
      },
      lineOption: {
        title: {
          text: '折线图'
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(102,102,102,0.8)'
        },
        legend: {
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 20,
          bottom: '0',
          selected: {
            // 选中'系列1'
            '系列1': true,
            // 不选中'系列2'
            '系列2': false
          },
          data: []
        },
        xAxis: { data: [] },
        yAxis: [
          {
            type: 'value',
            show: true,

            splitLine: {
              lineStyle: {
                color: ['#f5f5f5']
              }
            }
          },
          {
            type: 'value',
            show: false
          },
          {
            type: 'value',
            show: false

          },
          {
            type: 'value',
            show: false

          }
        ],
        series: [
          {
            name: 'all',
            type: 'line',
            yAxisIndex: 0,
            smooth: true,
            data: []
          },
          {
            name: '',
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            data: []
          },
          {
            name: '',
            type: 'line',
            yAxisIndex: 2,
            smooth: true,
            data: []
          }
        ]
      },
      scatterOption: {
        xAxis: {},
        yAxis: {},
        series: [{
          type: 'scatter',
          symbolSize: 10,
          // symbol: 'rect',
          symbol: 'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584686403247&di=16121cfe9002ad754f434cefdcb5b03c&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01bc1c5694b3e932f87574bef9bc29.png',
          data: [
            [10.0, 8.04]
          ]
        }]
      },
      pieLoading: false,
      lineLoading: false,
      scatterLoading: false
    }
  },
  props: {},
  computed: {},
  methods: {
    changeLineCheck () {
      let allDate = utils.getDayArray(this.dateRange[0], this.dateRange[1])
      this.lineOption.xAxis.data = allDate
      this.lineOption.series[0].data = []
      this.lineOption.series[1].data = []
      this.lineOption.series[2].data = []
      this.checkList.forEach((v, i) => {
        this.lineOption.series[i].data = utils.lineYaxis(
          allDate,
          this.lineData,
          v,
          'date'
        )[v]
      })
    },
    getLineData (params) {
      this.lineLoading = true
      this.axios.post('/getLineData', params).then(res => {
        this.lineData = []
        this.lineData = res.line
        this.pieOption.series.data = res.pie
        this.scatterOption.series.splice(res.scatter.length)
        res.scatter.forEach((v, i) => {
          this.scatterOption.series[i] = {}
          this.scatterOption.series[i].type = 'scatter'
          this.scatterOption.series[i].symbol = 'image://' + v.img
          this.scatterOption.series[i].data = [[v.xData, v.yData]]
        })
        this.changeLineCheck()
      }).finally(() => {
        this.lineLoading = false
      })
    }

  },
  watch: {},
  created () { this.getLineData({}) },
  mounted () {
    this.allData.forEach((v, i) => {
      this.bjOption.xAxis.data.push(v[0])
      this.bjOption.series.data.push(v[1])
      this.total += v[1]
    })
    this.sxAllData.forEach((v, i) => {
      this.sxOption.xAxis.data.push(v[0])
      this.sxOption.series.data.push(v[1])
      this.sxTotal += v[1]
    })
  },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
  .pie-box {
    width: 200px;
    height: 200px;
  }
  .chart {
    display: inline-block;
    width: 50%;
  }
</style>
