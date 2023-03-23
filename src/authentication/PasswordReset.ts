/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import AppException from '../exceptions/AppException';
import EmailService from '../services/email.service';
import TokenMustStillBeValid from './rules/TokenMustStillBeValid';
import moment from 'moment';
import EncryptionService from '../services/encryption.service';
import UserService from '../services/user.service';
import httpStatus from 'http-status';
import HelperClass from '../utils/helper';
import { UserInterface } from '../utils/index';
import config from '../../config/default';
import axios from 'axios';

export default class PasswordReset {
  constructor(
    private readonly emailService: EmailService,
    private readonly encryptionService: EncryptionService,
    private readonly userService: UserService
  ) {}

  async passwordReset(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.modeOfReset === 'email') {
        await this.sendResetPasswordEmail(req.body.email);
        res.status(httpStatus.NO_CONTENT).send();
      }
      if (req.body.modeOfReset === 'phoneNumber') {
        await this.sendUserPasswordResetOTP(req, res, next);
      }
    } catch (error: any) {
      return next(new AppException(error.message, error.status));
    }
  }

  async sendResetPasswordEmail(email: string) {
    const userExists: UserInterface = await this.userService.getUserByEmail(
      email
    );
    if (!userExists) throw new Error(`Oops! User does not exist`);

    const token = HelperClass.generateRandomChar(6, 'num');
    const hashedToken = await this.encryptionService.hashString(token);

    const updateBody: Pick<
      UserInterface,
      'passwordResetToken' | 'passwordResetTokenExpiresAt'
    > = {
      passwordResetToken: hashedToken,
      passwordResetTokenExpiresAt: moment().add(12, 'hours').utc().toDate(),
    };

    await this.userService.updateUserById(userExists.id, updateBody);

    await this.emailService._sendUserPasswordResetInstructionEmail(
      userExists.fullName,
      userExists.email,
      token
    );
  }

  async sendUserPasswordResetOTP(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      req.body.phoneNumber = req.body.phoneNumber.startsWith('+234')
        ? req.body.phoneNumber
        : `+234${req.body.phoneNumber.replace(/^0+/, '')}`;
      const userExists: UserInterface =
        await this.userService.getUserByPhoneNumber(req.body.phoneNumber);
      if (!userExists)
        return next(
          new AppException('Oops! User does not exist', httpStatus.NOT_FOUND)
        );
      const otp = HelperClass.generateRandomChar(6, 'num');
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
            customer_mobile_number: req.body.phoneNumber.startsWith('+234')
              ? req.body.phoneNumber
              : `+234${req.body.phoneNumber}`,
            meta_data: {
              first_name: userExists.fullName,
            },
            token: otp,
          },
        });

        return res.status(httpStatus.OK).json({
          status: smsSent.data.status,
          message: 'OTP sent successfully',
        });
      }
      const hashedToken = await this.encryptionService.hashString(otp);

      const updateBody: Pick<
        UserInterface,
        'passwordResetToken' | 'passwordResetTokenExpiresAt'
      > = {
        passwordResetToken: hashedToken,
        passwordResetTokenExpiresAt: moment().add(12, 'hours').utc().toDate(),
      };

      await this.userService.updateUserById(userExists.id, updateBody);
      return res.status(httpStatus.OK).json({
        status: 'success',
        data: {
          message:
            'For testing purposes, OTP wont be sent to your phone number, below is the OTP for resetting password',
          token: otp,
        },
      });
    } catch (err: any) {
      return next(new AppException(err.message, err.status));
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const hashedToken = await this.encryptionService.hashString(
        req.body.token
      );

      const user: UserInterface = await this.userService.getUserDetail({
        passwordResetToken: hashedToken,
      });

      if (!user) return TokenMustStillBeValid(next);
      if (user.passwordResetTokenExpiresAt < moment().utc().toDate())
        throw new Error(`Oops!, your token has expired`);
      const hashedPassword = await this.encryptionService.hashPassword(
        req.body.password
      );

      const updateBody: Pick<
        UserInterface,
        'password' | 'passwordResetToken' | 'passwordResetTokenExpiresAt'
      > = {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetTokenExpiresAt: null,
      };

      await this.userService.updateUserById(user.id, updateBody);

      res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Password reset was successful',
      });
    } catch (err: any) {
      return next(new AppException(err.message, err.status));
    }
  }
}
