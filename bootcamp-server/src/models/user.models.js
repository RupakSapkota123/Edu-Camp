/* eslint-disable no-param-reassign */
import bcrypt from 'bcrypt';
import omit from 'lodash.omit';
import moment from 'moment';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      minlength: 12,
      unique: true,
      required: [true, 'Email is required.'],
      lowercase: true,
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
      minlength: 8,
      required: true,
      maxlength: 100,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      minlength: 4,
      maxlength: 30,
      validate: {
        validator: (username) => {
          const regex = /^[a-z]+_?[a-z0-9]{1,}?$/gi;
          return regex.test(username);
        },
        message:
          'Username Must preceed with letters followed by _ or numbers eg: john23 | john_23',
      },
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
      maxlength: 40,
    },
    lastName: {
      type: String,
      maxlength: 50,
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
      type: Object, // switched to cloudinary so I have to set as Object
      default: {},
    },
    coverPhoto: {
      type: Object,
      default: {},
    },
    status: {
      type: Number,
      default: 1, // 1 OK | 2 Warning | 3 Blocked | 4 Ban
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bootcamp',
      },
    ],
    dateJoined: {
      type: Date,
      default: moment().format('YYYY-MM-DD'),
      required: true,
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

UserSchema.virtual('fullName').get(function () {
  const { firstName, lastName } = this;
  return firstName && lastName ? `${this.firstName} ${this.lastName}` : null;
});

// UserSchema.set('toObject', { getters: true });

UserSchema.methods.passwordMatch = function (password, cb) {
  const user = this;

  bcrypt.compare(password, user.password, function (err, isMatch) {
    if (err) return cb(err);

    cb(null, isMatch);
  });
};

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

UserSchema.methods.isBookmarked = function (postID) {
  console.log(postID);
  if (!mongoose.isValidObjectId(postID)) return 'hehe';

  return this.bookmarks.some((bookmark) => {
    return bookmark._id.toString() === postID.toString();
  });
};

UserSchema.pre('save', function (next) {
  if (this.info.gender === null) this.info.gender = 'unspecified';
  if (this.firstname === null) this.firstName = '';
  if (this.lastname === null) this.lastName = '';
  if (this.profilePicture === null) this.profilePicture = '';
  if (this.coverPhoto === null) this.coverPhoto = '';
  if (this.info.birthday === null) this.info.birthday = '';

  if (this.isNew || this.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);
export default User;
