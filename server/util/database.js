const Sequelize = require('sequelize')
const env = require('dotenv')
const conf = require('./config')

env.config()
const sequelize = new Sequelize(conf.database, conf.username, conf.password, {
  dialect: 'mysql', // 中间件对应的数据库格式
  host: conf.host
  // operatorsAliases: false
})

module.exports = sequelize
