export default {
  table: {
    header: {
      code: 0,
      msg: ''
    },
    body: {
      total: 31,
      list: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        status: 'online',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        status: 'offline',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        status: 'offline',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        status: 'online',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  name: {
    header: {
      code: 0,
      msg: ''
    },
    body: {
      list: ['tom', 'jerry']
    }
  },
  updateAddress: {
    header: {
      code: 0,
      msg: ''
    },
    body: {
      address: 'new Address'
    }
  },
  download: {
    header: {
      code: 0,
      msg: 'OK'
    },
    body: {
      msg: ''
    }
  }
}
