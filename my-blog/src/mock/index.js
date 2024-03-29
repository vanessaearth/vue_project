import Mock from 'mockjs'
import user from './user'
import chart from './chart'
import table from './table'
import map from './map'
console.log('================')
Mock.mock('/user/login', 'post', function (options) {
  const body = JSON.parse(options.body)
  if (body.username === 'admin') {
    return user.loginAdmin
  } else {
    return user.loginEdit
  }
})
Mock.mock('/user/info', 'get', function (options) {
  const name = localStorage.getItem('token')
  if (name === 'admin') {
    return user.loginAdmin
  } else {
    return user.loginEdit
  }
})
Mock.mock('/getLineData', chart.chart)
Mock.mock('/getTableData', table.table)
Mock.mock('/sugName', table.name)
Mock.mock('/address/update', table.updateAddress)
Mock.mock('/download/table', 'get', table.downloadTable)
Mock.mock('/device/track_detail', map.track)
Mock.mock('/channel/channels', map.channel)
