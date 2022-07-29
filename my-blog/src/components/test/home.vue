<!--  -->
<template>
  <div>
    <span>{{message}}</span>
    <button @click="changeMsg">点击</button>
  </div>
</template>

<script>
export default {
  name: 'index',
  components: {},
  data () {
    return {
      message: 'init msg'
    }
  },
  props: {},
  computed: {},
  methods: {
    changeMsg () {
      this.message = 'change msg'
    }
  },
  watch: {},
  created () { },
  mounted () {
    this.message = 'mounted msg'
  },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
</style>
