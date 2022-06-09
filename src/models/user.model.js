const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    //  sha256(password + PASSWORK_KEY)
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    default: false,
  },
  avatar: {
    type: String,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  isLocked: {
    type: Boolean,
    default: false,
  },
});
const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
