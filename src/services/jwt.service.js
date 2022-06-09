const jwt = require('jsonwebtoken');
const JWT_KEY = require('../constants/common.constant').JWT_KEY;

module.exports = {
  signToken: (data) => {
    return jwt.sign(data, JWT_KEY, { expiresIn: 30 * 86400 }); // expires in 30days:30*24h = 24*60*60
  },
  verifyToken: (token) => {
    return jwt.verify(token, JWT_KEY, { expiresIn: 30 * 86400 });
  },
};
