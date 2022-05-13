import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import Joi from "joi";

const __dirname = dirname(fileURLToPath(import.meta.url));

/*
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: path.join(__dirname, "./config.env") });

/*
 * envVarsSchema is a Joi schema that validates the environment variables
 */

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("development", "production")
      .default("development"),
    PORT: Joi.number().default(9000),
    MongoDB_URL: Joi.string().description("MongoDB connection URL"),
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
    },
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({
    errors: {
      label: "key",
    },
  })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const config = {
  env: envVars.NODE_ENV,
  PORT: envVars.PORT,
  mongoose: {
    url: envVars.MongoDB_URL,
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
      // expires on one day
      expires: new Date(Date.now() + 86400000),
      secure: envVars !== "development",
      httpOnly: envVars !== "development",
      sameSite: envVars !== "development",
    },
  },
};

export default config;
