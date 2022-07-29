<!--  -->
<template>
  <div class="icon-box">
    <svg :class="svgClass"
         aria-hidden="true"
         v-on="$listeners">
      <use :xlink:href="iconName"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'SvgIcon',
  components: {},
  data () {
    return {
    }
  },
  props: {
    iconClass: {
      type: String,
      require: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon' + this.className
      } else {
        return 'svg-icon'
      }
    }
  },
  methods: {},
  watch: {},
  created () { },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
  .icon-box {
    margin-right: 10px;
    display: inline-block;
    vertical-align: top;
  }
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
