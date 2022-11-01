import { NextFunction } from 'express';
import AppException from '../../exceptions/AppException';

const TokenMustStillBeValid = (next: NextFunction) => {
  return next(new AppException(`Opps!, your token has expired`, 417));
};

export default TokenMustStillBeValid;
