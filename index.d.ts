import { Moment } from 'moment';

export interface UserInterface {
  firstName: string;
  title: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  id: string;
  _id: string;
  occupation: string;
  avatar: Object<{ image: string; meta: Object }>;
  businessAddress: string;
  gender: string;
  address: string;
  role: string;
  permissions: string[];
  email_verification_token: string;
  isEmailVerified: boolean;
  password_updated_at: Date | string;
  password_reset_token: string;
  password_reset_token_expires_at: Moment | string;
  email_verified_at: Date | string;
  email_verification_token_expires_at: Moment;
  active: boolean;
  tokens: { token: string; expiresIn: Date; tokenType: string };
  loanApplicationStatus: string;
  nextOfKin: string;
  nextOfKinAddress: string;
  bank: string;
  accountNumber: string;
}

export interface AccountInterface {
  user: UserInterface | string;
  accountInformation: Object<{
    shareCapital: number;
    thriftSavings: number;
    commodityTrading: number;
    specialDepositTotal: number;
    fineTotal: number;
    loanTotal: number;
    projectFinancingTotal: number;
  }>;
  balance: number;
  debt: number;
}

export interface NewsInterface {
  title: string;
  content: string;
  date: string;
}
