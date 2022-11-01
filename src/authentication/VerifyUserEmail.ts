import { NextFunction, Request, Response } from 'express';
import { createHash } from 'node:crypto';
import { OtpExpired, TokenMustStillBeValid } from './rules/rules.module';
import AppException from '../exceptions/AppException';
import EmailService from '../services/Email.service';
import moment from 'moment';
import User from '../database/models/user.model';
import HelperClass from '../utils/helper';

export default class VerifyUserEmail {
  constructor(private readonly emailService: EmailService) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const _hashedEmailToken: string = createHash('sha512')
        .update(req.body.otp)
        .digest('hex');

      const _user = await User.findOne({
        $and: [
          {
            isEmailVerified: false,
            email_verification_token: _hashedEmailToken,
          },
        ],
      });

      if (!_user) return TokenMustStillBeValid(next);
      if ((_user.email_verification_token_expires_at < moment()) as boolean)
        return OtpExpired(next);

      _user.isEmailVerified = true;
      _user.email_verification_token = null;
      _user.email_verification_token_expires_at = null;
      _user.email_verified_at = moment().format();
      _user.save();

      await this.emailService._sendWelcomeEmail(
        HelperClass.titleCase(_user.firstName),
        _user.email
      );

      return res.status(201).json({
        status: `success`,
        message: `Your email: ${_user.email} has been verified`,
      });
    } catch (err: any) {
      return next(new AppException(err.status, err.message));
    }
  }
}
