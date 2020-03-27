// 测试是什么，为啥我们需要

// 给输入，校验输出
function Add (n1, n2) {
  return n1 + n2
}
function mergeObj (n1, n2) {
  return { ...n1, ...n2 }
}
function asyncAdd (a, b, cb) {
  setTimeout(() => {
    cb(a + b)
  })
}
describe('add组件测试', () => {
  it('测试add函数', (done) => {
    asyncAdd(1, 2, (ret) => {
      expect(ret).toBe(3)
      done()
    })
  })
  it('测试add函数', () => {
    expect(Add(1, 3)).toBe(4)
    expect(Add(-2, 1)).toBe(-1)
    expect(mergeObj({ name: 'tom' }, { age: 1 })).toEqual({ name: 'tom', age: 1 })
  })
})

// console.log 测试的原型
// 我们把console做的体系化，保存下来，没事就跑一下
// console.log(Add(1, 2) === 3)
//  一些辅助函数
