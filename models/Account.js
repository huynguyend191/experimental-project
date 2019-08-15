const Sequelize = require('sequelize');
const connection = require('../database/connection');
const Staff = require('./Staff');

const Account = connection.sequelize.define(
  'accounts',
  {
    uuid: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: true
  }
)

Staff.belongsTo(Account);

module.exports = Account;