<!--
/**
 * @name 'userList'
 * @desc '用户列表'
 * @author 'yangjin'
 * @time 2020年04月25日 20:30:45 Saturday
 */
-->
<template>
  <div>
    <div v-for="(item,idx) in userData"
         :key="idx">
      {{item}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'userList',
  components: {},
  data () {
    return {
      userData: []
    }
  },
  props: {},
  computed: {},
  methods: {
    getAllUser () {
      this.$axios.get('/userList').then(res => {
        this.userData = res
      })
    }
  },
  watch: {},
  created () {
    this.getAllUser()
  },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
</style>
