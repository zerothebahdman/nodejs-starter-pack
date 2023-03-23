import { NextFunction, Request, Response } from 'express';
import type { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import AppException from '../../exceptions/AppException';

export interface Error {
  statusCode: number;
  status: string;
  message: string;
  error?: string;
  stack?: string;
  name?: string;
  isOperational?: boolean;
}

function setDevError(err: Error, res: Response) {
  return res.status(err.statusCode).send({
    status: err.status,
    message: err.message,
    error: err,
    error_stack: err.stack,
  });
}

function setProductionError(err: Error, res: Response) {
  return res.status(err.statusCode).send({
    status: err.status,
    message: err.message,
  });
}

export const ErrorConverter = (
  err: any,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  let error = err;
  if (!(error instanceof AppException)) {
    const statusCode = error.statusCode || httpStatus.BAD_REQUEST;
    const message = error.message || httpStatus[statusCode];
    error = new AppException(statusCode, message, err.stack);
  }
  next(error);
};

export const ErrorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || httpStatus.BAD_REQUEST;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    setDevError(err, res);
  } else if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'production'
  ) {
    setProductionError(err, res);
  }
  next();
};
