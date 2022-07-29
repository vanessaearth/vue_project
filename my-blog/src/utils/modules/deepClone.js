import getRealType from './getRealType'
// 深拷贝
const deepClone = data => {
  const _type = getRealType(data)
  let copyOfObj
  let i
  let ni

  if (_type === 'array') {
    copyOfObj = []
  } else if (_type === 'object') {
    copyOfObj = {}
  } else {
    return data
  }

  if (_type === 'array') {
    for (i = 0, ni = data.length; i < ni; i++) {
      copyOfObj.push(deepClone(data[i]))
    }
    return copyOfObj
  } else if (_type === 'object') {
    for (i in data) {
      copyOfObj[i] = deepClone(data[i])
    }
    return copyOfObj
  }
}

export default deepClone
