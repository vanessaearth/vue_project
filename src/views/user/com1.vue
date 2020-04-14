<template>
  <div class="add-box part-box">
    <div class="fs20">组件通信</div>
    <div class="part-title">一、父组件传递给子组件</div>
    <ul class="part-ul">
      <li>
        <div class="part-ul-title">1.prop传递,name</div>
        <homeChild :name="name"
                   @myClick="myClick1"></homeChild>
      </li>
      <li>
        <div class="part-ul-title">
          2.$attrs传递,age
        </div>
        <homeChild :age="age"></homeChild>
      </li>
      <li>
        <div class="part-ul-title">
          3.$ref传递,gender,父组件中通过refs，直接修改子组件中的值
        </div>
        <homeChild ref="gender"></homeChild>
      </li>
      <li>
        <div class="part-ul-title">
          4.$children,在父组件中直接$children[0]修改子组件的内容，由于加载顺序不确定性，不推荐此写法
        </div>
        <homeChild></homeChild>
      </li>
    </ul>
    <div class="part-title">
      二、子组件传递给父组件
    </div>
    <ul class="part-ul">
      <li>
        通过子组件$emit派发事件，在组件调用的地方，子组件监听事件，父组件中写对应方法
        <div class="part-ul-title"></div>
      </li>
    </ul>
    <div class="part-title">三、兄弟之间传递数据</div>
    <ul class="part-ul">
      <li>
        通过共同的祖辈组件搭桥，$parent或$root
        <com11></com11>
        <eventBus></eventBus>
      </li>
    </ul>
    <div class="part-title">四、祖先和后代之间传递数据，provide，inject</div>
    <ul class="part-ul">
      <homeChild></homeChild>
    </ul>
    <div class="part-title">五、任意2个组件之间传递数据，事件总线</div>
    <div class="part-ul">点击三中的emit按钮，在控制台查看</div>

  </div>
</template>

<script>
import homeChild from '@/components/homeChild'
import com11 from '@/components/com11'
import eventBus from '@/components/eventBus'
export default {
  name: 'lesson1',
  components: {
    homeChild,
    com11,
    eventBus
  },
  provide () {
    return {
      chineseName: '汤姆'
    }
  },
  data () {
    return {
      name: 'tom',
      age: 1
    }
  },
  methods: {
    myClick1 () { }
  },
  beforeCreate () {
    clog('beforeCreate:', location.href)
  },
  mounted () {
    this.$refs.gender.gender = 'female'
    this.$children[3].kind = 'mouse'
  }
}
</script>
<style lang="scss">
</style>
