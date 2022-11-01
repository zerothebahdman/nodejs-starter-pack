import nodemailer, { Transporter } from 'nodemailer';
import config from '../../config/default';
import log from '../logging/logger';

export type MailData = {
  from: string;
  to: string;
  html?: string;
  name?: string;
  subject?: string;
};

export default class NodemailerModule {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.MAIL_HOST,
      port: Number(config.MAIL_PORT),
      connectionTimeout: 300000,
      pool: true,
      logger: true,
      secure: false,
      auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASSWORD,
      },
      ignoreTLS: false,
    });
  }

  async send(mailData: MailData) {
    this.transporter.verify((error) => {
      if (error) log.error(`Error sending email :::::: ${error}`);
      else log.info('Server 🚀 is ready to send out mails');
    });

    return this.transporter.sendMail(mailData, (error, info) => {
      if (error) log.error(`Error sending email :::::: ${error}`);
      else {
        console.log(`Email sent: ${info.response}`);
        console.log(`Email sent to: ${info.accepted}`);
        console.log(`Email sent count: ${info.accepted?.length}`);
        console.log(`Email failed Count: ${info.rejected?.length}`);
      }
    });
  }
}
