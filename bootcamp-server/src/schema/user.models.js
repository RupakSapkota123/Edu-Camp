/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-escape */
/* eslint-disable security/detect-unsafe-regex */
import moment from 'moment';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import omit from 'lodash.omit';

// import {  } from '../validation/custom.validations.js';

import toJSON from './plugins/toJSON.js';
import paginate from './plugins/paginate.js';

const bcryptjs = bcrypt.genSaltSync(10);

const EGender = {
  male: 'male',
  female: 'female',
  unspecified: 'unspecified',
};

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 20,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true],
      lowercase: true,
      minlength: 12,
      maxlength: 64,
      validate: {
        validator: (email) => {
          const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
          return regex.test(email);
        },
        message: '{VALUE} is invalid.',
      },
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 12,
      //  private: true,
    },

    provider: {
      type: String,
      default: 'password',
      enum: ['password', 'facebook', 'google', 'github'],
    },
    provider_id: {
      type: String,
      default: null,
    },

    provider_access_token: String,
    provider_refresh_token: String,

    firstName: {
      type: String,
      maxlength: 20,
      default: '',
    },
    lastName: {
      type: String,
      maxlength: 20,
      default: '',
    },

    isEmailValidated: {
      type: Boolean,
      default: false,
    },

    info: {
      bio: {
        type: String,
        maxlength: 200,
        default: '',
      },
      birthday: {
        type: Date,
      },
      gender: {
        type: String,
        default: 'unspecified',
        enum: ['male', 'female', 'unspecified'],
      },
    },

    profilePicture: {
      type: Object, //! gonna use cloudinary so I have to set as OBJ
      default: {},
    },

    role: {
      type: String,
      enum: ['user', 'publisher'],
      default: 'user',
    },

    coverPhoto: {
      type: Object, //! gonna use cloudinary so I have to set as OBJ
      default: {},
    },

    status: {
      type: Number,
      default: 0, //*  0 unverified | 1 verified | 2 blocked
    },

    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bootcamp',
      },
    ],

    resetPasswordToken: String,
    resetPasswordExpire: Date,
    dateJoined: {
      type: Date,
      default: moment().format('YYYY-MM-DD HH:mm'),
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret, opt) {
        delete ret.password;
        delete ret.provider_access_token;
        delete ret.provider_refresh_token;
        return ret;
      },
    },
    toObject: {
      getters: true,
      virtuals: true,
      transform(doc, ret, opt) {
        delete ret.password;
        delete ret.provider_access_token;
        delete ret.provider_refresh_token;
        return ret;
      },
    },
  },
);

//* Add the plugin to the schema
// UserSchema.plugin(toJSON);
UserSchema.plugin(paginate);

/**
 * merge user's first name and last name
 * @returns {string} - user's full name
 */
UserSchema.virtual('fullName').get(function () {
  const { firstName, lastName } = this;
  return firstName && lastName ? `${firstName} ${lastName}` : null;
});

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
// UserSchema.methods.passwordMatch = function (password, cb) {
//   const user = this;

//   console.log('passwordMatch', password, user.password);
//   console.log('usernmae', user.username);

//   bcrypt.compare(password, user.password, function (err, isMatch) {
//     console.log('isMatch', isMatch);
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

UserSchema.methods.toUserJSON = function () {
  const user = omit(this.toObject(), [
    'password',
    'facebook',
    'createdAt',
    'updatedAt',
    'bookmarks',
  ]);

  return user;
};

UserSchema.methods.toProfileJSON = function () {
  return {
    id: this._id,
    username: this.username,
    fullname: this.fullname,
    profilePicture: this.profilePicture,
  };
};

/**
 * Check if bootcamp is bookmarked or not
 * @param {string} bootcampId - bootcamp's id
 * @returns {boolean} - true if bootcamp is bookmarked, false if bootcamp is not bookmarked
 * @memberof UserSchema
 */
UserSchema.methods.isBookmarked = async function (bootcampId) {
  console.log('Bookmarked', bootcampId);
  const user = this;
  if (!mongoose.isValidObjectId(bootcampId)) return 'Invalid Bootcamp Id';

  return user.bookmarks.some((bookmark) => {
    return bookmark.toString() === bootcampId;
  });
};

UserSchema.pre('save', async function (next) {
  try {
    if (this.info.gender === null) this.info.gender = EGender.unspecified;
    if (this.firstName === null) this.firstName = '';
    if (this.lastName === null) this.lastName = '';
    if (this.profilePicture === null) this.profilePicture = '';
    if (this.coverPhoto === null) this.coverPhoto = '';
    if (this.info.birthday === null) this.info.birthday = '';
    if (!this.isModified('password')) return next();

    const hash = await bcrypt.hash(this.password, bcryptjs);
    this.password = hash;
    return next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.isPasswordMatch = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

/**
 * @typedef User
 */

const User = mongoose.model('User', UserSchema);

export default User;
