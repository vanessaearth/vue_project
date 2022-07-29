<template>
  <div @click="$emit('myClick')">
    name:{{name}},
    age:{{$attrs.age}}
    gender:{{gender}},
    <div @click="sayHello">kind:{{kind}}</div>
    <HomeSub></HomeSub>
  </div>
</template>

<script>
import homeSub from '@/components/homeSub'
export default {
  name: 'homeChild',
  components: { homeSub },
  props: {
    name: String
  },
  data () {
    return {
      gender: 'male',
      kind: 'cat'
    }
  },
  methods: {
    sayHello () {
      this.$parent.$emit('hiBrother')
    }
  },
  created () {
    this.$parent.$on('hiBrother', () => {
      clog('来自兄弟的问候')
    })
  }
}
</script>

<style scoped lang="scss">
</style>
