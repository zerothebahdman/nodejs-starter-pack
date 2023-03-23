import Joi from 'joi';
import { GENDER } from '../../config/constants';

export const LoginValidator = {
  body: Joi.object().keys({
    email: Joi.when('loginOption', {
      is: 'email',
      then: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'org', 'ng'] },
        })
        .lowercase()
        .required()
        .messages({
          'any.email': 'Oops!, you need to provide valid email address',
          'any.required': 'Oops!, you have to specify an email address',
        }),
    }),
    password: Joi.when('loginOption', {
      is: 'email',
      then: Joi.string().min(8).required().messages({
        'string.min': 'Oops!, password must be at least 8 characters long',
        'any.required': 'Oops!, you have to specify a password',
      }),
    }),
    phoneNumber: Joi.when('loginOption', {
      is: 'phone',
      then: Joi.string().max(15).min(11).strict().required().messages({
        'any.required': 'Oops!, you have to specify a phone number',
      }),
    }),
    loginOption: Joi.string().valid('email', 'phone').required(),
    pushNotificationId: Joi.when('loginOption', {
      is: 'email',
      then: Joi.string().required(),
    }),
  }),
};

export const CreateUserValidator = {
  body: Joi.object().keys({
    fullName: Joi.string().min(3).lowercase().max(40).required(),
    email: Joi.string().email().lowercase().required().messages({
      'string.email': 'Oops!, you need to provide valid email address',
      'string.required': 'Oops!, you have to specify an email address',
    }),
    phoneNumber: Joi.string().min(10).max(14).strict().required().messages({
      'string.required': 'Oops!, you have to specify a phone number',
    }),
    /** Password requirements:
     * At least 8 characters—the more characters, the better
     * A mixture of both uppercase and lowercase - letters
     * A mixture of letters and numbers
     * Inclusion of at least one special character, e.g., ! @ # ? ]
     */
    password: Joi.string()
      .min(8)
      .pattern(
        new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
        )
      )
      .required()
      .messages({
        'string.pattern.base':
          'Oops!, password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one number and one special character',
        'string.required': 'Oops!, you have to specify a password',
      }),
    confirmPassword: Joi.ref('password'),
    gender: Joi.string()
      .required()
      .valid(...Object.values(GENDER)),
    residentialAddress: Joi.string().required(),
    inviteCode: Joi.string().optional(),
  }),
};

export const VerifyOtpValidator = {
  body: Joi.object().keys({
    otp: Joi.string().required().min(6).max(6),
    pushNotificationId: Joi.string().required(),
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
    confirmPassword: Joi.ref('password'),
    token: Joi.string().required(),
  }),
};

export const verifyUserEmailValidator = {
  body: Joi.object().keys({
    otp: Joi.string().required(),
  }),
};

export const forgotPasswordValidator = {
  body: Joi.object().keys({
    email: Joi.when('modeOfReset', {
      is: 'email',
      then: Joi.string().email().lowercase().required().messages({
        'any.required': 'Oops!, you have to specify an email address',
      }),
    }),
    phoneNumber: Joi.when('modeOfReset', {
      is: 'phoneNumber',
      then: Joi.string().max(15).min(11).strict().required().messages({
        'any.required': 'Oops!, you have to specify a phone number',
      }),
    }),
    modeOfReset: Joi.string().valid('email', 'phoneNumber').required(),
  }),
};

export const resendOtpValidator = {
  body: Joi.object().keys({
    email: Joi.string().email().lowercase().required().messages({
      'any.required': 'Oops!, you have to specify an email address',
    }),
  }),
};
