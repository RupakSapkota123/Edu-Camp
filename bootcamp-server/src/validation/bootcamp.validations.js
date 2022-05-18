/* eslint-disable camelcase */
import Joi from 'joi';
import moment from 'moment';

import { objectID } from './custom.validations.js';

const name = Joi.string().min(4).max(20).required().messages({
  'string.base': 'Name should be a type of text',
  'string.empty': 'Name cannot be empty field',
  'string.min': 'Name should be at least {#limit} characters long',
  'string.max': 'Name cannot be more than {#limit} characters long',
  'string.required': 'Name is required',
});

const description = Joi.string().min(10).max(300).required().messages({
  'string.empty': 'Description cannot be empty field',
  'string.min': 'Description should be at least {#limit} characters long',
  'string.max': 'Description cannot be more than {#limit} characters long',
  'string.required': 'Description is required',
});

const website = Joi.string().uri().messages({
  'string.base': 'Website should be a type of text',
});

const phone = Joi.number().min(10).messages({
  'number.base': 'Phone should be a type of number',
  'number.max': 'Phone should be 10 digits long',
});

const email = Joi.string();

const address = Joi.string().required().messages({
  'string.empty': 'Address cannot be empty field',
  'string.required': 'Address is required',
});

const careers = Joi.array().items(Joi.string()).messages({
  'array.base': 'Careers should be a type of array',
  'array.required': 'Careers is required',
});

const averageRating = Joi.number().min(1).max(5).messages({
  'number.base': 'Average rating should be a type of number',
  'number.min': 'Average rating should be at least {#limit}',
  'number.max': 'Average rating cannot be more than {#limit}',
});

const averageCost = Joi.number().min(1).messages({
  'number.base': 'Average cost should be a type of number',
  'number.min': 'Average cost should be at least {#limit}',
});

const acceptGi = Joi.boolean().required().messages({
  'boolean.base': 'Accept GI should be a type of boolean',
  'boolean.required': 'Accept GI is required',
});

const location = Joi.object().keys({
  type: Joi.string().valid('point').messages({
    'string.base': 'Location type should be a type of string',
    'string.valid': 'Location type should be point',
  }),
  coordinates: Joi.array().items(Joi.number()).messages({
    'array.base': 'Location coordinates should be a type of array',
    'array.required': 'Location coordinates is required',
  }),
  formattedAddress: Joi.string().messages({
    'string.base': 'Location formatted address should be a type of string',
  }),
  street: Joi.string().messages({
    'string.base': 'Location street should be a type of string',
  }),
  city: Joi.string().messages({
    'string.base': 'Location city should be a type of string',
  }),
  state: Joi.string().messages({
    'string.base': 'Location state should be a type of string',
  }),
  zipcode: Joi.string().messages({
    'string.base': 'Location zipcode should be a type of string',
  }),
  country: Joi.string().messages({
    'string.base': 'Location country should be a type of string',
  }),
});

const _author_id = Joi.string().custom(objectID).messages({
  'string.base': 'Author id should be a type of string',
  'string.empty': 'Author id cannot be empty field',
  //   'string.required': 'Author id is required',
});

const privacy = Joi.string().valid('public', 'private', 'followers').messages({
  'string.base': 'Privacy should be a type of string',
  'string.valid': 'Privacy should be public, private or followers',
});

const schemas = {
  createBootcamp: Joi.object()
    .keys({
      _author_id,
      name,
      description,
      website,
      phone,
      email,
      address,
      careers,
      housing: Joi.boolean().default(false),
      averageRating,
      photo: Joi.string().default('no-photo.jpg'),
      jobAssistance: Joi.boolean().default(false),
      jobGuarantee: Joi.boolean().default(false),
      acceptGi,
      user: Joi.string(),
      //  createdAt: Joi.date().default(moment().format('YYYY-MM-DD HH:mm:ss A')),
      location,
      privacy,
    })
    .options({ abortEarly: false }),
  getAllBootcamps: Joi.object()
    .keys({
      _author_id: Joi.string(),
      name: Joi.string(),
      description: Joi.string(),
      website,
      phone,
      email,
      address: Joi.string(),
      careers: Joi.array().items(Joi.string()),
      housing: Joi.boolean().default(false),
      averageRating,
      photo: Joi.string().default('no-photo.jpg'),
      jobAssistance: Joi.boolean().default(false),
      jobGuarantee: Joi.boolean().default(false),
      acceptGi: Joi.boolean().default(false),
      user: Joi.string(),
      //  createdAt: Joi.date().default(moment().format('YYYY-MM-DD')),
      limit: Joi.number().min(1).default(10),
      page: Joi.number().min(1).default(1),
      location,
      privacy: Joi.string().valid('public', 'private', 'followers'),
    })
    .options({ abortEarly: false }),
  getSingleBootcamp: Joi.object()
    .keys({
      id: Joi.string().custom(objectID),
    })
    .options({ abortEarly: false }),

  updateBootcampById: Joi.object().keys({
    id: Joi.string().custom(objectID),
    _author_id,
    name,
    description,
    website,
    phone,
    email,
    address,
    careers,
    housing: Joi.boolean().default(false),
    averageRating,
    photo: Joi.string().default('no-photo.jpg'),
    jobAssistance: Joi.boolean().default(false),
    jobGuarantee: Joi.boolean().default(false),
    acceptGi,
    user: Joi.string(),
    createdAt: Joi.date().default(moment().format('YYYY-MM-DD')),
    location,
    privacy,
  }),

  deleteBootcampById: Joi.object().keys({
    id: Joi.string().custom(objectID),
  }),
};

export default schemas;
