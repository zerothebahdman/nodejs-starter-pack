import EncryptionService from './encryption.service';
import TokenService from './token.service';
import HelperClass from '../utils/helper';
import { createHash } from 'node:crypto';
import moment from 'moment';
import UserService from './user.service';
import EmailService from './email.service';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../utils/index';

export default class AuthService {
  constructor(
    private readonly encryptionService: EncryptionService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly emailService: EmailService
  ) {}

  async createUser(
    createBody: User
  ): Promise<{ user: User; OTP_CODE: string }> {
    createBody.password = await this.encryptionService.hashPassword(
      createBody.password
    );
    const OTP_CODE = HelperClass.generateRandomChar(6, 'num');
    const hashedToken = createHash('sha512')
      .update(String(OTP_CODE))
      .digest('hex');

    createBody.emailVerificationToken = hashedToken;
    createBody.emailVerificationTokenExpiry = moment()
      .add('6', 'hours')
      .utc()
      .toDate();

    const user: User = await this.userService.createUser(createBody);
    return { user, OTP_CODE };
  }

  async loginUser(loginPayload: User) {
    const token = await this.tokenService.generateToken(
      loginPayload.id,
      `${loginPayload.firstName} ${loginPayload.lastName}`
    );

    return token;
  }

  async regenerateAccessToken(refreshToken: string): Promise<string> {
    const decodeToken = await new TokenService().verifyToken(refreshToken);
    const { sub }: string | JwtPayload = decodeToken;
    const user = await this.userService.getUserById(sub as string);

    if (!user) throw new Error(`Oops!, user with id ${sub} does not exist`);

    const { accessToken } = await this.tokenService.generateToken(
      user.id,
      user.email
    );

    return accessToken;
  }

  async resendOtp(actor: User): Promise<void> {
    const otp = HelperClass.generateRandomChar(6, 'num');
    const hashedToken = await this.encryptionService.hashString(otp);

    const updateBody: Pick<
      User,
      'emailVerificationToken' | 'emailVerificationTokenExpiry'
    > = {
      emailVerificationToken: hashedToken,
      emailVerificationTokenExpiry: moment().add('6', 'hours').utc().toDate(),
    };
    await this.userService.updateUserById(actor.id, updateBody);

    await this.emailService._sendUserEmailVerificationEmail(
      `${actor.firstName} ${actor.lastName}`,
      actor.email,
      otp
    );
  }
}
