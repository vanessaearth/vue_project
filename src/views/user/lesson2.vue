<!--  -->
<template>
  <div class="add-box">
    <tree></tree>
    <div>扔了：{{$store.state.count}}个</div>
    <!-- <div>还剩：{{$store.getters.left}}个</div> -->
    <div>
      <button @click="add">扔一个</button>
      <button @click=asyncAdd>蓄力扔一个</button>
    </div>
  </div>
</template>

<script>
import tree from '@/components/tree'
export default {
  name: 'lesson2',
  components: { tree },
  data () {
    return {
    }
  },
  props: {},
  computed: {},
  methods: {
    add () {
      this.$store.commit('increment')
    },
    asyncAdd () {
      this.$store.dispatch('asyncIncrement').catch(() => {
        alert('投掷失败，没货了')
      })
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
