import AppException from '../exceptions/AppException';
import httpStatus from 'http-status';
import EncryptionService from './Encryption.service';
import TokenService from './Token.service';
import { NextFunction } from 'express';
import { UserInterface } from '../../index';
import User from '../database/models/user.model';

interface AuthRequest extends UserInterface {}

export default class AuthService {
  constructor(
    private readonly encryptionService: EncryptionService,
    private readonly tokenService: TokenService
  ) {}

  async createUser(createUser: UserInterface) {
    const _hashedPassword = await this.encryptionService.hashPassword(
      createUser.username
    );
    createUser.password = _hashedPassword;

    const _user = await User.create(createUser);

    return { _user };
  }

  async loginUser(
    loginPayload: AuthRequest,
    next: NextFunction
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: UserInterface;
  }> {
    const _userExists = await User.findOne({
      username: loginPayload.username,
    }).select('+password');
    if (
      !_userExists ||
      !(await this.encryptionService.comparePassword(
        _userExists.password,
        loginPayload.password
      ))
    )
      next(
        new AppException(
          `Oops!, Incorrect username or password`,
          httpStatus.UNAUTHORIZED
        )
      );

    const accessToken = await this.tokenService._generateAccessToken(
      _userExists.id,
      _userExists.firstName
    );
    const refreshToken = await this.tokenService._generateRefreshToken(
      _userExists.id,
      _userExists.firstName
    );

    return { accessToken, refreshToken, user: _userExists };
  }

  async regenerateAccessToken(
    refreshToken: string,
    next: NextFunction
  ): Promise<string> {
    const decodeToken = await new TokenService().verifyToken(
      refreshToken,
      next
    );
    const { sub }: any = decodeToken;
    const user = await User.findById({ _id: sub });

    if (!user)
      next(
        new AppException('Oops!, user does not exist', httpStatus.NOT_FOUND)
      );

    return await this.tokenService._generateAccessToken(
      user.id,
      user.firstName
    );
  }

  // async resendOtp({ req, next }: { req: AuthRequest; next: NextFunction }) {
  //   const _user = await User.findOne({
  //     email: req.email,
  //     deletedAt: null,
  //   });
  //   if (!_user)
  //     next(
  //       new AppException('Oops!, user does not exist', httpStatus.NOT_FOUND)
  //     );

  //   const OTP_CODE = HelperClass.generateRandomChar(6, 'num') as string;
  //   if (_user.isEmailVerified === true) {
  //     next(
  //       new AppException(
  //         'Oops!, email is already verified',
  //         httpStatus.FORBIDDEN
  //       )
  //     );
  //   } else {
  //     const hashedToken = createHash('sha512')
  //       .update(String(OTP_CODE))
  //       .digest('hex');

  //     _user.email_verification_token = hashedToken;
  //     _user.email_verification_token_expires_at = moment().add('6', 'hours');
  //     await _user.save();

  //     await this.emailService._sendUserEmailVerificationEmail(
  //       _user.firstName,
  //       _user.email,
  //       OTP_CODE
  //     );
  //   }
  //   return OTP_CODE;
  // }
}
