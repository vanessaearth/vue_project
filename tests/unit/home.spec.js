import { shallowMount, mount } from '@vue/test-utils'
import home from '@/views/home.vue'
import Vue from 'vue'
describe('home.vue', () => {
  it('必须有mounted方法', () => {
    expect(typeof home.mounted().toBe('function'))
  })
  it('message init data', () => {
    expect(typeof home.data).toBe('function')
    const defaultData = home.data()
    expect(defaultData.message).toBe('data msg')
  })
  it('message after mounted', () => {
    const vm = new Vue(home).$mount()
    expect(vm.message).toBe('mounted msg')
  })
  it('message after click', () => {
    const wrapper = mount(home)
    wrapper.find('button').trigger('click')
    expect(wrapper.vm.message).toBe('按钮点击')
    expect(wrapper.find('span').html()).toBe('<span>按钮点击</span>')
    expect(wrapper.find('span').text().toBe('按钮点击'))
  })
})
