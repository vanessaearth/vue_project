<!--  -->
<template>
  <div class="box" v-if="isShow">
    <h3>{{title}}</h3>
    <p class="box-content">{{message}}</p>
  </div>
</template>

<script>
export default {
  name: 'notice',
  components: {},
  data () {
    return {
      isShow: false
    }
  },
  props: {
    title: {
      type: String
    },
    message: {
      type: String
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  computed: {},
  methods: {
    show () {
      this.isShow = true
      // setTimeout(this.hide, this.duration)
    },
    hide () {
      this.isShow = false
      this.remove()
    }
  },
  watch: {},
  created () {},
  mounted () {},
  destroyed () {}
}

</script>
<style lang='scss' scoped>
.box {
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
