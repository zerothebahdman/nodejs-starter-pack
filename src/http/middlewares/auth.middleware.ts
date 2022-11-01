import Status from 'http-status';
import { Request, Response, NextFunction } from 'express';
import AppException from '../../exceptions/AppException';
import TokenService from '../../services/Token.service';
import User from '../../database/models/user.model';

export type RequestType = {
  [prop: string]: any;
} & Request;

export const isUserAuthenticated = async (
  req: RequestType,
  _res: Response,
  next: NextFunction
) => {
  try {
    const _noAuth = () =>
      next(
        new AppException(
          `Oops!, you are not authenticated, login`,
          Status.UNAUTHORIZED
        )
      );

    const { authorization } = req.headers;
    const _authHeader = authorization;
    if (!_authHeader) return _noAuth();
    const [id, token] = _authHeader.split(' ');
    if (!id || !token) return _noAuth();
    if (id.trim().toLowerCase() !== 'bearer') return _noAuth();
    const decodedToken = await new TokenService().verifyToken(token, next);
    const { sub, type }: any = decodedToken;
    if (type === 'refresh')
      return next(
        new AppException('Oops!, wrong token type', Status.FORBIDDEN)
      );
    const user = await User.findById(sub);
    if (!user)
      return next(
        new AppException('Oops!, user does not exist', Status.NOT_FOUND)
      );

    /** Store the result in a req object */
    req.user = user;
    next();
  } catch (err: any) {
    return next(new AppException(err.status, err.message));
  }
};
