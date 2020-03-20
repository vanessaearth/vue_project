import getRealType from './getRealType'
// 深拷贝
const deepClone = data => {
  var _type = getRealType(data)
  var copyOfObj
  var i
  var ni

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
