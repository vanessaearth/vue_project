<!--  -->
<template>
  <div>123
    <div v-for="(item,idx) in arr"
         :key="idx"> {{item}}</div>
    <ElButton type="primary"
               @click="reveron">reveron</ElButton>
  </div>
</template>

<script>
export default {
  name: 'jestDemo',
  components: {},
  data () {
    return {
      arr: [1, 2, 3, 4, 5]
    }
  },
  props: {},
  computed: {},
  methods: {
    reveron () {
      this.arr.reverse()
    }
  },
  watch: {},
  created () { },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
</style>
