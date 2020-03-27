function add (a, b) {
  return a + b
}

function test (title, fn) {
  try {
    fn()
    console.log(title, '测试通过')
  } catch (e) {
    console.log(e)
    console.error(title, '测试失败')
  }
}
function expect (ret) {
  return {

    toBe (arg) {
      if (ret === arg) {
        console.log('测试通过')
      } else {
        throw Error(`测试不通过，期望${arg},实际${ret}`)
      }
    }
  }
}

test('测试加法', () => {
  expect(add(1, 2)).toBe(3)
  expect(add('1', 2)).toBe(3)
})
