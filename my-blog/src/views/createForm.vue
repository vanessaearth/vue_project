<!--  -->
<template>
  <div class="add-box">
    <ul class="step clearfix"
        :step="step"
        ref="step">
      <li v-for="(item,index) in allStep"
          :key='index'
          @click="lastStep>=index?step=(index):''"
          :class="lastStep>index?'is-finish':lastStep===index?'is-current':''">
        <div class="step-line"></div>
        <div class="step-head">
          <i v-if="lastStep>index"
             class="el-step__icon-inner is-status el-icon-check"></i>
          <span v-else>{{index+1}}</span>
        </div>
        <div class="step-main">{{item}}</div>
      </li>
    </ul>
    <ElForm :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <div v-show="step===0">
        <ElFormItem label="活动名称"
                      prop="name">
          <ElInput v-model="ruleForm.name"
                    class="short-input"></ElInput>
        </ElFormItem>
        <ElFormItem label="活动区域"
                      prop="region">
          <ElSelect v-model="ruleForm.region"
                     class="short-input"
                     placeholder="请选择活动区域">
            <ElOption label="区域一"
                       value="shanghai"></ElOption>
            <ElOption label="区域二"
                       value="beijing"></ElOption>
          </ElSelect>
        </ElFormItem>
      </div>
      <div v-show="step===1">
        <ElFormItem label="活动性质"
                      prop="type">
          <ElCheckboxGroup v-model="ruleForm.type">
            <ElCheckbox label="美食/餐厅线上活动"
                         name="type"></ElCheckbox>
            <ElCheckbox label="地推活动"
                         name="type"></ElCheckbox>
            <ElCheckbox label="线下主题活动"
                         name="type"></ElCheckbox>
            <ElCheckbox label="单纯品牌曝光"
                         name="type"></ElCheckbox>
          </ElCheckboxGroup>
        </ElFormItem>
        <ElFormItem label="即时配送"
                      prop="delivery">
          <ElSwitch v-model="ruleForm.delivery"></ElSwitch>
        </ElFormItem>
      </div>
      <div v-show="step===2">

        <ElFormItem label="特殊资源"
                      prop="resource">
          <ElRadioGroup v-model="ruleForm.resource">
            <ElRadio label="线上品牌商赞助"></ElRadio>
            <ElRadio label="线下场地免费"></ElRadio>
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="活动形式"
                      prop="desc">
          <ElInput type="textarea"
                    class="short-input"
                    v-model="ruleForm.desc"></ElInput>
        </ElFormItem>
      </div>
      <ElFormItem>
        <ElButton type="primary"
                   @click="next('ruleForm')">{{step!==2?'下一步':'创建'}}</ElButton>

        <ElButton @click="resetForm('ruleForm')">重置</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script>
export default {
  name: 'createDemo',
  components: {},
  data () {
    return {
      step: 0,
      lastStep: 0,
      allStep: ['one', 'two', 'three'],
      ruleForm: {
        name: '',
        region: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  props: {},
  computed: {},
  methods: {
    next (formName) {
      let [nameError, regionError, typeError, resourceError, descError] = [false, false, false, false, false]

      if (this.step === 0) {
        this.$refs[formName].validateField('name', err => {
          nameError = Boolean(err)
        })
        this.$refs[formName].validateField('region', err => {
          regionError = Boolean(err)
        })
        if (!nameError && !regionError) {
          this.step = 1
          this.lastStep = 1
        }
      } else if (this.step === 1) {
        this.$refs[formName].validateField('type', err => {
          typeError = Boolean(err)
        })
        if (!typeError) {
          this.step = 2
          this.lastStep = 2
        }
      } else if (this.step === 2) {
        this.$refs[formName].validateField('resource', err => {
          resourceError = Boolean(err)
        })
        this.$refs[formName].validateField('desc', err => {
          descError = Boolean(err)
        })
        if (!resourceError && !descError) {
          alert('提交数据')
        }
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          clog('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
