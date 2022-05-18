/* eslint-disable no-useless-escape */
/* eslint-disable security/detect-unsafe-regex */
import moment from 'moment';
import mongoose from 'mongoose';

import { toJSON } from './plugins/index.js';

const BootcampSchema = new mongoose.Schema(
  {
    _author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      //  required: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
      minlength: [5, 'Name can not be less than 5 characters'],
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS',
      ],
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    careers: {
      // Array of strings
      type: [String],
      required: true,
      enum: [
        'Web Development',
        'Mobile Development',
        'UI/UX',
        'Data Science',
        'Business',
        'Other',
      ],
    },
    averageRating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [10, 'Rating must can not be more than 10'],
    },
    averageCost: Number,
    photo: [Object],
    housing: {
      type: Boolean,
      default: false,
    },
    jobAssistance: {
      type: Boolean,
      default: false,
    },
    jobGuarantee: {
      type: Boolean,
      default: false,
    },
    acceptGi: {
      type: Boolean,
      default: false,
    },
    createdAt: Date,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      //     required: true,
    },
    privacy: {
      type: String,
      default: 'public',
      enum: ['public', 'private', 'followers'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true, getters: true },
  },
);

//! add plugin that converts mongoose to json
// BootcampSchema.plugin(toJSON);

/**
 * create virtual field for author
 *
 */
BootcampSchema.virtual('author', {
  ref: 'User',
  localField: '_author_id',
  foreignField: '_id',
  justOne: false,
});

/**
 * check if post is liked by user
 * @param {ObjectId} userID - The user's id

 */
BootcampSchema.methods.isPostLiked = function (userID) {
  if (!mongoose.isValidObjectId) return;
  return this.likes.some((user) => {
    return user._id.toString() === userID.toString();
  });
};

/**
 * Check if name is taken
 * @param {string} name - The bootcamp's name
 *@param {ObjectId} [excludeUserId] - The id of the bootcamp to be excluded
 *@returns {Promise<boolean>}
 */
BootcampSchema.statics.findByName = async function (name, excludeId) {
  const bootcamp = await this.findOne({
    name,
    _id: {
      $ne: excludeId,
    },
  });
  console.log(bootcamp);
  return !!bootcamp;
};

/**
 * check if given id is available or not
 * @param {ObjectId} id - The bootcamp's id
 * @returns {Promise<boolean>}
 */
BootcampSchema.statics.isIdAvailable = async (id) => {
  const bootcamp = await this.findById(id);
  return !!bootcamp;
};

/**
 * @typedef {Object} Bootcamp
 */
const Bootcamp = mongoose.model('Bootcamp', BootcampSchema);
export default Bootcamp;
