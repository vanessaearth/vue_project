<template>
  <div class="add-box part-box">
    <h1>组件化实践</h1>
    <h2>组件通信</h2>
    <div class="part-title">一、父组件传递给子组件</div>
    <ul>
      <li>
        <div class="blod">1.prop传递,name</div>
        <homeChild :name="name"
                   @myClick="myClick1"></homeChild>
      </li>
      <li>
        <div class="blod">
          2.$attrs传递,age
        </div>
        <homeChild :age="age"></homeChild>
      </li>
      <li>
        <div class="blod">
          3.$ref传递,gender,父组件中通过refs，直接修改子组件中的值
        </div>
        <homeChild ref="gender"></homeChild>
      </li>
      <li>
        <div class="blod">
          4.$children,在父组件中直接$children[0]修改子组件的内容，由于加载顺序不确定性，不推荐此写法
        </div>
        <homeChild></homeChild>
      </li>
    </ul>
    <div class="part-title">
      二、子组件传递给父组件
    </div>
    <ul>
      <li>
        通过子组件$emit派发事件，在组件调用的地方，子组件监听事件，父组件中写对应方法
        <div class="blod"></div>
      </li>
    </ul>
    <div class="part-title">三、兄弟之间传递数据</div>
    <ul>
      <li>
        通过共同的祖辈组件搭桥，$parent或$root
        <lesson11></lesson11>
        <lesson12></lesson12>
      </li>
    </ul>
    <div class="part-title">四、祖先和后代之间传递数据，provide，inject</div>
    <homeChild></homeChild>
    <div class="part-title">五、任意2个组件之间传递数据，事件总线</div>
    <div>点击三中的emit按钮，在控制台查看</div>
    <h2>插槽</h2>
    <div class="part-title">匿名插槽</div>
    <lesson11>哈哈</lesson11>
    <lesson11>
      <template v-slot:content="slotProps">
        具名插槽 插槽子组件中数据{{slotProps.foo}}
      </template>
    </lesson11>
    <h2>FormTest</h2>
    <formTest></formTest>
  </div>
</template>

<script>
import homeChild from '@/components/homeChild'
import lesson11 from '@/components/lesson11'
import lesson12 from '@/components/lesson12'
import formTest from '@/components/form/index'
export default {
  name: 'lesson1',
  components: {
    homeChild,
    lesson11,
    lesson12,
    formTest
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
    console.log('beforeCreate:', location.href)
  },
  mounted () {
    this.$refs.gender.gender = 'female'
    this.$children[3].kind = 'mouse'
  }
}
</script>
<style lang="scss">
  .blod {
    font-weight: 700;
  }
  .part-box {
    .part-title {
      font-weight: 700;
    }
    .part-ul {
      padding-left: 20px;
    }
  }
</style>
