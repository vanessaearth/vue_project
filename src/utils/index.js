import setCookie from './modules/setCookie'
import getCookie from './modules/getCookie'
import randomColor from './modules/randomColor'
import transDate from './modules/transDate'
import { filterNullParams } from './modules/filterNullParams'
let util = {
  formatNum (val) {
    let s = val.toString()
    let zeroLen = s.length - 1
    let sum = ''
    for (let i = 0; i < zeroLen; i++) {
      sum += '0'
    }
    return s[0] + sum + '+'
  },
  transNum (value) {
    let str = ''
    if (value >= 1000000) {
      str = parseInt(value / 1000000) + ''
      switch (str.length) {
        case 1:
          str = str[0] + 'm+'
          break
        case 2:
          str = str[0] + '0m+'
          break
        case 3:
          str = str[0] + '00m+'
          break
      }
    } else if (value >= 1000) {
      str = parseInt(value / 1000) + ''
      switch (str.length) {
        case 1:
          str = str[0] + 'k+'
          break
        case 2:
          str = str[0] + '0k+'
          break
        case 3:
          str = str[0] + '00k+'
          break
      }
    }
    return str
  },
  /* 将数字转化为million，thousand数据
   * @params value:数字，lang：语言

  */
  transNum2 (value, lang, plus) {
    let str = ''
    if (lang === 'en') {
      if (value >= 1000000000) {
        str = (value / 1000000000).toFixed(0) + ' billion'
      } else if (value >= 1000000) {
        str = (value / 1000000).toFixed(0) + ' million'
      } else if (value >= 1000) {
        str = parseInt(value / 1000).toFixed(0) + ' thousand'
      } else {
        str = value
      }
    } else {
      if (value >= 100000000) {
        str = (value / 100000000).toFixed(0) + '亿'
      } else if (value >= 10000) {
        str = (value / 10000).toFixed(0) + '万'
      } else {
        str = value
      }
    }
    return str
  },
  avg (arr) {
    let len = arr.length
    if (len > 0) {
      let sum = 0
      for (let i = 0; i < len; i++) {
        sum += arr[i]
      }
      return sum / len
    } else {
      return 0
    }
  },
  /* 将二维数组转化为日期和y轴数据的对象,
   * @params allDate:所有x轴的值
   * arr:接口返回的数据数组 （格式：[{current: 0, new: 0, date: '2019-01-01', ...}, ...]）
   * keyCode:生成对象的指标名，（如：new）
   * xKey:日期的字段名（如：date）
   * @returns {Object} 返回格式如下：{'new':[0,1,2,3,4,5],current: [], ...}
   */
  lineYaxis (allDate, arr, keyCode, xKey) {
    let keyObj = {}
    let result = {}

    keyObj[keyCode] = {}
    if (arr.length > 0) {
      arr.forEach((v, i) => {
        let value = parseFloat(v[keyCode]) || 0
        keyObj[keyCode][v[xKey]] = value
      })
    }
    // keyObj={'new':{2018-12-11:1,2018-12-13:3,2018-12-15:5}}
    for (let i in keyObj) {
      result[i] = []
      allDate.forEach(date => {
        let _v = keyObj[i][date] ? keyObj[i][date] : 0
        result[i].push(_v)
      })
    }
    // result={'new':[0,1,2,3,4,5]}
    return result
  },
  sortByKey (array, key, order) {
    return array.sort((a, b) => {
      let x = a[key]
      let y = b[key]
      if (order === 'ascending') {
        return x - y
      } else {
        return y - x
      }
    })
  },
  randomChar (n) {
    let chars = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ]
    let res = ''
    for (let i = 0; i < n; i++) {
      let id = Math.ceil(Math.random() * 35)
      res += chars[id]
    }
    return res
  },
  autoCreate (name) {
    let now = new Date().getTime()
    return (
      name + '_' + this.transDate(now, 'dateStr') + '_' + this.randomChar(10)
    )
  },
  // 将对象转换为get请求时的url参数格式
  transToUrlParam (obj) {
    let pArray = []
    for (let k in obj) {
      pArray.push(k + '=' + obj[k])
    }
    return pArray.join('&')
  },
  // 根据开始时间和结束时间返回日期数组
  getDayArray (start, end) {
    let allDate = []
    let startTime = new Date(start).getTime()
    let endTime = new Date(end).getTime()
    let temp = startTime
    while (temp <= endTime) {
      allDate.push(transDate(temp))
      temp += 86400000
    }
    return allDate
  },
  // 根据当前时间和月数返回天数数组
  getMonthStr (str, month) {
    let endTime = str
    let allDate = []
    switch (month) {
      case '1':
        allDate.length = 30
        break
      case '3':
        allDate.length = 91
        break
      case '6':
        allDate.length = 183
        break
      case '12':
        allDate.length = 365
        break
    }
    for (let i = allDate.length - 1; i >= 0; i--) {
      allDate[i] = this.transDate(endTime)
      endTime -= 86400000
    }
    return allDate
  },
  // 得到输入文字的字符数量
  getByteLen (query, limit, short) {
    if (!query) return
    let len = 0
    let result = ''
    let str = query.trim()
    for (let i = 0; i < str.length; i++) {
      if (str[i].match(/[\u4e00-\u9fa5]/gi) != null) {
        len += 2
      } else if (str[i].match(/[\u3130-\u318F]/gi) != null) {
        len += 1
      } else if (str[i].match(/[\uAC00-\uD7A3]/gi) != null) {
        len += 2
      } else if (str[i].match(/[\u1100-\u11FF]/gi) != null) {
        len += 2
      } else if (str[i].match(/[\u3040-\u312f]/gi) != null) {
        len += 2
      } else if (str[i].match(/[\u31f0-\u31ff]/gi) != null) {
        len += 2
      } else if (str[i].match(/[\uff00-\uffef]/gi) != null) {
        len += 2
      } else {
        len += 1
      }
      if (len <= limit) {
        result += str[i]
      }
    }
    if (short) {
      return result
    } else {
      return len
    }
  },
  matchPrice (val) {
    let isError = false
    if (val === 0) {
      isError = true
    } else {
      let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      if (reg.test(val)) {
        isError = false
      } else {
        isError = true
      }
    }
    return isError
  }
}
util.setCookie = setCookie
util.getCookie = getCookie
util.randomColor = randomColor
util.filterNullParams = filterNullParams
export default util
