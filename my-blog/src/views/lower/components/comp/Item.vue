<template>
  <div class="line">
    <div class="label">{{ label }}</div>
    <div class="value">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.line{
  display: flex;
  margin-bottom: 5px;
}
.label{
  width: 60px;
  line-height: 40px;
  text-align: right;
  margin-right: 10px;
}
.value{
  flex:1;
}
</style>
