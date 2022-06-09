const verifyToken = require('../services/jwt.service').verifyToken;
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../constants/common.constant').JWT_KEY;

const middlewareToken = {
  authenticate: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accesstoken = token;
      jwt.verify(accesstoken, JWT_KEY, (err, user) => {
        if (err) {
          return res.status(403).json('token is not valid');
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json('You are not authenticated');
    }
  },
  authenticateAdmin: (req, res, next) => {
    middlewareToken.authenticate(req, res, () => {
      if (req.user.admin == req.user.admin) {
        next();
      } else {
        return res.status(403).json('You are not allowed to delete other');
      }
    });
  },
};

module.exports = middlewareToken;
