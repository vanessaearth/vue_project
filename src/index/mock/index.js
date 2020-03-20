import Mock from 'mockjs'
const user = {
  name: 'tom',
  roles: ['admin']
}
Mock.mock('/user/info', user)
