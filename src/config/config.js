const dotenv = require('dotenv');
const path = require('node:path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    NABLA_PORT: Joi.number().default(41234),
    OUT_LOG_FILE: Joi.string(),
    ERROR_LOG_FILE: Joi.string(),
    SITE_NAME: Joi.string(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  nablaPort: envVars.NABLA_PORT,
  siteName: envVars.SITE_NAME,
  pm2: {
    outLogFile: envVars.OUT_LOG_FILE,
    errorLogFile: envVars.ERROR_LOG_FILE
  }
};