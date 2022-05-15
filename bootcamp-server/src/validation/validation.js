import Joi from 'joi';

const email = Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .required()
  .messages({
    'string.base': 'Email should be a type of text',
    'string.empty': 'Email cannot be empty field',
    'string.min': 'Email should be at least {#limit} characters long',
    'string.max': 'Email should be at most {#limit} characters long',
    'string.required': 'Email is required',
  });

// eslint-disable-next-line prettier/prettier
  const password = Joi
  .string()
     .required()
     .min(8)
     .max(12)
     .messages({
  'string.base': 'Password should be a type of text',
  'string.empty': 'Password cannot be empty field',
  'string.min': 'Password should be at least {#limit} characters long',
  'string.max': 'Password cannot be more than {#limit} characters long',
  'string.required': 'Password is required',
});

const username = Joi.string()
  .min(4)
  .max(20)
  .required()
  .pattern(/^[a-zA-Z0-9]{3,30}$/)
  .messages({
    'string.base': 'Username should be a type of text',
    'string.empty': 'Username cannot be empty field',
    'string.min': 'Username should be at least {#limit} characters long',
    'string.max': 'Username cannot be more than {#limit} characters long',
    'string.required': 'Username is required',
    'string.pattern.base':
      'Username must preceed with letters followed by _ or numbers eg: john23 | john_23',
  });

const firstName = Joi.string();
const lastName = Joi.string();

export const schemas = {
  createUser: Joi.object()
    .keys({
      username,
      email,
      password,
      firstName,
      lastName,
    })
    .options({ abortEarly: false }),
  loginUser: Joi.object().keys({
    username,
    password,
  }),
};

export default schemas;
