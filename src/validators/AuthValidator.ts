import Joi from 'joi';
import { ROLES } from '../utils/constants';

export const LoginValidator = {
  body: Joi.object().keys({
    username: Joi.string().lowercase().required(),
    password: Joi.string().required(),
  }),
};

export const CreateUserValidator = {
  body: Joi.object().keys({
    firstName: Joi.string().min(3).lowercase().max(40).required(),
    lastName: Joi.string().min(3).lowercase().max(40).required(),
    username: Joi.string().lowercase().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'ng'] },
      })
      .lowercase()
      .required()
      .messages({
        'string.email': 'Oops!, you need to provide valid email address',
        'string.required': 'Oops!, you have to specify an email address',
      }),
    phoneNumber: Joi.string().max(12).strict().required().messages({
      'string.required': 'Oops!, you have to specify an email address',
    }),
    gender: Joi.string().required().valid('male', 'female'),
    role: Joi.string()
      .required()
      .valid(...Object.values(ROLES)),
    address: Joi.string().required().lowercase(),
    image: Joi.string(),
  }),
};

export const ResendUserEmailVerificationValidator = {
  body: Joi.object().keys({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .lowercase()
      .required()
      .messages({
        'string.email': 'Oops!, you need to provide valid email address',
        'string.required': 'Oops!, you have to specify an email address',
      }),
  }),
};

export const RegenerateAccessToken = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export const ResetPasswordValidator = {
  body: Joi.object().keys({
    password: Joi.string().min(8).required(),
    confirm_password: Joi.ref('password'),
    token: Joi.string().required(),
  }),
};
