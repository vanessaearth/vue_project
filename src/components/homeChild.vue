<template>
  <div @click="$emit('myClick')">
    name:{{name}},
    age:{{$attrs.age}}
    gender:{{gender}},
    <div @click="sayHello">kind:{{kind}}</div>
    <homeSub></homeSub>
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
      console.log('来自兄弟的问候')
    })
  }
}
</script>

<style scoped lang="scss">
</style>
