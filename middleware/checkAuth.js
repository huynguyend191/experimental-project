const jwt = require('jsonwebtoken');
const _ = require('lodash');

module.exports = (req, res, next) => {
  try {
    // const token = req.headers.authorization.split(" ")[1];
    // const decoded = jwt.verify(token, process.env.JWT_KEY);
    // req.userData = decoded;
    if (!_.isEmpty(req.cookies)) {
      const token = req.cookies.userCookie;
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.userData = decoded;
      next();
    }
    else {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }
  
}