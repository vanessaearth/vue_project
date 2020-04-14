import Mock from 'mockjs'
import user from './user'
import chart from './chart'
import table from './table'

Mock.mock('/user/login', 'post', function (options) {
  clog('----', options)
  if (options.body.username === 'admin') {
    return user.loginAdmin
  } else {
    return user.login
  }
})
Mock.mock('/user/info', 'get', function (options) {
  let name = localStorage.getItem('token')
  clog('----222', name)
  if (name === 'admin') {
    return user.userAdmin
  } else {
    return user.user
  }
})
Mock.mock('/getLineData', chart.chart)
Mock.mock('/getTableData', table.table)
Mock.mock('/sugName', table.name)
Mock.mock('/address/update', table.updateAddress)
Mock.mock('/download/table', table.updateAddress)
