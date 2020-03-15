<!--  -->
<template>
  <div>
    <KForm :model="model" :rules="rules" ref="loginForm">
      <KFormItem label="用户名" prop="name">
        <KInput v-model="model.name" placeholder="请输入用户名"></KInput>
      </KFormItem>
      <KFormItem label="密码" prop="pwd">
        <KInput v-model="model.pwd" type="password"></KInput>
      </KFormItem>
      <KFormItem>
        <button @click="onLogin">提交</button>
      </KFormItem>
    </KForm>
    {{model}}
  </div>
</template>

<script>
import KInput from './KInput'
import KFormItem from './KFormItem'
import KForm from './KForm'
import notice from './notice'
export default {
  name: '',
  components: { KInput, KFormItem, KForm },
  data () {
    return {
      model: {
        name: 'tom',
        pwd: ''
      },
      rules: {
        name: { required: true, message: '必填项' },
        pwd: { required: true, message: '必填项' }
      }
    }
  },
  props: {},
  computed: {},
  methods: {
    onLogin () {
      this.$refs.loginForm.validate((isValid) => {
        // if (isValid) {
        //   alert('请求登录')
        // } else {
        //   alert('校验失败')
        // }
        this.$create(notice, {
          title: 'wa',
          message: 'apple',
          duration: 2000
        }).show()
      })
    }
  },
  watch: {},
  created () {},
  mounted () {},
  destroyed () {}
}

</script>
<style lang='scss' scoped>
</style>
