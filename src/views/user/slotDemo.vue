<!--  -->
<template>
  <div class="add-box part-box">
    <div class="fs20">插槽</div>
    <div class="part-title">1.匿名插槽</div>
    <slotCom>哈哈</slotCom>
    <div class="part-title">2.具名插槽，插槽子组件中数据可通过v-slot:content中绑定的数据访问</div>
    <slotCom>
      <template v-slot:content="slotProps">
        父组件中访问子组件中数据：{{slotProps.foo}}
      </template>
    </slotCom>
    <div class="fs20 gap">FormTest</div>
    <formTest></formTest>
  </div>
</template>

<script>
import formTest from '@/components/form/index'
import slotCom from '@/components/slotCom'

export default {
  name: 'slotDemo',
  components: { formTest, slotCom },
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
