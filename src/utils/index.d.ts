import { GENDER } from '../../config/constants';
export interface PaginationOptions {
  populate?: string;
  select?: string;
  sortBy?: string;
  limit?: string;
  page?: string;
}

export interface PaginationModel<T> {
  totalData: number | undefined;
  limit: number | undefined;
  totalPages: number | undefined;
  page: number | undefined;
  data: T[];
}

export interface UserInterface {
  id: string;
  _id: string | string[] | UserInterface[];
  fullName: string;
  email: string;
  password: string;
  residentialAddress: string;
  isEmailVerified: boolean;
  emailVerifiedAt: Date;
  emailVerificationToken: string;
  emailVerificationTokenExpiry: Date;
  passwordResetToken: string;
  passwordResetTokenExpiresAt: Date;
  pushNotificationId: string;
  userAppVersion: string;
  gender: GENDER;
  otpLogin: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  profilePicture: string;
  dob: Date;
  deviceInfo: typeof Map;
  referralCode: string;
  inviteCode: string;
}
