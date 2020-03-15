<!--  -->
<template>
  <div>
    <item :model="route"
          v-for="route in permission_routes"
          :key="route.path"
          :base-path="route.path"></item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import item from './item'
export default {
  name: 'tree',
  components: { item },
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
