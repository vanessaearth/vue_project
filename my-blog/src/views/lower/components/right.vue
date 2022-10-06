<template>
  <div class="box">
    <div class="box-title">
      组件属性：
    </div>
    <template v-if="currentComp">

      <Item label="字体大小" v-if="style.fontSize">
        <ElInput
          type="number"
          v-model="style.fontSize"
          @change="(e)=>handelStyleChange(e,'fontSize')" />
      </Item>
      <Item label="粗细" v-if="style.fontWeight">
        <ElSelect
          v-model="style.fontWeight"
          @change="(e)=>handelStyleChange(e,'fontWeight')">
          <ElOption value="normal"></ElOption>
          <ElOption value="bold"></ElOption>
          <ElOption value="lighter"></ElOption>
        </ElSelect>
      </Item>
      <Item label="行高" v-if="style.lineHeight">
        <ElInput
          type="number"
          v-model="style.lineHeight"
          @change="(e)=>handelStyleChange(e,'lineHeight')" />
      </Item>
      <Item label="对齐" v-if="style.textAlign">
        <ElSelect
          v-model="style.textAlign"
          @change="(e)=>handelStyleChange(e,'textAlign')">
          <ElOption value="left"></ElOption>
          <ElOption value="center"></ElOption>
          <ElOption value="right"></ElOption>
        </ElSelect>
      </Item>
      <Item label="旋转" v-if="style.transform">
        <ElInput
          type="number"
          v-model="style.transform"
          @change="(e)=>handelStyleChange(e,'transform')" />
      </Item>
      <Item label="圆角" v-if="style.borderRadius">
        <ElInput
          type="number"
          v-model="style.borderRadius"
          @change="(e)=>handelStyleChange(e,'borderRadius')" />
      </Item>
      <Item label="边框大小">
        <ElInput
          type="number"
          v-model="style.borderWidth"
          @change="(e)=>handelStyleChange(e,'borderWidth')" />
      </Item>
      <Item label="边框样式">
        <ElSelect
          v-model="style.borderStyle"
          @change="(e)=>handelStyleChange(e,'borderStyle')">
          <ElOption value="none"></ElOption>
          <ElOption value="dashed"></ElOption>
          <ElOption value="dotted"></ElOption>
          <ElOption value="double"></ElOption>
          <ElOption value="groove"></ElOption>
          <ElOption value="hidden"></ElOption>
          <ElOption value="solid"></ElOption>
        </ElSelect>
      </Item>
      <Item label="边框颜色">
        <ElColorPicker
          v-model="style.borderColor"
          @change="(e)=>handelStyleChange(e,'borderColor')"></ElColorPicker>
      </Item>
      <Item label="字体颜色">
        <ElColorPicker
          v-model="style.color"
          @change="(e)=>handelStyleChange(e,'color')"></ElColorPicker>
      </Item>
      <Item label="背景颜色">
        <ElColorPicker
          v-model="style.backgroundColor"
          @change="(e)=>handelStyleChange(e,'backgroundColor')"></ElColorPicker>
      </Item>
    </template>
  </div>
</template>

<script>
// import { defaultStyle } from './help'
import Item from './comp/Item.vue'
export default {
  components: {
    Item
  },
  data () {
    return {
    }
  },
  computed: {
    style () {
      return this.currentComp.style || {}
    },
    currentComp () {
      return this.$canvas.getSelectedComp() || {}
    }

  },

  mounted () {

  },
  methods: {
    handelStyleChange (e, name) {
      const newStyle = { [name]: this.style[name] }
      this.$canvas.updateSelectedComp(newStyle)
    }

  }
}
</script>

<style lang="scss" scoped>
.box{
  z-index: 99999;
  background-color: white;
  position: fixed;
  width:300px;
  height: 100%;
  top: 80px;
  right: 20px;
  box-shadow: #ccc 1px 1px 10px;
}
.box-title{
  font-size: 16px;
  font-weight: 700;
  padding: 5px;
}
</style>
