function Add (n1, n2) {
  return n1 + n2
}
describe('home.vue', () => {
  it('测试add函数', () => {
    expect(Add(1, 3)).toBe(4)
    expect(Add(-2, 1)).toBe(-1)
  })
})
