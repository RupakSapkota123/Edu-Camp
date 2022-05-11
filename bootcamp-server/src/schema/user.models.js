/* eslint-disable no-useless-escape */
/* eslint-disable security/detect-unsafe-regex */
import moment from 'moment';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import toJSON from './plugins/toJSON.js';
import paginate from './plugins/paginate.js';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter the name'],
    minlength: [3, 'Name must be at least 3 chars.'],
    maxlength: [20, "Name can't be more than 20 chars."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please Enter the email'],
    unique: [true],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['user', 'publisher'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please Enter the password'],
      minlength: [8, 'Password must be at least 6 chars.'],
      maxlength: [12, "Password can't be more than 12 chars."],
      select: false,
      //  private: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: moment().format('YYYY-MM-DD HH:mm'),
    },
  },
});

//* Add the plugin to the schema
UserSchema.plugin(toJSON);
UserSchema.plugin(paginate);

/**
 * check if email is Taken or not
 * @param {string} email - user's email
 * @returns {boolean} - true if email is taken, false if email is available
 * @memberof UserSchema
 */
UserSchema.statics.isEmailTaken = async function (email, excludeId) {
  const user = await this.findOne({ email, _id: { $ne: excludeId } });
  return !!user;
};

/**
 * check if password is correct or not
 * @param {string} password - user's password
 * @returns {boolean} - true if password is correct, false if password is not correct
 */
UserSchema.methods.isCorrectPassword = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */

const User = mongoose.model('User', UserSchema);

export default User;
