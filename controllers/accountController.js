const Account = require('../models/Account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAll = async (req, res, next) => {
  try {
    const accounts = await Account.findAll({
      include: []
    });
    res.json({
      accounts
    })
  } catch (err) {
    res.send(err);
  }
}

exports.login = async (req, res, next) => {
  try {
    const account = await Account.findOne({
      where: {
        username: req.body.username
      }
    });
    if (account) {
      bcrypt.compare(req.body.password, account.password, (err, result) => {
        if (err) {
          res.status(500).json({
            error: err
          });
        } 
        if (result) {
          const token = jwt.sign({
            username: account.username,
          }, process.env.JWT_KEY
          );
          res.cookie('userCookie', token, {
            expires: new Date(Date.now() + 30*30*60*1000),
            overwrite: true,
          });
          res.status(200).json({
            message: 'Authentication successful',
            token
          });
        } else{
          res.status(401).json({
            message: "Fail to sign in"
          })
        }
      });
    } else {
      res.status(401).json({
        message: "Fail to sign in"
      })
    }
  } catch (err) {
    res.send(err);
  }
}