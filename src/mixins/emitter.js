// 向上派发
function $dispatch (eventName, data) {
  let parent = this.$parent
  // 查找父元素
  while (parent) {
    parent.$emit(eventName, data)
    parent = parent.$parent
  }
}
function $broadcast (eventName, data) {
  this.$children.forEach(child => {
    child.$emit(eventName, data)
    if (child.$children.length) {
      $broadcast.call(child, eventName, data)
    }
  })
}
export default {
  methods: {
    $dispatch,
    $broadcast: function (eventName, data) {
      $broadcast.call(this, eventName, data)
    }
  }
}
