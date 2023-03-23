/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import AppException from '../exceptions/AppException';
import httpStatus from 'http-status';
import axios from 'axios';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import EncryptionService from '../services/encryption.service';
import HelperClass from '../utils/helper';
import config from '../../config/default';
import { UserInterface } from '../utils/index';
import log from '../logging/logger';
import User from '../database/models/user.model';

export default class LoginUser {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly encryptionService: EncryptionService
  ) {}
  async _loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.loginOption === 'email') {
        const emailLoginOption = await this.emailLoginOption(req.body);
        return res.status(httpStatus.ACCEPTED).json(emailLoginOption);
      }
      if (req.body.loginOption === 'phone') {
        const phoneLoginOption = await this.phoneLoginOption(req.body);
        return res.status(httpStatus.ACCEPTED).json(phoneLoginOption);
      }
    } catch (err: unknown) {
      if (err instanceof AppException || err instanceof Error) {
        log.error(err);
        return next(new AppException(err.message, httpStatus.BAD_REQUEST));
      }
    }
  }

  async regenerateAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = await this.authService.regenerateAccessToken(
        req.body.refreshToken
      );
      if (!accessToken || accessToken.trim() === '')
        return next(
          new AppException('Oops! Refresh token expired.', httpStatus.FORBIDDEN)
        );

      return res.status(httpStatus.OK).json({ status: 'success', accessToken });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST)
      );
    }
  }

  async resendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const _user: UserInterface = await this.userService.getUserByEmail(
        req.body.email
      );
      if (!_user)
        next(
          new AppException('Oops!, user does not exist', httpStatus.NOT_FOUND)
        );
      if (_user.isEmailVerified === true)
        new Error(`Oops!, email has already been verified`);

      await this.authService.resendOtp(_user);
      return res.status(httpStatus.NO_CONTENT).send();
    } catch (err: any) {
      return next(
        new AppException(err.status, err.message || httpStatus.FORBIDDEN)
      );
    }
  }

  private async emailLoginOption(body: {
    email: string;
    password: string;
    pushNotificationId: string;
  }) {
    const _userExists = await User.findOne({
      email: body.email,
    }).select('+password');

    if (
      !_userExists ||
      !(await this.encryptionService.comparePassword(
        _userExists.password,
        body.password
      ))
    )
      throw new Error(`Oops!, invalid email or password`);

    if (_userExists.isEmailVerified !== true)
      throw Error('Oops! email address is not verified');
    const token = await this.authService.loginUser(_userExists);
    await this.userService.updateUserById(_userExists.id, {
      pushNotificationId: body.pushNotificationId,
    });

    return {
      user: _userExists,
      token,
    };
  }

  private async phoneLoginOption(body: { phoneNumber: string }) {
    const phoneNumber = body.phoneNumber.startsWith('+234')
      ? body.phoneNumber
      : `+234${body.phoneNumber.replace(/^0+/, '')}`;
    const _userExists: UserInterface = await this.userService.getUserDetail({
      phoneNumber,
    });
    if (!_userExists)
      throw new Error(`Oops!, this phone number is not tied with any account`);

    const otp = HelperClass.generateRandomChar(6, 'num');
    const hashedOtp = await this.encryptionService.hashString(otp);

    await this.userService.updateUserById(_userExists.id, {
      otpLogin: hashedOtp,
    });

    try {
      if (config.enviroment === 'production') {
        const smsSent = await axios({
          method: 'POST',
          url: `${config.sendChamp.baseUrl}/verification/create`,
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${config.sendChamp.apiKey}`,
          },
          data: {
            channel: 'sms',
            sender: config.sendChamp.senderId,
            token_type: 'numeric',
            token_length: 6,
            expiration_time: 1,
            customer_mobile_number: body.phoneNumber.startsWith('+234')
              ? body.phoneNumber
              : `+234${body.phoneNumber}`,
            meta_data: {
              first_name: _userExists.fullName,
            },
            token: otp,
          },
        });

        return {
          status: smsSent.data.status,
          message: 'OTP sent successfully',
        };
      } else {
        return {
          message: 'OTP sent successfully',
          status: 'success',
          data: {
            message:
              'For testing purposes, OTP wont be sent to your phone number, below is the OTP for login',
            token: otp,
          },
        };
      }
    } catch (err: any) {
      throw new Error(err.data);
    }
  }

  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const hashedOtp = await this.encryptionService.hashString(req.body.otp);
      let _user: UserInterface = await this.userService.getUserDetail({
        otpLogin: hashedOtp,
      });
      if (!_user)
        return next(
          new AppException('Oops!, invalid otp', httpStatus.BAD_REQUEST)
        );

      _user = await this.userService.updateUserById(_user.id, {
        otpLogin: null,
      });

      const token = await this.authService.loginUser(_user);
      await this.userService.updateUserById(_user.id, {
        pushNotificationId: req.body.pushNotificationId,
      });

      return res.status(httpStatus.OK).json({
        status: 'success',
        user: _user,
        token,
      });
    } catch (err: any) {
      return next(
        new AppException(err.status, err.message || httpStatus.FORBIDDEN)
      );
    }
  }
}
