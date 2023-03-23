import dotenv from 'dotenv';
import Joi from 'joi';
dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .required()
      .valid('development', 'production', 'staging', 'test'),
    PORT: Joi.number().default(8080).required(),
    ENVIRONMENT: Joi.string().default('staging'),
    FRONTEND_APP_URL: Joi.string().label('Frontend APP URL'),
    PAGA_TEST_ENVIRONMENT: Joi.boolean().default(true),
    API_DOMAIN: Joi.string().description('API Domain'),
    ENFORCE_SSL: Joi.bool()
      .default(false)
      .description('This is to determine whether to use HTTP or HTTPS'),
    USE_PORT: Joi.bool()
      .default(false)
      .description('This is to determine whether to use the PORT value'),
    DATABASE_URL: Joi.string().label('MONGO Database URL'),
    APP_NAME: Joi.string().required().label('App Name').default('AGSAAP'),
    JWT_ACCESS_TOKEN_EXPIRES: Joi.string()
      .default('1h')
      .label('JWT Access Token Expires')
      .required(),
    JWT_REFRESH_TOKEN_EXPIRES: Joi.string()
      .default('24h')
      .label('JWT Refresh Token Expires')
      .required(),
    MAIL_FROM: Joi.string().required().label('Mail From').required(),
    MAIL_USER: Joi.string().required().label('Mail User').required(),
    MAIL_PASSWORD: Joi.string().required().label('Mail Password').required(),
    MAIL_HOST: Joi.string().required().label('Mail Host').required(),
    MAIL_PORT: Joi.number().required().label('Mail Port').required(),
    CLOUDINARY_NAME: Joi.string().label('Cloudinary Name').required(),
    CLOUDINARY_API_KEY: Joi.string().label('Cloudinary API Key').required(),
    CLOUDINARY_API_SECRET: Joi.string()
      .label('Cloudinary API Secret')
      .required(),
    CRON_SCHEDULE_DELETE_USER_ACCOUNT_IF_NOT_VERIFIED: Joi.string().label(
      'Cron Schedule Delete User Account If Not Verified'
    ),
    PAGA_API_SECRET: Joi.string().description('PAGA API Secret'),
    PAGA_API_KEY: Joi.string().description('PAGA API key'),
    PAGA_API_PUBLIC_KEY: Joi.string().description('PAGA API public key'),
    PAGA_API_URL: Joi.string()
      .description('PAGA BASE API Url')
      .default('https://www.mypaga.com/paga-webservices/business-rest/secured'),
    PAGA_AUTHORIZATION_KEY: Joi.string().description('PAGA Authorization Key'),
    CRON_SCHEDULE_SKILL_UP: Joi.string()
      .label('Cron Schedule Skill Up')
      .default('0 4 * * *'),
    CRON_SCHEDULE_PAYMENT_SCHEDULE: Joi.string()
      .label('Cron Schedule Payment Schedule')
      .default('0 6 * * *'),
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
  enviroment: envVars.ENVIROMENT,
  DATABASE_URL: envVars.MONGO_DATABASE_URL,
  environment: envVars.ENVIRONMENT,
  port: envVars.PORT,
  appName: envVars.APP_NAME,
  jwtAccessTokenExpiration: envVars.JWT_ACCESS_TOKEN_EXPIRES,
  jwtRefreshTokenExpiration: envVars.JWT_REFRESH_TOKEN_EXPIRES,
  name: envVars.APP_NAME,
  from: envVars.MAIL_FROM,
  MAIL_HOST: envVars.MAIL_HOST,
  MAIL_PASSWORD: envVars.MAIL_PASSWORD,
  MAIL_USER: envVars.MAIL_USER,
  MAIL_PORT: envVars.MAIL_PORT,
  baseApiUrl: `${envVars.ENFORCE_SSL ? 'https' : 'http'}://${
    envVars.API_DOMAIN
  }${envVars.USE_PORT ? `:${envVars.PORT}` : ''}`,
  concurrency: parseInt(envVars.QUEUE_CONCURRENCY || '1'),
  emailQueueName: envVars.QUEUE_NAME || 'agsaap',
  connection: {
    host: envVars.REDIS_HOST,
    port: parseInt(envVars.REDIS_PORT || '6379'),
  },
  cloudinary: {
    cloudName: envVars.CLOUDINARY_NAME,
    apiKey: envVars.CLOUDINARY_API_KEY,
    apiSecret: envVars.CLOUDINARY_API_SECRET,
  },
  paymentData: {
    paga_secret: envVars.PAGA_API_SECRET,
    paga_key: envVars.PAGA_API_KEY,
    paga_public_key: envVars.PAGA_API_PUBLIC_KEY,
    paga_url: envVars.PAGA_API_URL,
    withdrawalFee: envVars.WITHDRAWAL_FEE,
    isPagaTestEnv: envVars.PAGA_TEST_ENVIRONMENT,
    pagaAuthorizationKey: envVars.PAGA_AUTHORIZATION_KEY,
  },
  sendChamp: {
    apiKey: envVars.SEND_CHAMP_PUB_KEY,
    baseUrl: envVars.SEND_CHAMP_BASE_URL,
    senderId: envVars.SEND_CHAMP_SENDER_ID,
  },
  cronSchedule: {
    skillUp: envVars.CRON_SCHEDULE_SKILL_UP,
    schedule: envVars.CRON_SCHEDULE_PAYMENT_SCHEDULE,
  },
};
