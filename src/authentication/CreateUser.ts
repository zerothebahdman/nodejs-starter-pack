/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import AppException from '../exceptions/AppException';
import EmailService from '../services/email.service';
import httpStatus from 'http-status';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import HelperClass from '../utils/helper';
import config from '../../config/default';
const emailService = new EmailService();

export default class CreateUser {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.phoneNumber = req.body.phoneNumber.startsWith('+234')
        ? req.body.phoneNumber
        : `+234${req.body.phoneNumber.replace(/^0+/, '')}`;

      const emailTaken = await this.userService.getUserByEmail(req.body.email);
      delete req.body.confirmPassword;
      const phoneNumberTaken = await this.userService.getUserByPhoneNumber(
        req.body.phoneNumber
      );
      if (emailTaken) throw new Error(`Oops!, ${emailTaken.email} is taken`);
      if (phoneNumberTaken)
        throw new Error(`Oops!, ${phoneNumberTaken.phoneNumber} is taken`);

      req.body.fullName = HelperClass.titleCase(req.body.fullName);
      req.body.referralCode = HelperClass.generateRandomChar(6, 'upper-num');

      if (req.body.inviteCode) {
        const user = await this.userService.getUserByReferralCode(
          req.body.inviteCode
        );
        if (!user) throw new Error(`Oops!, Invalid invite code`);
      }
      /** if user does not exist create the user using the user service */
      const { user, OTP_CODE } = await this.authService.createUser(req.body);
      /** Send email verification to user */
      if (config.enviroment === 'production') {
        await emailService._sendUserEmailVerificationEmail(
          user.fullName,
          user.email,
          OTP_CODE
        );
        return res.status(httpStatus.OK).json({
          status: 'success',
          message: `We've sent an verification email to your mail`,
          user,
        });
      } else {
        return res.status(httpStatus.OK).json({
          status: 'success',
          OTP_CODE,
          user,
        });
      }
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST)
      );
    }
  }
}
