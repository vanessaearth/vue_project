<!--  -->
<template>
  <div>
    <div class="fs20">文件上传</div>
    <button class="btn-primary">选择文件</button>
    <input type="file">
  </div>
</template>

<script>
export default {
  name: 'fileUpload',
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
  button {
    color: $primary-color;
  }
</style>
