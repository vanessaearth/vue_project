function twoSum (arr, sum) {
  let len = arr.length
  let need = {}
  let needArr = []
  let result = []
  for (let i = 0; i < len; i++) {
    needArr.push(sum - arr[i])
    if (arr[i] in need || needArr.includes(arr[i])) {
      result2 = [i, need[arr[i]]]
      clog(result2)
      result.push({ 'num1': arr[i], 'num2': sum - arr[i] })
    } else {
      need[sum - arr[i]] = i
    }
  }
  return result
}
function twoSum2 (arr, sum) {
  let len = arr.length
  let result = []
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] + arr[j] === sum) {
        result.push({ 'num1': arr[i], 'num2': arr[j] })
        clog(arr[i], arr[j])
      }
    }
  }
  return result
}
function fib (arr, n) {
  let result = 0
  for (let i = n; i > 0; i--) {
    if (arr[n - 1]) {
      result = arr[n - 2] + arr[n - 1]
      arr.push(result)
      return
    } else {
      fib(arr, n - 1)
    }
  }

}
function zhan (s) {
  let arr = s.split('')
  let result = []
  let len = arr.length
  let partner = ''
  for (let i = 0; i < len; i++) {
    partner = ''
    if (arr[i] === ')') {
      partner = '('
    } else if (arr[i] === '}') {
      partner = '{'
    } else if (arr[i] === ']') {
      partner = '['
    }
    if (partner === result[result.length - 1]) {
      result.pop()
    } else {
      result.push(arr[i])
    }
  }
  return result.length > 0 ? false : true
}
function fileCli (path) {
  let arr = path.split('/').filter(Boolean)
  clog(arr)
  let len = arr.length
  let result = []
  for (let i = 0; i < len; i++) {
    // result.push(arr[i])
    if (arr[i] === '..') {
      result.pop()
    } else if (arr[i] === '.') {
    } else {
      result.push(arr[i])
    }
  }
  return '/' + result.join('/');
}
