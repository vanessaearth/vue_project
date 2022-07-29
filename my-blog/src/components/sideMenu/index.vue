<!--  -->
<template>
  <div>
    <Item :model="route"
          v-for="route in permission_routes"
          :key="route.path"
          :base-path="route.path"></Item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Item from './item'
export default {
  name: 'tree',
  components: { Item },
  data () {
    return {
    }
  },
  props: {},
  computed: {
    ...mapGetters(['permission_routes'])
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
