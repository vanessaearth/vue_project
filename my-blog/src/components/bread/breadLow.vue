<!--  -->
<template>
  <div>
    <span v-for="(item,idx) in items"
          :key="idx">
      <span v-if="idx===items.length-1">{{item.meta.title}}

      </span>
      <span v-else>
        <RouterLink :to="item">{{item.meta.title}}</RouterLink>
        <span>/</span>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'breadLow',
  components: {},
  data () {
    return {
    }
  },
  props: {},
  computed: {
    items () {
      return this.$route.matched.filter(item =>
        item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
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
</style>
