<template>
  <div class="add-box">
    <div class="block">
      <div>
        北京总计：{{total}},山西总计：{{sxTotal}}
      </div>
      <VChart :option="bjOption"
              :auto-resize="true"
              class="chart"></VChart>
      <VChart :option="sxOption"
              :auto-resize="true"
              class="chart">
      </VChart>
      <!-- <span class="demonstration">默认</span>
      <el-date-picker v-model="dateRange"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始月份"
                      end-placeholder="结束月份">
      </el-date-picker> -->
      <ElCheckboxGroup v-model="checkList"
                         @change="changeLineCheck">
        <ElCheckbox label="new"></ElCheckbox>
        <ElCheckbox label="current"></ElCheckbox>
        <ElCheckbox label="all"></ElCheckbox>
      </ElCheckboxGroup>
    </div>

     <VChart :option="lineOption"
            :auto-resize="true"
            class="chart"></VChart>
    <VChart v-loading="pieLoading"
            :option="pieOption"
            class="pie-box"></VChart>
   <VChart v-loading="scatterLoading"
           class="chart"
          :option="scatterOption"></VChart>
    <!-- <breadLow></breadLow> -->
    <!-- <breadcrumb></breadcrumb> -->
  </div>
  <!-- <VChart class="chart" :option="pieOption" /> -->
</template>

<script>
import utils from '@/utils/index'
import 'echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, LineChart, ScatterChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { ref, defineComponent, onMounted } from 'vue'
import axios from '@/plugins/axios.js'
use([
  CanvasRenderer,
  PieChart,
  LineChart,
  ScatterChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

export default defineComponent({
  name: 'HelloWorld',
  components: {
    VChart
  },
  provide: {
  },
  setup () {
    const bjOption = ref({
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
    })
    const sxOption = ref({
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
    })
    const pieOption = ref({
      tooltip: {
        trigger: 'item',
        confine: true,
        formatter: params => {
          const res =
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
    })
    const lineOption = ref({
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
          系列1: true,
          // 不选中'系列2'
          系列2: false
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
    })
    const scatterOption = ref({
      xAxis: {},
      yAxis: {},
      series: [{
        type: 'scatter',
        symbolSize: 10,
        symbol: 'rect',
        // symbol: 'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584686403247&di=16121cfe9002ad754f434cefdcb5b03c&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01bc1c5694b3e932f87574bef9bc29.png',
        data: [
          [10.0, 8.04]
        ]
      }]
    })
    const total = ref(0)
    const allData = ref([
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

    ])
    const sxTotal = ref(0)
    const sxAllData = ref([
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
    ])

    const dateRange = ref(['2020-01-01', '2020-01-10'])
    const checkList = ref(['new', 'current'])
    const pieLoading = ref(false)
    const lineLoading = ref(false)
    const scatterLoading = ref(false)
    const lineData = ref([])
    // mounted
    onMounted(() => {
      getLineData({})
      allData.value.forEach((v, i) => {
        bjOption.value.xAxis.data.push(v[0])
        bjOption.value.series.data.push(v[1])
        total.value += v[1]
      })
      sxAllData.value.forEach((v, i) => {
        sxOption.value.xAxis.data.push(v[0])
        sxOption.value.series.data.push(v[1])
        sxTotal.value += v[1]
      })
    })
    const changeLineCheck = async () => {
      const allDate = utils.getDayArray(dateRange.value[0], dateRange.value[1])
      lineOption.value.xAxis.data = allDate
      lineOption.value.series[0].data = []
      lineOption.value.series[1].data = []
      lineOption.value.series[2].data = []
      checkList.value.forEach((v, i) => {
        lineOption.value.series[i].data = utils.lineYaxis(
          allDate,
          lineData.value,
          v,
          'date'
        )[v]
      })
    }
    const getLineData = async (params) => {
      lineLoading.value = true
      axios.post('/getLineData', params).then(res => {
        console.log('res', res)
        lineData.value = []
        lineData.value = res.line
        pieOption.value.series.data = res.pie
        scatterOption.value.series.splice(res.scatter.length)
        res.scatter.forEach((v, i) => {
          scatterOption.value.series[i] = {}
          scatterOption.value.series[i].type = 'scatter'
          scatterOption.value.series[i].symbol = 'image://' + v.img
          scatterOption.value.series[i].data = [[v.xData, v.yData]]
        })
        changeLineCheck()
      }).finally(() => {
        lineLoading.value = false
      })
    }
    console.log('bjOption"', bjOption)
    return {
      changeLineCheck,
      getLineData,
      bjOption,
      sxOption,
      pieOption,
      lineOption,
      scatterOption,
      total,
      allData,
      sxTotal,
      sxAllData,
      dateRange,
      checkList,
      pieLoading,
      lineLoading,
      scatterLoading
    }
  }
})
</script>

<style scoped>
  .pie-box {
    width: 200px;
    height: 200px;
  }
  .chart {
    display: inline-block;
    width: 50%;
    height: 300px;
  }
</style>
