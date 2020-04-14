export default {
  login: {
    header: {
      code: 0,
      msg: ''
    },
    body: {
      username: 'editor'
    }
  },
  loginAdmin: {
    header: {
      code: 0,
      msg: ''
    },
    body: {
      username: 'admin'
    }
  },
  user: {
    header: {
      code: 0,
      msg: ''
    },
    body: {
      username: 'editor',
      roles: ['editor']
    }
  },
  userAdmin: {
    header: {
      code: 0,
      msg: ''
    },
    body: {
      username: 'admin',
      roles: ['admin']
    }
  }
}
