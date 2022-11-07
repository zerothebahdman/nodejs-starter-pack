import { NextFunction, Request, Response } from 'express';
import AppException from '../exceptions/AppException';
import httpStatus from 'http-status';
import AuthService from '../services/Auth.service';

export default class LoginUser {
  constructor(private readonly authService: AuthService) {}

  async _loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken, refreshToken, user } =
        await this.authService.loginUser(req.body, next);
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        user,
        accessToken,
        refreshToken,
      });
    } catch (err: any) {
      return next(new AppException(err.message, err.status));
    }
  }

  async regenerateAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = await this.authService.regenerateAccessToken(
        req.body.refreshToken,
        next
      );
      if (!accessToken || accessToken.trim() === '')
        return next(
          new AppException('Oops! Refresh token expired.', httpStatus.FORBIDDEN)
        );

      return res.status(httpStatus.OK).json({ status: 'success', accessToken });
    } catch (err: any) {
      return next(new AppException(err.message, err.status));
    }
  }

  // async resendOtp(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     await this.authService.resendOtp({ req: req.body, next });
  //     return res.status(httpStatus.NO_CONTENT).send();
  //   } catch (err: any) {
  //     return next(new AppException(err.message, err.status));
  //   }
  // }
}
