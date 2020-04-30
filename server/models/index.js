// 同步表结构，创建表
const User = require('./user.js')
const Course = require('./course.js')
const UserProduct = require('./userCourse.js')
const sequelize = require('../util/database.js')

const Koa = require('koa')
const app = new Koa()

User.hasMany(Course)
Course.belongsToMany(User, {
  through: UserProduct
})

sequelize.sync().then(
  async result => {
    let user = await User.findByPk()
    console.log('use', user)
    if (!user) {
      user = await User.create({
        name: 'tom',
        email: 'tom@qq.com'
      })
    }
    app.listen(3000, () => {
      console.log('start at 3000')
    })
  }
)
