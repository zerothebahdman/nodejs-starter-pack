import { Request, Response, NextFunction } from 'express';
import AppException from '../../exceptions/AppException';

export default class UserController {
  async getAllUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({ status: 'success' });
    } catch (err: any) {
      return next(new AppException(err.message, err.status));
    }
  }
}
