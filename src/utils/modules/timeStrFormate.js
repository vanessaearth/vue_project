
// 根据时间戳返回倒计时
function timeFormat (param) {
  return param < 10 ? '0' + param : param
}
function timeStrFormate (diff, type) {
  if (diff > 0) {
    let time = diff // 参数是秒级别
    // let day = timeFormat(Math.floor(time / (60 * 60 * 24)))
    let hou = timeFormat(Math.floor(time % (60 * 60 * 24) / 3600))
    let min = timeFormat(Math.floor(time % (60 * 60 * 24) % 3600 / 60))
    let sec = timeFormat(Math.floor(time % (60 * 60 * 24) % 3600 % 60))
    let ms = timeFormat(Math.floor(diff % 1000 / 10))

    if (type === 'ms') {
      return min + ':' + sec + ':' + ms
    }
    if (hou > 0) {
      return hou + ':' + min + ':' + sec
    } else {
      return min + ':' + sec
    }
  }
}
export default timeStrFormate
