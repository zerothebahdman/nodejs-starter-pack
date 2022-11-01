import { NextFunction } from 'express';
import AppException from '../../exceptions/AppException';

type Account = { email: string };
const AccountEmailShouldNotHaveBeenVerified = (
  account: Account,
  next: NextFunction
) => {
  return next(
    new AppException(
      `Account email: ${account.email} has already been verified`,
      417
    )
  );
};

export default AccountEmailShouldNotHaveBeenVerified;
