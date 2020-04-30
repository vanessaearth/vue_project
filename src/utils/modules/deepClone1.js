function deepClone (obj) {
  let type = getRealType(obj)
  let newObj
  if (type === 'object') {
    newObj = {}
  } else if (type === 'array') {
    newObj = []
  } else {
    return obj
  }
  if (type === 'object') {
    for (let o in obj) {
      newObj[o] = deepClone(obj[o])
    }
  } else if (type === 'array') {
    for (let i = 0; i < obj.length; i++) {
      newObj.push(deepClone(obj[i]))
    }
  }
}
function getRealType (obj) {
  let type = obj.prototype.toString
  let mapData = {
    '[Object Object]': 'object',
    '[Object Array]': 'array',
    '[Object String]': 'string',
    '[Object Boolean]': 'boolean',
    '[Object Number]': 'number',
    '[Object undefined]': 'undefined',
    '[Object null]': 'null'
  }
  return mapData[type.call(obj)]
}
export default deepClone
