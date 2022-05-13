import Joi from "joi";
import moment from "moment";

import { objectID } from "./custom.validations.js";

const createBootcamp = {
  body: Joi.object().keys({
    name: Joi.string().required("name is required"),
    description: Joi.string().required("description is required"),
    website: Joi.string(),
    phone: Joi.string().max(10),
    email: Joi.string().email(),
    address: Joi.string().required("Please add an address"),
    careers: Joi.array()
      .items(Joi.string())
      .required("Please add at least one career"),
    housing: Joi.boolean().default(false),
    averageRating: Joi.number().min(1).max(10),
    averageCost: Joi.number().default(0),
    photo: Joi.string().default("no-photo.jpg"),
    jobAssistance: Joi.boolean().default(false),
    jobGuarantee: Joi.boolean().default(false),
    acceptGi: Joi.boolean().required().default(false),
    //   user: Joi.string().required(),
    createdAt: Joi.date().default(moment().format("YYYY-MM-DD")),
    location: Joi.object().keys({
      type: Joi.string().valid("Point"),
      coordinates: Joi.array().items(Joi.number()),
      formattedAddress: Joi.string(),
      street: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      zipcode: Joi.string(),
      country: Joi.string(),
    }),
    //  .required('Please add a location'),
  }),
};

const getAllBootcamps = {
  query: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    website: Joi.string(),
    phone: Joi.string().max(10),
    email: Joi.string().email(),
    address: Joi.string(),
    careers: Joi.array().items(Joi.string()),
    housing: Joi.boolean().default(false),
    averageRating: Joi.number().min(1).max(10).default(0),
    averageCost: Joi.number().default(0),
    photo: Joi.string().default("no-photo.jpg"),
    jobAssistance: Joi.boolean().default(false),
    jobGuarantee: Joi.boolean().default(false),
    acceptGi: Joi.boolean().default(false),
    user: Joi.string(),
    createdAt: Joi.date().default(moment().format("YYYY-MM-DD")),
    limit: Joi.number().min(1).default(10),
    page: Joi.number().min(1).default(1),
    location: Joi.object().keys({
      type: Joi.string().valid("Point"),
      coordinates: Joi.array().items(Joi.number()),
      formattedAddress: Joi.string(),
      street: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      zipcode: Joi.string(),
      country: Joi.string(),
    }),
  }),
};

const getSingleBootcamp = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectID),
  }),
};

const getBootcampByUserId = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectID),
  }),
};

const updateBootcampById = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectID),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required("name is required"),
      description: Joi.string().required("description is required"),
      website: Joi.string(),
      phone: Joi.string().max(10),
      email: Joi.string().email(),
      address: Joi.string().required("Please add an address"),
      careers: Joi.array()
        .items(Joi.string())
        .required("Please add at least one career"),
      housing: Joi.boolean().default(false),
      averageRating: Joi.number().min(1).max(10),
      averageCost: Joi.number().default(0),
      photo: Joi.string().default("no-photo.jpg"),
      jobAssistance: Joi.boolean().default(false),
      jobGuarantee: Joi.boolean().default(false),
      acceptGi: Joi.boolean().default(false),
      // user: Joi.string().required(),
      createdAt: Joi.date().default(moment().format("YYYY-MM-DD")),
      location: Joi.object().keys({
        type: Joi.string().valid("Point"),
        coordinates: Joi.array().items(Joi.number()),
        formattedAddress: Joi.string(),
        street: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        zipcode: Joi.string(),
        country: Joi.string(),
      }),
    })
    .min(1),
};

const deleteBootcampById = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectID),
  }),
};

export default {
  createBootcamp,
  getAllBootcamps,
  getBootcampByUserId,
  getSingleBootcamp,
  updateBootcampById,
  deleteBootcampById,
};
