import mongoose from 'mongoose';
import slugify from 'slugify';
import { geocoder } from '../utils/index.js';

const BootcampSchema = new mongoose.Schema(
  {
    _author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    slug: String,
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30,
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 300,
    },
    website: {
      type: String,
    },
    phone: {
      type: String,
      maxlength: 10,
    },
    email: {
      type: String,
      lowercase: true,
      minlength: 12,
      maxlength: 64,
      // validate: {
      //   validator: (email) => {
      //     const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      //     return regex.test(email);
      //   },
      //   message: '{VALUE} is invalid',
      // },
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ['point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      formattedAddress: String,
      street: String,
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
    privacy: {
      type: String,
      default: 'public',
      enum: ['private', 'public', 'follower'],
    },
    photos: [Object],
    isEdited: {
      type: Boolean,
      default: false,
    },
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      getters: true,
      virtuals: true,
    },
  },
);

BootcampSchema.virtual('author', {
  ref: 'User',
  localField: '_author_id',
  foreignField: '_id',
  justOne: true,
});

//* create Bootcamp slug from name
BootcampSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//* Geocode & create location field
BootcampSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    state: loc[0].stateCode,
    city: loc[0].city,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  // Do not save address in DB
  this.address = undefined;
  next();
});

const Bootcamp = mongoose.model('Bootcamp', BootcampSchema);

export default Bootcamp;
