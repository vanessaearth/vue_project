<!--  -->
<template>
  <div class="add-box">
    <h2>权限控制</h2>
    <ul class="ul-content">
      <li>
        admin和editor权限不同可访问路由不同
      </li>
      <li>
        分别使用admin和editor登录
      </li>
      <li>
        admin可访问所有
        editor不可访问用户中心
      </li>
    </ul>

    <h2 class="gap">
      指令方式控制不同角色按钮：
    </h2>
    <div class="gap">

      <ElButton type="primary"
                 plain
                 v-permission="['admin','editor']">admin,editor</ElButton>
      <ElButton type="primary"
                 plain
                 v-permission="['admin']">admin</ElButton>
    </div>
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
  .mt20 {
    margin-top: 20px;
  }
  h2 {
    font-size: 20px;
    font-weight: 700;
  }
  .ul-content {
    li {
      font-size: 14px;
      line-height: 2;
      padding-left: 5px;
    }
  }
</style>
