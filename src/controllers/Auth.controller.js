const User = require('../models/user.model');
const signToken = require('../services/jwt.service').signToken;
const { REDIS_KEY } = require('../constants/common.constant');
const redis = require('../services/redis.service');
const bcrypt = require('bcrypt');
class AuthController {
  async register(req, res) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hasher = await bcrypt.hash(req.body.password, salt);

      //create new user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hasher,
      });
      const user = await newUser.save();
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async login(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json('Can not find user');
      }
      if (user.isLocked) {
        return res.status(404).json('Account was locked!');
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password,
      );
      if (!validPassword) {
        const cache = new redis();
        let count = 0;
        const solansai = +(await cache.get(
          REDIS_KEY.INVALID_PASSWORD + '_' + user.username,
        ));
        // 'INVALID_PASSWORD_myadmin'
        if (solansai && solansai > 0) {
          count = solansai;
        }
        //await redis.set('REDIS_KEY.INVALID_PASSWORD', count + 1);
        const passs = await cache.set(
          REDIS_KEY.INVALID_PASSWORD + '_' + user.username,
          count + 1,
        );
        //console.log(count)
        if (count + 1 >= 5) {
          const Islock = await User.updateOne(
            { username: user.username },
            {
              $set: {
                isLocked: true,
              },
            },
          );
          await cache.del(REDIS_KEY.INVALID_PASSWORD + '_' + user.username); // clear redis cho TH đã bị khóa
          return res.status(404).json('Account was locked!');
        }
        return res.status(404).json('Password invalid!');
      }
      if (user && validPassword) {
        const data = {
          id: user.id,
          admin: user.admin,
        };
        const token = signToken(data);
        return res.status(200).json(token);
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
module.exports = {
  AuthController: new AuthController(),
};
