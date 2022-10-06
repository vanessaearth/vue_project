<template>
  <div class="box">
    <ul class="box-ul">
      <li
        class="box-li"
        draggable="true"
        @dragstart="dragStart">标题</li>
      <li
        class="box-li"
        draggable="true"
        @dragstart="dragStart">文本</li>
    </ul>
  </div>
</template>

<script>
import { defaultStyle } from './help'
export default {
  methods: {
    dragStart (e, comp) {
      console.log('dragStart', e, comp)
      let fontSize = 14
      let height = 30
      let lineHeight = '30px'
      if (e.target.innerText === '标题') {
        fontSize = 28
        height = 50
        lineHeight = '50px'
      }

      const data = {
        value: '双击编辑' + e.target.innerText,
        style: {
          ...defaultStyle,
          fontSize,
          height,
          lineHeight
        },
        type: 1
      }
      e.dataTransfer.setData('drag-Comp', JSON.stringify(data))
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  z-index: 99999;
  background-color: white;
  position: fixed;
  display: flex;
  width:300px;
  height: 100%;
  box-shadow: #ccc 1px 1px 10px;

}
.box-ul{
  list-style: none;
}
.box-li{
  margin:5px;
  display: inline-block;
  width: 80px;
  height: 80px;
  line-height: 78px;
  text-align: center;
  border:1px solid #ccc;
}
</style>
