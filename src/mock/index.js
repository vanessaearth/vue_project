import Mock from 'mockjs'
import chart from './chart'
import table from './table'

Mock.mock('/getLineData', chart.chart)
Mock.mock('/getTableData', table.table)
Mock.mock('/sugName', table.name)
Mock.mock('/address/update', table.updateAddress)
Mock.mock('/download/table', table.updateAddress)
