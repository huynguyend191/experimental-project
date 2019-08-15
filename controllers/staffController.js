const Staff = require('../models/Staff');
const Account = require('../models/Account');
const uuid = require('uuid/v4');
const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getAll = async (req, res, next) => {
  try {
    const staff = await Staff.findAll({
      include: [Account]
    });
    res.json({
      staff
    })
  } catch (err) {
    res.send(err);
  }
}

exports.create = async (req, res, next) => {
  try {
    let transaction = await connection.sequelize.transaction();
    const accountUid = uuid();
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      if (err) {
         res.status(500).json({
          error: err
        });
      } else {
        if (transaction) {
          await Account.create( {
            username: req.body.username,
            password: hash,
            uuid: accountUid
          }, {transaction});
          await Staff.create({
            uuid: uuid(),
            fullname: req.body.fullname,
            date_of_birth: req.body.date_of_birth,
            position: req.body.position,
            accountUuid: accountUid
          }, {transaction});
          await transaction.commit();
          res.json({
            message: "Success"
          })
        } else {
          res.send("Fail to create Transaction");
        }
      }
    });
  } catch (err) {
    res.status(500);
    res.json({
      message: "Cannot create staff"
    });
  }
}