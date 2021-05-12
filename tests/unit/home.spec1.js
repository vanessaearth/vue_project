import { shallowMount, mount } from '@vue/test-utils'
import home from '@/components/test/home.vue'
import Vue from 'vue'
describe('components/test/home.vue', () => {
  it('message init data', () => {
    expect(typeof home.data).toBe('function')
    const defaultData = home.data()
    expect(defaultData.message).toBe('init msg')
  })
  it('message after mounted', () => {
    const vm = new Vue(home).$mount()
    expect(vm.message).toBe('mounted msg')
  })
  it('message after click', () => {
    const wrapper = mount(home)
    wrapper.find('button').trigger('click')
    expect(wrapper.vm.message).toBe('change msg')
    Vue.nextTick(() => {
      expect(wrapper.find('span').html()).toBe('<span>change msg</span>')
      expect(wrapper.find('span').text()).toBe('change msg')
    })
  })
})
