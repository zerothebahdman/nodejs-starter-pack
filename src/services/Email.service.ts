import config from '../../config/default';
import NodemailerModule from '../modules/NodemailerModule';
import log from '../logging/logger';
import PASSWORD_RESET_EMAIL from '../mail/password-reset';
import WELCOME_EMAIL from '../mail/welcome-email';
import PASSWORD_RESET_SUCCESSFUL from '../mail/password-reset-successfully';
import INVITE_ADMIN from '../mail/invite-admin';
import SEND_ADMIN_NEW_PASSWORD from '../mail/send-admin-new-password';
import HelperClass from '../utils/helper';
import SEND_USER_LOGIN_CREDENTIALS from '../mail/send_user_login_credentials';
const _nodeMailerModule = new NodemailerModule();

const emailType: EmailType = {
  WELCOME_EMAIL: ['Welcome to KOOPAY', 'welcome'],
  PASSWORD_RESET_INSTRUCTION: ['Password Reset Requested', 'password-reset'],
  PASSWORD_RESET_SUCCESSFUL: ['Password Reset', 'password-reset-successful'],
  PASSWORD_CHANGED: ['Password Changed', 'password-changed'],
  SEND_USER_LOGIN_CREDENTIALS: [
    'You have been invited to be a member of refiners cooperative',
    'send_user_login_credentials',
  ],
  INVITE_ADMIN: [
    'You have been invited to be an Admin on KOOPAY',
    'invite-admin',
  ],
  SEND_ADMIN_NEW_PASSWORD: [
    'A new password has been generated for you',
    'send-admin-new-password',
  ],
};

type Data = {
  name?: string;
  url?: string;
  password?: string;
  username?: string;
};

type EmailOptions = {
  from: string;
  to: string;
  html?: any;
  name?: string;
  subject?: string;
};

type EmailType = {
  [k: string]: string[];
};
export default class EmailService {
  async _sendMail(type: string, email: string, data: Data) {
    const mailOptions: EmailOptions = {
      from: config.from,
      to: email,
    };
    const [subject, templatePath] = emailType[type] || [];
    if (!subject || !templatePath) return;
    switch (templatePath) {
      case 'welcome':
        mailOptions.html = WELCOME_EMAIL(data.name, data.url);
        mailOptions.subject = `${subject} ${data.name}`;
        break;
      case 'password-reset':
        mailOptions.html = PASSWORD_RESET_EMAIL(data.url);
        mailOptions.subject = `[URGENT] - ${subject}`;
        break;
      case 'reset-password-successful':
        mailOptions.html = PASSWORD_RESET_SUCCESSFUL();
        mailOptions.subject = subject;
        break;
      case 'send_user_login_credentials':
        mailOptions.html = SEND_USER_LOGIN_CREDENTIALS(
          data.name,
          data.username
        );
        mailOptions.subject = `${subject}`;
        break;
      case 'invite-admin':
        mailOptions.html = INVITE_ADMIN(data.name, data.password, data.url);
        mailOptions.subject = `[${data.name}] ${subject}`;
      case 'send-admin-new-password':
        mailOptions.html = SEND_ADMIN_NEW_PASSWORD(
          data.name,
          data.password,
          data.url
        );
        mailOptions.subject = `[Notice ${data.name}] ${subject}`;
    }
    try {
      await _nodeMailerModule.send(mailOptions);
      log.info(`Email on it's way to ${email}`);
    } catch (err) {
      throw err;
    }
  }

  async _sendWelcomeEmail(name: string, email: string) {
    const url = `${config.FRONTEND_APP_URL}/sign-in`;
    return await this._sendMail('WELCOME_EMAIL', email, { name, url });
  }

  async _sendUserLoginCredentials(
    name: string,
    _user_email: string,
    username: string
  ) {
    return await this._sendMail('SEND_USER_LOGIN_CREDENTIALS', _user_email, {
      name,
      username,
    });
  }

  async _sendAdminEmailVerificationEmail(
    name: string,
    email: string,
    token: string
  ) {
    const url = `${config.FRONTEND_APP_URL}/admin/verify-email?token=${token}`;
    return await this._sendMail('EMAIL_VERIFICATION', email, {
      name,
      url,
    });
  }

  async _sendUserPasswordResetInstructionEmail(
    name: string,
    email: string,
    token: string
  ) {
    const url = `${config.FRONTEND_APP_URL}/new-password?token=${token}`;
    return await this._sendMail('PASSWORD_RESET_INSTRUCTION', email, {
      name,
      url,
    });
  }
  async _sendAdminPasswordResetInstructionEmail(
    name: string,
    email: string,
    password: string
  ) {
    const url = `${config.FRONTEND_APP_URL}/login`;
    return await this._sendMail('SEND_ADMIN_NEW_PASSWORD', email, {
      name: HelperClass.titleCase(name),
      url,
      password,
    });
  }

  async inviteAdmin(to: string, password: string, name: string, token: string) {
    const url = `${config.FRONTEND_APP_URL}/admin/verify-email?token=${token}`;
    return await this._sendMail('INVITE_ADMIN', to, {
      name: HelperClass.titleCase(name),
      password,
      url,
    });
  }
}
