const User = require('../models/user.model');
class UserController {
  async getAllUsers(req, res) {
    try {
      const user = await User.find();
      return res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  async updateUser(req, res) {
    try {
      const idUser = await User.findById(req.params.id);
      const updateUser = await User.updateOne(
        { _id: idUser._id },
        {
          $set: {
            fullname: req.body.fullname,
            avatar: req.body.avatar,
            isLocked: req.body.isLocked,
            admin: req.body.admin,
          },
        },
      );
      return res.status(200).json(updateUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async deleteUser(req, res) {
    try {
      //const  user = await User.findById(req.params.id);
      const user = await User.findByIdAndDelete(req.params.id);
      return res.status(200).json('Delete successfully');
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
module.exports = { UserController: new UserController() };
