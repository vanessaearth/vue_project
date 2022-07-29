<!--  -->
<template>
  <div>
    <Item :model="model"></Item>
  </div>
</template>

<script>
import Item from './item'
export default {
  name: 'tree',
  components: { Item },
  data () {
    return {
      model: {
        title: 'js',
        children: [
          {
            title: 'vue',
            children:
              [
                { title: 'mounted' },
                { title: 'created' }
              ]
          }, { title: 'react' },
          { title: 'angular' }
        ]
      }
    }
  },
  props: {},
  computed: {},
  methods: {},
  watch: {},
  created () { },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
</style>
