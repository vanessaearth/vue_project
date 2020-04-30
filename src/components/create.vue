<!--
/**
 * @name 'create'
 * @desc '弹窗组件'
 * @author 'vanessa'
 * @time 2020年04月30日 13:19:37 Thursday
 */
-->
<template>
  <div class="msg-box"
       v-if="isShow">
    <div class="title">
      {{title}}
    </div>
    <div class="msg">
      {{msg}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'create',
  props: {
    title: { type: String },
    msg: { type: String },
    duration: { type: Number }
  },
  components: {},
  data () {
    return {
      isShow: false
    }
  },
  computed: {},
  methods: {
    hide () {
      this.isShow = false
      this.remove()
    },
    show () {
      this.isShow = true
      setTimeout(() => {
        this.hide()
      }, this.duration)
    }
  },
  watch: {},
  created () { },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
  .msg-box {
    position: fixed;
    top: 100px;
    left: 50%;
    width: 400px;
    height: 100px;
    margin-left: -100px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    text-align: center;
    padding: 20px;
    .title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 20px;
    }
  }
</style>
