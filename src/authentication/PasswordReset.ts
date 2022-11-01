import { NextFunction, Request, Response } from 'express';
import AppException from '../exceptions/AppException';
import TokenService from '../services/Token.service';
import EmailService from '../services/Email.service';
import { createHash } from 'crypto';
import TokenMustStillBeValid from './rules/TokenMustStillBeValid';
import moment from 'moment';
import EncryptionService from '../services/Encryption.service';
import User from '../database/models/user.model';

export default class PasswordReset {
  constructor(
    private readonly tokenService: TokenService,
    private readonly emailService: EmailService,
    private readonly encryptionService: EncryptionService
  ) {}

  async sendResetPasswordEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email } = req.body;
      const userExists = await User.findOne({ email });
      if (!userExists)
        return next(new AppException('Oops! User does not exist', 404));

      const { Token, hashedToken } = await this.tokenService.TokenGenerator();

      userExists.password_reset_token = hashedToken;
      userExists.password_reset_token_expires_at = moment().add(2, 'hours');
      await userExists.save();
      await this.emailService._sendUserPasswordResetInstructionEmail(
        userExists.firstName,
        userExists.email,
        Token
      );

      res.status(200).json({
        status: 'success',
        message: 'We have sent a password reset request to your email',
      });
    } catch (err: any) {
      return next(new AppException(err.status, err.message));
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const hashedToken = createHash('sha512')
        .update(req.body.token)
        .digest('hex');

      const user = await User.findOne({
        password_reset_token: hashedToken,
        password_reset_token_expires_at: {
          $gt: moment().utc().startOf('day').format(),
        },
      }).select({ id: 1, firstName: 1, email: 1 });

      if (!user) return TokenMustStillBeValid(next);
      const hashedPassword = await this.encryptionService.hashPassword(
        req.body.password
      );

      user.password = hashedPassword;
      user.password_reset_token = undefined;
      user.password_reset_token_expires_at = undefined;
      user.password_updated_at = moment().toDate();
      await user.save();

      res.status(200).json({
        status: 'success',
        message: 'Password reset was successful',
      });
    } catch (err: any) {
      return next(new AppException(err.status, err.message));
    }
  }
}
