import dotenv from 'dotenv';
import path, { dirname } from 'path';
import {fileURLToPath} from 'url';
import Joi from 'joi';

const __dirname = dirname(fileURLToPath(import.meta.url));

/*
     * Load environment variables from .env file, where API keys and passwords are configured.
*/
dotenv.config({ path: path.join(__dirname, './config.env') });

/*
     * envVarsSchema is a Joi schema that validates the environment variables
 */

     const envVarsSchema = Joi.object()
     .keys({
           NODE_ENV: Joi.string().valid('development', 'production').default('development'),
           PORT: Joi.number().default(9000),
     })
     .unknown()

     
const {value: envVars, error} = envVarsSchema.prefs({errors: {label:'key'}}).validate(process.env);

     if (error) {
           throw new Error(`Config validation error: ${error.message}`);
     }
     const config = {
               env: envVars.NODE_ENV,
               PORT: envVars.PORT,
     }

export default config;