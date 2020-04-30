const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const userCourse = sequelize.define('userCourse', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  course_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = userCourse
