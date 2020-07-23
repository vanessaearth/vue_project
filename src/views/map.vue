<!--
/**
 * @name 'Home'
 * @desc ''
 * @author ''
 * @time 2020年05月19日 19:19:12 Tuesday
 */
-->
<template>
  <div class="container">
    <!-- <div :class="{ aside:true ,'aside-open':isAsideOpen ,'aside-close':!isAsideOpen}">
      <div class="aside-header">
        轨迹查询
        <i :class="{'el-icon-d-arrow-left':isAsideOpen,'el-icon-d-arrow-right':!isAsideOpen}"
           :title="isAsideOpen ? '折叠':'展开'"
           @click="isAsideOpen=!isAsideOpen;" />
      </div>
      <div v-if="isAsideOpen"
           class="aside-container">
        <el-button type="primary"
                   @click="searchPage">search </el-button>
        <div class="aside-receive-item">
          <label>选择车辆：</label>
          <el-select v-model="filterParams.vehicle"
                     clearable
                     filterable
                     placeholder="请选择">
            <el-option v-for="item in filterOptions.vehicle"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="aside-receive-item">
          <label>选择渠道：</label>
          <el-select v-model="filterParams.channel"
                     clearable
                     filterable
                     placeholder="请选择">
            <el-option v-for="item in filterOptions.channel"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="aside-receive-item">
          <label>选择时间：</label>
          <el-date-picker v-model="filterParams.daterange"
                          type="daterange"
                          value-format="timestamp"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>

        </div>
      </div>
    </div> -->
    <!-- <span>Center: {{ center }}</span>
    <span>Zoom: {{ zoom }}</span> -->
    <l-map ref="myMap"
           style="height:95vh; width: 100%"
           :center="center"
           :zoom="zoom"
           :max-zoom="20"
           :options="{zoomControl: false}"
           @update:center="centerUpdated"
           @update:zoom="zoomUpdated">
      <l-tile-layer :url="url" />
      <l-polyline v-for="(item,index) in polyline"
                  :key="index"
                  :lat-lngs="item.latlngs"
                  :color="item.color"></l-polyline>
      <!-- 起点终点 -->
      <l-marker v-for="(item,index) in markerStartEnd"
                :key="`start${index}`"
                :lat-lng="item.latlng"
                :icon="item.type==='start'?startIcon:endIcon">
        <l-popup>
          <div>我是div内容</div>
        </l-popup>
      </l-marker>
      <!-- 加减速及休息点 -->
      <l-marker v-for="(item,index) in markerLatLng"
                :key="`point${index}`"
                :lat-lng="item.latlng">
        <l-tooltip :options="{ permanent: true, interactive: true, direction: 'top',offset:[0,30],className:'tooltip-black' }">
          <div v-if="item.type==='sudden_deceleration_point'">加速</div>
          <div v-else-if="item.type==='stop_point'">停车</div>
          <div v-else>其他</div>
        </l-tooltip>
      </l-marker>
      <l-control-zoom position="bottomright"></l-control-zoom>
      <!--<LPopup>
        </LPopup>
        <LControlZoom></LControlZoom>
        <LMarker></LMarker> -->
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LPolyline, LMarker, LPopup, LTooltip, LControlZoom } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'

export default {
  name: 'Home',
  components: { LMap, LTileLayer, LPolyline, LMarker, LPopup, LTooltip, LControlZoom },
  data () {
    return {
      url: 'http://rt2.map.gtimg.com/realtimerender?z={z}&x={x}&y={-y}&type=vector&style=0',
      // url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 18,
      center: [40.020618489583335, 116.26861355251737],
      polyline1: {
        latlngs: [[39.924232, 116.397226], [39.920026, 116.403262], [39.923346, 116.409586], [39.928216, 116.404987], [39.926832, 116.418785]],
        color: 'green'
      },
      polyline2: {
        latlngs: [[39.926832, 116.418785], [39.923346, 116.424965]],
        color: 'red'
      },
      // 轨迹线
      polyline: [],
      // 起点终点
      markerStartEnd: [],
      // 加减速点
      markerLatLng: [],
      startIcon: L.icon({ iconUrl: require('@/assets/img/map/start.png'), iconSize: [25, 25], iconAnchor: [12.5, 25] }),
      endIcon: L.icon({ iconUrl: require('@/assets/img/map/end.png'), iconSize: [25, 25], iconAnchor: [12.5, 25] }),
      isAsideOpen: true,
      filterParams: {
        vehicle: '',
        channel: '',
        daterange: []
      },
      filterOptions: {
        vehicle: [],
        channel: []
      }
    }
  },
  props: {},
  computed: {},
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom
    },
    centerUpdated (center) {
      this.center = center
    },
    async asyncGetData () {
      const res = await this.$axios.get('/device/track_detail')
      clog('res:', res)
      const markerLatLng = []
      res[0].alarm_points.forEach(v => {
        markerLatLng.push({
          type: v.alarm_type,
          latlng: [v.latitude, v.longitude]
        })
      })
      this.markerLatLng = markerLatLng
      const arr = res[0].points

      const colorMap = {
        normal: 'green',
        over_speed: 'red',
        fatigue: 'yellow',
        sleep: 'black'
      }
      const polylines = []
      let index = 0
      this.markerStartEnd.push({
        type: 'start',
        latlng: [arr[0].latitude, arr[0].longitude]
      })
      this.markerStartEnd.push({
        type: 'end',
        latlng: [arr[arr.length - 1].latitude, arr[arr.length - 1].longitude]
      })
      for (let i = 0; i < arr.length; i++) {
        if (arr[i + 1] && arr[i].point_type === arr[i + 1].point_type) {
          if (polylines[index] && polylines[index].color) {
            polylines[index].latlngs.push([arr[i].latitude, arr[i].longitude])
          } else {
            polylines[index] = {
              latlngs: [[arr[i].latitude, arr[i].longitude]],
              color: colorMap[arr[i].point_type]
            }
          }
        } else {
          // 上一个类型轨迹终点，不设置会连不上下一次的起点
          polylines[index].latlngs.push([arr[i].latitude, arr[i].longitude])
          polylines[index].color = colorMap[arr[i].point_type]
          // 一段新类型的数据开始后需要新建折线数组
          index++
          if (polylines[index] && polylines[index].color) {
            polylines[index].latlngs.push([arr[i].latitude, arr[i].longitude])
          } else {
            polylines[index] = {
              latlngs: [[arr[i].latitude, arr[i].longitude]],
              color: arr[i + 1] && colorMap[arr[i + 1].point_type]
            }
          }
        }
      }
      this.polyline = polylines
    },
    async asyncChannel () {
      const res = await this.$axios.get('/channel/channels')
      if (res) {
        this.filterOptions.channel = res
      }
    },
    searchPage () {
      this.asyncGetData()
    }

  },
  watch: {},
  created () { },
  mounted () {
    this.asyncChannel()
    this.asyncGetData()
  },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
.container {
  border: 2px solid #dcdfe6;
  overflow: auto;
  height: 100%;
  max-height: 100%;
  flex: 1;
  display: flex;
  flex-flow: row;
  .aside {
    border-left: 2px solid #dcdfe6;
    border-right: 2px solid #dcdfe6;
    display: flex;
    flex-flow: column;
    .aside-header {
      font-size: 16px;
      background-color: #f4f4f5;
      height: 25px;
      line-height: 25px;
      text-align: left;
      position: relative;
      padding-left: 20px;
      i {
        position: absolute;
        right: 0;
        cursor: pointer;
        height: 25px;
        line-height: 25px;
        width: 25px;
        text-align: center;
      }
    }
    .aside-container {
      // flex: 1;
      // display: flex;
      // flex-flow: row;
      height: 100%;
      max-height: 100%;
      cursor: pointer;
      .list {
        // width: 215px;
        // flex: 1;
        display: flex;
        flex-flow: column;
        .receive {
          display: flex;
          flex-flow: column;
          background-color: #409eff33;
          .aside-receive-item {
            padding: 3px 0;
            text-align: center;
            label {
              display: inline-block;
              width: 85px;
              text-align: left;
              font-size: 12px;
            }
            .el-cascader,
            .el-select,
            .el-input,
            .el-button {
              width: 110px;
            }
          }
        }
        .tableList {
          width: 125px;
          max-height: 100%;
        }
      }
      .minilist {
        width: 205px;
        .tableList {
          width: 100%;
          height: 100%;
        }
      }
      .edit {
        height: 100%;
        max-height: 100%;
        flex: 1;
        overflow: auto;
        .edit-result {
          list-style: none;
          padding: 0;
          margin: auto;
          li {
            padding: 5px;
            cursor: pointer;
            &:hover {
              background-color: #66b1ff;
            }
          }
          .el-icon-circle-close {
            color: #f13f3f;
            font-size: 20px;
            font-weight: bold;
          }
        }
        .edit-description {
          display: flex;
          flex-flow: column;
          div {
            flex: 1;
            padding: 5px;
            label {
              font-size: 14px;
              color: #606266;
              padding: 10px 2px;
            }
            textarea {
              width: 100%;
              height: 50px;
              border-color: #c0c4cc;
              border-radius: 4px;
              resize: none;
            }
          }
        }
      }
    }
  }
  .aside-open {
    width: 330px;
  }
  .aside-close {
    width: 30px;
  }
  .main {
    flex: 1;
    display: flex;
    overflow: hidden;
    flex-flow: column;
    align-content: flex-start;
    .row {
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
      height: 50%;
      width: 100%;
    }
    .t-div {
      .small-img-box {
        width: 8.33%;
        height: 33.33%;
      }
    }
    .b-div {
      .b-l-div {
        width: 33.33%;
        height: 100%;
        border: 2px solid #dcdfe6;
        position: relative;
        display: flex;
        flex-flow: column;
      }
      .b-r-div {
        display: flex;
        flex-flow: row wrap;
        align-content: flex-start;
        height: 100%;
        width: 66.67%;
        .small-img-box {
          width: 12.5%;
          height: 33.33%;
        }
      }
    }

    .small-img-box {
      border: #e6e6e6 3px solid;
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-flow: column;
      .el-icon-circle-check {
        position: absolute;
        right: 5px;
        top: 5px;
        color: #3a8ee6;
        font-weight: bold;
      }
      .mantag-short {
        position: absolute;
        background-color: #fff;
        border-radius: 4px;
        padding: 2px;
        bottom: 20px;
        left: 2px;
      }
      .photo-tag {
        position: absolute;
        background-color: #fff;
        border-radius: 4px;
        padding: 2px;
        bottom: 20px;
        right: 2px;
      }
      .mantag-start {
        position: absolute;
        background-color: #fff;
        border-radius: 4px;
        padding: 2px;
        top: 3px;
        right: 3px;
        text-align: center;
        vertical-align: middle;
        margin: auto;
      }
    }
    .elimg {
      width: 100%;
      height: 100%;
      margin: auto;
      user-select: none;
    }
    .title-div {
      text-align: center;
    }
    .active {
      border: #3a8ee6 3px solid;
    }
    .menu {
      background-color: #e6e6e6;
      position: fixed;
      z-index: 999;
      cursor: pointer;
      font-size: 14px;
      overflow: auto;
      width: 185px;
      height: 430px;
      .menu-item {
        padding-left: 20px;
        padding-right: 5px;
        height: 20px;
        line-height: 20px;
        &:hover {
          background-color: #66b1ff;
        }
      }
      .menu-item-disabled {
        opacity: 0.5;
        cursor: default;
      }
      .menu-sep {
        padding: 1px;
        border: 1px solid #f5f7fa;
      }
    }
  }
}
</style>
