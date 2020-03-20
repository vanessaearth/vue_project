<!--  -->
<template>
  <div class="add-box">
    <h2>权限控制</h2>
    <div>
      admin和editor权限不同可访问路由不同
    </div>
    <div>
      分别使用admin和editor登录
    </div>
    <div>
      admin可访问所有
      editor不可访问用户中心
    </div>
    <div>
      指令方式控制不同角色按钮：
    </div>
    <el-button v-permission="['admin','editor']">admin,editor</el-button>
    <el-button v-permission="['admin']">admin</el-button>
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
  h2 {
    font-size: 30px;
    font-weight: 700;
  }
</style>
