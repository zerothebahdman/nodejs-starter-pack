/**
 * Use this module file to create instances of all authentication and simplify imports in to your routers
 */

import EmailService from '../services/Email.service';
import EncryptionService from '../services/Encryption.service';
import CreateUser from './CreateUser';
import LoginUser from './LoginUser';
import VerifyUserEmail from './VerifyUserEmail';
import TokenService from '../services/Token.service';
import AuthService from '../services/Auth.service';
import PasswordReset from './PasswordReset';

export const createUser = new CreateUser(
  new AuthService(new EncryptionService(), new TokenService())
);
export const loginUser = new LoginUser(
  new AuthService(new EncryptionService(), new TokenService())
);

export const passwordReset = new PasswordReset(
  new TokenService(),
  new EmailService(),
  new EncryptionService()
);
export const verifyUserEmail = new VerifyUserEmail(new EmailService());
