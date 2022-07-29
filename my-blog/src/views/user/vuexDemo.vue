<!--  -->
<template>
  <div class="add-box">
    <!-- <tree></tree> -->
    <div class="fs20">vuex中数据</div>
    <div>count：{{$store.state.count.count}}</div>
    <div>
      <ElButton type="primary"
                 plain
                 @click="add">count+1</ElButton>
      <ElButton type="primary"
                 plain
                 @click=asyncAdd(2)>异步count+2</ElButton>
    </div>
    <div class="gap">vuex中数据刷新页面会重置，可以保持在localstorage中</div>
    <div>
      count2：{{$store.state.count.count2}}
    </div>
    <div>
      <ElButton type="primary"
                 plain
                 @click="addSave">count+1</ElButton>

    </div>
  </div>
</template>

<script>
// import tree from '@/components/tree'
export default {
  name: 'vuexDemo',
  components: {
    // tree
  },
  data () {
    return {
    }
  },
  props: {},
  computed: {},
  methods: {
    add () {
      this.$store.commit('count/increment')
    },
    asyncAdd (data) {
      this.$store.dispatch('count/asyncIncrement', data)
    },
    addSave () {
      this.$store.dispatch('count/asyncIncrementSave')
    }
  },
  watch: {},
  created () {
  },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
</style>
