import { NextFunction, Request, Response } from 'express';
import AppException from '../../exceptions/AppException';

export type RequestType = {
  [prop: string]: any;
} & Request;

export const restrictAccessTo =
  (...roles: string[]) =>
  (req: RequestType, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppException(
          `Oops! you don't have the privilege to perform this action`,
          403
        )
      );
    }

    next();
  };
