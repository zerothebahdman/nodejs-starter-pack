import { Router, Request, Response, NextFunction } from 'express';
// import { userController } from '../../controllers/controllers.module';
import {
  createUser,
  loginUser,
  passwordReset,
  verifyUserEmail,
} from '../../../authentication/authentication.module';
import validate from '../../middlewares/validate';
import {
  LoginValidator,
  CreateUserValidator,
  RegenerateAccessToken,
  ResetPasswordValidator,
} from '../../../validators/AuthValidator';

const route = Router();

// route.route('/').get(isUserAuthenticated, (req, res, next) => {
//   userController.getAllUsers(req, res, next);
// });

route.post('/create-user', validate(CreateUserValidator), (req, res, next) => {
  createUser.create(req, res, next);
});

route.post('/verify-email', (req, res, next) => {
  verifyUserEmail.execute(req, res, next);
});

route.post('/login', validate(LoginValidator), (req, res, next) => {
  loginUser._loginUser(req, res, next);
});

route.post(
  '/regenerate-access-token',
  validate(RegenerateAccessToken),
  (req, res, next) => {
    loginUser.regenerateAccessToken(req, res, next);
  }
);

// route.post('/regenerate-otp', (req, res, next) => {
//   loginUser.resendOtp(req, res, next);
// });

route.post(
  '/forgot-password',
  (req: Request, res: Response, next: NextFunction) => {
    passwordReset.sendResetPasswordEmail(req, res, next);
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
