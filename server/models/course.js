
const Sequelize = require('sequelize')

const sequelize = require('../util/database')
/**
* 定义模型
* 参数1：表名
* 参数2：表中字段
*/
const Course = sequelize.define('course', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Course
