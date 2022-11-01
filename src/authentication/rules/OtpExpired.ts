import httpStatus from 'http-status';
import AppException from '../../exceptions/AppException';
import { NextFunction } from 'express';

const OtpExpired = (next: NextFunction) => {
  return next(
    new AppException(`Oops!, your token has expired`, httpStatus.FORBIDDEN)
  );
};

export default OtpExpired;
