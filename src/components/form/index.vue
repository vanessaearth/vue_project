<!--  -->
<template>
  <div>
    <TForm :model="model"
           :rules="rules"
           ref="loginForm">
      <TFormItem label="用户名"
                 prop="name">
        <KInput v-model="model.name"
                placeholder="请输入用户名"></KInput>
      </TFormItem>
      <TFormItem label="密码"
                 prop="pwd">
        <KInput v-model="model.pwd"
                type="password"></KInput>
      </TFormItem>
      <TFormItem>
        <button @click="onLogin">提交</button>
      </TFormItem>
    </TForm>
    {{model}}
  </div>
</template>

<script>
import KInput from './KInput'
import TFormItem from './TFormItem'
import TForm from './TForm'
import notice from './notice'
export default {
  name: '',
  components: { KInput, TFormItem, TForm },
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
  created () { },
  mounted () { },
  destroyed () { }
}

</script>
<style lang='scss' scoped>
</style>
