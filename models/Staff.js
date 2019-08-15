const Sequelize = require('sequelize');
const connection = require('../database/connection');

const Staff = connection.sequelize.define(
  'staffs',
  {
    uuid: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    fullname: {
      type: Sequelize.STRING,
    },
    position: {
      type: Sequelize.STRING
    },
    date_of_birth: {
      type: Sequelize.DATE
    }
  },
  {
    timestamps: true
  }
);

// Staff.hasOne(Account);

module.exports =  Staff;