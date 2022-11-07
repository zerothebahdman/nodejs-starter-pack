import dotenv from 'dotenv';
import Joi from 'joi';
dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .required()
      .valid('development', 'production', 'test'),
    PORT: Joi.number().default(8080).required(),
    FRONTEND_APP_URL: Joi.string().required().label('Frontend APP URL'),
    DATABASE_URL: Joi.string().required().label('Database URL'),
    APP_NAME: Joi.string().required().label('App Name').default('KOOPAY'),
    JWT_ACCESS_TOKEN_EXPIRES: Joi.string()
      .default('1h')
      .label('JWT Access Token Expires')
      .required(),
    JWT_REFRESH_TOKEN_EXPIRES: Joi.string()
      .default('24h')
      .label('JWT Refresh Token Expires')
      .required(),
    MAIL_FROM: Joi.string().label('Mail From'),
    MAIL_USER: Joi.string().label('Mail User'),
    MAIL_PASSWORD: Joi.string().label('Mail Password'),
    MAIL_HOST: Joi.string().label('Mail Host'),
    MAIL_PORT: Joi.number().label('Mail Port'),
  })
  .unknown();
const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  FRONTEND_APP_URL: envVars.FRONTEND_APP_URL,
  DATABASE_URL: envVars.DATABASE_URL,
  port: envVars.PORT,
  jwtAccessTokenExpiration: envVars.JWT_ACCESS_TOKEN_EXPIRES,
  jwtRefreshTokenExpiration: envVars.JWT_REFRESH_TOKEN_EXPIRES,
  name: envVars.APP_NAME,
  from: envVars.MAIL_FROM,
  MAIL_HOST: envVars.MAIL_HOST,
  MAIL_PASSWORD: envVars.MAIL_PASSWORD,
  MAIL_USER: envVars.MAIL_USER,
  MAIL_PORT: envVars.MAIL_PORT,
};
