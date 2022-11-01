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
import MembersService from '../services/Members.service';
import Account from '../database/models/Accounts.model';
import User from '../database/models/user.model';

export const createUser = new CreateUser(
  new AuthService(new EncryptionService(), new TokenService()),
  new MembersService(User, Account, new EncryptionService())
);
export const loginUser = new LoginUser(
  new AuthService(new EncryptionService(), new TokenService()),
  new MembersService(User, Account, new EncryptionService())
);

export const passwordReset = new PasswordReset(
  new TokenService(),
  new EmailService(),
  new EncryptionService()
);
export const verifyUserEmail = new VerifyUserEmail(new EmailService());
