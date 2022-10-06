<template>
  <div>
    <Left></Left>
    <CenterBox></CenterBox>
    <Right></Right>

  </div>
</template>
<script>
import Left from './components/left.vue'
import CenterBox from './components/center.vue'
import Right from './components/right.vue'
export default {
  components: {
    Left, CenterBox, Right
  }
}
</script>

<style lang="scss" scoped>

</style>
