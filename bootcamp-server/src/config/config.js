import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import Joi from 'joi';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';

const __dirname = dirname(fileURLToPath(import.meta.url));
// const MongoStore = ConnectMongo(session);

/*
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: path.join(__dirname, './config.env') });

/*
 * envVarsSchema is a Joi schema that validates the environment variables
 */

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('development', 'production')
      .default('development'),
    PORT: Joi.number().default(9000),
    CLIENT_URL: Joi.string(),
    MongoDB_URL: Joi.string().description('MongoDB connection URL'),
    MONGODB_URL1: Joi.string(),
    origin: Joi.string(),
    credentials: Joi.boolean(),
    preflightContinue: Joi.boolean(),
    session: {
      key: Joi.string(),
      secret: Joi.string(),
      resave: Joi.boolean(),
      saveUninitialized: Joi.boolean(),
      cookie: {
        expires: Joi.string(),
        httpOnly: Joi.boolean(),
        secure: Joi.string(),
        sameSite: Joi.string(),
      },
      store: {
        MongoDB_URL: Joi.string().description('MongoDB connection URL'),
        ttl: Joi.number(),
        autoRemove: Joi.string(),
        autoRemoveInterval: Joi.number(),
      },
    },
    cloudinary: {
      CLOUD_NAME: Joi.string(),
      CL_SECRECT: Joi.string(),
      CL_API: Joi.string(),
    },
    geocoder: {
      GEOCODER_PROVIDER: Joi.string(),
      GEOCODER_API_KEY: Joi.string(),
    },
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({
    errors: {
      label: 'key',
    },
  })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const config = {
  env: envVars.NODE_ENV,
  PORT: envVars.PORT,
  client: envVars.CLIENT_URL,
  mongo: envVars.MONGODB_URL1,
  mongoose: {
    url: envVars.MongoDB_URL,
    url1: envVars.MONGODB_URL1,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  cors: {
    origin: envVars.CLIENT_URL,
    credentials: true,
    preflightContinue: true,
  },
  session: {
    key: envVars.SESSION_KEY,
    secret: envVars.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      // expires in 3 minutes
      expires: new Date(Date.now() + 60000),
      secure: false,
      sameSite: envVars === 'development' ? 'strict' : 'none',
      httpOnly: envVars !== 'development',
      maxAge: 600000,
    },
    store: MongoStore.create({
      mongoUrl: envVars.MongoDB_URL,
      dbName: 'session',
      ttl: envVars.SESSION_TTL,
      autoRemove: 'interval',
      autoRemoveInterval: 1000,
    }),
  },
  cloudinary: {
    cloud_name: envVars.cloud_name,
    api_key: envVars.api_key,
    api_secret: envVars.api_secret,
  },
  geocoder: {
    GEOCODER_PROVIDER: envVars.GEOCODER_PROVIDER,
    GEOCODER_API_KEY: envVars.GEOCODER_API_KEY,
  },
};

export default config;
