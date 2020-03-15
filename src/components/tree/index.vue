<!--  -->
<template>
  <div>
    <item :model="model"></item>
  </div>
</template>

<script>
import item from './item'
export default {
  name: 'tree',
  components: { item },
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
