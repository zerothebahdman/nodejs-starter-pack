import { Router, Request, Response, NextFunction } from 'express';
import {
  createUser,
  verifyUserEmail,
  loginUser,
  passwordReset,
} from '../../../authentication/authentication.module';
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

const route = Router();

route.post('/create-user', validate(CreateUserValidator), (req, res, next) => {
  createUser.createUser(req, res, next);
});

route.post(
  '/verify-email',
  validate(verifyUserEmailValidator),
  (req, res, next) => {
    verifyUserEmail.execute(req, res, next);
  }
);

route.post('/login-email', validate(LoginValidator), (req, res, next) => {
  loginUser._loginUser(req, res, next);
});

route.post('/login-phone', validate(LoginValidator), (req, res, next) => {
  loginUser._loginUser(req, res, next);
});

route.post('/verify-otp', validate(VerifyOtpValidator), (req, res, next) => {
  loginUser.verifyOtp(req, res, next);
});

route.post(
  '/regenerate-access-token',
  validate(RegenerateAccessToken),
  (req, res, next) => {
    loginUser.regenerateAccessToken(req, res, next);
  }
);

route.post('/resend-otp', validate(resendOtpValidator), (req, res, next) => {
  loginUser.resendOtp(req, res, next);
});

route.post(
  '/forgot-password',
  validate(forgotPasswordValidator),
  (req: Request, res: Response, next: NextFunction) => {
    passwordReset.passwordReset(req, res, next);
  }
);

route.post(
  '/reset-password',
  validate(ResetPasswordValidator),
  (req: Request, res: Response, next: NextFunction) => {
    passwordReset.resetPassword(req, res, next);
  }
);

export default route;
