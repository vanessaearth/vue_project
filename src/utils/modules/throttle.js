/**
* 节流器
* @param [function] fn 事件触发后要调用的函数，也就是要节流的函数
* @param [object]context fn的执行上下文对象，没有执行对象设为null即可
* @param [number] delay 延缓执行的时间间隔 毫秒
* @param param fn需要的参数
* @return 无
*/
export const throttle = (fn, context, delay, param) => {
  clearTimeout(fn.timeoutId)
  fn.timeoutId = setTimeout(function () {
    fn.call(context, param)
  }, delay)
}

export const debounce = (fn) => {
  // 创建一个标记用来存放定时器的返回值
  return function () {
    let timeout = null
    // 每当用户输入的时候把前一个 setTimeout clear 掉
    clearTimeout(timeout)
    /**
     * 然后又创建一个新的 setTimeout,
     * 这样就能保证输入字符后的 interval
     * 间隔内如果还有字符输入的话，就不会执行 fn 函数
     */
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, 500)
  }
}
