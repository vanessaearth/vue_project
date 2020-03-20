<!--  -->
<template>
  <div class="add-box">
    <div class="block">
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
// import breadLow from '@/components/bread/breadLow'
// import breadcrumb from '@/components/bread/breadcrumb'
export default {
  name: 'index',
  components: { vchart },
  data () {
    return {
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
            name: '',
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
          },
          {
            name: '',
            type: 'line',
            yAxisIndex: 3,
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
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
  .pie-box {
    width: 200px;
    height: 200px;
  }
</style>
