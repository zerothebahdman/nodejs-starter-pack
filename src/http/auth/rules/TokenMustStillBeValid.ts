import { NextFunction } from 'express';
import httpStatus from 'http-status';
import AppException from '../../../exceptions/AppException';

const TokenMustStillBeValid = (next: NextFunction) => {
  return next(new AppException(`Oops!, invalid otp`, httpStatus.BAD_REQUEST));
};

export default TokenMustStillBeValid;
