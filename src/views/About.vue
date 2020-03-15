<!--  -->
<template>
  <div>
    about
    hi
    <button v-permission="['admin','editor']">admin,editor</button>
    <button v-permission="['admin']">admin</button>
  </div>
</template>

<script>
export default {
  name: 'about',
  components: {},
  data () {
    return {
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
