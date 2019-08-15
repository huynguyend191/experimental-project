const Sequelize = require('sequelize');
const connection = require('../database/connection');
const Model = Sequelize.Model;

module.exports = connection.sequelize.define(
  'files',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    file_name: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,     
      }
    },
    url: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: true
  }
)
