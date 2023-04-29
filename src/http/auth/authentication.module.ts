import AuthService from '../../services/auth.service';
import EmailService from '../../services/email.service';
import EncryptionService from '../../services/encryption.service';
import TokenService from '../../services/token.service';
import UserService from '../../services/user.service';
import UserAuth from './user.auth';

export const authController = new UserAuth(
  new AuthService(
    new EncryptionService(),
    new TokenService(),
    new UserService(),
    new EmailService()
  ),
  new UserService(),
  new EncryptionService()
);
