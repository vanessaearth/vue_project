function filterNullParams (params) {
  let result = {}
  for (let o in params) {
    if (params[o] !== null) {
      if (isString(params[o]) && params[o].length > 0) {
        result[o] = params[o]
      } else if (isNumber(params[o]) || isBoolean(params[o])) {
        result[o] = params[o]
      } else if (isArray(params[o]) && params[o].length > 0) {
        result[o] = params[o]
      } else if (isObject(params[o])) {
        filterNullParams()
      }
    }
  }
  return result
}
function resetSearchParams (params) {
  let result = {}
  for (let o in params) {
    if (params[o] !== null) {
      if (isArray(params[o]) && params[o].length > 0) {
        result[o] = []
      } else if (o === 'pageNum') {
        result[o] = 1
      } else if (o === 'pageSize') {
        result[o] = 10
      } else {
        result[o] = params[o]
      }
    }
  }
  return result
}
function isNumber (str) {
  return (typeof str === 'number') && str.constructor === Number
}
function isString (str) {
  return (typeof str === 'string') && str.constructor === String
}
function isBoolean (str) {
  return (typeof str === 'boolean') && str.constructor === Boolean
}
function isArray (obj) {
  return (typeof obj === 'object') && obj.constructor === Array
}
function isObject (obj) {
  return (typeof obj === 'object') && obj.constructor === Object
}
export { filterNullParams, resetSearchParams }
