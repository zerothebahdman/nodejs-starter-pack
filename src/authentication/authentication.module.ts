/**
 * Use this module file to create instances of all authentication and simplify imports in to your routers
 */

import AuthService from '../services/auth.service';
import CreateUser from './CreateUser';
import LoginUser from './LoginUser';
import VerifyUserEmail from './VerifyUserEmail';
import TokenService from '../services/token.service';
import EncryptionService from '../services/encryption.service';
import PasswordReset from './PasswordReset';
import EmailService from '../services/email.service';
import UserService from '../services/user.service';

export const createUser = new CreateUser(
  new AuthService(
    new EncryptionService(),
    new TokenService(),
    new UserService(),
    new EmailService()
  ),
  new UserService()
);
export const loginUser = new LoginUser(
  new AuthService(
    new EncryptionService(),
    new TokenService(),
    new UserService(),
    new EmailService()
  ),
  new UserService(),
  new EncryptionService()
);
export const verifyUserEmail = new VerifyUserEmail(
  new UserService(),
  new EncryptionService()
);
export const passwordReset = new PasswordReset(
  new EmailService(),
  new EncryptionService(),
  new UserService()
);
