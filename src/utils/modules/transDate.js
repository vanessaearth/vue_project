// 根据毫秒时间返回年月日
export default function transDate (str, format = 'date') {
  let date = new Date(parseInt(str))
  let dateStr = ''
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  month < 10 && (month = '0' + month)
  day < 10 && (day = '0' + day)
  hour < 10 && (hour = '0' + hour)
  minute < 10 && (minute = '0' + minute)
  second < 10 && (second = '0' + second)
  switch (format) {
    case 'dateTime':
      dateStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
      break
    case 'dateStr':
      dateStr = year + '' + month + '' + day + '' + hour + '' + minute
      break
    case 'time':
      dateStr = hour + ':' + minute + ':' + second
      break
    default:
      dateStr = `${year}-${month}-${day}`
  }
  return dateStr
}
