import { NextFunction } from 'express';
import httpStatus from 'http-status';
import AppException from '../../../exceptions/AppException';

type Account = { email: string };
const AccountEmailShouldNotHaveBeenVerified = (
  account: Account,
  next: NextFunction
) => {
  return next(
    new AppException(
      `Account email: ${account.email} has already been verified`,
      httpStatus.EXPECTATION_FAILED
    )
  );
};

export default AccountEmailShouldNotHaveBeenVerified;
