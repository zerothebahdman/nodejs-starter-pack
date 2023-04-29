import { Router, Request, Response, NextFunction } from 'express';
import {
  CreateUserValidator,
  forgotPasswordValidator,
  LoginValidator,
  RegenerateAccessToken,
  ResetPasswordValidator,
  VerifyOtpValidator,
  verifyUserEmailValidator,
  resendOtpValidator,
} from '../../../validators/auth-validator';
import validate from '../../middlewares/validate';
import { authController } from '../../auth/authentication.module';

const route = Router();

route.post('/create-user', validate(CreateUserValidator), (req, res, next) => {
  authController.create(req, res, next);
});

route.post(
  '/verify-email',
  validate(verifyUserEmailValidator),
  (req, res, next) => {
    authController.verifyEmail(req, res, next);
  }
);

route.post('/login-email', validate(LoginValidator), (req, res, next) => {
  authController.login(req, res, next);
});

route.post('/login-phone', validate(LoginValidator), (req, res, next) => {
  authController.login(req, res, next);
});

route.post('/verify-otp', validate(VerifyOtpValidator), (req, res, next) => {
  authController.verifyOtp(req, res, next);
});

route.post(
  '/regenerate-access-token',
  validate(RegenerateAccessToken),
  (req, res, next) => {
    authController.regenerateAccessToken(req, res, next);
  }
);

route.post('/resend-otp', validate(resendOtpValidator), (req, res, next) => {
  authController.resendOtp(req, res, next);
});

route.post(
  '/forgot-password',
  validate(forgotPasswordValidator),
  (req: Request, res: Response, next: NextFunction) => {
    authController.passwordReset(req, res, next);
  }
);

route.post(
  '/reset-password',
  validate(ResetPasswordValidator),
  (req: Request, res: Response, next: NextFunction) => {
    authController.resetPassword(req, res, next);
  }
);

export default route;
