/**
 * 合并对象
 * @param {Object} target 目标对象
 * @param  {...Object} args 源数据（右侧会覆盖左侧同名属性值）
 */
const objConcat = (target, ...args) => {
  if (args.length === 0) {
    return target
  }
  for (let i = 0, len = args.length; i < len; i++) {
    //         console.log(i, args[i]);
    const _obj = args[i]
    for (let _key in _obj) {
      let _value = _obj[_key]
      // 判断对象类型
      if (Object.prototype.toString.call(_value) === '[object Object]') {
        // 对象
        target[_key] = objConcat(target[_key] || {}, _value)
      } else if (Object.prototype.toString.call(_value) === '[object Array]') {
        // 数组
        // target[_key] = (target[_key] || []).concat(_value)
        target[_key] = objConcat(target[_key] || [], _value)
      } else {
        target[_key] = _value
      }
    }
  }
  return target
}
export default objConcat
