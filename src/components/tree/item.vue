<!--  -->
<template>
  <ul>
    <li>
      <div @click="toggle">
        {{model.title}}
        <span v-if="isFolder">
          [{{open?'-':'+'}}]
        </span>
      </div>
      <ul v-show="open"
          v-if="isFolder">
        <item class="item"
              v-for="(model,index) in model.children"
              :model="model"
              :key="index">
        </item>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'item',
  components: {},
  data () {
    return {
      open: false
    }
  },
  props: {
    model: {
      type: Object
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children && this.model.children.length > 0
    }
  },
  methods: {
    toggle () {
      if (this.isFolder) {
        this.open = !this.open
      }
    }
  },
  watch: {},
  created () { },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
</style>
