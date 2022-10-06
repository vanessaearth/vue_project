<template>
  <div
    class="relative"
    :style="{...pageStyle,
             width:pageStyle.width+'px',
             height:pageStyle.height+'px',}">
    <div v-for="item in comps" :key="item.key">
      <div v-if="item.type===1">
        <div
          :style="{...item.style,
                   width:item.style.width+'px',
                   height:item.style.height+'px',
                   top:item.style.top+'px',
                   left:item.style.left+'px',
                   transform:item.style.transform,
                   fontSize:item.style.fontSize+'px',
                   borderWidth:item.style.borderWidth+'px'

          }">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageStyle: {},
      comps: []
    }
  },
  created () {
    this.comps = this.$route.params.data.comps
    this.pageStyle = this.$route.params.data.style
  },
  methods: {
    getData () {

    }
  }
}
</script>

<style lang="scss" scoped>
.relative{
  position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,.2);
}

</style>
